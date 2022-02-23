import request from '@/utils/bkSignCenterRequest/index';

// 保存 菜单数据
export function saveMenuData(data = {}) {
  return request('/DynamicMenuServiceFacade_modifyMenu', { data }, { isReject: false });
}

//  查询 获取菜单配置数据
export function getMenuData(data = {}) {
  return request('/DynamicMenuServiceFacade_queryMenu', { data }, { isReject: false });
}
