// 书签导航数据。因内容不多，固采用 json方式。如果内容很多，可以考虑和文章一样的调用方法
import type { Tools } from './types'

export const toolsdata: Tools[] = [
  {
    title: '大佬们',
    items: [
      {
        icon: 'https://cdnjson.com/images/2024/01/26/image85173fe16921604a.png',
        title: '毛豆豆',
        desc: '毛豆豆的小窝',
        link: 'https://mddoo.com',
        linktxt: 'mddoo.com',
      },
      {
        icon: 'https://cdnjson.com/images/2024/01/26/image8fb6e8e04f8fdc0d.png',
        title: 'Pearson',
        desc: 'Pearson的小P站',
        link: 'https://pearsoon.net',
        linktxt: 'pearsoon.net',
      },
      {
        icon: 'https://cdnjson.com/images/2024/01/26/imagea0bd59d792f99c6d.png',
        title: 'iqxrj',
        desc: '爱趣享线报',
        link: 'https://xb.iqxrj.top',
        linktxt: 'xb.iqxrj.top',
      },
      {
        icon: 'https://img.picgo.net/2024/01/30/2023112515094199ebcde2ebcfffbbf0.th.png',
        title: '吾资源网',
        desc: '吾资源网是一个专注于互联网免费资源分享，乐于分享，好资源不私藏！',
        link: 'https://www.5zyw.com',
        linktxt: 'www.5zyw.com',
      }
      {
        icon: 'https://resfish.com/wp-content/uploads/2024/03/logo.jpg',
        title: '资源鱼项目网',
        desc: '资源鱼项目网同步中创网各大论坛VIP资源，创业教程、自媒体、抖音快手短视频等视频教程以及营销软件、源码、淘宝虚拟资源等，长期更新各大付费创业项目',
        link: 'https://resfish.com/',
        linktxt: 'resfish.com/',
      }
    ],
  },
]
