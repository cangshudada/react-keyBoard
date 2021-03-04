import { IDictionary } from '../';
/**
 * @description axiso 配置
 * @param {number[]} lpXis 轨迹X
 * @param {number[]} lpYis 轨迹Y
 * @param {number[]} lpCis 轨迹标志位
 * @param {string} lib 中英文
 */
export declare const getWordFromHandWrite: (lpXis: number[], lpYis: number[], lpCis: number[], lib: string) => IDictionary<any>;
