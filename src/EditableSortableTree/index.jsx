import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'antd';
import { cloneDeep, isEqual } from 'lodash';
import DynamicMenuConfig from './DynamicMenuConfig.jsx';
import { recurse, flatMenuData, modifySomePropertyNameInTreeData, handleRouteData } from './handle';
import { trimNull } from './utils';
// import { routesByMock, menuMockData, requestData }  from './const';
// import { routes }  from './routesMock';
import 'antd/dist/antd.css';

// TODO：要将文案英文化，并且文案可以配置
// TODO：样式要支持配置，宽高
// 修改命名：menu->node  path->code  route->children
const EditableSortableTree = (props) => {
  const {
    treeData = [],
    treeNodeFormAPI,
    FormComponent,
    leftWidth = 40,
    getTreeData,
    needClear,
  } = props;

  if (!(typeof leftWidth === 'number' && leftWidth > 0 && leftWidth < 100)) {
    // console.log('33 props', 'leftWidth属性必须是(0, 100)之间的数字');
    throw new Error('leftWidth属性必须是(0, 100)之间的数字');
  }

  // console.log('23 props', props);
  // 更新Tree组件的数据源
  // todo:
  // const datahhh = handleRouteData(treeData);
  const [menuTreeData, setMenuTreeData] = useState(treeData);
  const [menuTreeDataBeforeModified, setMenuTreeDataBeforeModified] = useState(treeData);
  

  const [currentNodeContent, setCurrentNodeContent] = useState({});
  // isTreeUnderEditing: Tree组件是否出在正在编辑的状态
  // 如果Tree组件处于正在编辑状态，则Tree组件的节点不可拖动
  const [isTreeUnderEditing, setTreeUnderEditing] = useState(false);
  // todo: 从封装划分和开闭原则来说 应该放在 可编辑树组件中，后续优化
  // todo: 要将currentSelectNode命名改为：currentSelectNodeId更准确一些
  const [currentSelectNode, setCurrentSelectNode] = useState('');
  // 正在编辑名称的菜单节点
  const [editingNode, setEditingNode] = useState('');

  const [form] = Form.useForm();

  const configProps = {
    form,
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
  };

  // 点击了弹框的取消按钮，初始化一些状态
  const closeModal = () => {
    // 关闭弹框时清除表单数据
    form.resetFields();
    // 关闭弹窗后要将一些状态进行初始化，否则再次打开弹窗容易出问题
    // 将菜单树数据 重置为空数组
    setMenuTreeData([]);
    setMenuTreeDataBeforeModified([]);
    setTreeUnderEditing(false);
    // setEditingNode清除 正在编辑中的节点
    setEditingNode('');
    // 清除选中的菜单节点记录
    setCurrentSelectNode('');
  };
  
  // 获取数组的的属性JSON
  if (getTreeData&& ('current' in getTreeData)) {
    getTreeData.current = () => new Promise((resole) => {
      // 保存最终要返回的树数据
      let finalTreeData = null;
      form
        .validateFields()
        .then((formData) => {
          console.log('61 formData', formData);
          // currentSelectNode 是当前树组件中选中的节点
          // console.log('62 currentSelectNode', currentSelectNode);
          const { name: title = '' } = formData;
          console.log('83 menuTreeData', menuTreeData);
          // 最后提交时，将表单数据添加到对应的tree数据节点中
          recurse(menuTreeData, currentSelectNode, (item, index, data) => {
            data[index] = { ...item, ...formData, key: currentSelectNode, title };
          });
  
          // 将老、新菜单的多层树形JSON 转成 一层的List结构
          const oldMenuList = flatMenuData(cloneDeep(menuTreeDataBeforeModified));
          console.log('80 oldMenuList', oldMenuList);
          // 将当前编辑后的菜单数据深拷贝一份
          console.log('70 menuTreeData', menuTreeData);
          // todo: 排查lodash 深拷贝函数有问题
          const newMenuData = JSON.parse(JSON.stringify(menuTreeData));
          console.log('72 newMenuData', newMenuData);
          // addMenuCodeToMenuNode(newMenuData);
          const newMenuList = flatMenuData(newMenuData);
          console.log('88 newMenuList', newMenuList);
          // 老菜单的id列表(有menuId的节点是从后端返来的)
          const oldMenuIdList = oldMenuList
            .filter((menu) => !!menu.menuId)
            .map(({ menuId }) => menuId);
          const newMenuIdList = newMenuList
            .filter((menu) => !!menu.menuId)
            .map(({ menuId }) => menuId);
          console.log('46 oldMenuIdList', oldMenuIdList);
          console.log('47 newMenuIdList', newMenuIdList);
          // 新的菜单列表中，如果菜单节点没有menuId，说明是新增的节点
          const addedMenuIdList = newMenuList.filter((menu) => !menu.menuId);
          // 被删除的菜单的id列表
          const deletedMenuIdList = [];
          // 被修改的菜单的id列表
          const modifiedMenuIdList = [];
          // 老新菜单交集部分的菜单id列表，这个交集的用途主要是对比这些节点有没有别改动
          const intersectionMenuIdList = [];
          // 找出被删除的菜单id列表 和 交集部分菜单的id列表
          oldMenuIdList.forEach((oldMenuId) => {
            // 老菜单树中的菜单id在新菜单列表中不存在了，说明该老菜单节点被删除
            if (!newMenuIdList.includes(oldMenuId)) {
              deletedMenuIdList.push(oldMenuId);
            } else {
              // 老菜单树中的菜单id在新菜单列表中还存在了，这个节点就是老新菜单树中共有的交集部分
              intersectionMenuIdList.push(oldMenuId);
            }
          });
          // console.log('59 add', addedMenuList);
          console.log('60 intersectionMenuIdList', intersectionMenuIdList);
          // 老新交集部分中的 老菜单的id与该老菜单节点的映射关系
          const oldMenuMap = {};
          intersectionMenuIdList.forEach((intersectionMenuId) => {
            oldMenuList.forEach((oldMenu) => {
              if (oldMenu.menuId === intersectionMenuId) {
                oldMenuMap[intersectionMenuId] = oldMenu;
                // oldMenuMap.push({ [intersectionMenuId]: oldMenu });
              }
            });
          });
          // 老新交集部分中的 新菜单的id与该新菜单节点的映射关系
          const newMenuMap = {};
          intersectionMenuIdList.forEach((intersectionMenuId) => {
            newMenuList.forEach((newMenu) => {
              if (newMenu.menuId === intersectionMenuId) {
                // newMenuMap.push({ [intersectionMenuId]: newMenu });
                newMenuMap[intersectionMenuId] = newMenu;
              }
            });
          });
          console.log('77 oldMenuMap', oldMenuMap);
          console.log('78 newMenuMap', newMenuMap);
  
          try {
            // 对比老新菜单中交集的菜单每个是否被修改过
            intersectionMenuIdList.forEach((intersectionMenuId) => {
              let isCurrentMenuModified = false;
              const currentOldMenu = oldMenuMap[intersectionMenuId];
              const currentNewMenu = newMenuMap[intersectionMenuId];
              const keysLengthOfOldMenu = Object.values(currentOldMenu).filter(
                (value) => !!value,
              ).length;
              const keysLengthOfNewMenu = Object.values(currentNewMenu).filter(
                (value) => !!value,
              ).length;
              // console.log('84 keysLengthOfOldMenu', keysLengthOfOldMenu);
              // console.log('85 keysLengthOfNewMenu', keysLengthOfNewMenu);
              if (keysLengthOfOldMenu !== keysLengthOfNewMenu) {
                // 如果当前菜单老节点和新节点中的 非空属性数量不同，则说明被修改过了
                isCurrentMenuModified = true;
              } else {
                Object.keys(currentOldMenu).forEach((key) => {
                  if (
                    typeof currentOldMenu[key] !== 'object' &&
                    typeof currentNewMenu[key] !== 'object' &&
                    currentOldMenu[key] !== currentNewMenu[key]
                  ) {
                    console.log('95 intersectionMenuId', intersectionMenuId);
                    console.log('96 currentOldMenu', currentOldMenu[key]);
                    console.log('97 currentNewMenu', currentNewMenu[key]);
                    // 如果菜单节点中当前的字段是简单类型，但却不相等，则说明该节点被修改过了
                    isCurrentMenuModified = true;
                  } else {
                    // 如果菜单节点中当前的字段是对象类型，深层对比是否相等来判断是否被修改过
                    isCurrentMenuModified = !isEqual(currentOldMenu[key], currentNewMenu[key]);
                  }
                  if (isCurrentMenuModified) {
                    console.log('113 intersectionMenuId', intersectionMenuId);
                    // 如果当前菜单节点被修改过了，则将改菜单的id加到被修改的菜单id的list中
                    modifiedMenuIdList.push(intersectionMenuId);
                  }
                });
              }
            });
          } catch (error) {
            console.log('159 error', error);
          }
          console.log('133 add', addedMenuIdList);
          console.log('134 delete', deletedMenuIdList);
          console.log('135 oldMenuMap', oldMenuMap);
          console.log('136 newMenuMap', newMenuMap);
          console.log('137 modifiedMenuIdList', modifiedMenuIdList);
          // 菜单节点id与该菜单节点的操作类型的映射关系
          const menuIdAndOperationMap = {};
          addedMenuIdList.forEach((menuId) => {
            menuIdAndOperationMap[menuId] = 'add';
          });
          deletedMenuIdList.forEach((menuId) => {
            menuIdAndOperationMap[menuId] = 'delete';
          });
          modifiedMenuIdList.forEach((menuId) => {
            menuIdAndOperationMap[menuId] = 'modify';
          });
          console.log('178 menuIdAndOperationMap', menuIdAndOperationMap);
          /**
           * 节点的operation标识暂时也其实没用到，可有可无，暂时保留相关逻辑，以备后需
           * 关于节点的operation标识：本意是前端带上这个操作的标识，是为了告诉后端每个节点的操作类型，方便后端处理
           * 但前端在这块的逻辑处理上并不是十分可靠，尤其是新老菜单交集部分的菜单节点是否有被修改过，对比很麻烦且不准确
           * 再加之实际上后端无需这个标识也能准确判定节点的处理，目前后端的判定和处理逻辑如下：
           *    1、新增：节点没有menuId，就认为是新节点，新增一条记录去存；
           *    2、修改：节点有menuId，就认为是已有的节点，后端不管前端有没有修改这个节点的信息，直接更新覆盖这条记录；
           *    3、删除：前端将删除的节点的id放进数组deletedNodeList，并传给后端，后端将这些id的记录做逻辑删除处理。
           */
          // 递归处理将 每个节点的操作标识operation添加到该节点中(表明该节点的操作类型：新增add/删除delete/修改modify)
          const addOperationToEveryNode = (menuData) => {
            menuData.forEach((menuNode) => {
              const { menuId, children } = menuNode;
              menuNode.operation = menuIdAndOperationMap[menuId] ? menuIdAndOperationMap[menuId] : '';
              if (Array.isArray(children) && children.length) {
                addOperationToEveryNode(children);
              }
            });
          };
          addOperationToEveryNode(newMenuData);
  
          /**
           * finalMenuListDataToBackEnd是菜单多层JSON扁平化后端的一层数组，最后没有用到，由来如下：
           * 刚开始考虑前后端数据交互格式，有两种可选方案：
           * 1、前端把树形的菜单扁平化一层list，list中包含新老菜单树中的所有节点，并会在每个节点中带有oparation操作标识，后端直接去按照list存成数据库记录即可；
           * 2、前端直接将多层树形JSON传给后端，后端自己用逻辑去处理节点直接的层级关系，并转成一层list去存库。
           * 最后采用方案2，所以finalMenuListDataToBackEnd这个list没有用到，暂时还保留这块处理逻辑，以备可能后用
           */
          const finalMenuListDataToBackEnd = cloneDeep(oldMenuList);
          addedMenuIdList.forEach((addedMenuId) => {
            console.log('154 addedMenuId', addedMenuId);
            // 将新增的节点添加进去
            newMenuData.forEach((menuNode) => {
              const { menuId } = menuNode;
              if (menuId === addedMenuId) {
                console.log('158 addedMenuId', addedMenuId);
                finalMenuListDataToBackEnd.push(menuNode);
              }
            });
          });
          // 为每个节点添加operation操作标识
          addOperationToEveryNode(finalMenuListDataToBackEnd);
          console.log('246 finalMenuListDataToBackEnd', finalMenuListDataToBackEnd);
          console.log('247 newMenuData', newMenuData);
          modifySomePropertyNameInTreeData(newMenuData);
          // 拿出根路由的子路由数组（里面都是一级菜单）
          const routeWithoutRootNode = cloneDeep(newMenuData[0].routes);
          console.log('251 routeWithoutRootNode', routeWithoutRootNode);
          delete newMenuData[0].routes;
          // 将根路由 和 一级路由 都放在第一级
          const finalRouteData = [newMenuData[0], ...routeWithoutRootNode];
          finalTreeData = { treeData: finalRouteData, deletedNodeList: deletedMenuIdList };
          // console.log('256 finalTreeData', finalTreeData);
  
          // console.log('258 menuList', JSON.stringify(menuList));
          // 向后端提交最终的 菜单树形数据
          // const success = await dispatch({
          //   type: 'dynamicMenuModel/saveMenuData',
          //   payload: menuParams,
          // });
          // console.log('282 success', success);
  
          // 关闭弹框后需要清除一些状态
          if (needClear) {
            closeModal();
          }
          return resole(finalTreeData);
        })
        .catch((info) => {
          console.log('校验失败：', info);
        });
    });
  }
  
  return (
    <div>
      <DynamicMenuConfig {...configProps} />
    </div>
  );
};

export default EditableSortableTree;
export { handleRouteData, trimNull };
