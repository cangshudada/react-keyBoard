/**
 * @description 深拷贝数组或者对象
 * @param {T} target
 * @returns {T} 深拷贝后的数组或者对象
 */
export const deepCopy = <T extends Array<T> | any>(sourceData: T): T => {
  if (Array.isArray(sourceData)) {
    return sourceData.map(item => deepCopy(item)) as T;
  }
  const deepCopyObj: T = {} as T;
  for (let key in sourceData) {
    if (typeof sourceData[key] === 'object' && sourceData[key] !== null) {
      deepCopyObj[key] = deepCopy(sourceData[key]);
    } else {
      deepCopyObj[key] = sourceData[key];
    }
  }
  return deepCopyObj;
};

/**
 * @description 按特定长度切割数组
 * @param {T[]} array 需要分组的数组
 * @param {number} subGroupLength 切割长度
 * @returns {T[][]} 切割后的数组
 */
export const groupSplitArray = <T>(array: T[], subGroupLength: number):T[][] => {
  let index = 0;
  const newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)));
  }
  return newArray;
};
