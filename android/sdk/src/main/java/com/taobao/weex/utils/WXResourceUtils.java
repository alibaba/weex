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

import android.graphics.Color;
import android.text.TextUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * Class for parse color
 */
public class WXResourceUtils {

  private final static Map<String, String> colorMap = new HashMap<>();
  private final static String HEX_PREFIX = "#";
  private final static String FUNCTIONAL_RGB_PREFIX = "rgb";
  private final static String FUNCTIONAL_RGBA_PREFIX = "rgba";
  private final static String TRANSPARENT_KEYWORD = "transparent";
  private final static String TRANSPARENT_AARRGGBB = "#00000000";
  private final static String OPEN_PAREN = "(";
  private final static String CLOSE_PAREN = ")";
  private final static String COMMA = ",";
  private final static String PERCENT = "%";
  private final static String HEX_FORMAT = "%02x";
  private final static int LENGTH_RGB = 4;
  private final static int NUM_FUNC_RGB_GRADIENT = 3;
  private final static int NUM_FUNC_RGBA_GRADIENT = NUM_FUNC_RGB_GRADIENT + 1;
  private final static int COLOR_RANGE = 255;
  private final static int PERCENT_CONVERT = 100;

  static {
    colorMap.put("aliceblue", "#f0f8ff");
    colorMap.put("antiquewhite", "#faebd7");
    colorMap.put("aqua", "#00ffff");
    colorMap.put("aquamarine", "#7fffd4");
    colorMap.put("azure", "#f0ffff");
    colorMap.put("beige", "#f5f5dc");
    colorMap.put("bisque", "#ffe4c4");
    colorMap.put("black", "#000000");
    colorMap.put("blanchedalmond", "#ffebcd");
    colorMap.put("blue", "#0000ff");
    colorMap.put("blueviolet", "#8a2be2");
    colorMap.put("brown", "#a52a2a");
    colorMap.put("burlywood", "#deb887");
    colorMap.put("cadetblue", "#5f9ea0");
    colorMap.put("chartreuse", "#7fff00");
    colorMap.put("chocolate", "#d2691e");
    colorMap.put("coral", "#ff7f50");
    colorMap.put("cornflowerblue", "#6495ed");
    colorMap.put("cornsilk", "#fff8dc");
    colorMap.put("crimson", "#dc143c");
    colorMap.put("cyan", "#00ffff");
    colorMap.put("darkblue", "#00008b");
    colorMap.put("darkcyan", "#008b8b");
    colorMap.put("darkgoldenrod", "#b8860b");
    colorMap.put("darkgray", "#a9a9a9");
    colorMap.put("darkgreen", "#006400");
    colorMap.put("darkkhaki", "#bdb76b");
    colorMap.put("darkmagenta", "#8b008b");
    colorMap.put("darkolivegreen", "#556b2f");
    colorMap.put("darkorange", "#ff8c00");
    colorMap.put("darkorchid", "#9932cc");
    colorMap.put("darkred", "#8b0000");
    colorMap.put("darksalmon", "#e9967a");
    colorMap.put("darkseagreen", "#8fbc8f");
    colorMap.put("darkslateblue", "#483d8b");
    colorMap.put("darkslategray", "#2f4f4f");
    colorMap.put("darkslategrey", "#2f4f4f");
    colorMap.put("darkturquoise", "#00ced1");
    colorMap.put("darkviolet", "#9400d3");
    colorMap.put("deeppink", "#ff1493");
    colorMap.put("deepskyblue", "#00bfff");
    colorMap.put("dimgray", "#696969");
    colorMap.put("dimgrey", "#696969");
    colorMap.put("dodgerblue", "#1e90ff");
    colorMap.put("firebrick", "#b22222");
    colorMap.put("floralwhite", "#fffaf0");
    colorMap.put("forestgreen", "#228b22");
    colorMap.put("fuchsia", "#ff00ff");
    colorMap.put("gainsboro", "#dcdcdc");
    colorMap.put("ghostwhite", "#f8f8ff");
    colorMap.put("gold", "#ffd700");
    colorMap.put("goldenrod", "#daa520");
    colorMap.put("gray", "#808080");
    colorMap.put("grey", "#808080");
    colorMap.put("green", "#008000");
    colorMap.put("greenyellow", "#adff2f");
    colorMap.put("honeydew", "#f0fff0");
    colorMap.put("hotpink", "#ff69b4");
    colorMap.put("indianred", "#cd5c5c");
    colorMap.put("indigo", "#4b0082");
    colorMap.put("ivory", "#fffff0");
    colorMap.put("khaki", "#f0e68c");
    colorMap.put("lavender", "#e6e6fa");
    colorMap.put("lavenderblush", "#fff0f5");
    colorMap.put("lawngreen", "#7cfc00");
    colorMap.put("lemonchiffon", "#fffacd");
    colorMap.put("lightblue", "#add8e6");
    colorMap.put("lightcoral", "#f08080");
    colorMap.put("lightcyan", "#e0ffff");
    colorMap.put("lightgoldenrodyellow", "#fafad2");
    colorMap.put("lightgray", "#d3d3d3");
    colorMap.put("lightgrey", "#d3d3d3");
    colorMap.put("lightgreen", "#90ee90");
    colorMap.put("lightpink", "#ffb6c1");
    colorMap.put("lightsalmon", "#ffa07a");
    colorMap.put("lightseagreen", "#20b2aa");
    colorMap.put("lightskyblue", "#87cefa");
    colorMap.put("lightslategray", "#778899");
    colorMap.put("lightslategrey", "#778899");
    colorMap.put("lightsteelblue", "#b0c4de");
    colorMap.put("lightyellow", "#ffffe0");
    colorMap.put("lime", "#00ff00");
    colorMap.put("limegreen", "#32cd32");
    colorMap.put("linen", "#faf0e6");
    colorMap.put("magenta", "#ff00ff");
    colorMap.put("maroon", "#800000");
    colorMap.put("mediumaquamarine", "#66cdaa");
    colorMap.put("mediumblue", "#0000cd");
    colorMap.put("mediumorchid", "#ba55d3");
    colorMap.put("mediumpurple", "#9370db");
    colorMap.put("mediumseagreen", "#3cb371");
    colorMap.put("mediumslateblue", "#7b68ee");
    colorMap.put("mediumspringgreen", "#00fa9a");
    colorMap.put("mediumturquoise", "#48d1cc");
    colorMap.put("mediumvioletred", "#c71585");
    colorMap.put("midnightblue", "#191970");
    colorMap.put("mintcream", "#f5fffa");
    colorMap.put("mistyrose", "#ffe4e1");
    colorMap.put("moccasin", "#ffe4b5");
    colorMap.put("navajowhite", "#ffdead");
    colorMap.put("navy", "#000080");
    colorMap.put("oldlace", "#fdf5e6");
    colorMap.put("olive", "#808000");
    colorMap.put("olivedrab", "#6b8e23");
    colorMap.put("orange", "#ffa500");
    colorMap.put("orangered", "#ff4500");
    colorMap.put("orchid", "#da70d6");
    colorMap.put("palegoldenrod", "#eee8aa");
    colorMap.put("palegreen", "#98fb98");
    colorMap.put("paleturquoise", "#afeeee");
    colorMap.put("palevioletred", "#db7093");
    colorMap.put("papayawhip", "#ffefd5");
    colorMap.put("peachpuff", "#ffdab9");
    colorMap.put("peru", "#cd853f");
    colorMap.put("pink", "#ffc0cb");
    colorMap.put("plum", "#dda0dd");
    colorMap.put("powderblue", "#b0e0e6");
    colorMap.put("purple", "#800080");
    colorMap.put("rebeccapurple", "#663399");
    colorMap.put("red", "#ff0000");
    colorMap.put("rosybrown", "#bc8f8f");
    colorMap.put("royalblue", "#4169e1");
    colorMap.put("saddlebrown", "#8b4513");
    colorMap.put("salmon", "#fa8072");
    colorMap.put("sandybrown", "#f4a460");
    colorMap.put("seagreen", "#2e8b57");
    colorMap.put("seashell", "#fff5ee");
    colorMap.put("sienna", "#a0522d");
    colorMap.put("silver", "#c0c0c0");
    colorMap.put("skyblue", "#87ceeb");
    colorMap.put("slateblue", "#6a5acd");
    colorMap.put("slategray", "#708090");
    colorMap.put("slategrey", "#708090");
    colorMap.put("snow", "#fffafa");
    colorMap.put("springgreen", "#00ff7f");
    colorMap.put("steelblue", "#4682b4");
    colorMap.put("tan", "#d2b48c");
    colorMap.put("teal", "#008080");
    colorMap.put("thistle", "#d8bfd8");
    colorMap.put("tomato", "#ff6347");
    colorMap.put("turquoise", "#40e0d0");
    colorMap.put("violet", "#ee82ee");
    colorMap.put("wheat", "#f5deb3");
    colorMap.put("white", "#ffffff");
    colorMap.put("whitesmoke", "#f5f5f5");
    colorMap.put("yellow", "#ffff00");
    colorMap.put("yellowgreen", "#9acd32");
  }


