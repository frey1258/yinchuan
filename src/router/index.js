import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {
        title: '首页',
        icon: 'home'
      }
    }]
  }
]

export const asyncRouterMap = [{
    path: '/mybook',
    component: Layout,
    redirect: 'noredirect',
    name: 'mybookdas',
    meta: {
      title: '我的预约',
      icon: 'product'
    },
    children: [{
        path: 'book',
        name: 'MyBook',
        component: () => import('@/views/mybook/index'),
        meta: {
          title: '我的预约',
          icon: 'yc_wodeyuyue'
        }
      },
      {
        path: 'book/lab',
        name: 'BookLab',
        component: () => import('@/views/mybook/BookLab'),
        meta: {
          title: '预约实验室'
        },
        hidden: true
      },
      {
        path: 'book/update',
        name: 'BookUpdate',
        component: () => import('@/views/mybook/BookUpdate'),
        meta: {
          title: '修改预约实验室'
        },
        hidden: true
      },
      {
        path: 'book/les',
        name: 'BookLes',
        component: () => import('@/views/mybook/BookLes'),
        meta: {
          title: '选择预约课节'
        },
        hidden: true
      },
      {
        path: 'book/viewles',
        name: 'ViewLes',
        component: () => import('@/views/mybook/ViewLes'),
        meta: {
          title: '查看课表'
        },
        hidden: true
      },
      {
        path: 'book/info',
        name: 'BookInfo',
        component: () => import('@/views/mybook/BookInfo'),
        meta: {
          title: '预约详情'
        },
        hidden: true
      },
    ]
  },
  {
    path: '/book',
    component: Layout,
    redirect: 'noRedirect',
    name: '',
    meta: {
      title: '预约管理'
    },
    children: [{
      path: 'manager',
      name: 'BookManager',
      component: () => import('@/views/bookmanager/index'),
      meta: {
        title: '预约管理',
        icon: 'yc_yuyueguanli'
      }
    }, ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: 'noRedirect',
    name: '',
    meta: {
      title: ''
    },
    children: [{
        path: 'index',
        name: 'MyCourse',
        component: () => import('@/views/mycourses/index'),
        meta: {
          title: '我的课程',
          icon: 'yc_wodekecheng'
        }
      },
      {
        path: 'info',
        name: 'CourseInfo',
        component: () => import('@/views/mycourses/CourseInfo'),
        meta: {
          title: '课程详情'
        },
        hidden: true
      },
    ]
  },
  {
    path: '/lab',
    component: Layout,
    redirect: 'noRedirect',
    name: '',
    meta: {
      title: ''
    },
    children: [{
        path: 'index',
        name: 'MyLab',
        component: () => import('@/views/labmanager/index'),
        meta: {
          title: '实验室管理',
          icon: 'yc_shiyanshiguanli'
        }
      },
      {
        path: 'add',
        name: 'LabAdd',
        component: () => import('@/views/labmanager/AddLab'),
        meta: {
          title: '添加实验室'
        },
        hidden: true
      },
      {
        path: 'update',
        name: 'LabUpdate',
        component: () => import('@/views/labmanager/UpdateLab'),
        meta: {
          title: '编辑实验室'
        },
        hidden: true
      },
      {
        path: 'info',
        name: 'LabInfo',
        component: () => import('@/views/labmanager/LabInfo'),
        meta: {
          title: '实验室详情'
        },
        hidden: true
      },
    ]
  },
  {
    path: '/device',
    component: Layout,
    redirect: 'noRedirect',
    name: '',
    meta: {
      title: ''
    },
    children: [{
        path: 'index',
        name: 'MyDevice',
        component: () => import('@/views/devices/index'),
        meta: {
          title: '设备管理',
          icon: 'yc_shebeiguanli'
        }
      },
      {
        path: 'add',
        name: 'DeviceAdd',
        component: () => import('@/views/devices/Add'),
        meta: {
          title: '添加设备'
        },
        hidden: true
      },
      {
        path: 'update',
        name: 'DeviceUpdate',
        component: () => import('@/views/devices/Update'),
        meta: {
          title: '修改设备'
        },
        hidden: true
      },
      {
        path: 'info',
        name: 'DeviceInfo',
        component: () => import('@/views/devices/Info'),
        meta: {
          title: '设备详情'
        },
        hidden: true
      },
    ]
  },
  {
    path: '/bigscreen',
    component: Layout,
    redirect: 'noRedirect',
    name: '',
    meta: {
      title: ''
    },
    children: [{
        path: 'index',
        name: 'BigScreen',
        component: () => import('@/views/bigscreen/index'),
        meta: {
          title: '数字大屏',
          icon: 'yc_shuzidaping'
        }
      },
    ]
  },
  {
    path: '/ums',
    component: Layout,
    redirect: 'noredirect',
    name: '权限管理',
    meta: {
      title: '权限管理',
      icon: 'yc_quanxian'
    },
    children: [
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/ums/role/index'),
        meta: {
          title: '角色列表',
        }
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/ums/role/allocMenu'),
        meta: {
          title: '分配菜单'
        },
        hidden: true
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () => import('@/views/ums/role/allocResource'),
        meta: {
          title: '分配资源'
        },
        hidden: true
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/ums/menu/index'),
        meta: {
          title: '菜单列表'
        }
      },
      {
        path: 'addMenu',
        name: 'addMenu',
        component: () => import('@/views/ums/menu/add'),
        meta: {
          title: '添加菜单'
        },
        hidden: true
      },
      {
        path: 'updateMenu',
        name: 'updateMenu',
        component: () => import('@/views/ums/menu/update'),
        meta: {
          title: '修改菜单'
        },
        hidden: true
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/ums/resource/index'),
        meta: {
          title: '资源列表'
        }
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('@/views/ums/resource/categoryList'),
        meta: {
          title: '资源分类'
        },
        hidden: true
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: 'noRedirect',
    name: '',
    meta: {
      title: '系统设置',
      icon:'yc_xitongshezhi'
    },
    children: [{
        path: 'class',
        name: 'BanJi',
        component: () => import('@/views/systemset/banji/index'),
        meta: {
          title: '班级管理',
        }
      },
      {
        path: 'semester',
        name: 'XueQi',
        component: () => import('@/views/systemset/xueqi/index'),
        meta: {
          title: '学期管理'
        },
      },
      {
        path: 'lesson',
        name: 'KeJie',
        component: () => import('@/views/systemset/kejie/index'),
        meta: {
          title: '课节管理'
        },
      },
      {
        path: 'teacher',
        name: 'LaoShi',
        component: () => import('@/views/systemset/laoshi/index'),
        meta: {
          title: '教职工管理'
        },
      },
      {
        path: 'student',
        name: 'XueSheng',
        component: () => import('@/views/systemset/xuesheng/index'),
        meta: {
          title: '学生管理'
        },
      },
      // {
      //   path: 'role',
      //   name: 'JueSe',
      //   component: () => import('@/views/systemset/juese/index'),
      //   meta: {
      //     title: '角色管理'
      //   },
      // },
      {
        path: 'set',
        name: 'Set',
        component: () => import('@/views/systemset/Set'),
        meta: {
          title: '高级设置'
        },
      },
    ]
  },
  {
    // 设备默认图
    path: '/default/deviceInfo',
    component: (resolve) => require(['@/views/deviceInfo'], resolve),
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
