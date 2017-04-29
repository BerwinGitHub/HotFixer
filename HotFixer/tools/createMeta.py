# -*- coding: utf-8 -*-
import os
import re
import json
def readmetal(str):
    # "['mod test.class']"
    mat = re.match("\s*\[['\"](.*)['\"]][;]*\s*", str)
    if mat:
        return mat.group(1)
    else:
        return ""

#读取文件
def readfile(path):
    c = 0
    list=[]
    for line in open(path):
        c += 1
        #读取文件的行数
        if c < 16 and line:
            metal = readmetal(line)
            if metal:
                list.append(metal)
    return list

def dic2jsobj(dic):
    arr = []
    for k in dic:
        arr.append("'" + k + "':'" + dic[k] + "'")
    return "{\n" + ",\n".join(arr) + "\n}"

fileMap={}
for fpath, dirs, fs in os.walk('src'):

    for fname in fs:
        if fname.find(".js"):
            path = fpath + "/" + fname
            path = path.replace("\\","/")
            metalist=readfile(path)
            if len(metalist)>0:
                fileMap[path]=metalist

exportpath = "src/framework/a_mod/_metadata.js"
exportfile = open(exportpath, "w")
print fileMap
exportfile.write('////这里是所有 元数据,由createMeta.py生成\n')
exportfile.write('var _$metadata='+json.dumps(fileMap) )
exportfile.close()
print "_$metadata refush!2"