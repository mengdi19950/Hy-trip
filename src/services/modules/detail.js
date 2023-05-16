import hyRequest from '../request'

export function getDetailData(houseId){
  return hyRequest.get({
    url:'/detail/infos',
    params:{
      houseId
    }
  })
}