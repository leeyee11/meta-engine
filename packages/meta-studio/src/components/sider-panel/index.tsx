import React from 'react';
import ControlSettings from '@/components/sider-panel/control-settings';
import SceneSettings from '@/components/sider-panel/scene-settings';
import ActionSettings from '@/components/sider-panel/action-settings';
import {useModel} from 'umi';
import BranchSettings from './branch-settings';

/**
 * SiderPanel
 * @param {any} props
 * @return {JSX.Element}
 */
export default function() {
  const {workState} = useModel('workspace');
  const {editing} = workState;
  if (editing?.type === 'control') {
    return <ControlSettings />;
  } else if (editing?.type === 'scene') {
    return <SceneSettings/>;
  } else if (editing?.type === 'branch') {
    return <BranchSettings/>;
  } else if (editing?.type?.endsWith('-action')) {
    return <ActionSettings/>;
  }
  return null;
}
