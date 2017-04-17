# tools工具脚本
configs.js,是tools下面脚本运行的配置脚本。注意修改 

## tools 依赖的nodejs模块
    npm install express --save
    npm install async --save
    
## deploy命令
会编译js成jsc，并拷贝jsc和res文件到项目下的updateServer文件夹下面，用于热更新

    node ./tools/deploy.js

## excel 转 js
将制定目录下的excel文件解析成js拷贝到configs指定的路径

    node ./tools/excel-to-json.js

## 启动本地热更新服务器
在本地启动一个热更新服务器，并以deploy后的updateServer作为文件服务器目录

    node /tools/server.js
    
## node服务器监听
    var PORT = 8867;
    var http = require('http');
    var server = http.createServer(function (request, response) {
        console.log("connected.");
        response.write("This request URL " + pathname + " was not found on this server.");
        response.end();
    });
    server.listen(PORT);
    console.log("Server runing at port: " + PORT + ".");