//模板配置文件
import { defineConfig } from 'vitepress'
import { genFeed } from './theme/genFeed'
import { head } from './theme/head';
import type { ThemeConfig } from './theme/types';
import mdItCustomAttrs from 'markdown-it-custom-attrs'
import { chineseSearchOptimize, pagefindPlugin } from 'vitepress-plugin-pagefind'

export default defineConfig<ThemeConfig>({
    lang: 'zh-cn',
    markdown: {
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
            {
                "id": 1,
                "title": "陷落Falling",
                "author": "不知名选手Au / 马也_Crabbit",
                "url": "https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE0Nzk=",
                "pic": "https://enshimama.oss-cn-shanghai.aliyuncs.com/smartgallery/music/01.jpg",
                "lrc": ""
            },
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
                 link: '/posts/2024/01/Disclaimers.html',
                 image: 'http://pic1.win4000.com/wallpaper/2020-06-15/5ee6dc3a66fa3.jpg',
                 title: ''
             }
         ],
        outlineTitle: '目录',
        socialLinks: [
            {
                icon: {
                    svg: '<svg t="1706169606976" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4212" width="200" height="200"><path d="M679.424 746.862l84.005-395.996c7.424-34.852-12.581-48.567-35.438-40.009L234.277 501.138c-33.72 13.13-33.134 32-5.706 40.558l126.282 39.424 293.156-184.576c13.714-9.143 26.295-3.986 16.018 5.157L426.898 615.973l-9.143 130.304c13.13 0 18.871-5.706 25.71-12.581l61.696-59.429 128 94.282c23.442 13.129 40.01 6.29 46.3-21.724zM1024 512c0 282.843-229.157 512-512 512S0 794.843 0 512 229.157 0 512 0s512 229.157 512 512z" fill="#1296DB" p-id="4213"></path></svg>'
                }, link: 'https://t.me/huazinet'
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
                authorLink: 'https://t.me/huazinet',
                license: '免责声明',
                licenseLink: 'Disclaimers.html'
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
        },
        plugins: [pagefindPlugin({   //使用 pagefind搜索插件 https://www.npmjs.com/package/vitepress-plugin-pagefind
            customSearchQuery: chineseSearchOptimize,
            btnPlaceholder: '搜索文档',
            placeholder: '搜索文档',
            emptyText: '没有内容',
            heading: '共 {{searchResult}} 条结果'
        })]
    },
    buildEnd: genFeed
})
