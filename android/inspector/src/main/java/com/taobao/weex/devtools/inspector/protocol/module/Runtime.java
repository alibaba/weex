/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.protocol.module;

import android.content.Context;

import com.taobao.weex.devtools.WeexInspector;
import com.taobao.weex.devtools.common.LogUtil;
import com.taobao.weex.devtools.inspector.console.RuntimeRepl;
import com.taobao.weex.devtools.inspector.console.RuntimeReplFactory;
import com.taobao.weex.devtools.inspector.helper.ObjectIdMapper;
import com.taobao.weex.devtools.inspector.jsonrpc.DisconnectReceiver;
import com.taobao.weex.devtools.inspector.jsonrpc.JsonRpcException;
import com.taobao.weex.devtools.inspector.jsonrpc.JsonRpcPeer;
import com.taobao.weex.devtools.inspector.jsonrpc.JsonRpcResult;
import com.taobao.weex.devtools.inspector.jsonrpc.protocol.JsonRpcError;
import com.taobao.weex.devtools.inspector.protocol.ChromeDevtoolsDomain;
import com.taobao.weex.devtools.inspector.protocol.ChromeDevtoolsMethod;
import com.taobao.weex.devtools.inspector.runtime.RhinoDetectingRuntimeReplFactory;
import com.taobao.weex.devtools.json.ObjectMapper;
import com.taobao.weex.devtools.json.annotation.JsonProperty;
import com.taobao.weex.devtools.json.annotation.JsonValue;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class Runtime implements ChromeDevtoolsDomain {
  private final ObjectMapper mObjectMapper = new ObjectMapper();

  private static final Map<JsonRpcPeer, Session> sSessions =
      Collections.synchronizedMap(new HashMap<JsonRpcPeer, Session>());

  private final RuntimeReplFactory mReplFactory;

  /**
   * @deprecated Provided for ABI compatibility
   *
   * @see #Runtime(RuntimeReplFactory)
   * @see WeexInspector.DefaultInspectorModulesBuilder#runtimeRepl(RuntimeReplFactory)
   */
  @Deprecated
  public Runtime() {
    this(new RuntimeReplFactory() {
      @Override
      public RuntimeRepl newInstance() {
        return new RuntimeRepl() {
          @Override
          public Object evaluate(String expression) throws Throwable {
            return "Not supported with legacy Runtime module";
          }
        };
      }
    });
  }

  /**
   * @deprecated This was a transitionary API that was replaced by
   *     {@link WeexInspector.DefaultInspectorModulesBuilder#runtimeRepl}
   */
  public Runtime(Context context) {
    this(new RhinoDetectingRuntimeReplFactory(context));
  }

  public Runtime(RuntimeReplFactory replFactory) {
    mReplFactory = replFactory;
  }

  public static int mapObject(JsonRpcPeer peer, Object object) {
    return getSession(peer).getObjects().putObject(object);
  }

  @Nonnull
  private static synchronized Session getSession(final JsonRpcPeer peer) {
    Session session = sSessions.get(peer);
    if (session == null) {
      session = new Session();
      sSessions.put(peer, session);
      peer.registerDisconnectReceiver(new DisconnectReceiver() {
        @Override
        public void onDisconnect() {
          sSessions.remove(peer);
        }
      });
    }
    return session;
  }

  @ChromeDevtoolsMethod
  public void releaseObject(JsonRpcPeer peer, JSONObject params) throws JSONException {
    String objectId = params.getString("objectId");
    getSession(peer).getObjects().removeObjectById(Integer.parseInt(objectId));
  }

  @ChromeDevtoolsMethod
  public void releaseObjectGroup(JsonRpcPeer peer, JSONObject params) {
    LogUtil.w("Ignoring request to releaseObjectGroup: " + params);
  }

  @ChromeDevtoolsMethod
  public CallFunctionOnResponse callFunctionOn(JsonRpcPeer peer, JSONObject params)
      throws JsonRpcException {
    CallFunctionOnRequest args = mObjectMapper.convertValue(params, CallFunctionOnRequest.class);

    Session session = getSession(peer);
    Object object = session.getObjectOrThrow(args.objectId);

    // The DevTools UI thinks it can run arbitrary JavaScript against us in order to figure out
    // the class structure of an object.  That obviously won't fly, and there's no way to
    // translate without building a crude JavaScript parser so let's just go ahead and guess
    // what this function does by name.
    if (!args.functionDeclaration.startsWith("function protoList(")) {
      throw new JsonRpcException(
          new JsonRpcError(
              JsonRpcError.ErrorCode.INTERNAL_ERROR,
              "Expected protoList, got: " + args.functionDeclaration,
              null /* data */));
    }

    // Since this is really a function call we have to create this fake object to hold the
    // "result" of the function.
    ObjectProtoContainer objectContainer = new ObjectProtoContainer(object);
    RemoteObject result = new RemoteObject();
    result.type = ObjectType.OBJECT;
    result.subtype = ObjectSubType.NODE;
    result.className = object.getClass().getName();
    result.description = getPropertyClassName(object);
    result.objectId = String.valueOf(session.getObjects().putObject(objectContainer));

    CallFunctionOnResponse response = new CallFunctionOnResponse();
    response.result = result;
    response.wasThrown = false;

    return response;
  }

  @ChromeDevtoolsMethod
  public JsonRpcResult evaluate(JsonRpcPeer peer, JSONObject params) {
    return getSession(peer).evaluate(mReplFactory, params);
  }

  @ChromeDevtoolsMethod
  public JsonRpcResult getProperties(JsonRpcPeer peer, JSONObject params) throws JsonRpcException {
    return getSession(peer).getProperties(params);
  }

  private static String getPropertyClassName(Object o) {
    String name = o.getClass().getSimpleName();
    if (name == null || name.length() == 0) {
      // Looks better for anonymous classes.
      name = o.getClass().getName();
    }
    return name;
  }

  private static class ObjectProtoContainer {
    public final Object object;

    public ObjectProtoContainer(Object object) {
      this.object = object;
    }
  }

  /**
   * Object representing a session with a single client.
   *
   * <p>Clients inherently leak object references because they can expand any object in the UI
   * at any time.  Grouping references by client allows us to drop them when the client
   * disconnects.
   */
  private static class Session {
    private final ObjectIdMapper mObjects = new ObjectIdMapper();
    private final ObjectMapper mObjectMapper = new ObjectMapper();

    @Nullable
    private RuntimeRepl mRepl;

    public ObjectIdMapper getObjects() {
      return mObjects;
    }

    public Object getObjectOrThrow(String objectId) throws JsonRpcException {
      Object object = getObjects().getObjectForId(Integer.parseInt(objectId));
      if (object == null) {
        throw new JsonRpcException(new JsonRpcError(
            JsonRpcError.ErrorCode.INVALID_REQUEST,
            "No object found for " + objectId,
            null /* data */));
      }
      return object;
    }

    public RemoteObject objectForRemote(Object value) {
      RemoteObject result = new RemoteObject();
      if (value == null) {
        result.type = ObjectType.OBJECT;
        result.subtype = ObjectSubType.NULL;
        result.value = JSONObject.NULL;
      } else if (value instanceof Boolean) {
        result.type = ObjectType.BOOLEAN;
        result.value = value;
      } else if (value instanceof Number) {
        result.type = ObjectType.NUMBER;
        result.value = value;
      } else if (value instanceof Character) {
        // Unclear whether we should expose these as strings, numbers, or something else.
        result.type = ObjectType.NUMBER;
        result.value = Integer.valueOf(((Character)value).charValue());
      } else if (value instanceof String) {
        result.type = ObjectType.STRING;
        result.value = String.valueOf(value);
      } else {
        result.type = ObjectType.OBJECT;
        result.className = "What??";  // I have no idea where this is used.
        result.objectId = String.valueOf(mObjects.putObject(value));

        if (value.getClass().isArray()) {
          result.description = "array";
        } else if (value instanceof List) {
          result.description = "List";
        } else if (value instanceof Set) {
          result.description = "Set";
        } else if (value instanceof Map) {
          result.description = "Map";
        } else {
          result.description = getPropertyClassName(value);
        }

      }
      return result;
    }

    public EvaluateResponse evaluate(RuntimeReplFactory replFactory, JSONObject params) {
      EvaluateRequest request = mObjectMapper.convertValue(params, EvaluateRequest.class);

      try {
        if (!request.objectGroup.equals("console")) {
          return buildExceptionResponse("Not supported by FAB");
        }

        RuntimeRepl repl = getRepl(replFactory);
        Object result = repl.evaluate(request.expression);
        return buildNormalResponse(result);
      } catch (Throwable t) {
        return buildExceptionResponse(t);
      }
    }

    @Nonnull
    private synchronized RuntimeRepl getRepl(RuntimeReplFactory replFactory) {
      if (mRepl == null) {
        mRepl = replFactory.newInstance();
      }
      return mRepl;
    }

    private EvaluateResponse buildNormalResponse(Object retval) {
      EvaluateResponse response = new EvaluateResponse();
      response.wasThrown = false;
      response.result = objectForRemote(retval);
      return response;
    }

    private EvaluateResponse buildExceptionResponse(Object retval) {
      EvaluateResponse response = new EvaluateResponse();
      response.wasThrown = true;
      response.result = objectForRemote(retval);
      response.exceptionDetails = new ExceptionDetails();
      response.exceptionDetails.text = retval.toString();
      return response;
    }

    public GetPropertiesResponse getProperties(JSONObject params) throws JsonRpcException {
      GetPropertiesRequest request = mObjectMapper.convertValue(params, GetPropertiesRequest.class);

      if (!request.ownProperties) {
        GetPropertiesResponse response = new GetPropertiesResponse();
        response.result = new ArrayList<>();
        return response;
      }

      Object object = getObjectOrThrow(request.objectId);

      if (object.getClass().isArray()) {
        object = arrayToList(object);
      }

      if (object instanceof ObjectProtoContainer) {
        return getPropertiesForProtoContainer((ObjectProtoContainer) object);
      } else if (object instanceof List) {
        return getPropertiesForIterable((List) object, /* enumerate */ true);
      } else if (object instanceof Set) {
        return getPropertiesForIterable((Set) object, /* enumerate */ false);
      } else if (object instanceof Map) {
        return getPropertiesForMap(object);
      } else {
        return getPropertiesForObject(object);
      }
    }

    private List<?> arrayToList(Object object) {
      Class<?> type = object.getClass();
      if (!type.isArray()) {
        throw new IllegalArgumentException("Argument must be an array.  Was " + type);
      }
      Class<?> component = type.getComponentType();

      if (!component.isPrimitive()) {
        return Arrays.asList((Object[]) object);
      }

      // Loop manually for primitives.
      int length = Array.getLength(object);
      List<Object> ret = new ArrayList<>(length);
      for (int i = 0; i < length; i++) {
        ret.add(Array.get(object, i));
      }
      return ret;
    }

    // Normally JavaScript will return the full class hierarchy as a list.  That seems less
    // useful for Java since it's more natural (IMO) to see all available member variables in one
    // big list.
    private GetPropertiesResponse getPropertiesForProtoContainer(ObjectProtoContainer proto) {
      Object target = proto.object;
      RemoteObject protoRemote = new RemoteObject();
      protoRemote.type = ObjectType.OBJECT;
      protoRemote.subtype = ObjectSubType.NODE;
      protoRemote.className = target.getClass().getName();
      protoRemote.description = getPropertyClassName(target);
      protoRemote.objectId = String.valueOf(mObjects.putObject(target));
      PropertyDescriptor descriptor = new PropertyDescriptor();
      descriptor.name = "1";
      descriptor.value = protoRemote;
      GetPropertiesResponse response = new GetPropertiesResponse();
      response.result = new ArrayList<>(1);
      response.result.add(descriptor);
      return response;
    }

    private GetPropertiesResponse getPropertiesForIterable(Iterable<?> object, boolean enumerate) {
      GetPropertiesResponse response = new GetPropertiesResponse();
      List<PropertyDescriptor> properties = new ArrayList<>();

      int index = 0;
      for (Object value : object) {
        PropertyDescriptor property = new PropertyDescriptor();
        property.name = enumerate ? String.valueOf(index++) : null;
        property.value = objectForRemote(value);
        properties.add(property);
      }

      response.result = properties;
      return response;
    }

    private GetPropertiesResponse getPropertiesForMap(Object object) {
      GetPropertiesResponse response = new GetPropertiesResponse();
      List<PropertyDescriptor> properties = new ArrayList<>();

      for (Map.Entry<?, ?> entry : ((Map<?, ?>) object).entrySet()) {
        PropertyDescriptor property = new PropertyDescriptor();
        property.name = String.valueOf(entry.getKey());
        property.value = objectForRemote(entry.getValue());
        properties.add(property);
      }

      response.result = properties;
      return response;
    }

    private GetPropertiesResponse getPropertiesForObject(Object object) {
      GetPropertiesResponse response = new GetPropertiesResponse();
      List<PropertyDescriptor> properties = new ArrayList<>();
      for (
          Class<?> declaringClass = object.getClass();
          declaringClass != null;
          declaringClass = declaringClass.getSuperclass()
          ) {
        // Reverse the list of fields while going up the superclass chain.
        // When we're done, we'll reverse the full list so that the superclasses
        // appear at the top, but within each class they properties are in declared order.
        List<Field> fields =
            new ArrayList<Field>(Arrays.asList(declaringClass.getDeclaredFields()));
        Collections.reverse(fields);
        String prefix = declaringClass == object.getClass()
            ? ""
            : declaringClass.getSimpleName() + ".";
        for (Field field : fields) {
          if (Modifier.isStatic(field.getModifiers())) {
            continue;
          }
          field.setAccessible(true);
          try {
            Object fieldValue = field.get(object);
            PropertyDescriptor property = new PropertyDescriptor();
            property.name = prefix + field.getName();
            property.value = objectForRemote(fieldValue);
            properties.add(property);
          } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
          }
        }
      }
      Collections.reverse(properties);
      response.result = properties;
      return response;
    }
  }

  private static class CallFunctionOnRequest {
    @JsonProperty
    public String objectId;

    @JsonProperty
    public String functionDeclaration;

    @JsonProperty
    public List<CallArgument> arguments;

    @JsonProperty(required = false)
    public Boolean doNotPauseOnExceptionsAndMuteConsole;

    @JsonProperty(required = false)
    public Boolean returnByValue;

    @JsonProperty(required = false)
    public Boolean generatePreview;
  }

  private static class CallFunctionOnResponse implements JsonRpcResult {
    @JsonProperty
    public RemoteObject result;

    @JsonProperty(required = false)
    public Boolean wasThrown;
  }

  private static class CallArgument {
    @JsonProperty(required = false)
    public Object value;

    @JsonProperty(required = false)
    public String objectId;

    @JsonProperty(required = false)
    public ObjectType type;
  }

  private static class GetPropertiesRequest implements JsonRpcResult {
    @JsonProperty(required = true)
    public boolean ownProperties;

    @JsonProperty(required = true)
    public String objectId;
  }

  private static class GetPropertiesResponse implements JsonRpcResult {
    @JsonProperty(required = true)
    public List<PropertyDescriptor> result;
  }

  private static class EvaluateRequest implements JsonRpcResult {
    @JsonProperty(required = true)
    public String objectGroup;

    @JsonProperty(required = true)
    public String expression;
  }

  private static class EvaluateResponse implements JsonRpcResult {
    @JsonProperty(required = true)
    public RemoteObject result;

    @JsonProperty(required = true)
    public boolean wasThrown;

    @JsonProperty
    public ExceptionDetails exceptionDetails;
  }

  private static class ExceptionDetails {
    @JsonProperty(required = true)
    public String text;
  }

  public static class RemoteObject {
    @JsonProperty(required = true)
    public ObjectType type;

    @JsonProperty
    public ObjectSubType subtype;

    @JsonProperty
    public Object value;

    @JsonProperty
    public String className;

    @JsonProperty
    public String description;

    @JsonProperty
    public String objectId;
  }

  private static class PropertyDescriptor {
    @JsonProperty(required = true)
    public String name;

    @JsonProperty(required = true)
    public RemoteObject value;

    @JsonProperty(required = true)
    public final boolean isOwn = true;

    @JsonProperty(required = true)
    public final boolean configurable = false;

    @JsonProperty(required = true)
    public final boolean enumerable = true;

    @JsonProperty(required = true)
    public final boolean writable = false;
  }

  public static enum ObjectType {
    OBJECT("object"),
    FUNCTION("function"),
    UNDEFINED("undefined"),
    STRING("string"),
    NUMBER("number"),
    BOOLEAN("boolean"),
    SYMBOL("symbol");

    private final String mProtocolValue;

    private ObjectType(String protocolValue) {
      mProtocolValue = protocolValue;
    }

    @JsonValue
    public String getProtocolValue() {
      return mProtocolValue;
    }
  }

  public static enum ObjectSubType {
    ARRAY("array"),
    NULL("null"),
    NODE("node"),
    REGEXP("regexp"),
    DATE("date"),
    MAP("map"),
    SET("set"),
    ITERATOR("iterator"),
    GENERATOR("generator"),
    ERROR("error");

    private final String mProtocolValue;

    private ObjectSubType(String protocolValue) {
      mProtocolValue = protocolValue;
    }

    @JsonValue
    public String getProtocolValue() {
      return mProtocolValue;
    }
  }

}
