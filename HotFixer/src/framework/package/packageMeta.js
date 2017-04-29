// GENERATED CODE -- DO NOT EDIT! 
var $classes = {
    "AppDelegate": [
        {
            "file": "framework/AppDelegate.js",
            "name": "AppDelegate",
            "package": "framework.AppDelegate",
            "loaded": false,
            "factory": null,
            "export": {
                "AppDelegate": {}
            },
            "import": [],
            "ref": [
                "$import.game.frames.HomeFrame",
                "$import.framework.game.FDirector"
            ]
        }
    ],
    "appManager": [
        {
            "file": "framework/core/appManager.js",
            "name": "appManager",
            "package": "framework.core.appManager",
            "loaded": false,
            "factory": null,
            "export": {
                "appManager": {}
            },
            "import": [],
            "ref": [
                "$import.framework.game.Console",
                "$import.framework.helper.helper"
            ]
        }
    ],
    "dataManager": [
        {
            "file": "framework/core/dataManager.js",
            "name": "dataManager",
            "package": "framework.core.dataManager",
            "loaded": false,
            "factory": null,
            "export": {},
            "import": [],
            "ref": []
        }
    ],
    "Frame": [
        {
            "file": "framework/frame/Frame.js",
            "name": "Frame",
            "package": "framework.frame.Frame",
            "loaded": false,
            "factory": null,
            "export": {
                "Frame": {}
            },
            "import": [],
            "ref": []
        }
    ],
    "ConsoleFrame": [
        {
            "file": "framework/frame/consoleframe.js",
            "name": "ConsoleFrame",
            "package": "framework.frame.consoleframe",
            "loaded": false,
            "factory": null,
            "export": {
                "ConsoleFrame": {}
            },
            "import": [],
            "ref": [
                "$import.framework.frame.Frame"
            ]
        }
    ],
    "Console": [
        {
            "file": "framework/game/Console.js",
            "name": "Console",
            "package": "framework.game.Console",
            "loaded": false,
            "factory": null,
            "export": {
                "Console": {}
            },
            "import": [],
            "ref": []
        }
    ],
    "FDirector": [
        {
            "file": "framework/game/FDirector.js",
            "name": "FDirector",
            "package": "framework.game.FDirector",
            "loaded": false,
            "factory": null,
            "export": {
                "FDirector": {}
            },
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
            "loaded": false,
            "factory": null,
            "export": {
                "GameScene": {},
                "RootFrame": {}
            },
            "import": [],
            "ref": [
                "$import.framework.frame.Frame",
                "$import.framework.frame.consoleframe"
            ]
        }
    ],
    "helper": [
        {
            "file": "framework/helper/helper.js",
            "name": "helper",
            "package": "framework.helper.helper",
            "loaded": false,
            "factory": null,
            "export": {
                "helper": {}
            },
            "import": [],
            "ref": []
        }
    ],
    "HotFixScene": [
        {
            "file": "framework/hotfix/HotFixScene.js",
            "name": "HotFixScene",
            "package": "framework.hotfix.HotFixScene",
            "loaded": false,
            "factory": null,
            "export": {
                "HotFixScene": {}
            },
            "import": [],
            "ref": []
        }
    ],
    "SocketHelper": [
        {
            "file": "framework/network/SocketHelper.js",
            "name": "SocketHelper",
            "package": "framework.network.SocketHelper",
            "loaded": false,
            "factory": null,
            "export": {
                "SocketHelper": {}
            },
            "import": [],
            "ref": []
        }
    ],
    "HallFrame": [
        {
            "file": "game/frames/HallFrame.js",
            "name": "HallFrame",
            "package": "game.frames.HallFrame",
            "loaded": false,
            "factory": null,
            "export": {
                "HallFrame": {}
            },
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
            "loaded": false,
            "factory": null,
            "export": {
                "HomeFrame": {}
            },
            "import": [],
            "ref": [
                "$import.framework.frame.Frame",
                "$import.game.frames.HallFrame",
                "$import.framework.game.FDirector"
            ]
        }
    ]
};
var $import = {
    "framework": {
        "AppDelegate": {
            "_pkg": "framework.AppDelegate",
            "_cls": "AppDelegate"
        },
        "core": {
            "appManager": {
                "_pkg": "framework.core.appManager",
                "_cls": "appManager"
            },
            "dataManager": {
                "_pkg": "framework.core.dataManager",
                "_cls": "dataManager"
            }
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
    "framework.core.appManager": "framework.core.appManager",
    "framework.core.dataManager": "framework.core.dataManager",
    "framework.frame.Frame": "framework.frame.Frame",
    "framework.frame.consoleframe": "framework.frame.consoleframe",
    "framework.game.Console": "framework.game.Console",
    "framework.game.FDirector": "framework.game.FDirector",
    "framework.game.GameScene": "framework.game.GameScene",
    "framework.helper.helper": "framework.helper.helper",
    "framework.hotfix.HotFixScene": "framework.hotfix.HotFixScene",
    "framework.network.SocketHelper": "framework.network.SocketHelper",
    "game.frames.HallFrame": "game.frames.HallFrame",
    "game.frames.HomeFrame": "game.frames.HomeFrame"
};
var $groups = {
    "datas": [
        "game/datas/ad.js",
        "game/datas/buff.js",
        "game/datas/chamption.js",
        "game/datas/fakes.js",
        "game/datas/global.js",
        "game/datas/item.js",
        "game/datas/jackpots.js",
        "game/datas/mulwin.js",
        "game/datas/newbieEffect.js",
        "game/datas/onlineReward.js",
        "game/datas/shop.js",
        "game/datas/sound.js"
    ]
};

var $req = $import;