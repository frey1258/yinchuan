import request from '@/utils/request';
/*
    ------------------------------所有角色表
*/
export function roleList() {
    // 获取所有角色
    return request({
        url: '/role/listAll',
        method: 'get',
    })
}

export function roleAdd(data) {
    // 新增角色
    return request({
        url: '/role',
        method: 'post',
        data: data
    })
}

export function roleUpdate(data) {
    // 修改角色
    return request({
        url: '/role',
        method: 'put',
        data: data
    })
}


export function rolePage(query) {
    // 分页查询
    return request({
        url: '/role/page',
        method: 'get',
        params: query
    })
}


export function menuTreeList() {
    // 获取角色相关菜单
    return request({
        url: '/menu/treeList',
        method: 'get',
    })
}


export function roleDelete(query) {
    // 通过id删除角色
    return request({
        url: '/role/'+query,
        method: 'delete',
    })
}
 

export function roleListDelete(data) {
    // 批量删除角色
    return request({
        url: '/role/batchDelete',
        method: 'post',
        data:data
    })
}
 