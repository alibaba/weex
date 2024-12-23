/*
 * Copyright (C) 2024. Huawei Device Co., Ltd. All rights reserved.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the Apache-2.0 license.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache-2.0 license for more details.
 */

/**
 * Version compare.
 *
 * @param v1
 * @param v2
 * @returns {boolean} is v1 bigger than v2
 */
function versionCompare(v1: string, v2: string) {
  if (!v1 || !v2) {
    throw new Error('lack the version when compare the versions');
  }

  const arr1 = v1.toString().split('.');
  const arr2 = v2.toString().split('.');
  const len1 = arr1.length;
  const len2 = arr2.length;

  if (len1 !== len2) {
    len1 > len2
      ? arr2.push(...times(len1 - len2, '0'))
      : arr1.push(...times(len2 - len1, '0'));
  }
  for (let i = 0; i < Math.max(len1, len2); i++) {
    if (arr1[i] === arr2[i]) {
    } else return arr1[i] > arr2[i];
  }
  return true
}

function times(num: number, val: string) {
  const result: string[] = [];
  for (let i = 0; i < num; i++) {
    result.push(val);
  }
  return result;
}

export default versionCompare;