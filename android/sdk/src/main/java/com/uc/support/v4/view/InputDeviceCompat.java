/*
 * Copyright (C) 2015 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.uc.support.v4.view;

/**
 * Helper class for accessing values in {@link android.view.InputDevice}.
 */
public class InputDeviceCompat {

    /**
     * A mask for input source classes.
     *
     * Each distinct input source constant has one or more input source class bits set to
     * specify the desired interpretation for its input events.
     */
    public static final int SOURCE_CLASS_MASK = 0x000000ff;

    /**
     * The input source has no class.
     *
     * It is up to the application to determine how to handle the device based on the device type.
     */
    public static final int SOURCE_CLASS_NONE = 0x00000000;

    /**
     * The input source has buttons or keys.
     * Examples: {@link #SOURCE_KEYBOARD}, {@link #SOURCE_DPAD}.
     *
     * A {@link android.view.KeyEvent} should be interpreted as a button or key press.
     */
    public static final int SOURCE_CLASS_BUTTON = 0x00000001;

    /**
     * The input source is a pointing device associated with a display.
     * Examples: {@link #SOURCE_TOUCHSCREEN}, {@link #SOURCE_MOUSE}.
     *
     * A {@link android.view.MotionEvent} should be interpreted as absolute coordinates in
     * display units according to the {@link android.view.View} hierarchy.  Pointer down/up
     * indicated when
     * the finger touches the display or when the selection button is pressed/released.
     *
     * Use {@link android.view.InputDevice#getMotionRange} to query the range of the pointing
     * device.  Some devices permit
     * touches outside the display area so the effective range may be somewhat smaller or larger
     * than the actual display size.
     */
    public static final int SOURCE_CLASS_POINTER = 0x00000002;

    /**
     * The input source is a trackball navigation device.
     * Examples: {@link #SOURCE_TRACKBALL}.
     *
     * A {@link android.view.MotionEvent} should be interpreted as relative movements in
     * device-specific
     * units used for navigation purposes.  Pointer down/up indicates when the selection button
     * is pressed/released.
     *
     * Use {@link android.view.InputDevice#getMotionRange} to query the range of motion.
     */
    public static final int SOURCE_CLASS_TRACKBALL = 0x00000004;

    /**
     * The input source is an absolute positioning device not associated with a display
     * (unlike {@link #SOURCE_CLASS_POINTER}).
     *
     * A {@link android.view.MotionEvent} should be interpreted as absolute coordinates in
     * device-specific surface units.
     *
     * Use {@link android.view.InputDevice#getMotionRange} to query the range of positions.
     */
    public static final int SOURCE_CLASS_POSITION = 0x00000008;

    /**
     * The input source is a joystick.
     *
     * A {@link android.view.MotionEvent} should be interpreted as absolute joystick movements.
     *
     * Use {@link android.view.InputDevice#getMotionRange} to query the range of positions.
     */
    public static final int SOURCE_CLASS_JOYSTICK = 0x00000010;

    /**
     * The input source is unknown.
     */
    public static final int SOURCE_UNKNOWN = 0x00000000;

    /**
     * The input source is a keyboard.
     *
     * This source indicates pretty much anything that has buttons.  Use
     * {@link android.view.InputDevice#getKeyboardType()} to determine whether the keyboard has
     * alphabetic keys
     * and can be used to enter text.
     *
     * @see #SOURCE_CLASS_BUTTON
     */
    public static final int SOURCE_KEYBOARD = 0x00000100 | SOURCE_CLASS_BUTTON;

    /**
     * The input source is a DPad.
     *
     * @see #SOURCE_CLASS_BUTTON
     */
    public static final int SOURCE_DPAD = 0x00000200 | SOURCE_CLASS_BUTTON;

    /**
     * The input source is a game pad.
     * (It may also be a {@link #SOURCE_JOYSTICK}).
     *
     * @see #SOURCE_CLASS_BUTTON
     */
    public static final int SOURCE_GAMEPAD = 0x00000400 | SOURCE_CLASS_BUTTON;

    /**
     * The input source is a touch screen pointing device.
     *
     * @see #SOURCE_CLASS_POINTER
     */
    public static final int SOURCE_TOUCHSCREEN = 0x00001000 | SOURCE_CLASS_POINTER;

    /**
     * The input source is a mouse pointing device.
     * This code is also used for other mouse-like pointing devices such as trackpads
     * and trackpoints.
     *
     * @see #SOURCE_CLASS_POINTER
     */
    public static final int SOURCE_MOUSE = 0x00002000 | SOURCE_CLASS_POINTER;

    /**
     * The input source is a stylus pointing device.
     * <p>
     * Note that this bit merely indicates that an input device is capable of obtaining
     * input from a stylus.  To determine whether a given touch event was produced
     * by a stylus, examine the tool type returned by {@link android.view.MotionEvent#getToolType(int)}
     * for each individual pointer.
     * </p><p>
     * A single touch event may multiple pointers with different tool types,
     * such as an event that has one pointer with tool type
     * {@link android.view.MotionEvent#TOOL_TYPE_FINGER} and another pointer with tool type
     * {@link android.view.MotionEvent#TOOL_TYPE_STYLUS}.  So it is important to examine
     * the tool type of each pointer, regardless of the source reported
     * by {@link android.view.MotionEvent#getSource()}.
     * </p>
     *
     * @see #SOURCE_CLASS_POINTER
     */
    public static final int SOURCE_STYLUS = 0x00004000 | SOURCE_CLASS_POINTER;

    /**
     * The input source is a trackball.
     *
     * @see #SOURCE_CLASS_TRACKBALL
     */
    public static final int SOURCE_TRACKBALL = 0x00010000 | SOURCE_CLASS_TRACKBALL;

    /**
     * The input source is a touch pad or digitizer tablet that is not
     * associated with a display (unlike {@link #SOURCE_TOUCHSCREEN}).
     *
     * @see #SOURCE_CLASS_POSITION
     */
    public static final int SOURCE_TOUCHPAD = 0x00100000 | SOURCE_CLASS_POSITION;

    /**
     * The input source is a touch device whose motions should be interpreted as navigation events.
     *
     * For example, an upward swipe should be as an upward focus traversal in the same manner as
     * pressing up on a D-Pad would be. Swipes to the left, right and down should be treated in a
     * similar manner.
     *
     * @see #SOURCE_CLASS_NONE
     */
    public static final int SOURCE_TOUCH_NAVIGATION = 0x00200000 | SOURCE_CLASS_NONE;

    /**
     * The input source is a joystick.
     * (It may also be a {@link #SOURCE_GAMEPAD}).
     *
     * @see #SOURCE_CLASS_JOYSTICK
     */
    public static final int SOURCE_JOYSTICK = 0x01000000 | SOURCE_CLASS_JOYSTICK;

    /**
     * The input source is a device connected through HDMI-based bus.
     *
     * The key comes in through HDMI-CEC or MHL signal line, and is treated as if it were
     * generated by a locally connected DPAD or keyboard.
     */
    public static final int SOURCE_HDMI = 0x02000000 | SOURCE_CLASS_BUTTON;

    /**
     * A special input source constant that is used when filtering input devices
     * to match devices that provide any type of input source.
     */
    public static final int SOURCE_ANY = 0xffffff00;
}
