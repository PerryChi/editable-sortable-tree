// 路由根节点模板
export const rootRouter = [
  {
    hideInMenu: false,
    path: '/',
    component: null,
    menuOrder: 0,
    access: true,
    icon: '',
    indexRoute: '',
    name: '根路由',
    routes: [],
  },
];

// 模拟后端返回的菜单数据
export const routes = [
  {
    hideInMenu: false,
    path: '/',
    routes: [],
    component: null,
    menuOrder: 0,
    access: null,
    icon: null,
    indexRoute: 'assetsRecommendation',
    name: '根路由',
    menuId: '47',
    iframeUrl: null,
  },
  {
    hideInMenu: false,
    path: 'assetsRecommendation',
    routes: [
      {
        hideInMenu: false,
        path: 'calculation',
        routes: [
          {
            hideInMenu: false,
            path: 'taskList',
            routes: [],
            component: './Calculation/TaskList',
            menuOrder: 0,
            access: null,
            icon: null,
            indexRoute: null,
            name: '任务列表',
            menuId: '50',
            iframeUrl: null,
          },
          {
            hideInMenu: true,
            path: 'templateCenter',
            routes: [],
            component: './Calculation/TemplateCenter',
            menuOrder: 1,
            access: null,
            icon: null,
            indexRoute: null,
            name: '模板中心',
            menuId: '51',
            iframeUrl: null,
          },
          {
            hideInMenu: true,
            path: 'calculateTable',
            routes: [],
            component: './Calculation/CalculateTable',
            menuOrder: 2,
            access: null,
            icon: null,
            indexRoute: null,
            name: '测算工作台',
            menuId: '52',
            iframeUrl: null,
          },
          {
            hideInMenu: false,
            path: 'comPage',
            routes: [],
            component: './Calculation/ComPage',
            menuOrder: 3,
            access: null,
            icon: null,
            indexRoute: null,
            name: '组件列表',
            menuId: '53',
            iframeUrl: null,
          },
          {
            hideInMenu: true,
            path: 'configurationCenter',
            routes: [],
            component: './Calculation/ConfigurationCenter',
            menuOrder: 4,
            access: null,
            icon: null,
            indexRoute: null,
            name: '配置中心',
            menuId: '54',
            iframeUrl: null,
          },
          {
            hideInMenu: false,
            path: 'managementSystem',
            routes: [],
            component: './Calculation/ManagementSystem',
            menuOrder: 5,
            access: null,
            icon: null,
            indexRoute: null,
            name: '管理系统',
            menuId: '55',
            iframeUrl: null,
          },
          {
            hideInMenu: false,
            path: 'taobao',
            routes: [],
            component: null,
            menuOrder: 6,
            access: null,
            icon: null,
            indexRoute: null,
            name: '淘宝',
            menuId: '96',
            iframeUrl: 'https://www.taobao.com/',
          },
          {
            hideInMenu: false,
            path: 'yuyan',
            routes: [],
            component: null,
            menuOrder: 7,
            access: null,
            icon: null,
            indexRoute: null,
            name: '雨燕',
            menuId: '98',
            iframeUrl: 'https://yuyan.mybank.cn/console',
          },
        ],
        component: null,
        menuOrder: 0,
        access: null,
        icon: 'ContainerOutlined',
        indexRoute: 'taskList',
        name: '模拟测算',
        menuId: '49',
        iframeUrl: null,
      },
      {
        hideInMenu: false,
        path: 'strategycenter',
        routes: [
          {
            hideInMenu: false,
            path: 'ruleManagement',
            routes: [],
            component: './Calculation/RuleManagement',
            menuOrder: 0,
            access: null,
            icon: null,
            indexRoute: null,
            name: '规则管理',
            menuId: '57',
            iframeUrl: null,
          },
          {
            hideInMenu: true,
            path: 'onlineRuleConfig',
            routes: [],
            component: './Calculation/RuleManagement/components/onLine/ruleConfig',
            menuOrder: 1,
            access: null,
            icon: null,
            indexRoute: null,
            name: '在线规则配置',
            menuId: '58',
            iframeUrl: null,
          },
          {
            hideInMenu: true,
            path: 'offlineConfig',
            routes: [],
            component: './Calculation/RuleManagement/components/offLine/ruleConfig',
            menuOrder: 2,
            access: null,
            icon: null,
            indexRoute: null,
            name: '离线规则配置',
            menuId: '59',
            iframeUrl: null,
          },
          {
            hideInMenu: false,
            path: 'strategyManagement',
            routes: [],
            component: './Calculation/StrategyCenter',
            menuOrder: 3,
            access: null,
            icon: null,
            indexRoute: null,
            name: '策略管理',
            menuId: '60',
            iframeUrl: null,
          },
          {
            hideInMenu: true,
            path: 'versionpage',
            routes: [],
            component: './Calculation/StrategyCenter/VersionPage',
            menuOrder: 4,
            access: null,
            icon: null,
            indexRoute: null,
            name: '子策略页面',
            menuId: '61',
            iframeUrl: null,
          },
          {
            hideInMenu: true,
            path: 'linkConfig',
            routes: [],
            component: './Calculation/LinkConfig',
            menuOrder: 5,
            access: null,
            icon: null,
            indexRoute: null,
            name: '链路配置',
            menuId: '62',
            iframeUrl: null,
          },
          {
            hideInMenu: false,
            path: 'aliyun',
            routes: [],
            component: null,
            menuOrder: 6,
            access: null,
            icon: null,
            indexRoute: null,
            name: '阿里云',
            menuId: '97',
            iframeUrl: 'https://www.aliyun.com',
          },
        ],
        component: null,
        menuOrder: 1,
        access: null,
        icon: 'BoxPlotOutlined',
        indexRoute: 'ruleManagement',
        name: '策略中心',
        menuId: '56',
        iframeUrl: null,
      },
    ],
    component: null,
    menuOrder: 0,
    access: null,
    icon: null,
    indexRoute: 'calculation',
    name: '智能资产推荐',
    menuId: '48',
    iframeUrl: null,
  },
  {
    hideInMenu: false,
    path: 'ruralInstitutions',
    routes: [
      {
        hideInMenu: false,
        path: 'ediiioanreport',
        routes: [
          {
            hideInMenu: false,
            path: 'datalist',
            routes: [
              {
                hideInMenu: false,
                path: 'managementpage',
                routes: [],
                component: 'ruralInstitutions/EditIoanReport/ManagementPage',
                menuOrder: 0,
                access: null,
                icon: null,
                indexRoute: null,
                name: 'managementpage',
                menuId: '66',
                iframeUrl: null,
              },
              {
                hideInMenu: false,
                path: 'messagepage',
                routes: [],
                component: 'ruralInstitutions/EditIoanReport/MessagePage',
                menuOrder: 1,
                access: null,
                icon: null,
                indexRoute: null,
                name: 'messagepage',
                menuId: '67',
                iframeUrl: null,
              },
              {
                hideInMenu: false,
                path: 'visitdetails',
                routes: [],
                component: 'ruralInstitutions/EditIoanReport/VisitDetails',
                menuOrder: 2,
                access: null,
                icon: null,
                indexRoute: null,
                name: 'visitdetails',
                menuId: '68',
                iframeUrl: null,
              },
            ],
            component: null,
            menuOrder: 0,
            access: null,
            icon: null,
            indexRoute: 'managementpage',
            name: '机构数据',
            menuId: '65',
            iframeUrl: null,
          },
        ],
        component: null,
        menuOrder: 0,
        access: null,
        icon: 'ApartmentOutlined',
        indexRoute: 'datalist',
        name: '机构平台',
        menuId: '64',
        iframeUrl: null,
      },
      {
        hideInMenu: false,
        path: 'statisticsinstitutions',
        routes: [],
        component: 'ruralInstitutions/StatisticsInstitutions',
        menuOrder: 1,
        access: null,
        icon: 'PieChartOutlined',
        indexRoute: null,
        name: '机构统计',
        menuId: '69',
        iframeUrl: null,
      },
    ],
    component: null,
    menuOrder: 1,
    access: null,
    icon: null,
    indexRoute: 'ediiioanreport',
    name: '农村机构平台',
    menuId: '63',
    iframeUrl: null,
  },
  {
    hideInMenu: false,
    path: 'demand',
    routes: [
      {
        hideInMenu: false,
        path: 'ioanTemplate',
        routes: [],
        component: 'demand/LoanReport/TemplateManagement',
        menuOrder: 0,
        access: null,
        icon: 'PicRightOutlined',
        indexRoute: null,
        name: '模板管理',
        menuId: '71',
        iframeUrl: null,
      },
      {
        hideInMenu: true,
        path: 'templateDetail',
        routes: [],
        component: 'demand/LoanReport/TemplateManagement/TemplateDetail',
        menuOrder: 1,
        access: null,
        icon: null,
        indexRoute: null,
        name: '报告模板详情',
        menuId: '72',
        iframeUrl: null,
      },
      {
        hideInMenu: true,
        path: 'previewTemplate',
        routes: [],
        component: 'demand/LoanReport/TemplateManagement/PreviewTemplate',
        menuOrder: 2,
        access: null,
        icon: null,
        indexRoute: null,
        name: '预览模板',
        menuId: '73',
        iframeUrl: null,
      },
      {
        hideInMenu: true,
        path: 'ioanAddTemplate',
        routes: [],
        component: 'demand/LoanReport/TemplateManagement/AddTemplate',
        menuOrder: 3,
        access: null,
        icon: null,
        indexRoute: null,
        name: '新建报告模板',
        menuId: '74',
        iframeUrl: null,
      },
      {
        hideInMenu: true,
        path: 'addTemplateEdit',
        routes: [],
        component: 'demand/LoanReport/TemplateManagement/AddTemplateEdit',
        menuOrder: 4,
        access: null,
        icon: null,
        indexRoute: null,
        name: '新建报告模板',
        menuId: '75',
        iframeUrl: null,
      },
      {
        hideInMenu: true,
        path: 'ioanEditTemplate',
        routes: [],
        component: 'demand/LoanReport/TemplateManagement/EditTemplate',
        menuOrder: 5,
        access: null,
        icon: null,
        indexRoute: null,
        name: '编辑报告模板',
        menuId: '76',
        iframeUrl: null,
      },
      {
        hideInMenu: true,
        path: 'templateEdit',
        routes: [],
        component: 'demand/LoanReport/TemplateManagement/TemplateEdit',
        menuOrder: 6,
        access: null,
        icon: null,
        indexRoute: null,
        name: '编辑报告模板',
        menuId: '77',
        iframeUrl: null,
      },
      {
        hideInMenu: true,
        path: 'addIoanReport',
        routes: [],
        component: 'demand/LoanReport/ReportManagement/AddReport',
        menuOrder: 7,
        access: null,
        icon: null,
        indexRoute: null,
        name: '新建报告',
        menuId: '78',
        iframeUrl: null,
      },
      {
        hideInMenu: true,
        path: 'reportEdit',
        routes: [],
        component: 'demand/LoanReport/ReportManagement/ReportEdit',
        menuOrder: 8,
        access: null,
        icon: null,
        indexRoute: null,
        name: '编辑报告',
        menuId: '79',
        iframeUrl: null,
      },
      {
        hideInMenu: false,
        path: 'ioanReport',
        routes: [],
        component: 'demand/LoanReport/ReportManagement',
        menuOrder: 9,
        access: null,
        icon: 'ContainerOutlined',
        indexRoute: null,
        name: '报告管理',
        menuId: '80',
        iframeUrl: null,
      },
      {
        hideInMenu: true,
        path: 'editIoanReport',
        routes: [],
        component: 'demand/LoanReport/ReportManagement/EditReport',
        menuOrder: 10,
        access: null,
        icon: null,
        indexRoute: null,
        name: '编辑报告',
        menuId: '81',
        iframeUrl: null,
      },
      {
        hideInMenu: true,
        path: 'reportDetail',
        routes: [],
        component: 'demand/LoanReport/ReportManagement/ReportDetail',
        menuOrder: 11,
        access: null,
        icon: null,
        indexRoute: null,
        name: '报告详情',
        menuId: '82',
        iframeUrl: null,
      },
    ],
    component: null,
    menuOrder: 2,
    access: null,
    icon: null,
    indexRoute: 'ioanTemplate',
    name: '微贷风险报告',
    menuId: '70',
    iframeUrl: null,
  },
  {
    hideInMenu: false,
    path: 'OfflineDoc',
    routes: [
      {
        hideInMenu: false,
        path: 'instFileAccess',
        routes: [
          {
            hideInMenu: false,
            path: 'templateManager/list',
            routes: [],
            component: 'OfflineDoc/instFileAccess/TemplateManager/List',
            menuOrder: 0,
            access: null,
            icon: null,
            indexRoute: null,
            name: '模板管理',
            menuId: '85',
            iframeUrl: null,
          },
          {
            hideInMenu: false,
            path: 'templateManager/operate',
            routes: [],
            component: 'OfflineDoc/instFileAccess/TemplateManager/Operate',
            menuOrder: 1,
            access: null,
            icon: null,
            indexRoute: null,
            name: 'templateManager/operate',
            menuId: '86',
            iframeUrl: null,
          },
          {
            hideInMenu: false,
            path: 'fileAccess/list',
            routes: [],
            component: 'OfflineDoc/instFileAccess/FileAccess/List',
            menuOrder: 2,
            access: null,
            icon: null,
            indexRoute: null,
            name: '接入配置',
            menuId: '87',
            iframeUrl: null,
          },
          {
            hideInMenu: false,
            path: 'fileAccess/detail',
            routes: [],
            component: 'OfflineDoc/instFileAccess/FileAccess/Detail',
            menuOrder: 3,
            access: null,
            icon: null,
            indexRoute: null,
            name: 'fileAccess/detail',
            menuId: '88',
            iframeUrl: null,
          },
          {
            hideInMenu: false,
            path: 'fileOperations',
            routes: [],
            component: 'OfflineDoc/instFileAccess/FileOperations',
            menuOrder: 4,
            access: null,
            icon: null,
            indexRoute: null,
            name: '文件运维',
            menuId: '89',
            iframeUrl: null,
          },
        ],
        component: null,
        menuOrder: 0,
        access: null,
        icon: 'ContainerOutlined',
        indexRoute: 'templateManager/list',
        name: '文件接入',
        menuId: '84',
        iframeUrl: null,
      },
      {
        hideInMenu: false,
        path: 'accountManage',
        routes: [
          {
            hideInMenu: false,
            path: 'ruleManage',
            routes: [],
            component: 'OfflineDoc/accountManage/QualityControl/RuleManage',
            menuOrder: 0,
            access: null,
            icon: null,
            indexRoute: null,
            name: '文件规则管理',
            menuId: '91',
            iframeUrl: null,
          },
          {
            hideInMenu: false,
            path: 'detailManage',
            routes: [],
            component: 'OfflineDoc/accountManage/QualityControl/DetailManage',
            menuOrder: 1,
            access: null,
            icon: null,
            indexRoute: null,
            name: '明细规则管理',
            menuId: '92',
            iframeUrl: null,
          },
          {
            hideInMenu: false,
            path: 'abnormalManage',
            routes: [],
            component: 'OfflineDoc/accountManage/QualityControl/AbnormalManage',
            menuOrder: 2,
            access: null,
            icon: null,
            indexRoute: null,
            name: '核对异常管理',
            menuId: '93',
            iframeUrl: null,
          },
        ],
        component: null,
        menuOrder: 1,
        access: null,
        icon: 'PicRightOutlined',
        indexRoute: null,
        name: '质量管控',
        menuId: '90',
        iframeUrl: null,
      },
    ],
    component: null,
    menuOrder: 3,
    access: null,
    icon: null,
    indexRoute: 'instFileAccess',
    name: '联营离线文件',
    menuId: '83',
    iframeUrl: null,
  },
  {
    hideInMenu: false,
    path: 'YfdTool',
    routes: [],
    component: './YfdTool',
    menuOrder: 4,
    access: null,
    icon: null,
    indexRoute: null,
    name: '小工具',
    menuId: '94',
    iframeUrl: null,
  },
];

