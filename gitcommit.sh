#!/bin/bash

git status -s

git diff origin/xieming

if [ $? == 0 ]; then

	echo "正常退出！"

	git add .
    git commit -m "学习"
    git push origin xieming

fi

