import React from 'react';
import {Form, Input, Button} from 'antd';
import {useModel} from 'umi';
import styles from './index.less';
import {ActionBase} from '@meta-engine/action';
/**
 * SiderPanel
 * @param {any} props
 * @return {JSX.Element}
 */
export default function() {
  const {workState: {editing}} = useModel('workspace');
  const onFinish = () => {};

  return (
    <div className={styles.settings}>
      <div className={styles.title}>
        <span>Action Settings</span>
      </div>
      <div className={styles.wrap}>
        <Form
          name="nodeSetting"
          className={styles.settingsForm}
          initialValues={{...editing as ActionBase}}
          onFinish={onFinish}
        >
          <Form.Item
            name="id"
            label="id"
            labelCol={{span: 4}}
            rules={[{required: true, message: 'Please enter the id'}]}
          >
            <Input disabled placeholder="Node ID" />
          </Form.Item>
          <Form.Item style={{marginTop: '40px', textAlign: 'center'}}>
            <Button.Group style={{width: '100%', display: 'flex'}}>
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
