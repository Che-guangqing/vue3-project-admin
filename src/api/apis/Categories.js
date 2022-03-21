
import request from '../http'


// 获取分类数据
export function getCategories() {
  return request({
    url: 'rest/categories',
    method: 'get',
  })
}


// 删除
export function delCategories(id) {
  return request({
    url: `rest/categories/${id}`,
    method: 'delete',
  })
}

// 添加
export function addCategories(data) {
  return request({
    url: 'rest/categories',
    method: 'post',
    data
  })
}

// 详情
export function findCategorie(id) {
  return request({
    url: `rest/categories/${id}`,
    method: 'get',
  })
}

// 编辑
export function editCategories(id, data) {
  return request({
    url: `rest/categories/${id}`,
    method: 'put',
    data
  })
}
