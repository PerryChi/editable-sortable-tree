import { cloneDeep } from 'lodash';
import { trimNull } from './utils';

// 递归+遍历 多层树形JSON数据处理通用函数
export const recurse = (data, key, callback) => {
  data.forEach((item, index) => {
    if (item.key === key) {
      return callback(item, index, data);
    }
    if (item.children) {
      recurse(item.children, key, callback);
    }
    // 这句可以不需要，主要是为了规避eslint报错：Expected to return a value at the end of arrow function
    return 0;
  });
  // 这句可以不需要，主要是为了规避eslint报错：Expected to return a value at the end of arrow function
  return data;
};

// 从前端静态路由文件生成默认路由
export const generateDefaultMemuData = (treeData) => {
  treeData.forEach((route) => {
    const { indexRoute, routes, code } = route;
    // 验证这个函数有没有效果，todo：后续会删除
    // if (name) {
    //   route.name = name + 'cc';
    // }
    if (indexRoute) {
      route.redirect = indexRoute.redirect;
      delete route.indexRoute;
    }
    // 如果当前路由有子路由，则向子路由数组中添加错误页路由和iframe路由
    // 必须要先添加错误页路由，然后再添加iframe路由（否则当请求出现错误是如何常常显示错误页）
    if (routes) {
      // 判断当前路由的子路由中有没有错误页
      const hasErrorPage = routes.some(({ code: itemCode = '' }) => itemCode === 'error.htm');
      // console.log('42 hasErrorPage', hasErrorPage)
      // 如果没有错误页就添加错误页路由
      if (code !== '/' && !hasErrorPage) {
        routes.push({
          name: '错误页',
          code: 'error.htm',
          component: './Error',
          hideInMenu: true,
        });
      }
      // 给当前路由的子路由添加iframeUrl路由
      if (code !== '/') {
        routes.push({
          code: ':iframeUrl',
          component: '@/pages/IframePage',
        });
      }
      generateDefaultMemuData(routes);
    }
  });
  // console.log('63 treeData', treeData)
  return treeData;
};

// 菜单配置弹框里，对routes中的子路由们进行排序
const sortHandle = (treeData) => {
  treeData.forEach((menuNode) => {
    const { children } = menuNode;
    if (children) {
      children.sort((prev, curr) => prev.menuOrder - curr.menuOrder);
      sortHandle(children);
    }
  });
  return treeData;
};

// 菜单展示时，对各级菜单按照menuOrder排序
export const sortHandler = (treeData) => {
  treeData.sort((prev, curr) => prev.menuOrder - curr.menuOrder);
  treeData.forEach((menuNode) => {
    const { routes } = menuNode;
    if (routes) {
      sortHandler(routes);
    }
  });
  return treeData;
};

// 将一级路由节点添加到根路由节点的children里
export const appendFirstLevelMenuToRootNodeChildren = (routesParam) => {
  // console.log('87 routesParam', routesParam);
  // const routesData = cloneDeep(trimNull(routesParam));
  // const rootNode = cloneDeep(routesData[0]) || {};
  const rootNode = {
    title: 'rootNode',
    key: 'root',
    code: 'root',
    children: [],
  };
  const treeData = [rootNode];
  routesParam.forEach((menuNode = {}) => {
    if (Object.keys(menuNode).length) {
      treeData[0].children.push(menuNode);
    }
  });
  // console.log('92 treeData', treeData);
  return treeData;
};

// 对路由数据 添加key、name、menuOrder、children
export const addMenuCodeToMenuNode = (treeData = [], parentMenuKey = 'root') => {
  treeData.forEach((node) => {
    const { title, name, key, code, children } = node;
    // 新增节点是没有code的，则取它的key中的最后一级
    const codeTemp = code ? code : key?.slice(key?.lastIndexOf('-') + 1);
    const keyTemp = code === 'root' ? 'root' : `${parentMenuKey}-${codeTemp}`;
    // console.log('107 node', node);
    node.name = title;
    node.key = keyTemp;
    node.title = title || name || code;
    if (children) {
      addMenuCodeToMenuNode(children, keyTemp);
    }
  });
};

// 移除 iframe页节点 和 错误页节点，弹框中的菜单树不需要展示iframe页节点 和 错误页节点
export const removeIframeNodeAndErrorPageNode = (routesParam) => {
  routesParam.forEach(({ children = [] }, index) => {
    if (children && children.length) {
      routesParam[index].children = children.filter(
        ({ code }) => !/iframeUrl|extraPage|error/.test(code),
      );
      removeIframeNodeAndErrorPageNode(routesParam[index].children);
    }
  });
};

// 对后端返回的路由数据进行处理
export const handleRouteData = (routesParam) => {
  // console.log('56 routesParam', routesParam);
  const routes = appendFirstLevelMenuToRootNodeChildren(routesParam);
  // console.log('115 routes', routes);
  addMenuCodeToMenuNode(routes);
  // removeIframeNodeAndErrorPageNode(routes);
  const finalTreeData = sortHandle(routes);
  // console.log('138', finalTreeData);
  return finalTreeData;
};

// 修改菜单数据中的字段名称，将title改为name，将children改为routes
export const modifySomePropertyNameInTreeData = (routes = []) => {
  routes.forEach((route, index) => {
    const { key, title, children } = route;
    route.name = title;
    delete route.title;
    route.menuOrder = index;
    if (children) {
      route.routes = children;
      modifySomePropertyNameInTreeData(route.routes, key);
      delete route.children;
    }
  });
  return routes;
};

