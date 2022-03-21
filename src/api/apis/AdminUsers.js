import request from '../http'

// 管理员列表
export function getAdminUsers() {
  return request({
    url: 'rest/admin_users',
    method: 'get',
  })
}

// 删除
export function delAdminUsers(id) {
  return request({
    url: `rest/admin_users/${id}`,
    method: 'delete',
  })
}

// 添加
export function addAdminUsers(data) {
  return request({
    url: 'rest/admin_users',
    method: 'post',
    data
  })
}

// 详情
export function findAdminUser(id) {
  return request({
    url: `rest/admin_users/${id}`,
    method: 'get',
  })
}

// 编辑
export function editAdminUsers(id, data) {
  return request({
    url: `rest/admin_users/${id}`,
    method: 'put',
    data
  })
}

// 登录
export function loginFn(data) {
  return request({
    url: 'login',
    method: 'post',
    data
  })
}

