---
title: 【C言語講座】3章前編:おまじないを理解しよう！『#include<stdio.h>』『printf();』
date: "2019-04-21T06:56:00Z"
lastModified: "2019-04-27T22:40:00Z"
description: 【C言語講座】今回は#includeとstdio.hについて、図も例えもたくさん使って説明させていただきました。前回からの続きでprintf("\n");の使い方についても説明があります。
thumbnail: blog/c-course3-1/c-picture.jpeg
tags: [c-lang]
category: programming
keywords: [include,stdio.h,printf(),c言語]
---

ひろちょんです～。睡眠6時間に対して、活動時間が18時間以上になりましたぁ～笑
なにもかもがずれていく日々です．．．

## いきなりですが、前回の問題と解答を載せておきます。

前回に配ったCファイルとVisualStudioで開いたときの表示されるプログラムを載せておきます。

[前回に配ったCファイルのリンクはこちら](https://github.com/Hirochon/c-course/archive/master.zip)

↓前回に配ったCファイルの中身
```c
#include<stdio.h>

int main(void)
{
    printf("\n");

    return 0;
}
```

『**このファイルをダウンロード、Visual Studio(以降VSと略します。)のテキストエディターにて編集、コンパイルを使って、Hey Hirochon!と出力してください。**』というのが前回の課題でした。

VS、ディレクトリの場所指定、コンパイルとは何かわからない方は、過去のC言語講座をご覧ください。↓↓

[C言語講座一覧](/tag/c-lang/)

