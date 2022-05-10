#!/usr/bin/python
# -*- coding: UTF-8 -*-

# 主系统安装时 install 的执行目录应该到 /html
# 子系统安装时 install 的执行目录应该到 /html/主系统目录名

import json
import os
import sys

try:
    reload(sys)
    sys.setdefaultencoding("utf8")
except:
    print("执行模块重载失败，继续安装")

isModuleBundler = "false"
name = "#appName#"

def install(name):
    for x in os.listdir('./tmp/' + name):
        os.popen("rm -rf " + name + '/' + x)
    os.popen("cp -rf ./tmp/" + name + " ./")

install(name)