export const menuMockData = {
  request: [
    {
      path: '/',
      name: '根路由',
      indexRoute: 'assetsRecommendation',
      operation: 'add',
      key: 'root',
      menuCode: 'root',
      menuOrder: 0,
      routes: [
        {
          name: '智能资产推荐',
          path: 'assetsRecommendation',
          indexRoute: 'calculation',
          menuCode: 'root-assetsRecommendation',
          operation: 'add',
          routes: [
            {
              name: '模拟测算',
              path: 'calculation',
              indexRoute: 'taskList',
              icon: 'ContainerOutlined',
              menuCode: 'root-assetsRecommendation-calculation',
              operation: 'add',
              key: 'root-assetsRecommendation-calculation',
              menuOrder: 0,
              routes: [
                {
                  path: 'taskList',
                  name: '任务列表',
                  component: './Calculation/TaskList',
                  menuCode: 'root-assetsRecommendation-calculation-taskList',
                  key: 'root-assetsRecommendation-calculation-taskList',
                  operation: 'add',
                  menuOrder: 0,
                },
                {
                  path: 'calculateTable',
                  name: '测算工作台',
                  component: './Calculation/CalculateTable',
                  hideInMenu: true,
                  key: 'root-assetsRecommendation-calculation-calculateTable',
                  menuCode: 'root-assetsRecommendation-calculation-calculateTable',
                  operation: 'add',
                  menuOrder: 1,
                },
              ],
            },
          ],
          key: 'root-assetsRecommendation',
          menuOrder: 0,
        },
      ],
    },
  ],
  deleteMenuList: [],
};