// 获取选中的菜单节点的 内容（菜单名称、code、组件路径等等）
export const getCurrentMenuContent = (treeData, currentMenuSelected) => {
  // console.log('89 treeData', treeData);
  // console.log('90 currentMenuSelected', currentMenuSelected);
  let currentMenuContent = {};
  (function findMenuContent(routes, currentMenuKey) {
    routes.forEach((route) => {
      const { key, children } = route;
      if (currentMenuKey === key) {
        currentMenuContent = route;
      } else if (children) {
        findMenuContent(children, currentMenuKey);
      }
    });
  })(treeData, currentMenuSelected);
  return cloneDeep(currentMenuContent);
};

// 将菜单节点信息回显到表单中(后来将节点信息传到表单组件中进行回显，这个函数暂时没用到)
// TODO： 去掉不需要的表单域的赋值
export const displayNodeInfoInForm = (node, setFieldsValue) => {
  // console.log('182 node', node);
  const {
    title: name = '',
    code = '',
    indexRoute = '',
    component = '',
    iframeUrl = '',
    hideInMenu = false,
    icon = '',
    moreConfig = '',
  } = trimNull(node);
  // 将 选中的菜单节点的内容 回显到 表单input中
  setFieldsValue({
    name,
    code,
    indexRoute,
    component,
    iframeUrl,
    hideInMenu,
    icon,
    moreConfig,
  });
};

// 获取表单数据添加到菜单节点中
export const getNodeInfoFromFormAndUpdateTreeData = (...params) => {
  const [
    menuTreeData,
    currentSelectNodeId,
    getFieldsValue,
    treeNodeFormAPI,
  ] = params;
  // console.log('218 menuTreeData', menuTreeData);
  // console.log('215 getFieldsValue()', currentSelectNodeId);
  // 如果当前未选中任何节点（一般是当打开弹窗时），不需要获取表单数据来更新节点数据，直接返回原菜单数据
  if (!currentSelectNodeId) {
    return menuTreeData;
  }
  const menuTreeDataTemp = cloneDeep(menuTreeData);
  const isRootNode = currentSelectNodeId === 'root';
  let parentMenuKey = '';
  let key = '';
  // 从组件内置的表单中获取编辑好的节点名称和节点id
  const { name, code } = getFieldsValue();
  // 获取用户自定义的节点字段
  let restNodeAttr = null;
  if (treeNodeFormAPI?.getFieldsValue) {
    restNodeAttr = treeNodeFormAPI.getFieldsValue();
  }
  // 根节点不需要编辑修改
  if (isRootNode) {
    parentMenuKey = 'root';
    key = 'root';
  } else {
    // 截取上个被选中的菜单的父id，以便为它拼接新的id
    parentMenuKey = currentSelectNodeId.slice(0, currentSelectNodeId.lastIndexOf('-'));
    // 拼接新的菜单id，兜底处理：如果code没有填写则用原来的id（code是必填项，正常不会有这种群情况）
    key = code ? `${parentMenuKey}-${code}` : currentSelectNodeId;
  }
  // console.log('213 currentSelectNodeId', currentSelectNodeId);
  // console.log('214 key', key);
  // console.log('215 getFieldsValue()', getFieldsValue());
  // 更新节点信息，更新tree数据
  recurse(menuTreeDataTemp, currentSelectNodeId, (item, index, data) => {
    data[index] = {
      ...item,
      // 根路由的name和code恒定不变，不需要用表单数据更新
      title: isRootNode ? 'rootNode' : name,
      code: isRootNode ? '/' : code,
      key,
      ...restNodeAttr
    };
  });
  // console.log('233 menuTreeDataTemp', menuTreeDataTemp);
  return menuTreeDataTemp;
};

// 将多层树形JSON扁平化为一层List
export const flatMenuData = (menuData) => {
  const menuList = [];
  (function traverse(routes) {
    routes.forEach((route) => {
      // console.log('36 route', route);
      const { children } = route;
      const menuItem = { ...route };
      delete menuItem.children;
      menuList.push(menuItem);
      if (children) {
        traverse(children);
      }
    });
  })(menuData);
  // console.log('92 menuList', menuList);
  return menuList;
};

/**
 * 下面两个函数主要用于将一层List转成多层tree数据
 */
// 递归处理器
const recurseHandler = (treeData, parentId) => {
  treeData.forEach((menuNode) => {
    const { menuId } = menuNode;
    if (menuId === parentId) {
      if (!menuNode.routes) {
        menuNode.routes = [];
      }
      menuNode.routes.push(menuNode);
    }
    if (menuNode.routes) {
      return recurseHandler(menuNode.routes, parentId);
    }
    // 这句可以不需要，主要是为了规避eslint报错：Expected to return a value at the end of arrow function
    return 0;
  });
  // 这句可以不需要，主要是为了规避eslint报错：Expected to return a value at the end of arrow function
  return treeData;
};

// 将一层的List 改造成 多层树形JSON(list转tree暂时由后端处理，这个逻辑先留着，后面或许会用到)
export const generateTreeData = (list) => {
  const treeData = [];
  list.forEach((menuNode) => {
    const { menuKey } = menuNode;
    if (menuKey === 'root') {
      treeData.push(menuNode);
    } else {
      const parentId = menuKey.slice(0, menuKey.lastIndexOf('-'));
      recurseHandler(treeData, parentId, menuNode);
    }
  });
  return treeData;
};
