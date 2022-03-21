import request from '../http'


// 物品列表
export function getItems() {
  return request({
    url: 'rest/items',
    method: 'get',
  })
}

// 删除
export function delItems(id) {
  return request({
    url: `rest/items/${id}`,
    method: 'delete',
  })
}

// 添加
export function addItems(data) {
  return request({
    url: 'rest/items',
    method: 'post',
    data
  })
}

// 详情
export function findItem(id) {
  return request({
    url: `rest/items/${id}`,
    method: 'get',
  })
}

// 编辑
export function editItems(id, data) {
  return request({
    url: `rest/items/${id}`,
    method: 'put',
    data
  })
}


