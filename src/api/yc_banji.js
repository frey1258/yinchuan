import request from '@/utils/request';
/*
    ------------------------------班级表管理
*/

export function majorAdd(data) {
    // 新增专业
    return request({
        url: '/major',
        method: 'post',
        data: data
    })
}

export function majorUpdate(data) {
    // 修改专业
    return request({
        url: '/major',
        method: 'put',
        data: data
    })
}


export function majorList() {
    // 查询所有数据（可用户下拉框数据）
    return request({
        url: '/major/list',
        method: 'get'
    })
}

export function majorDelete(data) {
    // 通过id删除专业
    return request({
        url: '/major/'+data,
        method: 'delete',
    })
}

/*
    ------------------------------院系表管理
*/
export function departmentAdd(data) {
    // 新增院系
    return request({
        url: '/department',
        method: 'post',
        data: data
    })
}

export function departmentUpdate(data) {
    // 修改院系
    return request({
        url: '/department',
        method: 'put',
        data: data
    })
}


export function departmentList() {
    // 查询所有院系（可用户下拉框数据）
    return request({
        url: '/department/list',
        method: 'get'
    })
}

export function departmentTreeList() {
    // 院系专业树形列表
    return request({
        url: '/department/treeList',
        method: 'get',
    })
}

export function departmentDelete(data) {
    // 通过id删除院系
    return request({
        url: '/department/'+data,
        method: 'delete',
    })
}

/*
    ------------------------------班级管理
*/
 
export function classesAdd(data) {
    // 新增班级
    return request({
        url: '/classes',
        method: 'post',
        data: data
    })
}

export function classesUpdate(data) {
    // 修改班级
    return request({
        url: '/classes',
        method: 'put',
        data: data
    })
}

export function classesListDelete(data) {
    // 批量删除班级
    return request({
        url: '/classes/deleteBatch',
        method: 'delete',
        data:data
    })
}
 

export function classesPage(query) {
    // 分页查询
    return request({
        url: '/classes/page',
        method: 'get',
        params: query
    })
}

export function classesList(query) {
    // 班级列表查询
    return request({
        url: '/classes/list',
        method: 'get',
    })
}

export function classesGet(query) {
    // 通过id查询班级
    return request({
        url: '/classes/'+query,
        method: 'get',
    })
}

export function classesDelete(data) {
    // 通过id删除班级
    return request({
        url: '/classes/'+data,
        method: 'delete',
    })
}

export function classesImport(data) {
    // 导入班级
    return request({
        url: '/classes/import',
        method: 'post',
        data: data
    })
}

 