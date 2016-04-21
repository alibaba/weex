#!/bin/sh

# ISSUE merge
commit_regex='^Merge.+|[+*-] \[android|ios|jsfm|html5|doc|website|example|test|all\] [^\n]{1,50}'

if ! grep -iqE "$commit_regex" "$1"; then
    echo "\nERROR: commit log format is not correct!
        
See https://github.com/alibaba/weex/blob/dev/CONTRIBUTING.md#commit-log"

    exit 1
fi
# FIXME no effect after editor (like vim) exits 
