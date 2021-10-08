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

export interface MetaDFA {
  getContext: () => Context,
  getNode: (key: string) => FlowNode,
  getState: () => { scene: string, action: string },
  next: () => void,
}
