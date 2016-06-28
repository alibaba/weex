/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.common;

import java.util.AbstractList;
import java.util.Collections;
import java.util.List;
import java.util.RandomAccess;

public final class ListUtil {
  private ListUtil() {
  }

  /**
   * Compares the contents of two {@link List}s by using object identity.
   */
  public static <T> boolean identityEquals(List<? extends T> list1, List<? extends T> list2) {
    if (list1 == list2) {
      return true;
    }
    int size = list1.size();
    if (size != list2.size()) {
      return false;
    }
    for (int i = 0; i < size; ++i) {
      if (list1.get(i) != list2.get(i)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Copies the given {@link List} and returns the copy as an immutable {@link List}.
   */
  public static <T> List<T> copyToImmutableList(List<T> list) {
    if (list instanceof ImmutableList) {
      return list;
    }
    int size = list.size();
    switch (size) {
      case 0:
        return Collections.emptyList();
      case 1:
        return new OneItemImmutableList<>(list.get(0));
      case 2:
        return new TwoItemImmutableList<>(list.get(0), list.get(1));
      case 3:
        return new ThreeItemImmutableList<>(list.get(0), list.get(1), list.get(2));
      case 4:
        return new FourItemImmutableList<>(list.get(0), list.get(1), list.get(2), list.get(3));
      case 5:
        return new FiveItemImmutableList<>(
            list.get(0), list.get(1), list.get(2), list.get(3), list.get(4));
      default:
        Object[] array = list.toArray();
        return new ImmutableArrayList<>(array);
    }
  }

  public static <T> List<T> newImmutableList(T item) {
    return new OneItemImmutableList<>(item);
  }

  private static interface ImmutableList<E> extends List<E>, RandomAccess {
  }

  private static final class ImmutableArrayList<E>
      extends AbstractList<E> implements ImmutableList<E> {
    private final Object[] mArray;

    public ImmutableArrayList(Object[] array) {
      mArray = array;
    }

    @Override
    @SuppressWarnings("unchecked")
    public E get(int location) {
      return (E) mArray[location];
    }

    @Override
    public int size() {
      return mArray.length;
    }
  }

  private static final class OneItemImmutableList<E>
      extends AbstractList<E> implements ImmutableList<E> {
    private final E mItem;

    public OneItemImmutableList(E item) {
      mItem = item;
    }

    @Override
    public E get(int location) {
      if (location == 0) {
        return mItem;
      } else {
        throw new IndexOutOfBoundsException();
      }
    }

    @Override
    public int size() {
      return 1;
    }
  }

  private static final class TwoItemImmutableList<E>
      extends AbstractList<E> implements ImmutableList<E> {
    private final E mItem0;
    private final E mItem1;

    public TwoItemImmutableList(E item0, E item1) {
      mItem0 = item0;
      mItem1 = item1;
    }

    @Override
    public E get(int location) {
      switch (location) {
        case 0:
          return mItem0;
        case 1:
          return mItem1;
        default:
          throw new IndexOutOfBoundsException();
      }
    }

    @Override
    public int size() {
      return 2;
    }
  }

  private static final class ThreeItemImmutableList<E>
      extends AbstractList<E> implements ImmutableList<E> {
    private final E mItem0;
    private final E mItem1;
    private final E mItem2;

    public ThreeItemImmutableList(E item0, E item1, E item2) {
      mItem0 = item0;
      mItem1 = item1;
      mItem2 = item2;
    }

    @Override
    public E get(int location) {
      switch (location) {
        case 0:
          return mItem0;
        case 1:
          return mItem1;
        case 2:
          return mItem2;
        default:
          throw new IndexOutOfBoundsException();
      }
    }

    @Override
    public int size() {
      return 3;
    }
  }

  private static final class FourItemImmutableList<E>
      extends AbstractList<E> implements ImmutableList<E> {
    private final E mItem0;
    private final E mItem1;
    private final E mItem2;
    private final E mItem3;

    public FourItemImmutableList(E item0, E item1, E item2, E item3) {
      mItem0 = item0;
      mItem1 = item1;
      mItem2 = item2;
      mItem3 = item3;
    }

    @Override
    public E get(int location) {
      switch (location) {
        case 0:
          return mItem0;
        case 1:
          return mItem1;
        case 2:
          return mItem2;
        case 3:
          return mItem3;
        default:
          throw new IndexOutOfBoundsException();
      }
    }

    @Override
    public int size() {
      return 4;
    }
  }

  private static final class FiveItemImmutableList<E>
      extends AbstractList<E> implements ImmutableList<E> {
    private final E mItem0;
    private final E mItem1;
    private final E mItem2;
    private final E mItem3;
    private final E mItem4;

    public FiveItemImmutableList(E item0, E item1, E item2, E item3, E item4) {
      mItem0 = item0;
      mItem1 = item1;
      mItem2 = item2;
      mItem3 = item3;
      mItem4 = item4;
    }

    @Override
    public E get(int location) {
      switch (location) {
        case 0:
          return mItem0;
        case 1:
          return mItem1;
        case 2:
          return mItem2;
        case 3:
          return mItem3;
        case 4:
          return mItem4;
        default:
          throw new IndexOutOfBoundsException();
      }
    }

    @Override
    public int size() {
      return 5;
    }
  }
}
