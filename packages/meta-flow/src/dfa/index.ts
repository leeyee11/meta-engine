import {Context} from '../typings/context';
import {FlowBase, FlowNode, MetaDFA, MetaDFAState} from '../typings/flow';
import initialContext from './initialContext';
import io from '@meta-engine/io';
import executor from '@meta-engine/sandbox';
import path from 'path';
import _ from 'lodash';

const defaultFlowDir = __dirname + './../../flows';
const controlFlowDir = defaultFlowDir + '/control';
const sceneFlowDir = defaultFlowDir + '/scene';

const entryFlow = io.readSync(
    path.resolve(`${controlFlowDir}/talk-on-paper.yml`),
) as FlowBase;

const getGraphFromFlow = (flow: FlowBase) => {
  const {nodes: sceneNodes} = flow;
  const graph: Record<string, FlowNode> = {};
  for (const sceneNode of sceneNodes) {
    const scenePath = path.resolve(`${sceneFlowDir}/${sceneNode.id}.yml`);
    const detailNode = io.readSync(scenePath) as FlowNode;
    graph[sceneNode.id] = {
      ...sceneNode,
      ...detailNode,
    };
    const {nodes: actionNodes} = detailNode;
    for (const actionNode of actionNodes) {
      graph[actionNode.id] = actionNode;
    }
  }
  return graph;
};

const dfa = (flow: FlowBase): MetaDFA => {
  const graph = getGraphFromFlow(flow);
  let context: Context = _.cloneDeep(initialContext);
  let scene = flow.entry;
  let action = graph[scene].entry;

  return {
    getContext: () => {
      return context;
    },
    getState: () => {
      return {
        action,
        scene,
      };
    },
    getNode: (key: string) => {
      return graph[key];
    },
    setContext: (nextContext: Context) => {
      context = nextContext;
    },
    setState: (nextState: MetaDFAState) => {
      scene = nextState.scene;
      action = nextState.action;
    },
    next: () => {
      if (context.player.hp <= 0 && scene !== 'game-over') {
        scene = 'game-over';
        action = 'you-died';
        context = initialContext;
        return;
      }
      if (action) {
        const {branches=[]} = graph[action];
        const success = branches.find((branch) =>
          !branch.condition || executor.run(context, branch.condition),
        );
        if (success) {
          action = success.next;
        }
      } else if (scene) {
        const {branches=[]} = graph[scene];
        const success = branches.find((branch) =>
          !branch.condition || executor.run(context, branch.condition),
        );

        if (success) {
          scene = success.next;
          action = graph[scene].entry;
        }
      } else {
        throw new Error('Out of graph');
      }
    },
  };
};

const instance: MetaDFA = dfa(entryFlow);

export default instance;
