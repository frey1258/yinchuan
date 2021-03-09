import request from '@/utils/request';
/*
    ------------------------------所有用户表
*/

export function adminAdd(data) {
    // 新增用户
    return request({
        url: '/admin',
        method: 'post',
        data: data
    })
}

export function adminUpdate(data) {
    // 修改用户
    return request({
        url: '/admin',
        method: 'put',
        data: data
    })
}

export function adminInfo(query) {
    // 获取当前登录用户信息
    return request({
        url: '/admin/info',
        method: 'get',
        params: query
    })
}


export function adminPage(query) {
    // 学生/教师列表
    return request({
        url: '/admin/list',
        method: 'get',
        params: query
    })
}
 

// export function semesterList() {
//     // 查询所有数据（可用户下拉框数据）
//     return request({
//         url: '/semester/list',
//         method: 'get'
//     })
// }

export function adminRoleGet(query) {
    // 获取指定用户的角色
    return request({
        url: '/admin/role/'+query,
        method: 'get',
    })
}

export function adminGet(query) {
    // 获取指定用户信息
    return request({
        url: '/admin/'+query,
        method: 'get',
    })
}

export function adminUserList(query) {
    // 获取用户列表
    return request({
        url: '/admin/userList',
        method: 'get',
        params: query
    })
}

export function adminDelete(data) {
    // 删除指定用户信息
    return request({
        url: '/admin/'+data,
        method: 'delete',
    })
}

// export function semesterListDelete(data) {
//     // 批量删除学期
//     return request({
//         url: '/semester/deleteBatch',
//         method: 'delete',
//         data:data
//     })
// }
 
export function adminImportStudent(data) {
    // 导入学生
    return request({
        url: '/admin/importStudent',
        method: 'post',
        data: data
    })
}

export function adminImportTeacher(data) {
    // 导入教师
    return request({
        url: '/admin/importTeacher',
        method: 'post',
        data: data
    })
}