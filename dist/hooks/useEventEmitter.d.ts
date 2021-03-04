declare class EventEmitter {
    private listeners;
    constructor();
    on(type: string, cb: (...args: any[]) => void): () => void;
    emit(type: string, ...args: any[]): void;
    remove(type: string, cb?: (...args: any[]) => void): void;
}
declare const _default: EventEmitter;
export default _default;
