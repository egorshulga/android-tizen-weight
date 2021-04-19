package com.androidweight.common;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.lang.reflect.Field;
import java.util.List;

//public class ReturnValue {
//    public static <T> WritableMap prepare(T obj) throws IllegalAccessException {
//        WritableMap result = Arguments.createMap();
//        for (Field field : obj.getClass().getFields()) {
//            Class<?> type = field.getType();
//            String name = field.getName();
//            if (type == boolean.class)
//                result.putBoolean(name, field.getBoolean(obj));
//            else if (type == int.class)
//                result.putInt(name, field.getInt(obj));
//            else if (type == double.class)
//                result.putDouble(name, field.getDouble(obj));
//            else if (type == float.class)
//                result.putDouble(name, field.getFloat(obj));
//            else if (type == String.class)
//                result.putString(name, (String) field.get(obj));
//            else if (type.isArray())
//                result.putArray(name, );
//            else if (List.class.isAssignableFrom(type))
//                result.putArray(name, );
//            else if (Object.class.isAssignableFrom(type))
//                result.putMap(name, prepare(field.get(obj)));
//        }
//        return result;
//    }
//
//    public static <T> WritableArray prepare(T[] array) {
//        WritableArray result = Arguments.createArray();
//        Class<?> elementType = array.getClass().getComponentType();
//        Apply<T> op = null;
//        if (elementType == boolean.class)
//            op = (Apply<Boolean>) result::pushBoolean;
//        else if (elementType == int.class)
//            op = (Apply<Integer>) result::pushInt;
//        else if (elementType == double.class)
//            op = (Apply<Double>) result::pushDouble;
//        else if (elementType == float.class)
//            op = (Apply<Float>) result::pushDouble;
//        else if (elementType == String.class)
//            op = (Apply<String>) result::pushString;
//        else if (elementType.isArray())
//            op = (T[] element) -> result.pushArray(prepare(element));
//        else if (List.class.isAssignableFrom(elementType))
//            op = (List<?> element) -> result.pushArray(prepare(element));
//        else if (Object.class.isAssignableFrom(elementType))
//            op = (Object element) -> result.pushMap(prepare(element));
//        for (Object value : array) {
//            op.apply(value);
//        }
//        return result;
//    }
//
//    public static <T> WritableArray prepare(List<T> list) {
//    }
//
//    public interface Apply<T> {
//        void apply(T element) throws IllegalAccessException;
//    }
//}
