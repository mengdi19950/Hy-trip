import hyRequest from '../request/index'

export function getFavorlistData(){
  return hyRequest.get({
    url:'/favor/list'
  })
}
export function getFavorHistoryData(){
  return hyRequest.get({
    url:'/favor/history'
  })
}