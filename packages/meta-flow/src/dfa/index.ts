import {Context} from '../typings/context';
import {FlowBase, FlowNodeBase} from '../typings/flow';
import io from '@meta-engine/io';
import executor from '@meta-engine/sandbox';
import path from 'path';

const defaultFlowDir = __dirname + '../../flows';
const controlFlowDir = defaultFlowDir + '/control';
const sceneFlowDir = defaultFlowDir + '/scene';

const entryFlow = io.readSync(
    path.resolve(`${controlFlowDir}/talk-on-paper.yml}`),
) as FlowBase;

const getGraphFromFlow = (flow: FlowBase) => {
  const {nodes} = flow;
  const graph: Record<string, FlowNodeBase> = {};
  for (const node of nodes) {
    const scenePath = path.resolve(`${sceneFlowDir}/${node.id}.yml`);
    const detailNode = io.readSync(scenePath);
    graph[node.id] = node.type === 'scene' ?
      {
        ...node,
        ...detailNode,
      } :
      node;
  }
  return graph;
};

const dfa = (flow: FlowBase) => {
  let current = flow.entry;
  const context: Context = {
    game: {},
    player: {},
    battle: {},
    enemies: {},
  };
  const graph = getGraphFromFlow(flow);
  return {
    getContext: () => {
      return context;
    },
    getCurrentScene: () => {
      return graph[current];
    },
    next: () => {
      const {branches=[]} = graph[current];
      const success = branches.find((branch) => {
        return executor.test(context, branch.condition);
      });
      if (success) {
        current = success.next;
      }
    },
  };
};


export default dfa(entryFlow);
