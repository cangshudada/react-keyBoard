/**
 *
 * @description 深拷贝数组或者对象
 * @param {IDictionary<any>} target
 * @returns
 */
export default function useDeepCopy<T extends Array<T> | any>(
  sourceData: T
): T {
  if (Array.isArray(sourceData)) {
    return sourceData.map(item => useDeepCopy(item)) as T;
  }
  const deepCopyObj: T = {} as T;
  for (let key in sourceData) {
    if (typeof sourceData[key] === 'object' && sourceData[key] !== null) {
      deepCopyObj[key] = useDeepCopy(sourceData[key]);
    } else {
      deepCopyObj[key] = sourceData[key];
    }
  }
  return deepCopyObj;
}
