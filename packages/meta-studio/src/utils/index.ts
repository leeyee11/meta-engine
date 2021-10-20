import {GameBlueprint} from '@/models/game';

export const createGameBlueprint = (): GameBlueprint => {
  return {
    flows: {
      control: {
        main: {
          id: 'main',
          name: 'main',
          type: 'control',
          entry: 'default',
          nodes: [],
        },
      },
      scene: {
        default: {
          id: 'default',
          name: 'default',
          type: 'scene',
          entry: '',
          nodes: [],
        },
      },
    },
    actions: {
      inquire: {},
      update: {},
      goto: {},
      output: {},
      unknown: {},
    },
    rules: {
      battle: {},
      event: {},
    },
  };
};