  public static int getColor(String color) {
    return getColor(color, Integer.MIN_VALUE);
  }

  public static int getColor(String color, int defaultColor) {
    if (TextUtils.isEmpty(color)) {
      return defaultColor;
    }
    try {
      ColorConvertHandler[] handlers = ColorConvertHandler.values();
      String convertedColor;
      for (ColorConvertHandler handler : handlers) {
        convertedColor = handler.handle(color);
        if (!TextUtils.isEmpty(convertedColor)) {
          return Color.parseColor(convertedColor);
        }
      }
      return Color.parseColor(color);
    } catch (Exception e) {
      return defaultColor;
    }
  }

  enum ColorConvertHandler {

    TRANSPARENT_HANDLER {
      @Override
      String handle(String rawColor) {
        if (TextUtils.equals(rawColor, TRANSPARENT_KEYWORD)) {
          return TRANSPARENT_AARRGGBB;
        } else {
          return null;
        }
      }
    },
    NAMED_COLOR_HANDLER {
      @Override
      String handle(String rawColor) {
        String rrggbb = colorMap.get(rawColor);
        if (!TextUtils.isEmpty(rrggbb)) {
          return rrggbb;
        } else {
          return null;
        }
      }
    },
    RGB_HANDLER {
      @Override
      String handle(String rawColor) {
        if (!TextUtils.isEmpty(rawColor)) {
          rawColor = removeLeadingSpace(rawColor);
          if (rawColor.startsWith(HEX_PREFIX) && rawColor.length() == LENGTH_RGB) {
            StringBuilder rrggbbBuilder = new StringBuilder(HEX_PREFIX);
            for (int i = 1; i < rawColor.length(); i++) {
              rrggbbBuilder.append(rawColor.charAt(i));
              rrggbbBuilder.append(rawColor.charAt(i));
            }
            return rrggbbBuilder.toString();
          }
        }
        return null;
      }
    },
    FUNCTIONAL_RGB_HANDLER {
      @Override
      String handle(String rawColor) {
        return convertFunctionalColor(rawColor, false);
      }
    },
    FUNCTIONAL_RGBA_HANDLER {
      @Override
      String handle(String rawColor) {
        return convertFunctionalColor(rawColor, true);
      }
    };

