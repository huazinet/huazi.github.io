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
description:  搭建教程
---

###
安装node.js #直接官网下载

安装npm install --global yarn

###
安装git

使用Homebrew：
首先，需要确认是否已经安装了Homebrew。如果已经安装，可以直接跳过这一步；如果不安装，可以使用以下命令安装Homebrew：`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`。

安装Git时，可以使用`brew install git`命令。

安装完成后，为了配置一些基本的环境变量，如用户名和邮箱，可以使用`git config --global user.name "Your Name"`和`git config --global user.email "yourname@example.com"`。
最后，通过运行`git --version`命令来验证Git的安装情况。

###
git配置本地ssh密钥

命令行执行ssh-keygen -t rsa -C 这里写你github的邮箱

执行完命令会回显密钥的路径，直接cat查看，

然后进入https://github.com/settings/keys配置github


###
yarn add package.json

###
git config --global user.name "Your Name"

git config --global user.email "your-email@example.com"

用vscode直接拉库：https://github.com/shiheme/appbeebee.git

在比比的目录下

git init

git add .

git commit -m "one"

git remote rm origin #删除远程源，可以不执行此命令

git remote add origin git@github.com:这里写仓库名字.git

git push -f origin main


###
用github账号登录vercel.com

###
【两分钟使用 Vercel 免费部署你的静态网站-哔哩哔哩】 https://b23.tv/eHTiYts

看上面这个视频怎么配置vercel就可以了
