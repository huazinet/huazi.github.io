//模板配置文件
import { defineConfig } from 'vitepress'
import { genFeed } from './theme/genFeed'
import { head } from './theme/head';
import type { ThemeConfig } from './theme/types';
import mdItCustomAttrs  from 'markdown-it-custom-attrs'
export default defineConfig<ThemeConfig>({
    markdown:{
        config: (md) => {
            // use more markdown-it plugins!
            md.use(mdItCustomAttrs, 'image', {
                'data-fancybox': "gallery"
            })
            }
    },
    title: '华子Net',
    base: '/',
    head,
    description: '羊毛，技术分享',
    ignoreDeadLinks: true,
    themeConfig: {
        beecodeurl: 'https://xb.pearsons.live/', //这里是内页ArticleLink组件用到的跳转第三方网址，一般用不到，仅仅用于二次开发
        sidebar: [{}], //这里如果删掉，左侧栏的内容全部不显示。页面布局会变成通栏
        nav: [
            //{ text: '公众号', link: 'https://mp.weixin.qq.com/s/iCf-QOnKk2WPjVqL6jJ8WA' },
            //{ text: '比比原创小程序', link: 'https://beebee.work/' }
        ],
        music: [ //音乐列表，音乐播放器参数在.vitepress/store/player.ts。封面和歌词不支持可自行按照文章教程修改
            // {
            //     "id": 1,
            //     "title": "陷落Falling",
            //     "author": "不知名选手Au / 马也_Crabbit",
            //     "url": "https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE0Nzk=",
            //     "pic": "https://enshimama.oss-cn-shanghai.aliyuncs.com/smartgallery/music/01.jpg",
            //     "lrc": ""
            // },
            // {
            //     "id": 2,
            //     "title": "一个人想着一个人 ",
            //     "author": "如懿",
            //     "url": "https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE0ODA=",
            //     "pic": "https://enshimama.oss-cn-shanghai.aliyuncs.com/smartgallery/music/02.jpg",
            //     "lrc": ""
            // },
            // {
            //     "id": 3,
            //     "title": "夜车（Cover 曾轶可）",
            //     "author": "姜铭杨",
            //     "url": "https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE0ODE=",
            //     "pic": "https://enshimama.oss-cn-shanghai.aliyuncs.com/smartgallery/music/03.jpg",
            //     "lrc": ""
            // },
            {
                "id": 4,
                "title": "迎春花 / 財神到 / 祝福你 (廣東)",
                "author": "邓丽君 / 林子祥 / 甄妮",
                "url": "https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE4NTI=",
                "pic": "",
                "lrc": ""
            }
        ],
        banner: [ //主页轮播，不需要就注释掉
             {
                 link: '/posts/2024/01/freebie-chinese-font.html',
                 image: 'https://xxx.ilovefishc.com/forum/201706/13/200552d3lelezt68j5jtz6.png',
                 title: ''
             }
         ],
        search: {
            provider: 'local',
            options: {
                locales: {
                    root: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换',
                                    closeText: '关闭'
                                }
                            }
                        }
                    }
                }
            }
        },
        outlineTitle: '目录',
        socialLinks: [
            {
                icon: {
                    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.6734 7.22198C10.7974 7.22198 9.44138 6.22598 8.01338 6.26198C6.12938 6.28598 4.40138 7.35397 3.42938 9.04597C1.47338 12.442 2.92538 17.458 4.83338 20.218C5.76938 21.562 6.87338 23.074 8.33738 23.026C9.74138 22.966 10.2694 22.114 11.9734 22.114C13.6654 22.114 14.1454 23.026 15.6334 22.99C17.1454 22.966 18.1054 21.622 19.0294 20.266C20.0974 18.706 20.5414 17.194 20.5654 17.11C20.5294 17.098 17.6254 15.982 17.5894 12.622C17.5654 9.81397 19.8814 8.46998 19.9894 8.40998C18.6694 6.47798 16.6414 6.26198 15.9334 6.21398C14.0854 6.06998 12.5374 7.22198 11.6734 7.22198ZM14.7934 4.38998C15.5734 3.45398 16.0894 2.14598 15.9454 0.849976C14.8294 0.897976 13.4854 1.59398 12.6814 2.52998C11.9614 3.35798 11.3374 4.68998 11.5054 5.96198C12.7414 6.05798 14.0134 5.32598 14.7934 4.38998Z"></path></svg>'
                }, link: 'https://pan.baidu.com/s/1YfXTXXZ5atHj1lL5T8Y9yg?pwd=sn4s'
            },
            {
                icon: {
                    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.00098 5.47902L10.3778 4.4625V11.5902H3.00098V5.47902ZM3.00098 18.521L10.3778 19.5375V12.4982H3.00098V18.521ZM11.1894 19.646L21.001 21V12.4982H11.1894V19.646ZM11.1894 4.35402V11.5902H21.001V3L11.1894 4.35402Z"></path></svg>'
                }, link: 'https://pan.baidu.com/s/1vcA0Pgx25WPHfrAmSWlaiQ?pwd=ice5'
            },
            {
                icon: {
                    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path></svg>'
                }, link: 'https://github.com/shiheme/appbeebee/'
            }
        ],
        docFooter: {
            prev: '上一篇',
            next: '下一篇'
        },
        darkModeSwitchLabel: '暗黑切换',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        article: {
            cc:{
                author: '华子', //此信息将显示在文章底部和博主卡片中
                authorLink: 'https://xb.pearsons.live',
                license: '互联网资源分享免责声明

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
如果资源涉及到侵权，请扫描右侧二维码联系删除，谢谢。',
                licenseLink: 'https://xb.pearsons.live/posts/2024/01/freebie-chinese-font.html'
            }
        },
        website: {
            perpage: 12, //列表页每页显示数量
            showWelcome: false, //是否显示首页底部右下角弹框，（调试时弹框不显示的话先关闭浏览器再运行，因为有可能开启了缓存）内容请在组件.vitepress/theme/components/Welcome.vue编写
            welcomeusestate: false, //底部弹框是否使用sessionStorage缓存(即不关闭页面仅显示一次)
            welcome: {
                autoClose: 6000, //多长时间自动关闭，false为不关闭
            },
            showSnow: true, //是否开启雪花。开启后仅在暗黑模式下显示
            showUserCard: true, //是否显示列表中的博主名片
            cardPosition: 3, //显示在第几个位置
            cardMusic: true, //是否显示播放音乐，音乐列表在上面 music中配置
            cardCoffee: false, //是否显示打赏咖啡，
            coffeeQrcode: 'https://fc.sinaimg.cn/large/6364aa43gy1hm0f859sm6j208c08cabm.jpg', //打赏咖啡二维码图片地址。如果是跳转网页地址需自行修改代码
            showLantern: true, //是否显示灯笼挂件
            lanternText: ['新','年'], //灯笼上的字,数组形式
            showFirework: false, //是否显示侧栏烟花特效
            fireworkTitle: '🧨烟花许愿🧨｜②⓪②④新年', //烟花许愿标题
            fireworkWords: ['恭贺新禧', '万事如意', '新年快乐', '恭喜发财', '岁岁平安', '吉祥如意', '心想事成', '万事顺遂', '一帆风顺', '二龙腾飞', '三羊开泰', '四季平安', '五福临门', '六六大顺', '七星高照', '八方来财', '九九同心', '十全十美', '荣华富贵', '金玉满堂', '龙凤呈祥', '喜气洋洋', '鸿运当头', '财源广进', '笑口常开', '幸福安康', '日进斗金', '生意兴隆', '步步高升', '年年有余', '迎春接福', '喜气盈门', '花团锦簇', '前程似锦', '福满人间', '春回大地', '辞旧迎新', '万象更新', '吉祥如意', '万事大吉', '马到成功', '功成名就', '鱼跃龙门', '一飞冲天', '瑞气盈门', '福寿康宁', '时来运转', '鸿运高照', '三阳开泰', '否极泰来', '鸿运亨通', '一帆风顺', '出入平安', '顺风顺水', '龙凤呈祥', '花好月圆', '张灯结彩', '欢天喜地', '合家欢乐', '幸福美满', '和气致祥', '招财进宝', '开门大吉', '迎春接福', '福泽满门', '花开富贵', '竹报平安', '大吉大利', '恭喜发财'], //烟花许愿关键词
            showFooter: false, //是否显示全局底部信息
            icpRecordCode: '鄂ICP备2022014994号-1',  //网站备案号
            publicSecurityRecordCode: '鄂公网安备42282202000143号', //公安备案号
            link: 'https://appbeebee.com/'
        },
        logo: {
            light: '/logo.png',
            dark: '/logo.png'
        }
    },
    srcExclude: ['README.md'],
    vite: {
        server: {
            port: 5000,
            host: '0.0.0.0'
        }
    },
    buildEnd: genFeed
})
