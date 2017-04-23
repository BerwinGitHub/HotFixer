/**
 * Created by Berwin on 2017/4/21.
 */
[$import.framework.package.testB.TestB];

$class("TestC", ($export, $import) => {

    var logC = function () {
        console.log("log C");
    };
    $export.logC = logC;
});