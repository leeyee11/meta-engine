import {dump} from 'js-yaml';
import {FlowBase} from '../typings/flow';
export const write = (flow: FlowBase) => {
  return dump(flow);
};
