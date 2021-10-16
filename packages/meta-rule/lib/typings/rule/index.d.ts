import { ConditionBase } from '../condition';
export interface RuleBase {
    id: string;
    name: string;
    priority: number;
    conditions: ConditionBase[];
}
