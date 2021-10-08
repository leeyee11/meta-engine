import {Context} from '../typings/context';
import {FlowBase, FlowNodeBase} from '../typings/flow';
import {read} from '@meta-engine/io';
import path from 'path';

const defaultFlowDir = __dirname + '../../flows';

const genGraph = async (flow: FlowBase) => {
  const {nodes} = flow;
  const graph: Record<string, FlowNodeBase> = {};
  for (const node of nodes) {
    graph[node.id] = node.type === 'scene' ?
      {
        ...node,
        ...(await read(path.resolve(defaultFlowDir + '/scene'))),
      } :
      node;
  }
  return graph;
};

const genDfa = (flow: FlowBase) => {
  const context = {
    game: {},
    player: {},
    battle: {},
    enemies: {},
  };
  const graph = genGraph(flow);
  return {

  };
};
