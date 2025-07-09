---
post: true
title: Tiktok视频批量下载
date: 2025-07-09
cover: https://wmimg.com/i/1759/2025/07/686de9308c7a5.png
coveross: https://wmimg.com/i/1759/2025/07/686de9308c7a5.png
categories:
 - 教程
tags:
 - 教程
 - Toktok
 - 视频采集
description:  教程
---

![Tiktok](https://wmimg.com/i/1759/2025/07/686de9308c7a5.png)

## 安装所需Python模块
pip install yt-dlp

还需要可执行的Python环境，具体可百度安装，非常简单

## 采集配置
脚本同目录下需要放一个tiktok_video_list.txt的文件，里面一行一个需要采集的视频链接
```txt
https://www.tiktok.com/@looord_nl85/video/7397792734821518625
https://www.tiktok.com/@looord_nl85/video/7397792734821518625
```

## 直接上代码
```Python
# -*- coding: utf-8 -*-
# @Time    : 2025/3/18 12:21
# @Author  : huazi
# @File    : Batch_download_on_TikTok.py


import os
import subprocess

def download_video(url: str, save_dir: str = "get_video") -> bool:
    """
    使用yt-dlp下载单个TikTok视频
    
    Args:
        url: TikTok视频链接
        save_dir: 保存目录f
    
    Returns:
        bool: 下载是否成功
    """
    try:
        # 创建保存目录
        os.makedirs(save_dir, exist_ok=True)
        
        print(f"正在下载视频...")
        # 使用yt-dlp下载视频
        cmd = [
            "yt-dlp",
            url,                    # 视频链接
            "-o", os.path.join(save_dir, "%(title)s.%(ext)s"),  # 输出格式
            "--no-playlist",        # 不下载播放列
            "--no-warnings",        # 不显示警告
            "--quiet",              # 安静模式
            "--no-progress",        # 不显示进度条
            "--format", "best",     # 下载最佳质量
            "--merge-output-format", "mp4",  # 合并为mp4格式
            "--no-check-certificates",  # 不检查证书
            "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"  # 设置User-Agent
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            print(f"✅ 下载成功: {url}")
            return True
        else:
            print(f"❌ 下载失败: {url}")
            print(f"错误信息: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ 下载出错: {url}")
        print(f"错误信息: {str(e)}")
        return False

def download_videos(save_dir: str = "get_video"):
    """
    从tiktok_video_list.txt文件读取链接并下载视频
    
    Args:
        save_dir: 保存目录
    """
    # 创建保存目录
    os.makedirs(save_dir, exist_ok=True)
    
    # 读取视频链接列表
    with open("tiktok_video_list.txt", "r", encoding="utf-8") as f:
        urls = [line.strip() for line in f if line.strip()]
    
    for url in urls:
        print(f"\n正在下载: {url}")
        
        # 从URL中提取视频ID
        video_id = url.split("/")[-1]
        
        # 使用yt-dlp下载视频
        subprocess.run([
            "yt-dlp",
            url,
            "-o", os.path.join(save_dir, f"{video_id}.%(ext)s"),
            "--format", "b",
            "--merge-output-format", "mp4",
            "--no-warnings",
            "--quiet"
        ])
        print("下载完成")

if __name__ == "__main__":
    # 下载视频
    download_videos() 
```

## 任何问题可右边扫码/[点击这里的文字联系我（跳转新网页最下方可见）](https://sharehub.club)

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
