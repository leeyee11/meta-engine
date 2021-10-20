import {Graph} from '@antv/x6';

export const ports = {
  groups: {
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
  },
  items: [
    {
      group: 'top',
    },
    {
      group: 'bottom',
    },
    {
      group: 'left',
    },
    {
      group: 'right',
    },
  ],
};

// register node shape
Graph.registerNode('scene', {
  inherit: 'rect',
  width: 30,
  height: 15,
  attrs: {
    body: {
      strokeWidth: 1,
    },
  },
  ports: {...ports},
});

Graph.registerNode('action', {
  inherit: 'polygon',
  width: 30,
  height: 15,
  attrs: {
    body: {
      strokeWidth: 1,
    },
  },
  ports: {...ports},
});
