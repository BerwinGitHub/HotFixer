/**
 * Created by Berwin on 2017/4/19.
 */

// file->src/framework/package/testA.js
var testA = {"file": "src/framework/package/testA.js", "package": "framework.package", "import": ["framework.package.testB.TestB"]};
var $class = {};
$class["TestA"] = {"callback": null, "exports": null, "imports": null};
$class["TestA_1"] = {"callback": null, "exports": null, "imports": null};
testA["$class"] = $class;
testA["TestA"] = "framework.package.TestA";
testA["TestA_1"] = "framework.package.TestA";

// file->src/framework/package/testB.js
var testB = {"file": "src/framework/package/testB.js", "package": "framework.package", "import": ["framework.package.testA"]};
var $class = {};
$class["TestB"] = {"callback": null, "exports": null, "imports": null};
testB["$class"] = $class;
testB["TestB"] = "framework.package.TestB";

var package = {"testA": testA, "testB": testB};

var framework = {"package": package};

var $import = {"framework": framework};