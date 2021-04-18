package com.androidweight.samsunghealth;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class SamsungHealthModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext context;

    public SamsungHealthModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "SamsungHealth";
    }
}
