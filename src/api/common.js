import request from '@/utils/request'

export function getComNo(data) {
  return request({
    url: 'Consult/Api/cno',
    method: 'post',
    data
  })
}
