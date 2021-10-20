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
        <span>Branch Settings</span>
      </div>
      <div className={styles.wrap}>
        <Form
          name="nodeSetting"
          className={styles.settingsForm}
          initialValues={{...editing}}
          onFinish={onFinish}
        >
          <Form.Item
            name="condition"
            label="condition"
            labelCol={{span: 6}}
            rules={[{required: true, message: 'Please enter the condition'}]}
          >
            <Input placeholder="Branch condition" />
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
