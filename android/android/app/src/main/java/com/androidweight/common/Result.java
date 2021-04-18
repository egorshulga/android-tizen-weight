package com.androidweight.common;

public class Result {
    public final boolean success;
    public final String message;

    private Result(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public static Result success() {
        return new Result(true, null);
    }

    public static Result failure(String message) {
        return new Result(false, message);
    }
}
