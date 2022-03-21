import request from '../http'

// 英雄列表
export function getHeroes() {
  return request({
    url: 'rest/heroes',
    method: 'get',
  })
}

// 删除
export function delHeroes(id) {
  return request({
    url: `rest/heroes/${id}`,
    method: 'delete',
  })
}

// 添加
export function addHeroes(data) {
  return request({
    url: 'rest/heroes',
    method: 'post',
    data
  })
}

// 详情
export function findHeroe(id) {
  return request({
    url: `rest/heroes/${id}`,
    method: 'get',
  })
}

// 编辑
export function editHeroes(id, data) {
  return request({
    url: `rest/heroes/${id}`,
    method: 'put',
    data
  })
}


