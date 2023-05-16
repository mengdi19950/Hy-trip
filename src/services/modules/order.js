import hyRequest from '../request/index'

export function getOrderAllData(){
  return hyRequest.get({
    url:'/order/list',
    params:{
      type:'all'
    }
  })
}
export function getOrderRecentData(){
  return hyRequest.get({
    url:'/order/list',
    params:{
      type:'recent'
    }
  })
}
export function getOrderPendData(){
  return hyRequest.get({
    url:'/order/list',
    params:{
      type:'pend'
    }
  })
}