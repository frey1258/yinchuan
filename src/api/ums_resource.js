import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/resource/list',
    method: 'get',
    params: params
  })
}

export function createResource(data) {
  return request({
    url: '/resource',
    method: 'post',
    data: data
  })
}

export function updateResource(data) {
  return request({
    url: '/resource',
    method: 'put',
    data: data
  })
}

export function deleteResource(id) {
  return request({
    url: '/resource/' + id,
    method: 'delete'
  })
}

export function fetchAllResourceList() {
  return request({
    url: '/resource/listAll',
    method: 'get'
  })
}
