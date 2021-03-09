import request from '@/utils/request'

export function listAllCate() {
  return request({
    url: '/resourceCategory/listAll',
    method: 'get'
  })
}

export function createResourceCategory(data) {
  return request({
    url: '/resourceCategory',
    method: 'post',
    data: data
  })
}

export function updateResourceCategory(data) {
  return request({
    url: '/resourceCategory',
    method: 'put',
    data: data
  })
}

export function deleteResourceCategory(id) {
  return request({
    url: '/resourceCategory' + id,
    method: 'delete'
  })
}
