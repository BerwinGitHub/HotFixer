# HotFixer Project
主要是封装Cocos2d js项目的一些东西，方便自己使用
    
## 安卓打包
    cocos compile -s ./src -p android --android-studio --ap android-16 -m debug -j 4 --compile-script 1 -o ../build/outputs/apk
    -m                  // debug 调试模式 release 发布模式
    -p android          // 打包的平台{win32,android,ios}
    --android-studio    // android-studio打包
    -o <path>           // 打包导出apk路径 ../build/outputs/apk
    -j 4                // 用4线程编译
    --compile-script 1  // 1:如果是js就编译成jsc
    
官方文档说明

    usage: cocos compile [-h] [-s SRC_DIR] [-q] [-p PLATFORM] [-m MODE] [-j JOBS]
                         [--ap ANDROID_PLATFORM] [--ndk-mode NDK_MODE]
                         [--source-map] [--sign-identity SIGN_ID] [--no-res]
                         [--compile-script {0,1}] [--lua-encrypt]
                         [--lua-encrypt-key LUA_ENCRYPT_KEY]
                         [--lua-encrypt-sign LUA_ENCRYPT_SIGN]
[参考链接](http://www.cocos2d-x.org/wiki/Cocos_compile)

## 重启adb
    1、CMD命令窗口输入：adb nodaemon server 。然后就会提示你哪个端口被占用了。
    2、输入netstat -ano | findstr "5037" 。然后会弹出提示告诉你哪些进程占用了该端口，记住非0地址的后面的数字
    3、打开任务管理器，点击“进程“，“查看”-“选择列”，勾选PID
    4、查找第2步中看到的数字PID，然后结束相关进程，即可
