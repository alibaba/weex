#!/usr/bin/env python3

import polib
from pyutil.config import LANG, PATH
from pyutil._util import walk_md
from os.path import join
from pyutil._baidu import translate
from pyutil.extract import extract_map
import re

RE_WEEX = re.compile('weex', flags=re.IGNORECASE)
RE_ZZWEEX = re.compile('zzweex', flags=re.IGNORECASE)


def matchcase(word):
    def replace(m):
        text = m.group()
        if text.isupper():
            return word.upper()
        elif text.islower():
            return word.lower()
        elif text[0].isupper():
            return word.capitalize()
        else:
            return word
    return replace


class HideBracket:

    def __init__(self):
        self._hideed = []

    def _hide(self, txt):
        l = len(self._hideed)
        self._hideed.append(txt)
        return " z59813%s28476z " % l

    def hide(self, txt):
        # txt = extract_map("![", "]", txt, self._hide)
        txt = extract_map("```", "```", txt, self._hide)
        txt = extract_map("`", "`", txt, self._hide)
        txt = extract_map("(", ")", txt, self._hide)
        txt = extract_map("<", ">", txt, self._hide)
        txt = RE_WEEX.sub(matchcase('zzweex'), txt)
        return txt

    def _restore(self, txt):
        x = txt[6:-6]
        if x.isdigit():
            return self._hideed[int(x)]
        return txt

    def restore(self, txt):
        txt = RE_ZZWEEX.sub(matchcase('weex'), txt)
        txt = txt.replace("[ ", "[")\
            .replace("；", ";").replace(" ]", "]")\
            .replace("（", "(")\
            .replace("【", "[")\
            .replace("！", "!")\
            .replace("）", ")").replace("& lt;", "&lt;")\
            .replace("& gt;", "&gt;").replace(" z59813", "z59813").replace("28476z ", "28476z")
        return extract_map("z59813", "28476z", txt, self._restore)


def translate_po(lang, po):
    hide_bracket = HideBracket()
    li = []
    msgid_li = []
    for i in po:
        if not i.msgstr:
            msgid = i.msgid
            ms = msgid.strip("\n ")
            if ms.startswith("```") or "</" in msgid or ms.startswith("<style>"):
                continue
            msgid = hide_bracket.hide(msgid)
            msgid_li.append((msgid, i))

    for msgid, _ in msgid_li:
        for j in msgid.split("\n"):
            j = j.strip()
            if j and not j.startswith("."):
                li.append(j)
    if not li:
        return
    li = "\n".join(li)

    lang_dict = dict(translate(li, lang))
    for msgid, i in msgid_li:
        if not i.msgstr:
            t = []
            for j in msgid.split("\n"):
                sj = j.strip("\n ")
                txt = lang_dict.get(sj, 0)

                if txt:
                    if txt.strip() != sj:
                        txt = txt + " ???"
                else:
                    txt = j
                txt = " " * (len(j) - len(j.lstrip())) + \
                    hide_bracket.restore(txt).lstrip()

                t.append(txt)
            i.msgstr = "\n".join(t)
    po.save()


def main():
    for dirpath, md_li in walk_md():
        for i in md_li:
            for lang in LANG:
                f = join(PATH, "po", lang, dirpath, i)[:-2] + "po"
                print(lang, f)
                po = polib.pofile(f)
                translate_po(lang.split("-")[0], po)


if __name__ == "__main__":
    main()
