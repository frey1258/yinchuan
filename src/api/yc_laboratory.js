import request from '@/utils/request';
/*
    ------------------------------实验室表管理
*/

export function labAdd(data) {
    // 新增实验室表
    return request({
        url: '/lab',
        method: 'post',
        data: data
    })
}

export function labUpdate(data) {
    // 修改实验室表
    return request({
        url: '/lab',
        method: 'put',
        data: data
    })
}



export function labAddInnerUser(data) {
    // 添加内部用户
    return request({
        url: '/lab/addInnerUser',
        method: 'post',
        data: data
    })
}

export function labAddOutUser(data) {
    // 添加外部用户
    return request({
        url: '/lab/addOutUser',
        method: 'post',
        data: data
    })
}


export function labRelatedDevice(data) {
    // 添加关联设备
    return request({
        url: '/lab/relatedDevice',
        method: 'post',
        data: data
    })
}

export function labUpdatePassword(data) {
    // 修改开门密码或者管理密码
    return request({
        url: '/lab/updatePassword',
        method: 'post',
        data: data
    })
}


export function labList() {
    // 查询所有数据（可用户下拉框数据）
    return request({
        url: '/lab/list',
        method: 'get'
    })
}


export function labPage(query) {
    // 分页查询
    return request({
        url: '/lab/page',
        method: 'get',
        params: query
    })
}

export function labGet(query) {
    // 通过id查询实验室表
    return request({
        url: '/lab/'+query,
        method: 'get',
    })
}

export function labDelete(data) {
    // 通过id删除实验室表
    return request({
        url: '/lab/'+data,
        method: 'delete',
    })
}

// export function lessonListDelete(data) {
//     // 批量删除课节
//     return request({
//         url: '/lesson/deleteBatch',
//         method: 'delete',
//         data:data
//     })
// }
 