#!/usr/bin/env bash

if test -e .git/hooks; then
  ln -sf ../../bin/pre-commit.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit 
  ln -sf ../../bin/commit-msg.sh .git/hooks/commit-msg && chmod +x .git/hooks/commit-msg 
  ln -sf ../../bin/pre-push.sh .git/hooks/pre-push && chmod +x .git/hooks/pre-push 
fi