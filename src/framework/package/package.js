/**
 *
 * @param params
 */
var $include = function ($import) {
};

/**
 * 声明class
 * @param clsName
 * @param clsImplement
 * @param pkg 备用参数防止项目名字的类出现
 */
var $class = function (clsName, clsImplement, pkg = "") {
    var cls = $pm._findClassMeta(clsName, pkg);
    if (cls) {
        console.log("$class注册:" + ("" === pkg ? "" : (pkg + ".")) + clsName + "类");
        cls.implement = clsImplement;
    }
};

/**
 * 加载单个class
 * @param meta
 * @param loadFinish
 */
var $require = function (meta, loadFinish) {
    $pm.require(meta, loadFinish);
};

/**
 * 同时加载多个类
 * @param metas
 * @param loadFinish
 */
var $requires = function (metas, loadFinish) {
    $pm.requires(metas, loadFinish);
};

/**
 * 请确定需要加载的类在前面已经加载过
 * @param meta
 */
var $requireSync = function (meta) {
    $pm.requireSync(meta);
};
