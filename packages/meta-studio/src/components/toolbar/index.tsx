import React, {useEffect, useState} from 'react';
import {Toolbar} from '@antv/x6-react-components';
import EditableGraph from '@/components/editable-graph';
import {DataUri} from '@antv/x6';
import {
  ClearOutlined,
  SaveOutlined,
  UndoOutlined,
  RedoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import '@antv/x6-react-components/es/toolbar/style/index.css';

const Item = Toolbar.Item;
const Group = Toolbar.Group;
/**
 * ToolBar
 * @return {JSX.Element}
 */
export default function() {
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const {graph} = EditableGraph;
    // history
    const {history} = graph;
    setCanUndo(history.canUndo());
    setCanRedo(history.canRedo());
    history.on('change', () => {
      setCanUndo(history.canUndo());
      setCanRedo(history.canRedo());
    });
    // zoom
    setZoom(graph.zoom());
    graph.on('scale', () => {
      setZoom(graph.zoom());
    });
  }, []);

  const handleClick = (name: string) => {
    const {graph} = EditableGraph;
    switch (name) {
      case 'undo':
        graph.history.undo();
        break;
      case 'redo':
        graph.history.redo();
        break;
      case 'delete':
        graph.clearCells();
        break;
      case 'save':
        graph.toPNG((datauri: string) => {
          DataUri.downloadDataUri(datauri, 'flowGraph.png');
        });
        break;
      case 'zoomIn':
        graph.zoom(0.1);
        break;
      case 'zoomOut':
        graph.zoom(-0.1);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Toolbar hoverEffect={true} size="small" onClick={handleClick}>
        <Group>
          <Item
            name="delete"
            icon={<ClearOutlined />}
            tooltip="清除"
          />
        </Group>
        <Group>
          <Item
            name="zoomIn"
            tooltip="放大"
            icon={<ZoomInOutlined />}
            disabled={zoom > 1.5}
          />
          <Item
            name="zoomOut"
            tooltip="缩小"
            icon={<ZoomOutOutlined />}
            disabled={zoom < 0.5}
          />
          <span style={{lineHeight: '28px', fontSize: 12, marginRight: 4}}>
            {`${(zoom * 100).toFixed(0)}%`}
          </span>
        </Group>
        <Group>
          <Item
            name="undo"
            tooltip="撤销"
            icon={<UndoOutlined />}
            disabled={!canUndo}
          />
          <Item
            name="redo"
            tooltip="重做"
            icon={<RedoOutlined />}
            disabled={!canRedo}
          />
        </Group>
        <Group>
          <Item
            name="save"
            icon={<SaveOutlined />}
            tooltip="保存"
          />
        </Group>
      </Toolbar>
    </div>
  );
}
