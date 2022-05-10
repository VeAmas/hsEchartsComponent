#!/usr/bin/python

import os

name = "#appName#"

os.popen("rm -rf " + name)
os.popen("rm -rf ./scripts/" + name)
