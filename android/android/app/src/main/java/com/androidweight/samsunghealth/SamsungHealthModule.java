package com.androidweight.samsunghealth;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.androidweight.common.Result;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class SamsungHealthModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext context;
    private final SamsungHealthAuthorization authorization;
    private DeviceEventManagerModule.RCTDeviceEventEmitter emitter;

    public SamsungHealthModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
        authorization = new SamsungHealthAuthorization(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "SamsungHealth";
    }

    @ReactMethod
    public void init(Promise promise) {
        emitter = context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        authorization.init(result -> promise.resolve(result.prepare()),
                error -> promise.resolve(error.prepare()),
                () -> emitter.emit("HealthStorageConnectionLost", null));
    }

    @ReactMethod
    public void resolveConnectionError() {
        authorization.resolveConnectionError();
    }

    @ReactMethod
    public void disconnect() {
        authorization.disconnect();
    }
}
