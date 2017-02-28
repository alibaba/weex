from os import walk
from .config import PATH_DOC

_LEN_PREFIX = len(PATH_DOC) + 1


def walk_md():
    for (dirpath, dirnames, filenames) in walk(PATH_DOC):
        dirpath = dirpath[_LEN_PREFIX:]
        if dirpath.startswith("_book"):
            print(dirpath)
            continue

        md_li = []

        for i in filenames:
            if i.endswith(".md"):
                md_li.append(i)
        if md_li:
            yield dirpath, md_li
