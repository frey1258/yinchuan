import request from '@/utils/request';
/*
    ------------------------------学期表
*/

export function semesterAdd(data) {
    // 新增学期
    return request({
        url: '/semester',
        method: 'post',
        data: data
    })
}

export function semesterUpdate(data) {
    // 修改学期表
    return request({
        url: '/semester',
        method: 'put',
        data: data
    })
}


export function semesterList() {
    // 查询所有数据（可用户下拉框数据）
    return request({
        url: '/semester/list',
        method: 'get'
    })
}

export function semesterPage(query) {
    // 分页查询
    return request({
        url: '/semester/page',
        method: 'get',
        params: query
    })
}

export function semesterGet(query) {
    // 通过id查询学期
    return request({
        url: '/semester/'+query,
        method: 'get',
    })
}


export function semesterWeekNumList(query) {
    // 学周列表
    return request({
        url: '/semester/weekNumList/',
        method: 'get',
        params: query
    })
}

export function semesterDelete(data) {
    // 通过id删除学期表
    return request({
        url: '/semester/'+data,
        method: 'delete',
    })
}

export function semesterListDelete(data) {
    // 批量删除学期
    return request({
        url: '/semester/deleteBatch',
        method: 'delete',
        data:data
    })
}
 