package com.androidweight.common;

public interface OnFailureWith<TResult> {
    void invoke(TResult result);
}
