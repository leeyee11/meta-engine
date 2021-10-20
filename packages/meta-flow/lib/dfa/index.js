"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const initialContext_1 = __importDefault(require("./initialContext"));
const io_1 = __importDefault(require("@meta-engine/io"));
const sandbox_1 = __importDefault(require("@meta-engine/sandbox"));
const path_1 = __importDefault(require("path"));
const entry = path_1.default.resolve(__dirname, `${process.cwd()}/${process.env.GAME_ROOT}/${process.env.GAME_ID}/flows/control/main.yml`);
const sceneFlowDir = path_1.default.resolve(__dirname, `${process.cwd()}/${process.env.GAME_ROOT}/${process.env.GAME_ID}/flows/scene`);
const entryFlow = io_1.default.readSync(entry);
const getGraphFromFlow = (flow) => {
    const { nodes: sceneNodes } = flow;
    const graph = {};
    for (const sceneNode of sceneNodes) {
        const scenePath = path_1.default.resolve(`${sceneFlowDir}/${sceneNode.id}.yml`);
        const detailNode = io_1.default.readSync(scenePath);
        graph[sceneNode.id] = {
            ...sceneNode,
            ...detailNode,
        };
        const { nodes: actionNodes } = detailNode;
        for (const actionNode of actionNodes) {
            graph[actionNode.id] = actionNode;
        }
    }
    return graph;
};
const dfa = (flow) => {
    const graph = getGraphFromFlow(flow);
    let context = initialContext_1.default;
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
        getNode: (key) => {
            return graph[key];
        },
        setContext: (nextContext) => {
            context = nextContext;
        },
        setState: (nextState) => {
            scene = nextState.scene;
            action = nextState.action;
        },
        next: () => {
            if (context.player.hp <= 0 && scene !== 'game-over') {
                scene = 'game-over';
                action = 'you-died';
                context = initialContext_1.default;
                return;
            }
            if (action) {
                const { branches = [] } = graph[action];
                const success = branches.find((branch) => !branch.condition || sandbox_1.default.run(context, branch.condition));
                if (success) {
                    action = success.next;
                }
            }
            else if (scene) {
                const { branches = [] } = graph[scene];
                const success = branches.find((branch) => !branch.condition || sandbox_1.default.run(context, branch.condition));
                if (success) {
                    scene = success.next;
                    action = graph[scene].entry;
                }
            }
            else {
                throw new Error('Out of graph');
            }
        },
    };
};
const instance = dfa(entryFlow);
exports.default = instance;
