//订阅配置文件
import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'

const baseUrl = `https://xb.pearson.live`

export async function genFeed(config: SiteConfig) {
  const feed = new Feed({
    title: '华子Net',
    description: '羊毛，技术分享博客',
    id: baseUrl,
    link: baseUrl,
    language: 'zh',
    image: `${baseUrl}/logo.png`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright:
      'Copyright © 2024-'+ new Date().getFullYear() + ' 华子Net'
  })

  const posts = await createContentLoader('posts/*/*/*.md', {
    excerpt: true,
    render: true
  }).load()

  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date as string) -
      +new Date(a.frontmatter.date as string)
  )

  for (const { url, excerpt, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${baseUrl}${url}`,
      link: `${baseUrl}${url}`,
      description: excerpt,
      content: `<img src="${frontmatter.cover}" alt="" /><p><h3><a href="${baseUrl}${url}">文章涉及下载地址访问原站：https://xb.pearson.live</a></h3></p>` + html + `<p><h3 style="color:#3451b2"><a href="${baseUrl}${url}">文章涉及下载地址访问原站：https://xb.pearson.live</a></h3></p>`,
      image: frontmatter.cover,
      date: frontmatter.date
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2())
}
