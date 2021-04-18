package com.androidweight.samsunghealth;

import com.androidweight.common.OnFailure;
import com.androidweight.common.OnFailureWith;
import com.androidweight.common.OnSuccess;
import com.androidweight.common.Result;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.samsung.android.sdk.healthdata.HealthConnectionErrorResult;
import com.samsung.android.sdk.healthdata.HealthDataStore;
import com.samsung.android.sdk.healthdata.HealthPermissionManager;

import java.util.HashMap;
import java.util.Map;

public class SamsungHealthAuthorization {
    private static final HashMap<Integer, String> dataStoreConnectionErrors = new HashMap<>();

    private final ReactApplicationContext context;
    private HealthDataStore dataStore;
    private HealthConnectionErrorResult resolvableError;
    private HealthPermissionManager permissionManager;

    static {
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.CONNECTION_FAILURE, "");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.OLD_VERSION_PLATFORM, "");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.OLD_VERSION_SDK, "");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.PLATFORM_DISABLED, "");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.PLATFORM_NOT_INSTALLED, "");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.PLATFORM_SIGNATURE_FAILURE, "");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.TIMEOUT, "");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.USER_AGREEMENT_NEEDED, "");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.USER_PASSWORD_POPUP, "");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.UNKNOWN, "");
    }

    public SamsungHealthAuthorization(ReactApplicationContext context) {
        this.context = context;
    }

    public void init(OnSuccess onSuccess, OnFailureWith<ConnectionFailureResult> onFailure, OnFailure onConnectionLost) {
        dataStore = new HealthDataStore(context, new HealthDataStore.ConnectionListener() {
            @Override
            public void onConnected() {
                permissionManager = new HealthPermissionManager(dataStore);
                onSuccess.invoke();
            }

            @Override
            public void onConnectionFailed(HealthConnectionErrorResult error) {
                ConnectionFailureResult result = new ConnectionFailureResult(error);
                if (result.hasResolution)
                    resolvableError = error;
                onFailure.invoke(result);
            }

            @Override
            public void onDisconnected() {
                onConnectionLost.invoke();
            }
        });
    }

    public Result resolveConnectionError() {
        if (resolvableError == null)
            return Result.failure("There is no resolvable error to resolve");
        if (!resolvableError.hasResolution())
            return Result.failure("Health data store connection error is not resolvable automatically. " +
                    dataStoreConnectionErrors.get(resolvableError.getErrorCode()));
        resolvableError.resolve(context.getCurrentActivity());
        return Result.success();
    }

    public Result disconnect() {
        if (dataStore == null)
            return Result.failure("Health data store was not initialized");
        dataStore.disconnectService();
        return Result.success();
    }

    public class ConnectionFailureResult {
        public final int code;
        public final String message;
        public final boolean hasResolution;

        public ConnectionFailureResult(HealthConnectionErrorResult error) {
            code = error.getErrorCode();
            message = dataStoreConnectionErrors.get(code);
            hasResolution = error.hasResolution();
        }
    }
}
