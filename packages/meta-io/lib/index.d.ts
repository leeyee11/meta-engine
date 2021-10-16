/// <reference types="node" />
declare const _default: {
    read: (path: import("fs").PathLike) => Promise<Object>;
    readSync: (path: import("fs").PathLike) => Object;
    write: (file: import("fs").PathLike, data: import("ts-serializable").Serializable) => void;
    writeSync: (file: import("fs").PathLike, data: import("ts-serializable").Serializable) => Promise<void>;
};
export default _default;
