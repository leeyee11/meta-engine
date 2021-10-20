import {ActionBase} from '@meta-engine/action';
import {FlowBase} from '@meta-engine/flow';
import {useState} from 'react';

interface WorkPlaceState {
  flow?: FlowBase,
  editing?: FlowBase | ActionBase
  type?: 'control' | 'scene',
}
export default () => {
  const [workState, setWorkState] = useState<WorkPlaceState>({
    flow: undefined,
    editing: undefined,
    type: undefined,
  });

  return {
    workState,
    setWorkState,
  };
};
