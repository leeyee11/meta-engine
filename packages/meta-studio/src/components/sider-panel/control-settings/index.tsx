import React from 'react';
import {useModel} from 'umi';
import {Form, Input, Button, Select} from 'antd';
import styles from './index.less';
import {FlowBase} from '@meta-engine/flow';
/**
 * SiderPanel
 * @param {any} props
 * @return {JSX.Element}
 */
export default function(props: any) {
  const {workState: {editing}} = useModel('workspace');
  const onFinish = (values: any) => {
    props.close();
  };

  return (
    <div className={styles.settings}>
      <div className={styles.title}>
        <span>Control Flow Settings</span>
      </div>
      <div className={styles.wrap}>
        <Form
          name="id"
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
            <Input disabled placeholder="Node ID" />
          </Form.Item>
          <Form.Item
            name="name"
            label="name"
            labelCol={{span: 4}}
            rules={[{required: true, message: 'Please enter the name'}]}
          >
            <Input placeholder="Node Name" />
          </Form.Item>
          <Form.Item
            name="entry"
            label="entry"
            labelCol={{span: 4}}
            rules={[{required: true, message: 'Please enter the entry'}]}
          >
            <Select
              options={
                Object.entries((editing as FlowBase).nodes)
                    .map(([id, scene]) => ({
                      value: id,
                      label: scene.id,
                    }))}
            />
          </Form.Item>
          <Form.Item style={{marginTop: '40px', textAlign: 'center'}}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.settingsFormButton}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
