# 包(模块管理)管理工具类

## WebStorm 文件模板
File->Settings->Editor->File and Code Templates

```
/**
 * Created by ${USER} on ${DATE}.
 */
 
// \$include(\$import.xxxx.xxx)

\$class("${NAME}", function(\$export, /*{data}*/){
    // \$use(data)  use import var like this
    var ${NAME} = {
        // insert code here...
    };
    \$public("${NAME}", ${NAME}, \$export);
});
```
创建launcher js文件效果如下:
```
/**
 * Created by Berwin on 2017/5/17.
 */

// $include(\$import.xxxx.xxx)

$class("launcher", function ($export, /*{data}*/) {
    // $use(data)  use import var like this
    var launcher = {
        // insert code here...
    };
    $public("launcher", launcher, $export);
});
```