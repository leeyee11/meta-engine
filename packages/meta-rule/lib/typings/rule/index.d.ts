import { ConditionBase } from '../condition';
export declare enum RuleType {
    battle = "battle",
    event = "event"
}
export interface RuleBase {
    id: string;
    name: string;
    priority: number;
    conditions: ConditionBase[];
}
