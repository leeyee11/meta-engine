import { ActionBase } from '@meta-engine/action';
declare enum ConditionType {
    TRIGGER = 0,
    SCHEDULE = 1
}
declare enum CheckType {
    COMPARE = 0,
    MATCH = 1
}
export interface ConditionBase {
    type: ConditionType;
    checkBy: CheckType;
    expression: string;
    success?: ActionBase;
    failure?: ActionBase;
}
export {};
