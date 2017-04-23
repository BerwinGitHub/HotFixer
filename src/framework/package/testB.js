/**
 * Created by Berwin on 2017/4/19.
 */

[$import.framework.package.testC.TestC];

$class("TestB", ($export, $import) => {

    $export.b = "b";

    var logB = function () {
        $import[0].logC();
    };
    $export.logB = logB;
});