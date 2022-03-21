import request from '../http'

// 广告位列表
export function getAds() {
  return request({
    url: 'rest/ads',
    method: 'get',
  })
}

// 删除
export function delAds(id) {
  return request({
    url: `rest/ads/${id}`,
    method: 'delete',
  })
}

// 添加
export function addAds(data) {
  return request({
    url: 'rest/ads',
    method: 'post',
    data
  })
}

// 详情
export function findAd(id) {
  return request({
    url: `rest/ads/${id}`,
    method: 'get',
  })
}

// 编辑
export function editAds(id, data) {
  return request({
    url: `rest/ads/${id}`,
    method: 'put',
    data
  })
}


