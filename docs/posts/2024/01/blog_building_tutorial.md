---
post: true
title: Blog Building Tutorial
date: 2024-01-22
cover: https://www.helplook.net/website/not-using-mouse.6d4e46f0.png
coveross: https://www.helplook.net/website/not-using-mouse.6d4e46f0.png
categories:
 - 华子
tags:
 - 搭建教程
description:  华子
---
###
安装node.js #直接官网下载\n
安装npm install --global yarn
###
安装git
使用Homebrew：
首先，需要确认是否已经安装了Homebrew。如果已经安装，可以直接跳过这一步；如果不安装，可以使用以下命令安装Homebrew：`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`。\n
安装Git时，可以使用`brew install git`命令。\n
安装完成后，为了配置一些基本的环境变量，如用户名和邮箱，可以使用`git config --global user.name "Your Name"`和`git config --global user.email "yourname@example.com"`。
最后，通过运行`git --version`命令来验证Git的安装情况。
###
yarn add package.json
###
git config --global user.name "Your Name"\n
git config --global user.email "your-email@example.com"\n
用vscode直接拉库：https://github.com/shiheme/appbeebee.git\n
在比比的目录下\n
git init\n
git add .\n
git commit -m "one"\n
git remote rm origin #删除远程源，可以不执行此命令\n
git remote add origin git@github.com:huazinet/huazi.github.io.git\n
git push -f origin main\n
cat /Users/huazi/.ssh/id_rsa.pub	#查看密钥\n
###
用github账号登录vercel.com
###
【两分钟使用 Vercel 免费部署你的静态网站-哔哩哔哩】 https://b23.tv/eHTiYts\n
看上面这个视频怎么配置vercel就可以了
