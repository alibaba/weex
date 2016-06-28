/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.json;

import com.taobao.weex.devtools.common.ExceptionUtil;
import com.taobao.weex.devtools.json.annotation.JsonProperty;
import com.taobao.weex.devtools.json.annotation.JsonValue;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.annotation.Annotation;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.IdentityHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nullable;
import javax.annotation.concurrent.GuardedBy;

/**
 * This class is a lightweight version of Jackson's ObjectMapper. It is designed to have a minimal
 * subset of the functionality required for stetho.
 * <p>
 * It would be awesome if there were a lightweight library that supported converting between
 * arbitrary {@link Object} and {@link JSONObject} representations.
 * <p>
 * Admittedly the other approach would be to use an Annotation Processor to create static conversion
 * functions that discover something like a {@link JsonProperty} and create a function at compile
 * time however since this is just being used for a simple debug utility and Kit-Kat caches the
 * results of reflection this class is sufficient for stethos needs.
 */
public class ObjectMapper {

  @GuardedBy("mJsonValueMethodCache")
  private final Map<Class<?>, Method> mJsonValueMethodCache = new IdentityHashMap<>();

  /**
   * Support mapping between arbitrary classes and {@link JSONObject}.
   * <note>
   *   It is possible for a {@link Throwable} to be propagated out of this class if there is an
   *   {@link InvocationTargetException}.
   * </note>
   * @param fromValue
   * @param toValueType
   * @param <T>
   * @return
   * @throws IllegalArgumentException when there is an error converting. One of either
   * {@code fromValue.getClass()} or {@code toValueType} must be {@link JSONObject}.
   */
  public <T> T convertValue(Object fromValue, Class<T> toValueType)
      throws IllegalArgumentException {
    if (fromValue == null) {
      return null;
    }

    if (toValueType != Object.class
        && toValueType.isAssignableFrom(fromValue.getClass())) {
      return (T) fromValue;
    }

    try {
      if (fromValue instanceof JSONObject) {
        return _convertFromJSONObject((JSONObject) fromValue, toValueType);
      } else if (toValueType == JSONObject.class) {
        return (T) _convertToJSONObject(fromValue);
      } else {
        throw new IllegalArgumentException(
            "Expecting either fromValue or toValueType to be a JSONObject");
      }
    } catch (NoSuchMethodException e) {
      throw new IllegalArgumentException(e);
    } catch (IllegalAccessException e) {
      throw new IllegalArgumentException(e);
    } catch (InstantiationException e) {
      throw new IllegalArgumentException(e);
    } catch (JSONException e) {
      throw new IllegalArgumentException(e);
    } catch (InvocationTargetException e) {
      throw ExceptionUtil.propagate(e.getCause());
    }
  }

  private <T> T _convertFromJSONObject(JSONObject jsonObject, Class<T> type)
      throws NoSuchMethodException, IllegalAccessException, InvocationTargetException,
      InstantiationException, JSONException {
    Constructor<T> constructor = type.getDeclaredConstructor((Class[]) null);
    constructor.setAccessible(true);
    T instance = constructor.newInstance();
    Field[] fields = type.getFields();
    for (int i = 0; i < fields.length; ++i) {
      Field field = fields[i];
      Object value = jsonObject.opt(field.getName());
      Object setValue = getValueForField(field, value);
      try {
        field.set(instance, setValue);
      } catch (IllegalArgumentException e) {
        throw new IllegalArgumentException(
            "Class: " + type.getSimpleName() + " " +
            "Field: " + field.getName() + " type " + setValue.getClass().getName(),
            e);
      }
    }
    return instance;
  }

