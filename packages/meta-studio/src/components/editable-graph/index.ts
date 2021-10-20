import {Graph, Addon, Shape, FunctionExt} from '@antv/x6';
import './shape';

/**
 * EditableGraph
 */
export default class Editablegraph {
  public static graph: Graph
  private static stencil: Addon.Stencil

  /**
   * init
   * @return {null}
   */
  public static init() {
    this.graph = new Graph({
      container: document.getElementById('container')!,
      width: 1000,
      height: 800,

      grid: {
        size: 10,
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#E7E8EA',
            thickness: 1,
          },
          {
            color: '#CBCED3',
            thickness: 1,
            factor: 5,
          },
        ],
      },
      panning: {
        enabled: true,
        eventTypes: ['leftMouseDown', 'rightMouseDown', 'mouseWheel'],
        modifiers: 'ctrl',
      },

      mousewheel: {
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: 'ctrl',
        minScale: 0.5,
        maxScale: 3,
      },

      connecting: {
        router: 'manhattan',
        connector: {
          name: 'rounded',
          args: {
            radius: 8,
          },
        },
        anchor: 'center',
        connectionPoint: 'anchor',
        snap: true,
        allowBlank: false,
        allowLoop: false,
        allowNode: false,
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#000',
                strokeWidth: 1,
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8,
                },
              },
            },
            zIndex: 0,
          });
        },
        validateConnection({targetMagnet}) {
          return !!targetMagnet;
        },
      },

      highlighting: {
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#D06269',
              stroke: '#D06269',
            },
          },
        },
      },
      resizing: true,
      rotating: true,

      selecting: {
        enabled: true,
        rubberband: true,
        showNodeSelectionBox: true,
      },
      snapline: true,
      keyboard: true,
      history: true,

      minimap: {
        enabled: true,
        container: document.getElementById('minimap')!,
        width: 198,
        height: 198,
        padding: 10,
      },
      clipboard: true,
    });
    this.initStencil();
    this.initShape();
    this.initEvent();
    return this.graph;
  }

  /**
   * initStencil
   */
  private static initStencil() {
    const self = this;
    this.stencil = new Addon.Stencil({
      title: 'Flow Nodes',
      target: this.graph,
      stencilGraphWidth: 214,
      stencilGraphHeight: document.body.offsetHeight - 96,
      layoutOptions: {
        columns: 4,
        columnWidth: 48,
        rowHeight: 40,
        marginY: 20,
      },
      getDropNode(node: any) {
        const size = node.size();
        const {type} = node.store.data;
        const label: String = self.getLabel(type);
        return node.clone()
            .size(size.width * 4, size.height * 4)
            .attr('label/text', label);
      },
    });

    const stencilContainer = document.querySelector('#stencil')!;
    if (stencilContainer) {
      stencilContainer.appendChild(this.stencil.container);
    }
  }

  /**
   * initShape
   */
  private static initShape() {
    const graph = this.graph;

    const sceneShape = graph.createNode({
      shape: 'scene',
      type: 'rect',
    });

    const actionShape = graph.createNode({
      shape: 'action',
      type: 'polygon-rhomboid',
      attrs: {
        body: {
          refPoints: '10,0 40,0 30,20 0,20',
        },
      },
    });

    this.stencil.load([sceneShape, actionShape]);
  }

  /**
   * showPorts
   * @param {NodeListOf<SVGElement>} ports
   * @param {boolean} show
   */
  private static showPorts(ports: NodeListOf<SVGElement>, show: boolean) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden';
    }
  }

  /**
   * initEvent
   */
  private static initEvent() {
    const graph = this.graph;
    const container = document.getElementById('container')!;


    graph.on('node:mouseenter', FunctionExt.debounce((nodeAttr: any) => {
      const ports = container.querySelectorAll(
          '.x6-port-body',
      ) as NodeListOf<SVGElement>;
      this.showPorts(ports, true);


      const {node} = nodeAttr;
      const {width} = node.store.data.size;
      node.addTools({
        name: 'button-remove',
        args: {x: 0, y: 0, offset: {x: width / 2 + 5, y: 20}},
      });
    }), 500);

    graph.on('node:mouseleave', ({node}) => {
      const ports = container.querySelectorAll(
          '.x6-port-body',
      ) as NodeListOf<SVGElement>;
      this.showPorts(ports, false);


      node.removeTools();
    });

    graph.on('edge:mouseenter', ({edge}) => {
      edge.addTools([
        'source-arrowhead',
        'target-arrowhead',
        {
          name: 'button-remove',
          args: {
            distance: -30,
          },
        },
      ]);
    });
  }

  /**
   * getLabel
   * @param {string} type
   * @return {string}
   */
  private static getLabel(type: String) {
    let label: String = '';

    switch (type) {
      case 'rect':
        label = 'Scene Node';
        break;
      case 'polygon-rhomboid':
        label = 'Action Node';
        break;
    }
    return label;
  }
}
