import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/role/page',
    method: 'get',
    params: params
  })
}

export function createRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data: data
  })
}

export function updateRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/role/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteRole(data) {
  return request({
    url:'/role/' + data,
    method:'delete',
  })
}

export function fetchAllRoleList() {
  return request({
    url: '/role/listAll',
    method: 'get'
  })
}

export function listMenuByRole(roleId) {
  return request({
    url: '/role/listMenu/'+roleId,
    method: 'get'
  })
}

export function listResourceByRole(roleId) {
  return request({
    url: '/role/listResource/'+roleId,
    method: 'get'
  })
}

export function allocMenu(data) {
  return request({
    url: '/role/allocMenu',
    method: 'post',
    data:data
  })
}

export function allocResource(data) {
  return request({
    url: '/role/allocResource',
    method: 'post',
    data:data
  })
}