  private Object getValueForField(Field field, Object value)
      throws JSONException {
    try {
      if (value != null) {
        if (value == JSONObject.NULL) {
          return null;
        }
        if (value.getClass() == field.getType()) {
          return value;
        }
        if (value instanceof JSONObject) {
          return convertValue(value, field.getType());
        } else {
          if (field.getType().isEnum()) {
            return getEnumValue((String) value, field.getType().asSubclass(Enum.class));
          } else if (value instanceof JSONArray) {
            return convertArrayToList(field, (JSONArray) value);
          } else if (value instanceof Number) {
            // Need to convert value to Number This happens because json treats 1 as an Integer even
            // if the field is supposed to be a Long
            Number numberValue = (Number) value;
            Class<?> clazz = field.getType();
            if (clazz == Integer.class || clazz == int.class) {
              return numberValue.intValue();
            } else if (clazz == Long.class || clazz == long.class) {
              return numberValue.longValue();
            } else if (clazz == Double.class || clazz == double.class) {
              return numberValue.doubleValue();
            } else if (clazz == Float.class || clazz == float.class) {
              return numberValue.floatValue();
            } else if (clazz == Byte.class || clazz == byte.class) {
              return numberValue.byteValue();
            } else if (clazz == Short.class || clazz == short.class) {
              return numberValue.shortValue();
            } else {
              throw new IllegalArgumentException("Not setup to handle class " + clazz.getName());
            }
          }
        }
      }
    } catch (IllegalAccessException e) {
      throw new IllegalArgumentException("Unable to set value for field " + field.getName(), e);
    }
    return value;
  }

  private Enum getEnumValue(String value, Class<? extends Enum> clazz) {
    Method method = getJsonValueMethod(clazz);
    if (method != null) {
      return getEnumByMethod(value, clazz, method);
    } else {
      return Enum.valueOf(clazz, value);
    }
  }

  /**
   * In this case we know that there is an {@link Enum} decorated with {@link JsonValue}. This means
   * that we need to iterate through all of the values of the {@link Enum} returned by the given
   * {@link Method} to check the given value.
   * @param value
   * @param clazz
   * @param method
   * @return
   */
  private Enum getEnumByMethod(String value, Class<? extends Enum> clazz, Method method) {
    Enum[] enumValues = clazz.getEnumConstants();
    // Start at the front to ensure first always wins
    for (int i = 0; i < enumValues.length; ++i) {
      Enum enumValue = enumValues[i];
      try {
        Object o = method.invoke(enumValue);
        if (o != null) {
          if (o.toString().equals(value)) {
            return enumValue;
          }
        }
      } catch (Exception ex) {
        throw new IllegalArgumentException(ex);
      }
    }
    throw new IllegalArgumentException("No enum constant " + clazz.getName() + "." + value);
  }

  private List<Object> convertArrayToList(Field field, JSONArray array)
      throws IllegalAccessException, JSONException {
    if (List.class.isAssignableFrom(field.getType())) {
      ParameterizedType parameterizedType = (ParameterizedType) field.getGenericType();
      Type[] types = parameterizedType.getActualTypeArguments();
      if (types.length != 1) {
        throw new IllegalArgumentException("Only able to handle a single type in a list " +
            field.getName());
      }
      Class arrayClass = (Class)types[0];
      List<Object> objectList = new ArrayList<Object>();
      for (int i = 0; i < array.length(); ++i) {
        if (arrayClass.isEnum()) {
          objectList.add(getEnumValue(array.getString(i), arrayClass));
        } else if (canDirectlySerializeClass(arrayClass)) {
          objectList.add(array.get(i));
        } else {
          JSONObject jsonObject = array.getJSONObject(i);
          if (jsonObject == null) {
            objectList.add(null);
          } else {
            objectList.add(convertValue(jsonObject, arrayClass));
          }
        }
      }
      return objectList;
    } else {
      throw new IllegalArgumentException("only know how to deserialize List<?> on field "
          + field.getName());
    }
  }

