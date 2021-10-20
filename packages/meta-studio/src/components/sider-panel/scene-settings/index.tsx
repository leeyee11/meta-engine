import React from 'react';
import {Form, Input, Button} from 'antd';
import {useModel} from 'umi';
import styles from './index.less';
import {FlowBase} from '@meta-engine/flow';
/**
 * SiderPanel
 * @param {any} props
 * @return {JSX.Element}
 */
export default function() {
  const {blueprint} = useModel('game');
  const {workState: {editing, type}, setWorkState} = useModel('workspace');
  const onFinish = () => {};

  const handleBackToControl = () => {
    setWorkState({
      flow: blueprint.flows.control.main,
      editing: blueprint.flows.control.main,
      type: 'control',
    });
  };

  const handleEditScene = () => {
    if (!editing?.id) return;
    setWorkState({
      flow: blueprint.flows.scene[editing.id],
      editing: blueprint.flows.scene[editing?.id],
      type: 'scene',
    });
  };


  return (
    <div className={styles.settings}>
      <div className={styles.title}>
        <span>Scene Flow Settings</span>
      </div>
      <div className={styles.wrap}>
        <Form
          name="nodeSetting"
          className={styles.settingsForm}
          initialValues={{...editing as FlowBase}}
          onFinish={onFinish}
        >
          <Form.Item
            name="id"
            label="id"
            labelCol={{span: 4}}
            rules={[{required: true, message: 'Please enter the id'}]}
          >
            <Input disabled={type === 'scene'} placeholder="Node ID" />
          </Form.Item>
          <Form.Item style={{marginTop: '40px', textAlign: 'center'}}>
            <Button.Group style={{width: '100%', display: 'flex'}}>
              {
                type === 'scene'?
                <Button
                  htmlType="submit"
                  onClick={handleBackToControl}
                  className={styles.settingsFormButton}>
                  Back to Control
                </Button> :
                <Button
                  htmlType="submit"
                  onClick={handleEditScene}
                  className={styles.settingsFormButton}>
                    Edit Detail
                </Button>
              }
              <Button
                type="primary"
                htmlType="submit"
                className={styles.settingsFormButton}>
                  Save
              </Button>
            </Button.Group>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
