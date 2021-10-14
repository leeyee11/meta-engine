import {ActionBase} from '@meta-engine/action';

enum ConditionType {
    TRIGGER,
    SCHEDULE
}

enum CheckType {
    COMPARE,
    MATCH
}

export interface ConditionBase {
    type: ConditionType,
    checkBy: CheckType,
    expression: string,
    success?: ActionBase,
    failure?: ActionBase
}
