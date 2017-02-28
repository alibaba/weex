# Weex 文档翻译


文档通过po4a工具生成 po 文件，然后进行翻译。ubuntu 可以使用 `apt-get install po4a -y` 安装po4a。

基于 po 文件格式进行文档国际化，可以很方便的实现文档的多语言同步翻译，尤其是当文档不断被修改更新时，可以做到各个语言版本的同步更新。

i18n/doc 下的所有 python 脚本都基于 python3 。使用前请先 `pip3 install -r i18n/doc/pyutil/requirement.txt` 安装依赖。

运行 i18n/doc/po4a.py 会更新 po 文件，并生成在 doc 目录下生成新翻译的文档。 

由于 po 文件本身就是一个文本文件，任何文本编辑器都可以使用。

也可以用 [poedit](https://poedit.net/) 更方便的编辑po文件，参见 [Poedit 基础教程](http://teliute.laxjyj.com/TeacHtm/TePoedit/lesson4/lesson4.html)。 

运行 i18n/doc/baidu_transalte.py 可以通过百度翻译的API自动翻译未翻译的英文，自动翻译的英文都以 ??? 作为行的结尾，以便于修改（可以在某个 po 文件翻译完成时候，统一替换删除 ??? ）。