    /**
     * Parse a functional RGB to #RRGGBB or functional RGBA to #AARRGGBB
     * @param raw functional RGB or functional RGBA
     * @param alpha true for RGBA, false for RGB
     * @return #RRGGBB or #AARRGGBB
     */
    private static String convertFunctionalColor(String raw, boolean alpha) {
      if (!TextUtils.isEmpty(raw)) {
        raw = removeLeadingSpace(raw);
        if ((!alpha && raw.startsWith(FUNCTIONAL_RGB_PREFIX) && !raw.startsWith(FUNCTIONAL_RGBA_PREFIX)) ||
            (alpha && raw.startsWith(FUNCTIONAL_RGBA_PREFIX))) {
          int start = raw.indexOf(OPEN_PAREN);
          int end = raw.lastIndexOf(CLOSE_PAREN);
          if (start != -1 && end != -1) {
            raw = raw.substring(start + 1, end);
            String[] gradients = raw.split(COMMA);
            int gradient_num = alpha ? NUM_FUNC_RGBA_GRADIENT : NUM_FUNC_RGB_GRADIENT;
            if (gradients != null && (gradients.length == gradient_num)) {
              StringBuilder rrggbbBuilder = new StringBuilder(HEX_PREFIX);
              rrggbbBuilder.append(parseRGB(gradients));
              if (alpha) {
                rrggbbBuilder.insert(1, parseAlpha(gradients[NUM_FUNC_RGBA_GRADIENT - 1]));
              }
              return rrggbbBuilder.toString();
            }
          }
        }
      }
      return null;
    }

