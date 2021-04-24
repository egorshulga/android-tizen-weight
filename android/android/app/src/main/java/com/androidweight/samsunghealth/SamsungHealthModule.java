package com.androidweight.samsunghealth;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.androidweight.common.Result;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.samsung.android.sdk.healthdata.HealthConstants;
import com.samsung.android.sdk.healthdata.HealthPermissionManager;
import com.samsung.android.sdk.healthdata.HealthResultHolder;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class SamsungHealthModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext context;
    private final SamsungHealthAuthorization authorization;
    private DeviceEventManagerModule.RCTDeviceEventEmitter emitter;
    private final Set<HealthPermissionManager.PermissionKey> weightPermissions;
    private final HealthPermissionManager.PermissionKey readWeightPermission = new HealthPermissionManager.PermissionKey(
            HealthConstants.Weight.HEALTH_DATA_TYPE,
            HealthPermissionManager.PermissionType.READ);
    private final HealthPermissionManager.PermissionKey writeWeightPermission = new HealthPermissionManager.PermissionKey(
            HealthConstants.Weight.HEALTH_DATA_TYPE,
            HealthPermissionManager.PermissionType.WRITE);

    public SamsungHealthModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
        authorization = new SamsungHealthAuthorization(context);
        weightPermissions = new HashSet<>();
        weightPermissions.add(readWeightPermission);
//        weightPermissions.add(writeWeightPermission);
    }

    @NonNull
    @Override
    public String getName() {
        return "SamsungHealth";
    }

    @ReactMethod
    public void init(Promise promise) {
        try {
            emitter = context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
            authorization.init(result -> promise.resolve(result.prepare()),
                    error -> promise.resolve(error.prepare()),
                    () -> emitter.emit("HealthStorageConnectionLost", null));
        } catch (Exception e) {
            promise.reject("SAMSUNG_HEALTH_ERROR", e);
        }
    }

    @ReactMethod
    public void resolveConnectionError() {
        authorization.resolveConnectionError();
    }

    @ReactMethod
    public void disconnect() {
        authorization.disconnect();
    }

    @ReactMethod
    public void areWeightPermissionsAcquired(Promise promise) {
        try {
            Map<HealthPermissionManager.PermissionKey, Boolean> permissionsResult =
                    authorization.permissionManager.isPermissionAcquired(weightPermissions);
            WritableMap result = prepareWeightAuthorizationResult(permissionsResult);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("SAMSUNG_HEALTH_ERROR", e);
        }
    }

    @ReactMethod
    public void requestWeightPermissions(Promise promise) {
        try {
            authorization.permissionManager.requestPermissions(weightPermissions, context.getCurrentActivity())
                    .setResultListener(permissionResult -> {
                        WritableMap result = prepareWeightAuthorizationResult(permissionResult.getResultMap());
                        promise.resolve(result);
                    });
        } catch (Exception e) {
            promise.reject("SAMSUNG_HEALTH_ERROR", e);
        }
    }

    private WritableMap prepareWeightAuthorizationResult(Map<HealthPermissionManager.PermissionKey, Boolean> permissionsResult) {
        WritableMap result = Arguments.createMap();
        if (permissionsResult.containsKey(readWeightPermission))
            result.putBoolean("read", permissionsResult.get(readWeightPermission));
        else
            result.putBoolean("read", false);
        if (permissionsResult.containsKey(writeWeightPermission))
            result.putBoolean("write", permissionsResult.get(writeWeightPermission));
        else
            result.putBoolean("write", false);
        return result;
    }
}
