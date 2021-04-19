package com.androidweight.common;

public interface OnResultWith<TResult> {
    void invoke(TResult result);
}
