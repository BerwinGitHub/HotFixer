/**
 *
 * @param name
 */
var $group = function (name) {

};

/**
 * @param params
 */
var $include = function ($import) {
};

/**
 * 使用变量。执行方法，返回值
 * @param factory
 * @returns {*}
 */
var $use = function (factory) {
    return factory();
};

/**
 * 公开的变量
 * @param name
 * @param data
 * @param $export
 */
var $public = function (name, data, $export) {
    $export[name] = data;
};

/**
 * 声明class
 * @param clsName
 * @param factory
 * @param pkg 备用参数防止项目名字的类出现
 */
var $class = function (clsName, factory, pkg = "") {
    var cls = $pm._findClassMeta(clsName, pkg);
    if (cls) {
        // console.log("$class注册:" + ("" === pkg ? "" : (pkg + ".")) + clsName + "类");
        cls.factory = factory;
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
 * 加载组
 * @param name
 * @param cb
 */
var $loadGroup = function (name, cb) {
    $pm.loadGroup(name, cb);
};

/**
 * 请确定需要加载的类在前面已经加载过
 * @param meta
 */
var $requireSync = function (meta) {
    $pm.requireSync(meta);
};
