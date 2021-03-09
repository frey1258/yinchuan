import request from '@/utils/request';
/*
    ------------------------------设备表管理
*/
export function deviceAdd(data) {
    // 新增设备表
    return request({
        url: '/device',
        method: 'post',
        data: data
    })
}

export function deviceUpdate(data) {
    // 修改设备表
    return request({
        url: '/device',
        method: 'put',
        data: data
    })
}


export function deviceList() {
    // 查询所有设备表数据（可用户下拉框数据）
    return request({
        url: '/device/list',
        method: 'get'
    })
}

export function devicePage(query) {
    // 分页查询
    return request({
        url: '/device/page',
        method: 'get',
        params: query
    })
}

export function deviceGet(query) {
    // 通过id查询设备表
    return request({
        url: '/device/'+query,
        method: 'get',
    })
}

export function deviceDelete(data) {
    // 通过id删除课节表
    return request({
        url: '/device/'+data,
        method: 'delete',
    })
}
 
 