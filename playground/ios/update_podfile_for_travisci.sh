#!/bin/bash
if  grep -q 'submodule "weex-playground"' "../../.gitmodules"; then
    sed -i -e '7,10d;12d' Podfile
    rm Podfile-e
fi
