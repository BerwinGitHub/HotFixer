// GENERATED CODE -- DO NOT EDIT! 
var $import = {
    "framework": {
        "package": {
            "testA": {
                "TestA": {
                    "_pkg": "framework.package.testA",
                    "_cls": "TestA"
                }
            },
            "testB": {
                "TestB": {
                    "_pkg": "framework.package.testB",
                    "_cls": "TestB"
                }
            },
            "testC": {
                "TestC": {
                    "_pkg": "framework.package.testC",
                    "_cls": "TestC"
                }
            }
        }
    }
};
var $package = {
    "framework.package.testA": "framework.package.testA",
    "framework.package.testB": "framework.package.testB",
    "framework.package.testC": "framework.package.testC"
};
var $classes = {
    "TestA": [
        {
            "file": "framework/package/testA.js",
            "name": "TestA",
            "package": "framework.package.testA",
            "implement": null,
            "export": {},
            "import": [],
            "ref": [
                "$import.framework.package.testB.TestB"
            ]
        }
    ],
    "TestB": [
        {
            "file": "framework/package/testB.js",
            "name": "TestB",
            "package": "framework.package.testB",
            "implement": null,
            "export": {},
            "import": [],
            "ref": [
                "$import.framework.package.testC.TestC"
            ]
        }
    ],
    "TestC": [
        {
            "file": "framework/package/testC.js",
            "name": "TestC",
            "package": "framework.package.testC",
            "implement": null,
            "export": {},
            "import": [],
            "ref": [
                "$import.framework.package.testB.TestB"
            ]
        }
    ]
};

var $require = $import;