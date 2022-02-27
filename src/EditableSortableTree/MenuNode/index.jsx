import React, { useState, useEffect, useRef } from 'react';
import { Input, Popconfirm } from 'antd';
import { EditOutlined, CheckOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.css';

const MenuNode = (props) => {
  const {
    onEdit,
    nodeInfo: { title: nodeTextInit = '', key = '' },
    onSave,
    onAdd,
    onDelete,
    onSelectNode,
    setCurrentSelectNode,
    isTreeUnderEditing, // 整个Tree组件是否处于正在编辑状态（只要有个Tree节点正在编辑，则认为整个Tree组件是否处于正在编辑状态）
    setTreeUnderEditing,
    getValidateResult,
    editingNode,
    setEditingNode,
  } = props;
  // console.log('24 editingNode', editingNode);

  // 当前节点是否可编辑
  const [isCurrentNodeEditable, setCurrentNodeEditable] = useState(false);
  const [nodeText, setNodeText] = useState(nodeTextInit);
  const [editTimestamp, setEditTimestamp] = useState(0);
  const nodeInputRef = useRef(null);
  // console.log('31 isCurrentNodeEditable', key, isCurrentNodeEditable);

  useEffect(() => {
    // 整个页面监听click，如果点击了，则让组件树由编辑状态变为展示状态
    document.addEventListener(
      'click',
      (event) => {
        const targetClassName = event.target.className;
        // if (!targetClassName) {
        //   setCurrentNodeEditable(false);
        // }
        if (
          targetClassName &&
          typeof targetClassName === 'string' &&
          !targetClassName.includes('nodeInput')
        ) {
          // setEditingNode清除 正在编辑中的节点
          setEditingNode('');
          setCurrentNodeEditable(false);
          setTreeUnderEditing(false);
        }
      },
      true,
    );
  }, []);

  // 当正在编辑的节点切换了，则实时设置节点的状态
  useEffect(() => {
    if (editingNode) {
      // console.log('53 editingNode', key, editingNode);
      // 将触发了编辑事件的节点设置为 编辑状态
      setCurrentNodeEditable(key === editingNode);
      setTimeout(() => {
        if (nodeInputRef && nodeInputRef.current) {
          // 让节点的input框中的内容自动选中方便替换
          nodeInputRef.current.select();
        }
      }, 200);
    }
  }, [editingNode, editTimestamp]);

  // 点击了 菜单节点的文字
  const selectNode = async () => {
    const validateResult = await getValidateResult();
    // console.log('69 key', key, validateResult);
    if (validateResult) {
      // 将点击的节点设置为Tree当前选中的节点
      setCurrentSelectNode(key);
      // 选中当前节点后需要处理一些事情
      onSelectNode(key);
    }
  };

  // 点击 菜单节点后的加号图标
  const addNewMenuNode = () => {
    onAdd(key);
  };

  // 去编辑菜单节点
  const edit = () => {
    // 将触发了编辑的节点id传给回调函数
    onEdit(key);
    // 让editTimestamp发生变化，并监听，参见52行useEffect
    setEditTimestamp(Date.now());
  };

  // 菜单节点名称input框的值改变了
  const nodeChange = (event) => {
    setNodeText(event.target.value);
  };

  // 保存菜单节点名称的修改
  const saveNode = () => {
    // console.log('97 key', key);
    setCurrentNodeEditable(false);
    onSave(key, nodeText);
    setTreeUnderEditing(false);
    setCurrentSelectNode(key);
    // setEditingNode清除 正在编辑中的节点
    setEditingNode('');
  };

  // 监听按键事件，当按下回车键时保存节点名称
  document.onkeydown = (e) => {
    // 兼容FF、IE和Opera
    const event = e || window.event;
    if (isCurrentNodeEditable && event.code === 'Enter') {
      // 保存菜单节点的修改
      saveNode();
    }
  };

  // 点击 菜单节点后的删除图标
  const deleteMenuNode = () => {
    onDelete(key);
  };

  return (
    <>
      {!isCurrentNodeEditable ? ( // 当前Tree节点不可编辑时，用span展示节点名称
        <>
          <span className="nodeText" onClick={selectNode}>
            {nodeText}
          </span>
          {/* isTreeUnderEditing：Tree组件处于编辑状态时，不展示编辑、新增、删除图标 */}
          {key.includes('-') && !isTreeUnderEditing && (
            <EditOutlined className="iconGap" onClick={edit} />
          )}
          {!isTreeUnderEditing && <PlusOutlined className="iconGap" onClick={addNewMenuNode} />}
          {key.includes('-') && !isTreeUnderEditing && (
            <Popconfirm
              title={`Are you sure you want to delete menu "${nodeText}"?`}
              onConfirm={deleteMenuNode}
              okText="yes"
              cancelText="cancel"
            >
              {!isTreeUnderEditing && <DeleteOutlined />}
            </Popconfirm>
          )}
        </>
      ) : (
        // 当前Tree节点可编辑时，用input输入框编辑节点名称
        <>
          <Input
            className="nodeInput"
            value={nodeText}
            size="small"
            onChange={nodeChange}
            ref={nodeInputRef}
          />
          {/* 编辑好菜单名称后，点击确认图标进行保存 */}
          <CheckOutlined className="saveNode" onClick={saveNode} />
        </>
      )}
    </>
  );
};

export default MenuNode;
