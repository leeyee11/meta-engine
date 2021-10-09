import {Context} from '@meta-sandbox';

export interface FlowBase {
  id: string,
  type: string
  entry: string,
  nodes: FlowNode[]
}

export interface FlowNode extends FlowBase {
  id: string,
  name: string,
  type: string,
  branches: {
    condition: string,
    next: string
  }[]
}

export interface MetaDFAState { 
  scene: string, 
  action: string
}

export interface MetaDFA {
  getContext: () => Context,
  getNode: (key: string) => FlowNode,
  getState: () => MetaDFAState,
  next: () => void,
  setContext: (nextContext: Context) => void,
  setState: (nextState: MetaDFAState) => void
}
