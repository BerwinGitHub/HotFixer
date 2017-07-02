#include "base/ccConfig.h"
#ifndef __custom_socketutility_h__
#define __custom_socketutility_h__

#include "jsapi.h"
#include "jsfriendapi.h"

extern JSClass  *jsb_SocketUtility_class;
extern JSObject *jsb_SocketUtility_prototype;

bool js_custom_socketutility_SocketUtility_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_custom_socketutility_SocketUtility_finalize(JSContext *cx, JSObject *obj);
void js_register_custom_socketutility_SocketUtility(JSContext *cx, JS::HandleObject global);
void register_all_custom_socketutility(JSContext* cx, JS::HandleObject obj);
bool js_custom_socketutility_SocketUtility_receiveData(JSContext *cx, uint32_t argc, jsval *vp);
bool js_custom_socketutility_SocketUtility_connect(JSContext *cx, uint32_t argc, jsval *vp);
bool js_custom_socketutility_SocketUtility_pure(JSContext *cx, uint32_t argc, jsval *vp);
bool js_custom_socketutility_SocketUtility_getInstance(JSContext *cx, uint32_t argc, jsval *vp);

#endif // __custom_socketutility_h__
