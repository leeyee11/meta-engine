import { ActionBase, ActionType } from './typings/action';
export declare const load: (rawType: string, name: string) => ActionBase;
export declare const save: (type: ActionType, action: ActionBase) => Promise<void>;
export type { ActionBase, ActionType, };
