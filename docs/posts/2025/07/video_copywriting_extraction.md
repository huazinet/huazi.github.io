---
post: true
title: 2025-07-07利用阿里云百炼平台提取视频文案的扣子插件
date: 2025-07-07
cover: https://img.picgo.net/2025/07/07/image7bbb6bbfd322f67f.png
coveross: https://img.picgo.net/2025/07/07/image7bbb6bbfd322f67f.png
categories:
 - 教程
tags:
 - 教程
 - Coze
 - 插件
description:  教程
---
# 2025-07-07利用阿里云百炼平台提取视频文案的扣子插件

![Coze](https://img.picgo.net/2025/07/07/image7bbb6bbfd322f67f.png)

插件可以无脑直接使用，但是需要对Coze，阿里云、阿里云百炼等平台操作熟悉

短视频解析的Api需自备（用自己的需要代码适配），[想要和我使用同一个平台可以点击这里联系我（跳转网页最下方）](https://sharehub.club)

# 插件元数据：
**ALI_BAILIAN_KEY：阿里云百炼平台API-KEY**

**OSS_ACCESS_KEY_ID：阿里云Access_key**

**OSS_ACCESS_KEY_SECRET：阿里云Access_key_secret**

**OSS_ENDPOINT：阿里云OSS的Bucket的外网访问Endpoint**

**OSS_BUCKET_NAME：阿里云OSS的Bucket的名称**

**video_url：短视频分享链接**

## 直接上代码！
```Python
# -*- coding: utf-8 -*-
# @Time    : 2025/3/28 13:15
# @Author  : huazi
# @File    : video_copywriting_extraction.py

from runtime import Args
from typings.video_copywriting_extraction.video_copywriting_extraction import Input, Output

"""
Each file needs to export a function named `handler`. This function is the entrance to the Tool.

Parameters:
args: parameters of the entry function.
args.input - input parameters, you can get test input value by args.input.xxx.
args.logger - logger instance used to print logs, injected by runtime.

Remember to fill in input/output in Metadata, it helps LLM to recognize and use tool.

Return:
The return data of the function, which should match the declared output parameters.
"""
import requests
from http import HTTPStatus
import dashscope
from dashscope.audio.asr import Transcription
import uuid
import oss2
import time
import re


def upload_to_oss_from_url(url, oss_access_key_id, oss_access_key_secret, oss_endpoint, oss_bucket_name, args):
    """上传阿里云OSS"""
    try:
        # 创建OSS认证对象
        auth = oss2.Auth(oss_access_key_id, oss_access_key_secret)
        # 创建Bucket对象
        bucket = oss2.Bucket(auth, oss_endpoint, oss_bucket_name)

        # 生成唯一的文件名，使用uuid避免冲突
        file_name = f"video_{uuid.uuid4()}.mp4"
        object_name = f"videos/{file_name}"

        # 下载视频内容到内存
        response = requests.get(url, timeout=120)
        response.raise_for_status()

        # 上传文件并设置为公共读取权限
        headers = {'x-oss-object-acl': 'public-read'}
        result = bucket.put_object(object_name, response.content, headers=headers)
        #args.logger.info(f'upload_to_oss_from_url:{result}')
        if result.status == 200:
            oss_url = f"https://{oss_bucket_name}.{oss_endpoint}/{object_name}"
            return oss_url
        else:
            return None
    except Exception as e:
        print(f"上传失败: {str(e)}")
        return None


def check_and_set_bucket_acl(oss_access_key_id, oss_access_key_secret, oss_endpoint, oss_bucket_name):
    """检查并设置Bucket的访问控制权限"""
    try:
        # 创建OSS认证对象
        auth = oss2.Auth(oss_access_key_id, oss_access_key_secret)
        # 创建Bucket对象
        bucket = oss2.Bucket(auth, oss_endpoint, oss_bucket_name)

        # 获取当前Bucket的ACL
        result = bucket.get_bucket_acl()
        current_acl = result.acl

        # 如果不是公共读取权限，尝试设置为公共读取
        if current_acl != oss2.BUCKET_ACL_PUBLIC_READ:
            bucket.put_bucket_acl(oss2.BUCKET_ACL_PUBLIC_READ)

        return True
    except Exception as e:
        print(f"检查Bucket权限出错: {str(e)}")
        return False


def extract_text(file_url, args, model='paraformer-v2'):
    """使用百炼平台提取视频中的语音文本"""
    try:
        # 添加延迟，确保OSS文件可访问
        time.sleep(2)

        # 提交任务
        task = Transcription.async_call(
            model=model,
            file_urls=[file_url],
            language_hints=['zh']
        )
        #args.logger.info(f"extract_text_task:{task}")
        if not hasattr(task, 'output') or not hasattr(task.output, 'task_id'):
            return {'Video_content': '语音识别任务提交失败，请重试'}

        task_id = task.output.task_id

        # 等待任务完成
        result = Transcription.wait(
            task=task_id,
            check_interval=5,
            timeout=300
        )
        #args.logger.info(f"extract_text_result:{result}")
        
        # 检查任务状态
        if result.status_code == HTTPStatus.OK:
            # 检查任务是否成功
            if result.output.task_status == 'SUCCEEDED':
                # 提取文本
                for item in result.output.get('results', []):
                    if item.get('subtask_status') == 'SUCCEEDED':
                        # 获取转写结果URL
                        transcription_url = item.get('transcription_url')
                        if not transcription_url:
                            continue

                        try:
                            response = requests.get(transcription_url, timeout=30)
                            response.raise_for_status()

                            # 解析JSON
                            transcript = response.json()

                            # 两种可能的格式：检查sentences或transcripts
                            text = ""

                            # 先检查sentences格式
                            sentences = transcript.get('sentences', [])
                            if sentences:
                                texts = [s['text'] for s in sentences]
                                text = ' '.join(texts)
                                if text.strip():  # 确保文本不为空
                                    return {'Video_content': text}
                                return {'Video_content': '视频中没有识别到语音内容'}

                            # 如果没有sentences，检查transcripts格式
                            transcripts = transcript.get('transcripts', [])
                            if transcripts:
                                for t in transcripts:
                                    if 'text' in t and t['text'].strip():
                                        return {'Video_content': t['text']}

                            # 尝试从原始文档中直接提取text字段
                            if 'text' in transcript and transcript['text'].strip():
                                return {'Video_content': transcript['text']}
                            
                            #args.logger.info(f"extract_text_text:{text}")
                            return {'Video_content': '视频中没有识别到语音内容'}
                        except Exception as e:
                            #args.logger.info(f"获取转写结果失败: {str(e)}")
                            continue

                # 如果没有找到有效的转写结果但任务成功，尝试直接处理结果
                if hasattr(result.output, 'results') and result.output.results:
                    first_result = result.output.results[0]
                    if 'transcription' in first_result and first_result['transcription'].strip():
                        #args.logger.info(f"extract_text_first:{first_result}")
                        return {'Video_content': first_result['transcription']}

            # 检查是否有特殊状态码
            if hasattr(result.output, 'results') and result.output.results:
                first_result = result.output.results[0]
                if first_result.get('code') == 'SUCCESS_WITH_NO_VALID_FRAGMENT':
                    return {'Video_content': '视频中没有检测到有效的语音内容，可能是无声视频或背景音乐'}

        return {'Video_content': '语音识别失败，请重试'}

    except Exception as e:
        #args.logger.info(f"语音识别异常: {str(e)}")
        return {'Video_content': '语音识别服务异常，请稍后重试'}


def delete_oss_file(oss_url, oss_access_key_id, oss_access_key_secret, oss_endpoint, oss_bucket_name):
    """从阿里云OSS删除文件"""
    try:
        # 从URL中提取object_name
        if not oss_url or f"https://{oss_bucket_name}.{oss_endpoint}/" not in oss_url:
            return False

        object_name = oss_url.replace(f"https://{oss_bucket_name}.{oss_endpoint}/", "")

        # 创建OSS认证对象
        auth = oss2.Auth(oss_access_key_id, oss_access_key_secret)
        # 创建Bucket对象
        bucket = oss2.Bucket(auth, oss_endpoint, oss_bucket_name)

        # 删除文件
        bucket.delete_object(object_name)
        return True
    except Exception as e:
        print(f"删除OSS文件失败: {str(e)}")
        return False


def process_video(video_url, model, oss_access_key_id, oss_access_key_secret, oss_endpoint, oss_bucket_name, args):
    """处理视频：直接从URL上传到OSS并提取文本"""
    oss_url = None
    try:
        # 检查并设置Bucket权限
        check_and_set_bucket_acl(oss_access_key_id, oss_access_key_secret, oss_endpoint, oss_bucket_name)

        # 直接从URL上传到OSS
        oss_url = upload_to_oss_from_url(video_url, oss_access_key_id, oss_access_key_secret, oss_endpoint,
                                         oss_bucket_name, args)
        if not oss_url:
            return {'Video_content': '视频上传到OSS失败，请重试'}

        # 提取文本
        result = extract_text(oss_url, args, model)

        # 删除OSS上的视频文件
        if oss_url:
            delete_oss_file(oss_url, oss_access_key_id, oss_access_key_secret, oss_endpoint, oss_bucket_name)

        return result

    except Exception as e:
        print(f"处理视频出错: {str(e)}")
        # 确保即使出错也尝试删除文件
        if oss_url:
            delete_oss_file(oss_url, oss_access_key_id, oss_access_key_secret, oss_endpoint, oss_bucket_name)
        return {'Video_content': '视频处理失败，请重试'}


def handler(args: Args[Input]):
    # 百炼平台API Key
    dashscope.api_key = args.input.ALI_BAILIAN_KEY

    # 阿里云OSS配置
    OSS_ACCESS_KEY_ID = args.input.OSS_ACCESS_KEY_ID
    OSS_ACCESS_KEY_SECRET = args.input.OSS_ACCESS_KEY_SECRET
    OSS_ENDPOINT = args.input.OSS_ENDPOINT
    OSS_BUCKET_NAME = args.input.OSS_BUCKET_NAME

    # 视频url
    url_pattern = r'https?://[^\s<>"]\.[^\s<>"]+'
    urls = re.findall(url_pattern, args.input.video_url)

    # 如果没有找到URL，返回None
    if not urls[0]:
        return {'Video_content': '获取失败，请检查视频链接是否正确且访问，谢谢！'}
    url = urls[0]
    video_domains = [
        'douyin.com',
        'iesdouyin.com',
        'kuaishou.com',
        'gifshow.com',
        'pipix.com',
        'huoshan.com',
        'h5.pipix.com',
        'v.douyin.com',
        'h5.huoshan.com',
        'weishi.qq.com',
        'h5.weishi.qq.com',
        'isee.weishi.qq.com',
        'h5.weibo.cn',
        'video.weibo.com',
        'weibo.com',
        'xiaohongshu.com',
        'xhslink.com',
        'b23.tv',  # 哔哩哔哩短链接
        'bilibili.com'  # 哔哩哔哩
    ]
    for domain in video_domains:
        if domain in url:
            # 设置API URL和参数，可以使用自己的
            api_url = "去水印解析的api接口"
            payload = {
                "appid": "api接口key",  # 从后台获取的实际appid[4](@ref)
                "link": args.input.video_url
            }
            try:
                # 发送POST请求
                res = requests.post(
                    url=api_url,
                    json=payload,  # 自动序列化为JSON[8](@ref)
                    timeout=10  # 设置超时时间[8](@ref)
                ).json()
                #args.logger.info(res)
                if res['code'] == 1 and res['data']['videourl']:
                    try:
                        # 获取视频的 URL
                        video_url = res["data"]["videourl"]

                        # 使用paraformer-v2模型
                        result = process_video(
                            video_url,
                            'paraformer-v2',
                            OSS_ACCESS_KEY_ID,
                            OSS_ACCESS_KEY_SECRET,
                            OSS_ENDPOINT,
                            OSS_BUCKET_NAME,
                            args
                        )
                        #args.logger.info(result)
                        return result
                    except Exception as e:
                        return {'Video_content': '获取失败，请重试～'}
                else:
                    return {'Video_content': '获取失败，链接内容不是视频，不支持解析！'}
            except Exception as e:
                return {'Video_content': '解析服务暂不可用！'}
        else:
            return {'Video_content': '暂不支持该链接解析'}
```


---
互联网资源分享免责声明:  
本网站（或应用程序）的内容仅供参考和个人使用，不构成任何法律、金融或专业建议。用户对使用本网站的内容所产生的后果负全部责任。
1. 权利声明  
用户使用本网站时，应遵守相关法律法规和知识产权保护法规，不得侵犯任何第三方的权益。
未经授权，用户不得以任何形式复制、传播、修改、销售或进行商业用途。
2. 免责声明  
本网站提供的资源仅供参考和学习使用，不对资源的准确性、完整性或适用性做出任何明示或暗示的陈述或保证。
用户自行承担使用本网站资源的风险。本网站不对用户因使用资源而产生的任何损失或损害承担责任。
本网站提供的链接到其他网站的访问，不代表本网站对该等网站内容的认可或支持，用户访问其他网站应自行承担风险。
3. 使用规则  
用户在使用本网站资源时，应遵守国家和地区的法律法规，不得进行非法、侵权、违法或违反道德的行为。
用户不得使用本网站资源从事任何商业活动、广告宣传、垃圾邮件或其他违法行为，
本网站资源仅供学习测试使用，请在下载本网站资源24小时后删除。
如果资源涉及到侵权，请扫描右侧二维码联系删除，谢谢。
