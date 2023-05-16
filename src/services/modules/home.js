import hyRequest from '../request'

export function getHomeSuggestsData(){
  return hyRequest.get({
    url:'/home/hotSuggests'
  })
}
export function getHomeCategoriesData(){
  return hyRequest.get({
    url:'/home/categories'
  })
}
export function getHouseListData(currentPage){
  return hyRequest.get({
    url:'/home/houselist',
    params:{
      page:currentPage
    }
  })
}