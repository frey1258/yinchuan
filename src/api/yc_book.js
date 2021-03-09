import request from '@/utils/request';
/*
    ------------------------------预约实验室
*/

export function appointmentAdd(data) {
    // 新增预约实验室表
    return request({
        url: '/appointment',
        method: 'post',
        data: data
    })
}

export function appointmentUpdate(data) {
    // 修改预约实验室表
    return request({
        url: '/appointment',
        method: 'put',
        data: data
    })
}


export function appointmentList() {
    // 查询所有数据（可用户下拉框数据）
    return request({
        url: '/appointment/list',
        method: 'get'
    })
}

export function appointmentPage(query) {
    // 分页查询
    return request({
        url: '/appointment/page',
        method: 'get',
        params: query
    })
}

export function appointmentPass(data) {
    // 通过
    return request({
        url: '/appointment/pass/'+data,
        method: 'post',
    })
}


export function appointmentRevokeOrRefuse(data) {
    // 撤销/拒绝
    return request({
        url: '/appointment/revokeOrRefuse',
        method: 'post',
        data: data
    })
}


export function appointmentScheduleList(query) {
    // 课表列表
    return request({
        url: '/appointment/scheduleList',
        method: 'get',
        params: query
    })
}

export function appointmentGet(query) {
    // 通过id查询预约实验室表
    return request({
        url: '/appointment/'+query,
        method: 'get',
    })
}

export function appointmentDelete(data) {
    // 通过id删除预约实验室表
    return request({
        url: '/appointment/'+data,
        method: 'delete',
    })
}


export function appointmentHomePageData() {
    // 首页数据
    return request({
        url: '/appointment/homePageData',
        method: 'get',
    })
}


export function adminloginlogPage(query) {
    // 登陆日志分页查询
    return request({
        url: '/adminloginlog/page',
        method: 'get',
        params: query
    })
}


export function adminloginlogExport(query) {
    // 导出登录日志
    return request({
        url: '/adminloginlog/export',
        method: 'get',
        params: query
    })
}



export function appointmentImport(data) {
    // 导入预约记录
    return request({
        url: '/appointment/import',
        method: 'post',
        data: data
    })
}


export function appointmentExport(query) {
    // 导出预约记录
    return request({
        url: '/appointment/export',
        method: 'get',
        params: query
    })
}