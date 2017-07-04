#include "custom_socketutility_auto.hpp"
#include "scripting/js-bindings/manual/cocos2d_specifics.hpp"
#include "SocketUtility.hpp"

template<class T>
static bool dummy_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS_ReportError(cx, "Constructor for the requested class is not available, please refer to the API reference.");
    return false;
}

static bool empty_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
    return false;
}

static bool js_is_native_obj(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    args.rval().setBoolean(true);
    return true;
}
JSClass  *jsb_SocketUtility_class;
JSObject *jsb_SocketUtility_prototype;

bool js_custom_socketutility_SocketUtility_closeChannel(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    SocketUtility* cobj = (SocketUtility *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_custom_socketutility_SocketUtility_closeChannel : Invalid Native Object");
    if (argc == 1) {
        std::string arg0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_custom_socketutility_SocketUtility_closeChannel : Error processing arguments");
        cobj->closeChannel(arg0);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_custom_socketutility_SocketUtility_closeChannel : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
bool js_custom_socketutility_SocketUtility_sendData(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    SocketUtility* cobj = (SocketUtility *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_custom_socketutility_SocketUtility_sendData : Invalid Native Object");
    if (argc == 3) {
        std::string arg0;
        const char* arg1 = nullptr;
        int arg2 = 0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        std::string arg1_tmp; ok &= jsval_to_std_string(cx, args.get(1), &arg1_tmp); arg1 = arg1_tmp.c_str();
        ok &= jsval_to_int32(cx, args.get(2), (int32_t *)&arg2);
        JSB_PRECONDITION2(ok, cx, false, "js_custom_socketutility_SocketUtility_sendData : Error processing arguments");
        cobj->sendData(arg0, arg1, arg2);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_custom_socketutility_SocketUtility_sendData : wrong number of arguments: %d, was expecting %d", argc, 3);
    return false;
}
bool js_custom_socketutility_SocketUtility_connectWithCallback(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    SocketUtility* cobj = (SocketUtility *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_custom_socketutility_SocketUtility_connectWithCallback : Invalid Native Object");
    if (argc == 3) {
        const char* arg0 = nullptr;
        int arg1 = 0;
        std::function<void (const std::basic_string<char> &, const std::basic_string<char> &)> arg2;
        std::string arg0_tmp; ok &= jsval_to_std_string(cx, args.get(0), &arg0_tmp); arg0 = arg0_tmp.c_str();
        ok &= jsval_to_int32(cx, args.get(1), (int32_t *)&arg1);
        do {
		    if(JS_TypeOfValue(cx, args.get(2)) == JSTYPE_FUNCTION)
		    {
		        JS::RootedObject jstarget(cx, args.thisv().toObjectOrNull());
		        std::shared_ptr<JSFunctionWrapper> func(new JSFunctionWrapper(cx, jstarget, args.get(2), args.thisv()));
		        auto lambda = [=](const std::basic_string<char> & larg0, const std::basic_string<char> & larg1) -> void {
		            JSB_AUTOCOMPARTMENT_WITH_GLOBAL_OBJCET
		            jsval largv[2];
		            largv[0] = std_string_to_jsval(cx, larg0);
		            largv[1] = std_string_to_jsval(cx, larg1);
		            JS::RootedValue rval(cx);
		            bool succeed = func->invoke(2, &largv[0], &rval);
		            if (!succeed && JS_IsExceptionPending(cx)) {
		                JS_ReportPendingException(cx);
		            }
		        };
		        arg2 = lambda;
		    }
		    else
		    {
		        arg2 = nullptr;
		    }
		} while(0)
		;
        JSB_PRECONDITION2(ok, cx, false, "js_custom_socketutility_SocketUtility_connectWithCallback : Error processing arguments");
        std::string ret = cobj->connectWithCallback(arg0, arg1, arg2);
        JS::RootedValue jsret(cx);
        jsret = std_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_custom_socketutility_SocketUtility_connectWithCallback : wrong number of arguments: %d, was expecting %d", argc, 3);
    return false;
}
bool js_custom_socketutility_SocketUtility_connect(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    SocketUtility* cobj = (SocketUtility *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_custom_socketutility_SocketUtility_connect : Invalid Native Object");
    if (argc == 2) {
        const char* arg0 = nullptr;
        int arg1 = 0;
        std::string arg0_tmp; ok &= jsval_to_std_string(cx, args.get(0), &arg0_tmp); arg0 = arg0_tmp.c_str();
        ok &= jsval_to_int32(cx, args.get(1), (int32_t *)&arg1);
        JSB_PRECONDITION2(ok, cx, false, "js_custom_socketutility_SocketUtility_connect : Error processing arguments");
        std::string ret = cobj->connect(arg0, arg1);
        JS::RootedValue jsret(cx);
        jsret = std_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }

    JS_ReportError(cx, "js_custom_socketutility_SocketUtility_connect : wrong number of arguments: %d, was expecting %d", argc, 2);
    return false;
}
bool js_custom_socketutility_SocketUtility_setCallback(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    SocketUtility* cobj = (SocketUtility *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_custom_socketutility_SocketUtility_setCallback : Invalid Native Object");
    if (argc == 2) {
        std::string arg0;
        std::function<void (const std::basic_string<char> &, const std::basic_string<char> &)> arg1;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        do {
		    if(JS_TypeOfValue(cx, args.get(1)) == JSTYPE_FUNCTION)
		    {
		        JS::RootedObject jstarget(cx, args.thisv().toObjectOrNull());
		        std::shared_ptr<JSFunctionWrapper> func(new JSFunctionWrapper(cx, jstarget, args.get(1), args.thisv()));
		        auto lambda = [=](const std::basic_string<char> & larg0, const std::basic_string<char> & larg1) -> void {
		            JSB_AUTOCOMPARTMENT_WITH_GLOBAL_OBJCET
		            jsval largv[2];
		            largv[0] = std_string_to_jsval(cx, larg0);
		            largv[1] = std_string_to_jsval(cx, larg1);
		            JS::RootedValue rval(cx);
		            bool succeed = func->invoke(2, &largv[0], &rval);
		            if (!succeed && JS_IsExceptionPending(cx)) {
		                JS_ReportPendingException(cx);
		            }
		        };
		        arg1 = lambda;
		    }
		    else
		    {
		        arg1 = nullptr;
		    }
		} while(0)
		;
        JSB_PRECONDITION2(ok, cx, false, "js_custom_socketutility_SocketUtility_setCallback : Error processing arguments");
        cobj->setCallback(arg0, arg1);
        args.rval().setUndefined();
        return true;
    }

    JS_ReportError(cx, "js_custom_socketutility_SocketUtility_setCallback : wrong number of arguments: %d, was expecting %d", argc, 2);
    return false;
}
bool js_custom_socketutility_SocketUtility_pure(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    if (argc == 0) {
        SocketUtility::pure();
        args.rval().setUndefined();
        return true;
    }
    JS_ReportError(cx, "js_custom_socketutility_SocketUtility_pure : wrong number of arguments");
    return false;
}

bool js_custom_socketutility_SocketUtility_getInstance(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    if (argc == 0) {

        SocketUtility* ret = SocketUtility::getInstance();
        jsval jsret = JSVAL_NULL;
        if (ret) {
        jsret = OBJECT_TO_JSVAL(js_get_or_create_jsobject<SocketUtility>(cx, (SocketUtility*)ret));
    } else {
        jsret = JSVAL_NULL;
    };
        args.rval().set(jsret);
        return true;
    }
    JS_ReportError(cx, "js_custom_socketutility_SocketUtility_getInstance : wrong number of arguments");
    return false;
}


void js_register_custom_socketutility_SocketUtility(JSContext *cx, JS::HandleObject global) {
    jsb_SocketUtility_class = (JSClass *)calloc(1, sizeof(JSClass));
    jsb_SocketUtility_class->name = "SocketUtility";
    jsb_SocketUtility_class->addProperty = JS_PropertyStub;
    jsb_SocketUtility_class->delProperty = JS_DeletePropertyStub;
    jsb_SocketUtility_class->getProperty = JS_PropertyStub;
    jsb_SocketUtility_class->setProperty = JS_StrictPropertyStub;
    jsb_SocketUtility_class->enumerate = JS_EnumerateStub;
    jsb_SocketUtility_class->resolve = JS_ResolveStub;
    jsb_SocketUtility_class->convert = JS_ConvertStub;
    jsb_SocketUtility_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

    static JSPropertySpec properties[] = {
        JS_PS_END
    };

    static JSFunctionSpec funcs[] = {
        JS_FN("closeChannel", js_custom_socketutility_SocketUtility_closeChannel, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("sendData", js_custom_socketutility_SocketUtility_sendData, 3, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("connectWithCallback", js_custom_socketutility_SocketUtility_connectWithCallback, 3, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("connect", js_custom_socketutility_SocketUtility_connect, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("setCallback", js_custom_socketutility_SocketUtility_setCallback, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };

    static JSFunctionSpec st_funcs[] = {
        JS_FN("pure", js_custom_socketutility_SocketUtility_pure, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getInstance", js_custom_socketutility_SocketUtility_getInstance, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };

    jsb_SocketUtility_prototype = JS_InitClass(
        cx, global,
        JS::NullPtr(),
        jsb_SocketUtility_class,
        dummy_constructor<SocketUtility>, 0, // no constructor
        properties,
        funcs,
        NULL, // no static properties
        st_funcs);

    JS::RootedObject proto(cx, jsb_SocketUtility_prototype);
    JS::RootedValue className(cx, std_string_to_jsval(cx, "SocketUtility"));
    JS_SetProperty(cx, proto, "_className", className);
    JS_SetProperty(cx, proto, "__nativeObj", JS::TrueHandleValue);
    JS_SetProperty(cx, proto, "__is_ref", JS::FalseHandleValue);
    // add the proto and JSClass to the type->js info hash table
    jsb_register_class<SocketUtility>(cx, jsb_SocketUtility_class, proto, JS::NullPtr());
}

void register_all_custom_socketutility(JSContext* cx, JS::HandleObject obj) {
    // Get the ns
    JS::RootedObject ns(cx);
    get_or_create_js_obj(cx, obj, "cc", &ns);

    js_register_custom_socketutility_SocketUtility(cx, ns);
}

