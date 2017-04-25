/**
 *
 * @param params
 */
var $include = function (...params) {

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
