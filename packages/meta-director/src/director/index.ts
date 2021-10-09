import flow from '@meta-engine/flow';
import adapter from '@meta-engine/adapter';
import {load as loadAction} from '@meta-engine/action';

const CliActionTypes = [
  'inquire-action',
  'output-action',
];
const SysActionTypes = [
  'exit',
];

export const start = async () => {
  const dfa = flow.dfa;
  while (dfa.getState().action) {
    const actionNode = dfa.getNode(dfa.getState().action);
    if (CliActionTypes.includes(actionNode.type)){
      const nextContext = await adapter.cli(
          dfa.getContext(),
          loadAction(actionNode.type, actionNode.id),
      );
      dfa.setContext(nextContext);
    } else if (SysActionTypes.includes(actionNode.type)) {
      if (actionNode.type === 'exit') {
        dfa.setState({...dfa.getState(), action: ''});
      }
    } else {
      console.log('unknown action type:', actionNode.type);
    }
    dfa.next();
  }
};


export const pause = () => {

};


export const stop = () => {

};
