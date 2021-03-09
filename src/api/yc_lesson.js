import request from '@/utils/request';
/*
    ------------------------------课节表管理
*/

export function lessonAdd(data) {
    // 新增课节表
    return request({
        url: '/lesson',
        method: 'post',
        data: data
    })
}

export function lessonUpdate(data) {
    // 修改课节表
    return request({
        url: '/lesson',
        method: 'put',
        data: data
    })
}


export function lessonList() {
    // 查询所有数据（可用户下拉框数据）
    return request({
        url: '/lesson/list',
        method: 'get'
    })
}

export function lessonPage(query) {
    // 分页查询
    return request({
        url: '/lesson/page',
        method: 'get',
        params: query
    })
}

export function lessonGet(query) {
    // 通过id查询课节表
    return request({
        url: '/lesson/'+query,
        method: 'get',
    })
}

export function lessonDelete(data) {
    // 通过id删除课节表
    return request({
        url: '/lesson/'+data,
        method: 'delete',
    })
}

export function lessonListDelete(data) {
    // 批量删除课节
    return request({
        url: '/lesson/deleteBatch',
        method: 'delete',
        data:data
    })
}
 