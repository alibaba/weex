// import { isWeex } from './index';
import { isWeex } from '@/utils/jsapi.js';

const dom = weex.requireModule('dom');
const { scale } = weex.config.env;

export function scroll(
  defaults = {},
  pickerGroup = [],
  // pickerCont = [],
  oldCurIndex = [],
  pickList = [],
) {
  let startY;
  let endY;
  const translate = [];
  const curIndex = [...oldCurIndex];

  function initPos(index) {
    translate[index] = (2 - curIndex[index]) * 100; // transform移动的距离，单位是px
    return {
      offset: translate[index],
    };
  }

  function touchstart(event) {
    const touch = event.changedTouches[0];
    startY = touch.pageY;
    if (!isWeex) {
      startY /= scale;
    }
  }

  function touchmove(event, index) {
    const touch = event.changedTouches[0];
    endY = touch.pageY;
    if (!isWeex) {
      endY /= scale;
    }
    const trans = dealTouchmove(index);
    return trans;
  }

  function touchend(event, index) {
    if (!startY) return;
    const touch = event.changedTouches[0];
    endY = touch.pageY;
    if (!isWeex) {
      endY /= scale;
    }
    return dealTouchend(index);
  }

  function dealTouchmove(index) {
    const distanceY = endY - startY; // 往上滑动 endY < startY, distanceY < 0
    // 判断是否是单击
    let offset;
    if (startY !== Math.abs(distanceY)) {
      offset = distanceY + translate[index];
    }
    return {
      offset,
    };
  }

  function dealTouchend(index) {
    const distanceY = endY - startY;
    let results;
    return new Promise((resolve) => {
      if (Math.abs(distanceY) > 10) {
        results = stop(distanceY, index);
        resolve(results);
      } else {
        let relativeY;
        dom.getComponentRect(pickerGroup[index], (data) => {
          // 注意是异步的
          relativeY = data.size.top + defaults.bodyHeight / 2; // 单位是px,中间被选中的元素距离窗口顶部的距离
          results = stop(relativeY - endY, index);
          resolve(results);
        });
      }
      startY = null;
    });
  }

  function stop(distanceY, index) {
    translate[index] += distanceY; // 上滑，distanceY < 0, eg: -116px, translate[index] = -116px
    // offsets默认为2，curIndex[index] = 3
    curIndex[index] = Math.round(defaults.offset - translate[index] / 100);
    if (curIndex[index] < 0) {
      curIndex[index] = 0;
    } else if (curIndex[index] > pickList[index].length - 1) {
      curIndex[index] = pickList[index].length - 1;
    }
    translate[index] = (defaults.offset - curIndex[index]) * 100;
    const offset = translate[index];
    return {
      offset,
      translate,
      curIndex: curIndex[index],
    };
  }
  return {
    initPos,
    touchstart,
    touchmove,
    touchend,
  };
}
