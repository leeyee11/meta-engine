import {dump} from 'js-yaml';
import {FlowBase} from '@meta-engine/flow';
import {ActionBase} from '@meta-engine/action';
import {RuleBase} from '@meta-engine/rule';

export const write = (flow: ActionBase | FlowBase | RuleBase) => {
  return dump(flow);
};
