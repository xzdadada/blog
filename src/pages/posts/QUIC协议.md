---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'QUIC 协议了解'
pubDate: 2024-07-10
description: 'QUIC 协议的基本信息'
img: "/img/QUIC.png"
tags: ["计算机网络"]
---
# QUIC 协议
## 介绍
QUIC 是 HTTP3 中的新技术，由 Google 开发，旨在代替 TCP 协议，并且构建在 UDP 协议之上
可以理解为：
## 主要特性
### 0-RTT连接建立
传统的 TCP 必须要三次握手之后（3RTT）才可以发送数据
QUIC 在 TCP 的第一次握手的同时携带加密之后的数据
### 队头阻塞
HTTP2 通过多路复用的方式解决了 HTTP 队头阻塞的问题，但是 TCP 仍然堵塞问题，TCP 并不会认识到流是不同且独立的，所以，会将流仍然看作一个数据整体，从而流中的数据丢失仍然需要等待重传，造成后续的帧传输的堵塞
HTTP3 抛弃了 HTTP2 的流，复用底层的 QUIC 流，即对于每个 QUIC STREAM 帧，会标记相应的 STREAM ID，QUIC 会将 STREAM 独立开来，即当前 STREAM 的数据丢失，并不会导致其他 STREAM 等待丢失的数据的重传
由于 STREAM 中的帧来自不同的 Packet，所以，最后实际 Packet 的到达顺序可能与发送的顺序并不相同
> 弊端：packet 到达顺序的改变，会导致先发送的数据可能会因为其中的帧所在的流的阻塞，而同比于顺序传输更晚到达，也就是资源更晚进行使用
