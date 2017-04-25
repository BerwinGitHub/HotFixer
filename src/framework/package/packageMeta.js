// GENERATED CODE -- DO NOT EDIT! 
var $import = {
    "framework": {
        "AppDelegate": {
            "_pkg": "framework.AppDelegate",
            "_cls": "AppDelegate"
        },
        "frame": {
            "Frame": {
                "_pkg": "framework.frame.Frame",
                "_cls": "Frame"
            },
            "consoleframe": {
                "_pkg": "framework.frame.consoleframe",
                "_cls": "ConsoleFrame"
            }
        },
        "game": {
            "Console": {
                "_pkg": "framework.game.Console",
                "_cls": "Console"
            },
            "FDirector": {
                "_pkg": "framework.game.FDirector",
                "_cls": "FDirector"
            },
            "GameScene": {
                "_pkg": "framework.game.GameScene",
                "_cls": "RootFrame"
            }
        },
        "global": {
            "app": {
                "_pkg": "framework.global.app",
                "_cls": "app"
            }
        },
        "helper": {
            "helper": {
                "_pkg": "framework.helper.helper",
                "_cls": "helper"
            }
        },
        "hotfix": {
            "HotFixScene": {
                "_pkg": "framework.hotfix.HotFixScene",
                "_cls": "HotFixScene"
            }
        },
        "network": {
            "SocketHelper": {
                "_pkg": "framework.network.SocketHelper",
                "_cls": "SocketHelper"
            }
        }
    },
    "game": {
        "frames": {
            "HallFrame": {
                "_pkg": "game.frames.HallFrame",
                "_cls": "HallFrame"
            },
            "HomeFrame": {
                "_pkg": "game.frames.HomeFrame",
                "_cls": "HomeFrame"
            }
        }
    }
};
var $package = {
    "framework.AppDelegate": "framework.AppDelegate",
    "framework.frame.Frame": "framework.frame.Frame",
    "framework.frame.consoleframe": "framework.frame.consoleframe",
    "framework.game.Console": "framework.game.Console",
    "framework.game.FDirector": "framework.game.FDirector",
    "framework.game.GameScene": "framework.game.GameScene",
    "framework.global.app": "framework.global.app",
    "framework.helper.helper": "framework.helper.helper",
    "framework.hotfix.HotFixScene": "framework.hotfix.HotFixScene",
    "framework.network.SocketHelper": "framework.network.SocketHelper",
    "game.frames.HallFrame": "game.frames.HallFrame",
    "game.frames.HomeFrame": "game.frames.HomeFrame"
};
var $classes = {
    "AppDelegate": [
        {
            "file": "framework/AppDelegate.js",
            "name": "AppDelegate",
            "package": "framework.AppDelegate",
            "implement": null,
            "export": {},
            "import": [],
            "ref": [
                "$import.game.frames.HomeFrame",
                "$import.framework.game.FDirector"
            ]
        }
    ],
    "Frame": [
        {
            "file": "framework/frame/Frame.js",
            "name": "Frame",
            "package": "framework.frame.Frame",
            "implement": null,
            "export": {},
            "import": [],
            "ref": []
        }
    ],
    "ConsoleFrame": [
        {
            "file": "framework/frame/consoleframe.js",
            "name": "ConsoleFrame",
            "package": "framework.frame.consoleframe",
            "implement": null,
            "export": {},
            "import": [],
            "ref": [
                "$import.framework.frame.Frame",
                "$import.framework.helper.helper"
            ]
        }
    ],
    "Console": [
        {
            "file": "framework/game/Console.js",
            "name": "Console",
            "package": "framework.game.Console",
            "implement": null,
            "export": {},
            "import": [],
            "ref": []
        }
    ],
    "FDirector": [
        {
            "file": "framework/game/FDirector.js",
            "name": "FDirector",
            "package": "framework.game.FDirector",
            "implement": null,
            "export": {},
            "import": [],
            "ref": [
                "$import.framework.frame.Frame",
                "$import.framework.game.GameScene"
            ]
        }
    ],
    "RootFrame": [
        {
            "file": "framework/game/GameScene.js",
            "name": "RootFrame",
            "package": "framework.game.GameScene",
            "implement": null,
            "export": {},
            "import": [],
            "ref": [
                "$import.framework.frame.Frame",
                "$import.framework.frame.consoleframe"
            ]
        }
    ],
    "app": [
        {
            "file": "framework/global/app.js",
            "name": "app",
            "package": "framework.global.app",
            "implement": null,
            "export": {},
            "import": [],
            "ref": [
                "$import.framework.game.Console",
                "$import.framework.helper.helper"
            ]
        }
    ],
    "helper": [
        {
            "file": "framework/helper/helper.js",
            "name": "helper",
            "package": "framework.helper.helper",
            "implement": null,
            "export": {},
            "import": [],
            "ref": []
        }
    ],
    "HotFixScene": [
        {
            "file": "framework/hotfix/HotFixScene.js",
            "name": "HotFixScene",
            "package": "framework.hotfix.HotFixScene",
            "implement": null,
            "export": {},
            "import": [],
            "ref": []
        }
    ],
    "SocketHelper": [
        {
            "file": "framework/network/SocketHelper.js",
            "name": "SocketHelper",
            "package": "framework.network.SocketHelper",
            "implement": null,
            "export": {},
            "import": [],
            "ref": []
        }
    ],
    "HallFrame": [
        {
            "file": "game/frames/HallFrame.js",
            "name": "HallFrame",
            "package": "game.frames.HallFrame",
            "implement": null,
            "export": {},
            "import": [],
            "ref": [
                "$import.framework.frame.Frame",
                "$import.framework.game.FDirector",
                "$import.game.frames.HomeFrame"
            ]
        }
    ],
    "HomeFrame": [
        {
            "file": "game/frames/HomeFrame.js",
            "name": "HomeFrame",
            "package": "game.frames.HomeFrame",
            "implement": null,
            "export": {},
            "import": [],
            "ref": [
                "$import.framework.frame.Frame",
                "$import.game.frames.HallFrame",
                "$import.framework.game.FDirector"
            ]
        }
    ]
};

var $require = $import;