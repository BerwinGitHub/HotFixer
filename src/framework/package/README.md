# 包(模块管理)管理工具类

## WebStorm 文件模板
File->Settings->Editor->File and Code Templates

```
/**
 * Created by ${USER} on ${DATE}.
 */
 
// \$include(\$import.xxxx.xxx)

\$class("${NAME}", function(\$export){
    /**
     *
     */
    var ${NAME} = {
        // insert code here
    };
    \$export.${NAME} = ${NAME}
});
```

```
// $include($import.xxxx.xxx)

$class("", function($export){
      
    // $export.xxx = xxx
});
```