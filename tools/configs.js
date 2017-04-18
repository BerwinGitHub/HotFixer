/**
 * Created by Berwin on 2017/3/24.
 */

/**
 * 公共的一些配置
 * @type {{PROJECT_NAME: string, SERVER_IP: string, SERVER_PORT: string, LOCAL_SERVER_PATH: string}}
 */
var common = {
    PROJECT_NAME: "HotFixer", // 项目的名字，多用于下面拼接服务器文件地址路径
    SERVER_PORT: "9918",    // 服务器端口，生成project.manifest文件的时候需要
    SERVER_IP: "http://192.168.1.80", // Mac 服务器的地址，用于配置project.manifest文件里面的地址，
    // SERVER_IP: "http://192.168.1.247", // Windows 服务器的地址，用于配置project.manifest文件里面的地址，
    FORMAT_JSON: true, // 生成的js文件是否按照格式生成
    SERVER_PATH: "./updateServer",// 本地项目热更新文件服务器
    // COCOS_JS_PATH: "./frameworks/cocos2d-x/cocos/scripting/js-bindings/script",// 编译jsc时，cocos源码也需要编译
    JSON_FILE_NOTE: "\/\/ GENERATED CODE -- DO NOT EDIT! \r\n",// 生成的js文件前面加的注释行，一般不用修改
};

/**
 * 部署的配置
 * 一般是编译js/复制res文件到指定的地方。并生产清单文件
 * @type {{DEPLOY_PATH: string, JS_CMD: string, RES_PATH: string, SRC_PATH: string, MANIFEST_DEFAULT_DATA: {packageUrl: string, remoteManifestUrl: string, remoteVersionUrl: string, version: string, engineVersion: string, assets: {}, searchPaths: [*]}}}
 */
var deploy = {
    DEPLOY_PATH: common.SERVER_PATH + "/" + common.PROJECT_NAME,
    JS_CMD: "cocos jscompile -s ./src -d " + common.SERVER_PATH + "/" + common.PROJECT_NAME + "/src", // 将js编译成jsc的命令行命令
    // CMD_COCOS_JS: "cocos jscompile -s " + common.COCOS_JS_PATH + " -d " + common.COCOS_JS_PATH,
    RES_PATH: "../res", // res的相对路径
    SRC_PATH: "../src", // src的相对路径
    MANIFEST_PATH: "../res/project.manifest",
    JSLIST_PATH: common.SERVER_PATH + "/" + common.PROJECT_NAME + "/src/jsList.js",

    // 排除的文件
    EXCLUDE_FILES: {
        ".manifest": true,
        ".DS_Store": true,
    },

    // project.manifest默认数据
    MANIFEST_DEFAULT_DATA: {
        "packageUrl": common.SERVER_IP + ":" + common.SERVER_PORT + "/" + common.PROJECT_NAME,
        "remoteManifestUrl": common.SERVER_IP + ":" + common.SERVER_PORT + "/" + common.PROJECT_NAME + "/res/project.manifest",
        "version": "1.0.0",
        "engineVersion": "3.3",
        "assets": {},
        "searchPaths": [
            "src/"
        ]
    },
};

/**
 * 生成apk配置
 * @type {{}}
 * compile -s ./src -p android --android-studio --ap android-16 -m debug -j 4 --compile-script 1 -o ../build/outputs/apk --app-abi armeabi:x86:mips
 */
var apk = {
    SRC: "./src", // 编译目标路径
    DEST: "./build/outputs/apk", // apk输出的目录
    MODE: "debug", // debug & release
    IDE: "--android-studio", // --android-studio & --android
    ANDROID_VERSION: "android-" + 16,// android的编译版本
    ANDROID_SYS_FRAMWORKS: "x86",// armeabi:x86:mips
    CPU_CORE: 2,// 4线程编译
};

// 1.组合成命令 TODO cocos compile -s ./src -p ios -m debug -j 4 --compile-script 1 -o ./build/outputs/ios -t HotFixer-mobile --sign-identity
var ios = {
    SRC: "./src", // 编译目标路径
    DEST: "./build/outputs/ipa", // apk输出的目录
    MODE: "debug", // debug & release
    TARGET: common.PROJECT_NAME + "-mobile",
    SIGN: "",
    CPU_CORE: 2,// 4线程编译
};

/**
 * 自动生成jsList.js & resources.js 文件
 * @type {{FORMAT_JSON: boolean, RES_PATH: string, SRC_PATH: string, JSLIST_PATH: string, RESOURCE_PATH: string, FILTER_EXCLUDE_SRC: [*], FILTER_EXCLUDE_RES: [*]}}
 */
var generate = {
    FORMAT_JSON: common.FORMAT_JSON,// 导出来的js文件是否格式化

    RES_PATH: "../res", // res的相对路径（扫描的路径）
    SRC_PATH: "../src", // src的相对路径（扫描的路径）

    JSLIST_PATH: "../src/jsList.js",
    RESOURCE_PATH: "../src/resource.js",

    /**
     * jsList.js 排除的文件
     */
    FILTER_EXCLUDE_SRC: [
        /^.*(helper\.js|HotFixScene\.js|\.DS_Store|\.json|jsList\.js)$/, // 排除helper.js|HotFixScene.js 在项目开始已经加载了
    ],

    /**
     * 拷贝resource.js 排除的文件
     */
    FILTER_EXCLUDE_RES: [
        /^.*(\.ico|\.DS_Store|\.manifest)$/,// 排除以.icon/.DS_Store/.manifest/.proto结尾的文件
    ],
};

/**
 * excel to json configs
 * excel转成json格式的配置
 */
var e2j = {
    PATH_SRC: "../xlsx",// 资源原路径（*/xlsx文件的路径）
    PATH_DES: "../src/game/data",// 资源生成相对路径，生成的js文件放置的位置
    FORMAT_JSON: common.FORMAT_JSON,// 导出来的js文件是否格式化
    /**
     * 用来确定 字段名&类型名&备注分别在哪行。
     */
    ROW_INFO: {
        ROW_FIELD_NAME: 0, // 字段名行
        ROW_NOTE: 1, // 备注行 -1表示没有备注行
        ROW_TYPE: 2, // 类型名行
    },
};

/**
 * 本地热更新服务器配置
 * 在本地启动一个热更新服务，并可以在本地访问更新。
 * @type {{PORT: string, ROOT_PATH: string}}
 */
var server = {
    PORT: common.SERVER_PORT,// 文件服务器端口
    ROOT_PATH: common.LOCAL_SERVER_PATH,// ./本地放文件的根目录/项目名字
};

module.exports.e2j = e2j;
module.exports.apk = apk;
module.exports.ios = ios;
module.exports.server = server;
module.exports.deploy = deploy;
module.exports.common = common;
module.exports.generate = generate;