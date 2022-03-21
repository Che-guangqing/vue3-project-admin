
import request from '../http'


// 获取文章数据
export function getArticles() {
  return request({
    url: 'rest/articles',
    method: 'get',
  })
}


// 删除
export function delArticles(id) {
  return request({
    url: `rest/articles/${id}`,
    method: 'delete',
  })
}

// 添加
export function addArticles(data) {
  return request({
    url: 'rest/articles',
    method: 'post',
    data
  })
}

// 详情
export function findArticle(id) {
  return request({
    url: `rest/articles/${id}`,
    method: 'get',
  })
}

// 编辑
export function editArticles(id, data) {
  return request({
    url: `rest/articles/${id}`,
    method: 'put',
    data
  })
}
