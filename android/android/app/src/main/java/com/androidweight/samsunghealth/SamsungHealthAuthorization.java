package com.androidweight.samsunghealth;

import com.androidweight.common.OnResultWith;
import com.androidweight.common.OnResult;
import com.androidweight.common.Result;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.samsung.android.sdk.healthdata.HealthConnectionErrorResult;
import com.samsung.android.sdk.healthdata.HealthDataStore;
import com.samsung.android.sdk.healthdata.HealthPermissionManager;

import java.util.HashMap;

public class SamsungHealthAuthorization {
    private static final HashMap<Integer, String> dataStoreConnectionErrors = new HashMap<>();

    private final ReactApplicationContext context;
    private HealthDataStore dataStore;
    private HealthConnectionErrorResult resolvableError;
    public HealthPermissionManager permissionManager;

    static {
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.CONNECTION_FAILURE, "Connection to Samsung Health data framework is not established");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.PLATFORM_NOT_INSTALLED, "Samsung Health is not installed. Proceed to Play Store to install it");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.OLD_VERSION_SDK, "Samsung Health SDK version is outdated. Update the app to the latest version or contact the developer");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.OLD_VERSION_PLATFORM, "Samsung Health data framework is outdated, thus unable to cooperate with SDK");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.PLATFORM_DISABLED, "Samsung Health data framework is disabled. Activate it in phone's Settings");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.PLATFORM_SIGNATURE_FAILURE, "Samsung Health data framework signature verification failure");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.TIMEOUT, "Samsung Health data framework connection request timed out");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.USER_AGREEMENT_NEEDED, "Accepting Samsung Health policies is required in order to access health data storage");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.USER_PASSWORD_NEEDED, "Password is required to unlock Samsung Health data storage");
        dataStoreConnectionErrors.put(HealthConnectionErrorResult.UNKNOWN, "Unknown error during Samsung Health data storage authorization");
    }

    public SamsungHealthAuthorization(ReactApplicationContext context) {
        this.context = context;
    }

    public void init(OnResultWith<ConnectionResult> onResult, OnResultWith<ConnectionResult> onFailure, OnResult onConnectionLost) {
        dataStore = new HealthDataStore(context, new HealthDataStore.ConnectionListener() {
            @Override
            public void onConnected() {
                permissionManager = new HealthPermissionManager(dataStore);
                onResult.invoke(new ConnectionResult());
            }

            @Override
            public void onConnectionFailed(HealthConnectionErrorResult error) {
                ConnectionResult result = new ConnectionResult(error);
                if (result.hasResolution)
                    resolvableError = error;
                onFailure.invoke(result);
            }

            @Override
            public void onDisconnected() {
                onConnectionLost.invoke();
            }
        });
        dataStore.connectService();
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

    public static class ConnectionResult {
        public final boolean success;
        public final String message;
        public final boolean hasResolution;

        public ConnectionResult(HealthConnectionErrorResult error) {
            success = false;
            message = dataStoreConnectionErrors.get(error.getErrorCode());
            hasResolution = error.hasResolution();
        }

        public ConnectionResult() {
            success = true;
            message = null;
            hasResolution = false;
        }

        public WritableMap prepare() {
            WritableMap result = Arguments.createMap();
            result.putBoolean("success", success);
            result.putString("message", message);
            result.putBoolean("hasResolution", hasResolution);
            return result;
        }
    }
}