  private JSONObject _convertToJSONObject(Object fromValue)
      throws JSONException, InvocationTargetException, IllegalAccessException {
    JSONObject jsonObject = new JSONObject();
    Field[] fields = fromValue.getClass().getFields();
    for (int i = 0; i < fields.length; ++i) {
      JsonProperty property = fields[i].getAnnotation(JsonProperty.class);
      if (property != null) {
        // AutoBox here ...
        Object value = fields[i].get(fromValue);
        Class clazz = fields[i].getType();
        if (value != null) {
          clazz = value.getClass();
        }
        String name = fields[i].getName();
        if (property.required() && value == null) {
          value = JSONObject.NULL;
        } else if (value == JSONObject.NULL) {
          // Leave it as null in this case.
        } else {
          value = getJsonValue(value, clazz, fields[i]);
        }
        jsonObject.put(name, value);
      }
    }
    return jsonObject;
  }

  private Object getJsonValue(Object value, Class<?> clazz, Field field)
      throws InvocationTargetException, IllegalAccessException {
    if (value == null) {
      // Now technically we /could/ return JsonNode.NULL here but Chrome's webkit inspector croaks
      // if you pass a null "id"
      return null;
    }
    if (List.class.isAssignableFrom(clazz)) {
      return convertListToJsonArray(value);
    }
    // Finally check to see if there is a JsonValue present
    Method m = getJsonValueMethod(clazz);
    if (m != null) {
      return m.invoke(value);
    }
    if (!canDirectlySerializeClass(clazz)) {
      return convertValue(value, JSONObject.class);
    }
    // JSON has no support for NaN, Infinity or -Infinity, so we serialize
    // then as strings. Google Chrome's inspector will accept them just fine.
    if (clazz.equals(Double.class) || clazz.equals(Float.class)) {
      double doubleValue = ((Number) value).doubleValue();
      if (Double.isNaN(doubleValue)) {
        return "NaN";
      } else if (doubleValue == Double.POSITIVE_INFINITY) {
        return "Infinity";
      } else if (doubleValue == Double.NEGATIVE_INFINITY) {
        return "-Infinity";
      }
    }
    // hmm we should be able to directly serialize here...
    return value;
  }

  public JSONArray convertListToJsonArray(Object value)
      throws InvocationTargetException, IllegalAccessException {
    JSONArray array = new JSONArray();
    List<Object> list = (List<Object>) value;
    for(Object obj : list) {
      // Send null, if this is an array of arrays we are screwed
      array.put(obj != null ? getJsonValue(obj, obj.getClass(), null /* field */) : null);
    }
    return array;
  }

  /**
   *
   * @param clazz
   * @return the first method annotated with {@link JsonValue} or null if one does not exist.
   */
  @Nullable
  private Method getJsonValueMethod(Class<?> clazz) {
    synchronized (mJsonValueMethodCache) {
      Method method = mJsonValueMethodCache.get(clazz);
      if (method == null && !mJsonValueMethodCache.containsKey(clazz)) {
        method = getJsonValueMethodImpl(clazz);
        mJsonValueMethodCache.put(clazz, method);
      }
      return method;
    }
  }

  @Nullable
  private static Method getJsonValueMethodImpl(Class<?> clazz) {
    Method[] methods = clazz.getMethods();
    for(int i = 0; i < methods.length; ++i) {
      Annotation jsonValue = methods[i].getAnnotation(JsonValue.class);
      if (jsonValue != null) {
        return methods[i];
      }
    }
    return null;
  }

  private static boolean canDirectlySerializeClass(Class clazz)  {
    return isWrapperOrPrimitiveType(clazz) ||
        clazz.equals(String.class);
  }

  private static boolean isWrapperOrPrimitiveType(Class<?> clazz) {
    return clazz.isPrimitive() ||
        clazz.equals(Boolean.class) ||
        clazz.equals(Integer.class) ||
        clazz.equals(Character.class) ||
        clazz.equals(Byte.class) ||
        clazz.equals(Short.class) ||
        clazz.equals(Double.class) ||
        clazz.equals(Long.class) ||
        clazz.equals(Float.class);
  }

}