export const requestData = {
  request: [
    {
      hideInMenu: '0',
      path: '/',
      component: null,
      menuOrder: 0,
      access: null,
      icon: null,
      indexRoute: '',
      menuId: '85',
      key: 'root',
      menuCode: 'root',
      operation: 'modify',
      name: '根路由',
      routes: [
        {
          name: '新菜单',
          menuId: '86',
          key: 'root-templateDetail',
          path: 'templateDetail',
          indexRoute: '',
          operation: '',
          menuCode: 'root-templateDetail',
          menuOrder: 0,
        },
      ],
    },
  ],
  deleteMenuList: ['83', '84'],
  loginId: '2020092801999334',
};

// 扁平成一层的菜单List，测试验证完可能会删除
export const list = [
  {
    path: '/',
    title: '根路由',
    redirect: 'assetsRecommendation',
    key: 'root',
    menuId: 'root',
    menuOrder: 0,
    operation: '',
  },
  {
    title: '智能资产推荐',
    path: 'assetsRecommendation',
    indexRoute: {
      redirect: 'calculation',
    },
    menuId: 'root-assetsRecommendation',
    key: 'root-assetsRecommendation',
    menuOrder: 0,
    operation: '',
  },
  {
    title: '模拟测算',
    path: 'calculation',
    indexRoute: {
      redirect: 'taskList',
    },
    icon: 'ContainerOutlined',
    menuId: 'root-assetsRecommendation-calculation',
    key: 'root-assetsRecommendation-calculation',
    menuOrder: 0,
    operation: '',
  },
  {
    path: 'taskList',
    title: '任务列表',
    component: './Calculation/TaskList',
    menuId: 'root-assetsRecommendation-calculation-taskList',
    key: 'root-assetsRecommendation-calculation-taskList',
    menuOrder: 0,
    operation: '',
  },
  {
    path: 'calculateTable',
    title: '测算工作台',
    component: './Calculation/CalculateTable',
    hideInMenu: true,
    key: 'root-assetsRecommendation-calculation-calculateTable',
    menuId: 'root-assetsRecommendation-calculation-calculateTable',
    menuOrder: 1,
    operation: '',
  },
  {
    path: 'comPage',
    title: '组件列表',
    component: './Calculation/ComPage',
    key: 'root-assetsRecommendation-calculation-comPage',
    menuId: 'root-assetsRecommendation-calculation-comPage',
    menuOrder: 2,
    operation: '',
  },
  {
    path: 'configurationCenter',
    title: '配置中心',
    component: './Calculation/ConfigurationCenter',
    hideInMenu: true,
    key: 'root-assetsRecommendation-calculation-configurationCenter',
    menuId: 'root-assetsRecommendation-calculation-configurationCenter',
    menuOrder: 3,
    operation: '',
  },
  {
    title: '策略中心',
    icon: 'BoxPlotOutlined',
    path: 'strategycenter',
    indexRoute: {
      redirect: 'management',
    },
    key: 'root-assetsRecommendation-strategycenter',
    menuId: 'root-assetsRecommendation-strategycenter',
    menuOrder: 1,
    operation: '',
  },
  {
    path: 'management',
    title: '规则管理',
    component: './Calculation/Management',
    key: 'root-assetsRecommendation-strategycenter-management',
    menuId: 'root-assetsRecommendation-strategycenter-management',
    menuOrder: 0,
    operation: '',
  },
  {
    path: 'ruleConfig',
    title: '在线规则配置',
    component: './Calculation/RuleManagement/components/Onlineruleconfiguration',
    hideInMenu: true,
    parentKeys: ['ruleManagement'],
    menuId: 'root-assetsRecommendation-strategycenter-ruleConfig',
    key: 'root-assetsRecommendation-strategycenter-ruleConfig',
    menuOrder: 1,
    operation: '',
  },
  {
    path: 'offlineConfiguration',
    title: '离线规则配置',
    component: './Calculation/Rulerangelist/components/Offlineruleconfiguration',
    hideInMenu: true,
    parentKeys: ['ruleManagement'],
    key: 'root-assetsRecommendation-strategycenter-offlineConfiguration',
    menuId: 'root-assetsRecommendation-strategycenter-offlineConfiguration',
    menuOrder: 2,
    operation: '',
  },
  {
    title: '策略管理',
    path: 'strategyManagement',
    component: './Calculation/StrategyCenter',
    key: 'root-assetsRecommendation-strategycenter-strategyManagement',
    menuId: 'root-assetsRecommendation-strategycenter-strategyManagement',
    menuOrder: 3,
    operation: '',
  },
  {
    title: '子策略页面',
    path: 'versionpage',
    hideInMenu: true,
    parentKeys: ['strategyManagement'],
    component: './Calculation/StrategyCenter/VersionPage',
    key: 'root-assetsRecommendation-strategycenter-versionpage',
    menuId: 'root-assetsRecommendation-strategycenter-versionpage',
    menuOrder: 4,
    operation: '',
  },
  {
    path: 'linkConfig',
    title: '链路配置',
    hideInMenu: true,
    parentKeys: ['strategyManagement'],
    component: './Calculation/LinkConfig',
    key: 'root-assetsRecommendation-strategycenter-linkConfig',
    menuId: 'root-assetsRecommendation-strategycenter-linkConfig',
    menuOrder: 5,
    operation: '',
  },
  {
    title: '错误页',
    path: 'error.htm',
    component: './Error',
    hideInMenu: true,
    key: 'root-assetsRecommendation-error.htm',
    menuId: 'root-assetsRecommendation-error.htm',
    menuOrder: 2,
    operation: '',
  },
  {
    path: 'ruralInstitutions',
    indexRoute: {
      redirect: 'ediiioanreport',
    },
    title: '农村机构平台',
    menuId: 'root-ruralInstitutions',
    key: 'root-ruralInstitutions',
    menuOrder: 1,
    operation: '',
  },
  {
    path: 'ediiioanreport',
    icon: 'ApartmentOutlined',
    indexRoute: {
      redirect: 'datalist',
    },
    title: '机构平台',
    key: 'root-ruralInstitutions-ediiioanreport',
    menuId: 'root-ruralInstitutions-ediiioanreport',
    menuOrder: 0,
    operation: '',
  },
  {
    path: 'datalist',
    indexRoute: {
      redirect: 'managementpage',
    },
    title: '机构数据',
    key: 'root-ruralInstitutions-ediiioanreport-datalist',
    menuId: 'root-ruralInstitutions-ediiioanreport-datalist',
    menuOrder: 0,
    operation: '',
  },
  {
    path: 'managementpage',
    component: 'ruralInstitutions/EditIoanReport/ManagementPage',
    key: 'root-ruralInstitutions-ediiioanreport-datalist-managementpage',
    menuId: 'root-ruralInstitutions-ediiioanreport-datalist-managementpage',
    menuOrder: 0,
    operation: '',
  },
  {
    path: 'messagepage',
    component: 'ruralInstitutions/EditIoanReport/MessagePage',
    key: 'root-ruralInstitutions-ediiioanreport-datalist-messagepage',
    menuId: 'root-ruralInstitutions-ediiioanreport-datalist-messagepage',
    menuOrder: 1,
    operation: '',
  },
  {
    path: 'visitdetails',
    component: 'ruralInstitutions/EditIoanReport/VisitDetails',
    key: 'root-ruralInstitutions-ediiioanreport-datalist-visitdetails',
    menuId: 'root-ruralInstitutions-ediiioanreport-datalist-visitdetails',
    menuOrder: 2,
    operation: '',
  },
  {
    path: 'statisticsinstitutions',
    icon: 'PieChartOutlined',
    component: 'ruralInstitutions/StatisticsInstitutions',
    title: '机构统计',
    key: 'root-ruralInstitutions-statisticsinstitutions',
    menuId: 'root-ruralInstitutions-statisticsinstitutions',
    menuOrder: 1,
    operation: '',
  },
  {
    title: '错误页',
    path: 'error.htm',
    component: './Error',
    hideInMenu: true,
    key: 'root-ruralInstitutions-error.htm',
    menuId: 'root-ruralInstitutions-error.htm',
    menuOrder: 2,
    operation: '',
  },
  {
    path: 'demand',
    indexRoute: {
      redirect: 'ioanTemplate',
    },
    title: '微贷风险报告',
    menuId: 'root-demand',
    key: 'root-demand',
    menuOrder: 2,
    operation: '',
  },
  {
    path: 'ioanTemplate',
    icon: 'PicRightOutlined',
    component: 'demand/LoanReport/TemplateManagement',
    title: '模板管理',
    key: 'root-demand-ioanTemplate',
    menuId: 'root-demand-ioanTemplate',
    menuOrder: 0,
    operation: '',
  },
  {
    path: 'templateDetail',
    hideInMenu: true,
    component: 'demand/LoanReport/TemplateManagement/TemplateDetail',
    title: '报告模板详情',
    key: 'root-demand-templateDetail',
    menuId: 'root-demand-templateDetail',
    menuOrder: 1,
    operation: '',
  },
  {
    path: 'previewTemplate',
    hideInMenu: true,
    component: 'demand/LoanReport/TemplateManagement/PreviewTemplate',
    title: '预览模板',
    key: 'root-demand-previewTemplate',
    menuId: 'root-demand-previewTemplate',
    menuOrder: 2,
    operation: '',
  },
  {
    path: 'ioanAddTemplate',
    hideInMenu: true,
    component: 'demand/LoanReport/TemplateManagement/AddTemplate',
    title: '新建报告模板',
    key: 'root-demand-ioanAddTemplate',
    menuId: 'root-demand-ioanAddTemplate',
    menuOrder: 3,
    operation: '',
  },
  {
    path: 'addTemplateEdit',
    hideInMenu: true,
    component: 'demand/LoanReport/TemplateManagement/AddTemplateEdit',
    title: '新建报告模板',
    menuRender: false,
    key: 'root-demand-addTemplateEdit',
    menuId: 'root-demand-addTemplateEdit',
    menuOrder: 4,
    operation: '',
  },
  {
    path: 'ioanEditTemplate',
    hideInMenu: true,
    component: 'demand/LoanReport/TemplateManagement/EditTemplate',
    title: '编辑报告模板',
    key: 'root-demand-ioanEditTemplate',
    menuId: 'root-demand-ioanEditTemplate',
    menuOrder: 5,
    operation: '',
  },
  {
    path: 'templateEdit',
    hideInMenu: true,
    component: 'demand/LoanReport/TemplateManagement/TemplateEdit',
    title: '编辑报告模板',
    menuRender: false,
    key: 'root-demand-templateEdit',
    menuId: 'root-demand-templateEdit',
    menuOrder: 6,
    operation: '',
  },
  {
    path: 'addIoanReport',
    hideInMenu: true,
    component: 'demand/LoanReport/ReportManagement/AddReport',
    title: '新建报告',
    key: 'root-demand-addIoanReport',
    menuId: 'root-demand-addIoanReport',
    menuOrder: 7,
    operation: '',
  },
  {
    path: 'reportEdit',
    component: 'demand/LoanReport/ReportManagement/ReportEdit',
    title: '编辑报告',
    hideInMenu: true,
    menuRender: false,
    key: 'root-demand-reportEdit',
    menuId: 'root-demand-reportEdit',
    menuOrder: 8,
    operation: '',
  },
  {
    path: 'ioanReport',
    icon: 'ContainerOutlined',
    component: 'demand/LoanReport/ReportManagement',
    title: '报告管理',
    key: 'root-demand-ioanReport',
    menuId: 'root-demand-ioanReport',
    menuOrder: 9,
    operation: '',
  },
  {
    path: 'editIoanReport',
    hideInMenu: true,
    component: 'demand/LoanReport/ReportManagement/EditReport',
    title: '编辑报告',
    menuRender: false,
    key: 'root-demand-editIoanReport',
    menuId: 'root-demand-editIoanReport',
    menuOrder: 10,
    operation: '',
  },
  {
    path: 'reportDetail',
    hideInMenu: true,
    component: 'demand/LoanReport/ReportManagement/ReportDetail',
    title: '报告详情',
    key: 'root-demand-reportDetail',
    menuId: 'root-demand-reportDetail',
    menuOrder: 11,
    operation: '',
  },
  {
    title: '错误页',
    path: 'error.htm',
    component: './Error',
    hideInMenu: true,
    key: 'root-demand-error.htm',
    menuId: 'root-demand-error.htm',
    menuOrder: 12,
    operation: '',
  },
  {
    title: '联营指挥塔',
    path: 'fullLink',
    indexRoute: {
      redirect: 'customerAttribution',
    },
    menuId: 'root-fullLink',
    key: 'root-fullLink',
    menuOrder: 3,
    operation: '',
  },
  {
    title: '客户归属',
    path: 'customerAttribution',
    component: './FullLink',
    hideInMenu: true,
    key: 'root-fullLink-customerAttribution',
    menuId: 'root-fullLink-customerAttribution',
    menuOrder: 0,
    operation: '',
  },
  {
    title: '错误页',
    path: 'error.htm',
    component: './Error',
    hideInMenu: true,
    key: 'root-fullLink-error.htm',
    menuId: 'root-fullLink-error.htm',
    menuOrder: 1,
    operation: '',
  },
];