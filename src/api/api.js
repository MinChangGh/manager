import request from '@/utils/request'

export function getmenu(data) {
  return request({
    url: '/getmenu',
    method: 'post',
    data:data
  })
}

export function getkey(data) {
  return request({
    url: '/getkey',
    method: 'post',
    data:data
  })
}

export function getlist(data) {
  return request({
    url: '/getlist',
    method: 'post',
    data:data
  })
}
