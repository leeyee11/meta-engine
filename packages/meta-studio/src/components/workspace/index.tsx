import React, {useEffect, useState, useRef} from 'react';
import {useModel} from 'umi';
import ToolBar from '@/components/toolbar';
import SiderPanel from '@/components/sider-panel';
import EditableGraph from '@/components/editable-graph';
import styles from './index.less';
import {FlowBase} from '@meta-engine/flow';
import {Node, Edge, Graph} from '@antv/x6';
import {DagreLayout} from '@antv/layout';

interface WorkspaceProps {
  title: string,
}

const Index = ({title}: WorkspaceProps) => {
  const [isReady, setIsReady] = useState(false);
  const {blueprint} = useModel('game');
  const {workState, setWorkState} = useModel('workspace');
  const graphRef = useRef<Graph>();

  useEffect(() => {
    graphRef.current = EditableGraph.init();
    setIsReady(true);
    graphRef.current.on('selection:changed', (args) => {
      if (args.selected.length !== 1) {
        setWorkState((state) => ({...state, editing: state.flow}));
      } else {
        const [node] = args.selected;
        setWorkState((state) => ({...state, editing: node.data}));
      }
    });

    const resizeFn = () => {
      const {width, height} = getContainerSize();
      graphRef.current!.resize(width, height);
    };

    window.addEventListener('resize', resizeFn);
    window.dispatchEvent(new Event('resize'));
    setWorkState({
      flow: blueprint.flows.control.main,
      editing: blueprint.flows.control.main,
      type: 'control',
    });

    return () => {
      window.removeEventListener('resize', resizeFn);
    };
  }, []);

  useEffect(() => {
    if (!graphRef.current || !workState.flow) {
      return;
    }
    renderFlow(graphRef.current, workState.flow);
  }, [workState.flow]);

  const getContainerSize = () => {
    return {
      width: document.body.offsetWidth - 214 - 360 - 48,
      height: document.body.offsetHeight - 48 - 48,
    };
  };

  const renderFlow = (graph: Graph, data: FlowBase) => {
    const nodes: Node.Metadata[] = [];
    const edges: Edge.Metadata[] = [];
    data.nodes.forEach((node) => {
      nodes.push({
        id: node.id,
        type: 'scene',
        name: node.name,
        data: node,
        size: {
          width: 128,
          height: 48,
        },
        attrs: {
          label: {
            text: node.id,
          },
        },
      });
      node?.branches?.forEach(({condition, next}) => {
        edges.push({
          id: `${node.id}-${next}`,
          source: {
            cell: node.id,
            connectionPoint: 'boundary',
          },
          target: {
            cell: next,
            connectionPoint: 'boundary',
          },
          data: {
            type: 'branch',
            condition,
            next,
          },
          label: condition,
          connector: 'rounded',
          router: {
            name: 'metro',
          },
        });
      });
    });
    const model = {nodes, edges};
    const dagreLayout = new DagreLayout({
      type: 'dagre',
      ranksep: 24,
      nodesep: 50,
      controlPoints: true,
    });
    graph.fromJSON(dagreLayout.layout(model as any));
    graph.center();
    graph.zoomToFit({scaleGrid: 0.8, maxScale: 1});
  };

  return (
    <div className={styles.workspace}>
      <div className={styles.workbench}>
        <div className={styles.title}>
          <span className={styles.txt}>
            {title}
          </span>
        </div>
        <div className={styles.toolbar}>
          {isReady && <ToolBar />}
        </div>
        <div className={styles.content}>
          <div id="stencil" className={styles.shapes}></div>
          <div id="container" className={styles.container}></div>
          <div id="minimap" className={styles.minimap}></div>
        </div>
      </div>
      <SiderPanel/>
    </div>
  );
};

export default Index;
