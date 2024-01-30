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
        icon: 'http://www.5zyw.com/wp-content/uploads/2023/11/2023112515094199.png',
        title: '吾资源网',
        desc: '吾资源网是一个专注于互联网免费资源分享，乐于分享，好资源不私藏！',
        link: 'https://www.5zyw.com',
        linktxt: 'www.5zyw.com',
      }
    ],
  },
]
