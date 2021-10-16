import { PathLike } from 'graceful-fs';
import { Serializable } from 'ts-serializable';
export declare const write: (file: PathLike, data: Serializable) => void;
export declare const writeSync: (file: PathLike, data: Serializable) => Promise<void>;
export declare const dump: (data: Serializable) => string;
