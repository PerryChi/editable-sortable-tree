import React, { useState } from 'react';
import { Tree, message } from 'antd';
import { cloneDeep } from 'lodash';
import MenuNode from './MenuNode/index.jsx';
import MenuConfigForm from './MenuConfigForm.jsx';
import {
  recurse,
  getCurrentMenuContent,
  getNodeInfoFromFormAndUpdateTreeData,
} from './handle';
import './index.css';

const DynamicMenuConfig = (props) => {
  const {
    form,
    form: { validateFields, getFieldsValue, setFieldsValue, resetFields },
    isTreeUnderEditing,
    setTreeUnderEditing,
    currentSelectNode,
    setCurrentSelectNode,
    currentNodeContent,
    setCurrentNodeContent,
    editingNode,
    setEditingNode,
    menuTreeData,
    setMenuTreeData,
    treeNodeFormAPI,
    FormComponent,
    leftWidth,
  } = props;
  // console.log('36 props', props);
  // todo: 暂时放在父组件里了，但是有违开闭原则，需要优化，当前被选中的菜单节点（是数组，Tree组件要用）
  // const [currentSelectNode, setCurrentSelectNode] = useState('');
  // 正在编辑名称的菜单节点
  // const [editingNode, setEditingNode] = useState('');
  // 设置Tree组件中展开的节点
  const [expandedMenuNode, setExpandedMenuNode] = useState(['root']);

  // 获取 校验表单是否通过，返回true/false
  const getValidateResult = () => {
    return new Promise((resolve) => {
      validateFields()
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          message.warning('请先配置完成当前选中的节点');
          resolve(false);
        });
    });
  };

  // 点击选中了 一个菜单节点
  const onSelectNode = (key) => {
    // console.log('71 currentSelectNode', currentSelectNode);
    // console.log('70 key', key);
    // 点击了节点文字，则选中当前节点
    if (key && currentSelectNode) {
      // 被选中的节点由A切换到了B，则更新A节点的信息
      const menuTreeDataTemp = getNodeInfoFromFormAndUpdateTreeData(
        menuTreeData,
        currentSelectNode,
        getFieldsValue,
        treeNodeFormAPI,
      );
      setMenuTreeData(menuTreeDataTemp);
    }
    // 获取被点的节点的信息
    const currentNodeContent = getCurrentMenuContent(menuTreeData, key);
    // console.log('81 currentNodeContent', currentNodeContent);
    // 将被点击的节点的信息回显到表单上
    // displayNodeInfoInForm(currentMenuContent, setFieldsValue);
    setCurrentNodeContent(currentNodeContent);
  };

  // tree节点处于编辑状态时，点击了正在编辑的节点input框后的保存图标，则保存菜单名称
  const saveNode = (menuKey, nodeText) => {
    // console.log('62 menuKey', menuKey, nodeText);
    // menuKey是保存的节点key，nodeText是编辑后端的节点名称
    // 从右侧表单中获取code
    const { code } = getFieldsValue();
    const menuTreeDataTemp = cloneDeep(menuTreeData);
    // currentNodeContent 是被保存了的菜单节点的信息
    let currentNodeContent = null;
    recurse(menuTreeDataTemp, menuKey, (item, index, data) => {
      // 递归判断到菜单树数据中的这个menuKey，更新这个节点的菜单名称和code
      data[index] = { ...item, title: nodeText, name: nodeText, code };
      currentNodeContent = { ...item, title: nodeText, name: nodeText };
    });
    console.log('67 menuTreeDataTemp', menuTreeDataTemp);
    // 点击了输入框后的保存图标，更新Tree组件数据源，并将该节点信息回显到表单
    setMenuTreeData(menuTreeDataTemp);
    setCurrentNodeContent(currentNodeContent);
  };

  // 添加新的菜单节点
  const addNode = async (menuKey) => {
    console.log('64 menuKey', menuKey);
    console.log('99 menuTreeData', menuTreeData);
    if (await getValidateResult()) {
      // 获取表单数据并更新正在选中的节点内容，返回新的菜单数据
      const menuTreeDataTemp = getNodeInfoFromFormAndUpdateTreeData(
        menuTreeData,
        currentSelectNode,
        getFieldsValue,
        treeNodeFormAPI,
      );
      // console.log('74 menuKey', menuKey, currentSelectNode);
      const timestamp = Date.now();
      const keyOfNewNode = `${menuKey}-newNode${timestamp}`;
      console.log('109 menuTreeDataTemp', menuTreeDataTemp);
      

      recurse(menuTreeDataTemp, menuKey, (item) => {
        // console.log('81 item', item);
        // 创建新节点对象
        const newMemuNode = {
          title: '请编辑菜单名称',
          key: keyOfNewNode,
        };
        if (!(item.children && Array.isArray(item.children))) {
          item.children = [];
        }
        // 将新的节点添加到它的父节点下
        item.children.push(newMemuNode);
      });
      // console.log('125 menuTreeDataTemp', menuTreeDataTemp);
      setMenuTreeData(menuTreeDataTemp);
      // 展开添加新节点的父节点
      setExpandedMenuNode([...expandedMenuNode, menuKey]);
      // 自动选中刚才新建的节点
      setCurrentSelectNode(keyOfNewNode);
      // 新增节点后 清空右侧的表单内容
      resetFields();
    }
  };

  // 编辑菜单节点
  const editNode = async (menuKey) => {
    console.log('45 menuKey', menuKey);
    console.log('95 currentSelectNode', currentSelectNode);
    let validateResult;
    // 新建节点还没有配置name和code，此时点击其他节点要校验住，不让切换
    if (menuKey !== currentSelectNode) {
      validateResult = await getValidateResult();
      if (!validateResult) {
        return;
      }
    }
    onSelectNode(menuKey);
    // console.log('46 validateResult', validateResult);
    setCurrentSelectNode(menuKey);
    setEditingNode(menuKey);
    // 整个树组件处于编辑状态,非编辑的节点隐藏编辑、增加、删除图标
    setTreeUnderEditing(true);
  };

  // 添加新的菜单节点
  const deleteNode = async (menuKey) => {
    let validateResult = true;
    // 如果点击删除图标的节点不是被正在选中的节点，需要先验证正在选中的节点的是否已完成必填项
    // 必须先填写完成选中的节点，菜单删除别的节点
    if (menuKey !== currentSelectNode) {
      validateResult = await getValidateResult();
    }
    // console.log('189 menuTreeData', menuTreeData);
    if (validateResult) {
      const menuDataCopy = cloneDeep(menuTreeData);
      // console.log('192 menuDataCopy', menuDataCopy);
      recurse(menuDataCopy, menuKey, (_, index, data) => {
        // console.log('72 item', item);
        // console.log('73 index', index);
        // console.log('74 data', data);
        data.splice(index, 1);
      });
      // console.log('199 menuDataCopy', menuDataCopy);
      resetFields();
      setCurrentSelectNode('');
      setMenuTreeData(menuDataCopy);
    }
  };

  const nodeProps = {
    currentSelectNode,
    setCurrentSelectNode,
    onSave: saveNode,
    onAdd: addNode,
    onEdit: editNode,
    onDelete: deleteNode,
    onSelectNode,
    isTreeUnderEditing,
    setTreeUnderEditing,
    getValidateResult,
    editingNode,
    setEditingNode,
  };

  // Tree节点渲染逻辑
  const nodeRender = (nodeInfo, currentSelectNodeKey) => {
    return <MenuNode {...{ ...nodeProps, nodeInfo, currentSelectNodeKey }} />;
  };

  // 点击Tree组件节点前的小三角，展开当前节点
  const onExpand = (expandedMenuNodeKey) => {
    // console.log('180 expandedMenuNodeId', expandedMenuNodeId);
    setExpandedMenuNode(expandedMenuNodeKey);
  };

  // 拖拽节点进行 菜单排序
  const onDrop = (info) => {
    // console.log('196 info', info);
    const dragKey = info.dragNode.key;
    const dropKey = info.node.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const { dropToGap } = info;

    const dragParentKey = dragKey.slice(0, dragKey.lastIndexOf('-'));
    const dropParentKey = dropKey.slice(0, dropKey.lastIndexOf('-'));
    // console.log('242 dragParentKey', dragParentKey, dropParentKey);

    // 跨层级或跨父级拖拽了，则禁止
    // TODO： 是否支持跨级拖拽
    if (
      (dropToGap && dragParentKey !== dropParentKey) ||
      (!dropToGap && dragParentKey !== dropKey)
    ) {
      message.warning('只支持 同级菜单间拖拽排序');
      return;
    }
    const data = cloneDeep(menuTreeData);

    // Find dragObject
    let dragObj;
    recurse(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!dropToGap) {
      // console.log('220 dropParentKey', info);
      // Drop on the content
      recurse(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.children || []).length > 0 && // Has children
      info.node.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      // console.log('232 dropParentKey', info);
      recurse(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      // console.log('279 dropParentKey', info);
      let ar;
      let i;
      recurse(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    // console.log('257 data', data);
    setMenuTreeData(data);
  };

  const updateCurrNodeCode = (codeString) => {
    // console.log('318 currentSelectNode', currentSelectNode);
    const menuTreeDataTemp = cloneDeep(menuTreeData);
    const { currentCodeInputValue = '' } = getFieldsValue(['name']);
    // console.log('308 currentCodeInputValue', currentCodeInputValue);
    // 根路由不需要修改
    if (currentSelectNode !== 'root') {
      // console.log('322 codeString', codeString);
      const parentMenuKey = currentSelectNode.slice(0, currentSelectNode.lastIndexOf('-'));
      const key = codeString ? `${parentMenuKey}-${codeString}` : currentSelectNode;
      // 更新节点信息，更新tree数据
      recurse(menuTreeDataTemp, currentSelectNode, (item, index, data) => {
        const siblingsNodeKeys = data.reduce(
          (arr, curr, indx) => (indx !== index ? arr.concat(curr.key) : arr),
          [],
        );
        // console.log('315 siblingsNodeKeys', siblingsNodeKeys);
        if (siblingsNodeKeys.includes(key)) {
          message.warning('同层级下已有相同的code了，同层级节点code不能相同');
          setFieldsValue({ code: currentCodeInputValue || '' });
        } else {
          data[index] = {
            ...item,
            key,
            code: codeString,
          };
          // console.log('333 menuTreeDataTemp', menuTreeDataTemp);
          setCurrentSelectNode(key);
        }
      });
    }
    setMenuTreeData(menuTreeDataTemp);
  };

  console.log('342 menuTreeData', menuTreeData);
  return (
    <div className="menuConfig">
      <div className="menuTreeContainer"
        style={{ width: `${typeof leftWidth === 'number' ? leftWidth: 40}%` }}>
        <div className="menuTreeTitle">Tree configuration</div>
        <div className="menuTree" id="menuTree">
          <Tree
            height={645} // 虚拟滚动
            className="draggable-tree"
            treeData={menuTreeData}
            draggable={!isTreeUnderEditing}
            expandedKeys={expandedMenuNode}
            defaultExpandAll={true}
            onExpand={onExpand}
            onDrop={onDrop}
            titleRender={(node) => nodeRender(node, currentSelectNode)}
            selectedKeys={[currentSelectNode]}
            // defaultExpandedKeys={this.state.expandedKeys}
            // allowDrop={allowDrop}
            // onDragEnter={this.onDragEnter}
          />
        </div>
      </div>
      <div className="menuContent"
        style={{ width: `${typeof leftWidth === 'number' ? 100 - leftWidth: 40}%` }}>
        <div className="menuContentTitle">Node details configuration</div>
        <div className="meneConfigForm">
          <MenuConfigForm {...{
            form,
            currentSelectNode,
            currentNodeContent,
            updateCurrNodeCode,
            treeNodeFormAPI,
            FormComponent
          }} />
        </div>
      </div>
    </div>
  );
};

export default DynamicMenuConfig;
