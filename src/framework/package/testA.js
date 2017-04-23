/**
 * Created by Berwin on 2017/4/19.
 */
[$import.framework.package.testB.TestB];

$class("TestA", ($export, $import) => {

    var logA = function () {
        $import[0].logB();
    };
    $export.logA = logA;
});