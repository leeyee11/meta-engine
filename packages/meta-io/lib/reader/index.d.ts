import { PathLike } from 'fs-extra';
export declare const read: (path: PathLike) => Promise<Object>;
export declare const readSync: (path: PathLike) => Object;
export declare const parse: (yaml: string) => unknown;
