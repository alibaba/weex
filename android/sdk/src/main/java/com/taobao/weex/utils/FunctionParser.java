/**
 * Licensed to the Apache Software Foundation (ASF) under one or more contributor license
 * agreements.  See the NOTICE file distributed with this work for additional information regarding
 * copyright ownership.  The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the License.  You may obtain
 * a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied.  See the License for the specific language governing permissions and limitations
 * under the License.
 */
package com.taobao.weex.utils;

import android.support.annotation.NonNull;
import android.text.TextUtils;

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * Parser for function like "rotate(30 ) transform(50 , 20)".
 * This class will translate the raw string presentation of a group of function(s) to give type
 * according to the {@link com.taobao.weex.utils.FunctionParser.Mapper}
 */
public class FunctionParser<T> {

  private Mapper<T> mapper;
  private Lexer lexer;

  /**
   * Construct a function parser
   * @param source the raw string representation of a group of function(s)
   * @param mapper the mapping rule between string and corresponding type of object.
   */
  public FunctionParser(@NonNull String source, @NonNull Mapper<T> mapper) {
    this.lexer = new Lexer(source);
    this.mapper = mapper;
  }

  /**
   * Start to parse the raw string. The result will be stored in a sorted map where the order
   * is defined by the function order in the raw string.
   * @return
   */
  public LinkedHashMap<String, T> parse() {
    lexer.moveOn();
    return definition();
  }

  private LinkedHashMap<String, T> definition() {
    LinkedHashMap<String, T> result = new LinkedHashMap<>();
    do {
      result.putAll(function());
    } while (lexer.getCurrentToken() == Token.FUNC_NAME);
    return result;
  }

  private Map<String, T> function() {
    List<String> list = new LinkedList<>();
    String functionName = match(Token.FUNC_NAME);
    match(Token.LEFT_PARENT);
    list.add(match(Token.PARAM_VALUE));
    while (lexer.getCurrentToken() == Token.COMMA) {
      match(Token.COMMA);
      list.add(match(Token.PARAM_VALUE));
    }
    match(Token.RIGHT_PARENT);
    return mapper.map(functionName, list);
  }

  private String match(Token token) {
    if (token == lexer.getCurrentToken()) {
      String value = lexer.getCurrentTokenValue();
      lexer.moveOn();
      return value;
    }
    throw new WXInterpretationException("Token doesn't match");
  }

  private enum Token {
    FUNC_NAME, PARAM_VALUE, LEFT_PARENT, RIGHT_PARENT, COMMA
  }

  public interface Mapper<T> {

    /**
     * Map one function to a specified type of object
     * @param functionName the name of the raw function.
     * @param raw the list of parameter of the raw function
     * @return the expected mapping relationship, where the key in the map is the same as the
     * functionName, and the value in the map is the type of object that expected by user.
     */
    Map<String, T> map(String functionName, List<String> raw);
  }

  private static class WXInterpretationException extends RuntimeException {

    private WXInterpretationException(String msg) {
      super(msg);
    }
  }

  /**
   * Lexer for the parser. For now,  digit, alphabet, '(', ')', '.', ',', '+', '-' and '%' is
   * valid character, and '(', ')', ',', parameter value and function name is valid token.
   * Parameter value is defined as "(?i)[\+-]?[0-9]+(\.[0-9]+)?(%||deg||px)?" while function
   * name is defined as "[a-zA-Z]+".
   */
  private static class Lexer {

    private String source;
    private Token current;
    private String value;
    private int pointer = 0;

    private Lexer(String source) {
      this.source = source;
    }

    private Token getCurrentToken() {
      return current;
    }

    private String getCurrentTokenValue() {
      return value;
    }

    private boolean moveOn() {
      StringBuilder stringBuilder = new StringBuilder();
      char curChar;
      while (pointer < source.length()) {
        curChar = source.charAt(pointer);
        if (Character.isWhitespace(curChar)) {
          pointer++;
          if (stringBuilder.length() != 0) {
            break;
          }
        } else if (Character.isLetterOrDigit(curChar) || curChar == '.'
                   || curChar == '%' || curChar == '-' || curChar == '+') {
          stringBuilder.append(curChar);
          pointer++;
        } else {
          if (stringBuilder.length() == 0) {
            stringBuilder.append(curChar);
            pointer++;
          }
          break;
        }
      }
      String token = stringBuilder.toString();
      if (!TextUtils.isEmpty(token) || pointer < source.length()) {
        moveOn(token);
        return true;
      } else {
        current = null;
        value = null;
        return false;
      }
    }

    private void moveOn(String token) {
      if (TextUtils.equals(token, "(")) {
        current = Token.LEFT_PARENT;
        value = "(";
      } else if (TextUtils.equals(token, ")")) {
        current = Token.RIGHT_PARENT;
        value = ")";
      } else if (TextUtils.equals(token, ",")) {
        current = Token.COMMA;
        value = ",";
      } else if (token.matches("(?i)[\\+-]?[0-9]+(\\.[0-9]+)?(%||deg||px)?")) {
        current = Token.PARAM_VALUE;
        value = token;
      } else if (token.matches("[a-zA-Z]+")) {
        current = Token.FUNC_NAME;
        value = token;
      } else {
        throw new WXInterpretationException("Illegal Token");
      }
    }

    private void reset() {
      pointer = 0;
      value = null;
      current = null;
    }
  }

}
