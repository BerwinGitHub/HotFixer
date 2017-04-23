/**
 * Created by Berwin on 2017/4/21.
 */
[$import.framework.package.testB.TestB];

$class("TestC", ($export, $import) => {

    $export.c = "c";
    console.log($import[0].b);

    var logC = function () {
        console.log("log C");
    };
    $export.logC = logC;
});