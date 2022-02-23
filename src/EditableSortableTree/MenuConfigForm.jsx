import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import { debounce, trimNull } from './utils';

const MenuConfigForm = (props) => {
  const {
    form,
    form: { setFieldsValue },
    currentSelectNode = '',
    updateCurrNodeCode,
    currentMenuContent = {},
    treeNodeFormAPI,
    FormComponent,
  } = props;
  // console.log('29 currentMenuContent', currentMenuContent);
  const {
    key = '',
    title: name = '',
    code = '',
    // ...rest
  } = trimNull(currentMenuContent || {});

  // 表单项是否必须
  const requiredFlag = currentSelectNode && currentSelectNode !== 'root';
  // console.log('34 componentValue', componentValue);
  // console.log('35 iframeUrlValue', iframeUrlValue);

  // 先创建带有防抖特性的查询函数
  // 不可将debounce(updateCurrNodeCode, 500)直接放入onChange函数的执行体中
  // 否则debounce会每次执行，使timerId每次重新赋值为null而无法清除定时器，从而无法达到防抖效果
  const updateCurrNodeCodeWithDebounce = debounce(updateCurrNodeCode, 500);

  // 当左侧菜单树节点切换时，要在右侧表单中回显菜单节点的各个字段
  useEffect(() => {
    // console.log('40 rest', rest);
    setFieldsValue({ name, code });
    // treeNodeFormAPI.setFieldsValue({...rest});
  }, [key, name, code]);

  // 节点组件
  const formComponent = FormComponent ? FormComponent(currentMenuContent): '';

  return (
    <>
      <Form form={form} labelAlign="right" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Form.Item
          label="node name"
          name="name"
          rules={[{ required: requiredFlag, message: 'Please enter node name' }]}
          initialValue=""
        >
          <Input disabled placeholder="Please edit this node name in the left tree node" />
        </Form.Item>
        <Form.Item
          label="node code"
          name="code"
          rules={[{ required: requiredFlag, message: 'Please enter node code' }]}
          initialValue=""
        >
          <Input
            placeholder="Please enter node code"
            disabled={currentSelectNode === 'root'}
            onChange={(event) => {
              updateCurrNodeCodeWithDebounce(event.target.value);
            }}
          />
        </Form.Item>
      </Form>
      {
        formComponent
      }
    </>
  );
};

export default MenuConfigForm;
