import { isPlainObject, transform } from 'lodash';
import { unescape } from 'he';

// lodash库里的防抖函数不支持给回调函数传入参数，所以自己实现一个防抖函数
export const debounce = (callback, delay = 1000) => {
  let timerId = null;
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

// 深层递归将对象字段中的null值替换为undefined，方便解构赋值时对变量赋默认值
export const trimNull = (object, { nullValues = true, escape = true } = {}) =>
  transform(object, (result, value, key) => {
    // Exclude specific keys.
    // Recurse into arrays and objects.
    if (Array.isArray(value) || isPlainObject(value)) {
      value = trimNull(value, { nullValues, escape });
    }
    // Exclude null values.
    if (nullValues && value === null) {
      value = undefined;
    }
    // unescape
    if (escape && typeof value === 'string') {
      // value = unescape(value);
      value = unescape(value);
    }
    result[key] = value;
  });
