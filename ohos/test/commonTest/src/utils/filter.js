import { divide as chu } from './fixFloat.js';

export const friendLikeNumber = (number = 0) => {
  if (number < 1000) {
    return number;
  } else if (number > 10000) {
    return `${chu(number, 10000).toFixed(1)}w`;
  }
};