    /**
     * Remove leading space and tab from the raw String and return the new String.
     * @param raw the original String
     * @return the new String
     */
    private static String removeLeadingSpace(String raw) {
      char c;
      int i = 0;
      for (; i < raw.length(); i++) {
        c = raw.charAt(i);
        if (c != ' ' && c != '\t') {
          break;
        }
      }
      return raw.substring(i, raw.length());
    }

    /**
     * Parse Functional RGB to RRGGBB mode
     * @param gradients gradients of functional RGB
     * @return RRGGBB color
     */
    private static String parseRGB(String[] gradients) {
      StringBuilder rrggbbBuilder = new StringBuilder();
      String gradient;
      int percent_loc;
      double value;
      for (int i = 0; i < NUM_FUNC_RGB_GRADIENT; i++) {
        gradient = gradients[i];
        gradient = removeSpace(gradient);
        if ((percent_loc = gradient.lastIndexOf(PERCENT)) != -1) {
          gradient = gradient.substring(0, percent_loc);
          value = Double.parseDouble(gradient) / PERCENT_CONVERT;
          rrggbbBuilder.append(String.format(HEX_FORMAT, (int) (COLOR_RANGE * value)));
        } else {
          rrggbbBuilder.append(String.format(HEX_FORMAT, Integer.parseInt(gradient)));
        }
      }
      return rrggbbBuilder.toString();
    }


    /**
     * Parse alpha gradient of color from range 0-1 to range 0-255
     * @param gradient the alpha value, in range 0-1
     * @return the alpha value, in range 0-255
     */
    private static String parseAlpha(String gradient) {
      double value;
      value = Double.parseDouble(gradient);
      return String.format(HEX_FORMAT, (int) (value * COLOR_RANGE));

    }

    /**
     * Remove leading and trailing space and tab from the raw String and return the new String.
     * @param raw the original String
     * @return the new String
     */
    private static String removeSpace(String raw) {
      return removeTrailingSpace(removeLeadingSpace(raw));
    }

    /**
     * Remove trailing space and tab from the raw String and return the new String.
     * @param raw the original String
     * @return the new String
     */
    private static String removeTrailingSpace(String raw) {
      char c;
      int i = raw.length() - 1;
      for (; i >= 0; i--) {
        c = raw.charAt(i);
        if (c != ' ' && c != '\t') {
          break;
        }
      }
      return raw.substring(0, i + 1);
    }

    /**
     * Parse color to #RRGGBB or #AARRGGBB. The parsing algorithm depends on sub-class.
     * @param rawColor color, maybe functional RGB(RGBA), #RGB, keywords color or transparent
     * @return #RRGGBB or #AARRGGBB
     */
    abstract String handle(String rawColor);
  }

}
