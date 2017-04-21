// GENERATED CODE -- DO NOT EDIT! 
var $import = {
    "testA": {
        "file": "testA.js",
        "package": "testA",
        "classes": {
            "TestA": {
                "implement": null,
                "export": null,
                "import": null
            },
            "TestA_1": {
                "implement": null,
                "export": null,
                "import": null
            }
        },
        "imports": [
            "$import.testB.TestB"
        ],
        "TestA": "testA.classes.TestA",
        "TestA_1": "testA.classes.TestA_1"
    },
    "testB": {
        "file": "testB.js",
        "package": "testB",
        "classes": {
            "TestB": {
                "implement": null,
                "export": null,
                "import": null
            }
        },
        "imports": [
            "$import.testA.TestA"
        ],
        "TestB": "testB.classes.TestB"
    }
}