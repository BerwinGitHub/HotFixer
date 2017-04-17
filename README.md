# HotFixer Project
主要是封装Cocos2d js项目的一些东西
    
## 安卓打包
    cocos compile -p android -m release --ap android-22
    cocos compile -p android -m debug --ap android-22
    cocos compile -p android --android-studio -m debug --ap android-22// android-studio

## 重启adb
    1、CMD命令窗口输入：adb nodaemon server 。然后就会提示你哪个端口被占用了。
    2、输入netstat -ano | findstr "5037" 。然后会弹出提示告诉你哪些进程占用了该端口，记住非0地址的后面的数字
    3、打开任务管理器，点击“进程“，“查看”-“选择列”，勾选PID
    4、查找第2步中看到的数字PID，然后结束相关进程，即可
