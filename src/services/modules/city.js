import hyRequest from '../request'

export function getCityData(){
  return hyRequest.get({
    url:'/city/all'
  })
}
