<template>
  <div class="favor">
    <div class="nav-bar">
      <van-nav-bar left-text="旅途" left-arrow @click-left="backClick">
        <template #title>
          <div class="tabs">
            <van-tabs v-model:active="active" type="card" shrink>
              <van-tab v-for="item in titles" :title="item" />
            </van-tabs>
          </div>
        </template>
        <template #right>
          <i class="icon"></i>
        </template>
      </van-nav-bar>
    </div>

    <div class="favorlist" v-if="active === 0">
      <van-tabs v-model:active="activeName" class="tabs" color="#ff9854">
        <van-tab title="房屋" name="house">
          <div class="content house">
            <template v-for="(item,index) in favorlists" :key="index">
              <div class="image">
                <img :src="item.defaultPicture" alt="">
                <div class="cover">
                  <div class="commentBrief">
                    <span class="score">{{ item.commentBrief.overall }}分</span>
                    <span class="recommend">{{ item.commentBrief.scoreTitle }}</span>
                  </div>
                  <div class="userInfo">
                    <div class="avatar">
                      <img :src="item.logoUrl" alt="">
                    </div>
                    <div class="like">
                      <img src="@/assets/img/search/tj-mob-ui_unit-item_collected-new.png" alt="">
                    </div>
                    <div class="comment">
                      <img src="@/assets/img/search/tj-mob-ui_unit-item_comment-new.png" alt="">
                    </div>
                    <div class="count">
                        {{ item.commentBrief.totalCount }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="info">
                <van-tag class="address" color="#3f4954">{{ item.address }}</van-tag>
                <!-- <template v-for="(item2,index2) in item.unitSummeries.slice(0,-1)" :key="index2"> -->
                  <span class="houseInfo">{{ item.unitSummeries[0]?.text }} · {{ item.unitSummeries[1]?.text }}</span>
                <!-- </template> -->
              </div>
              <div class="title">
                {{ item.unitName }}
              </div>
              <div class="tags">
                <template v-for="(item3,index3) in item.houseTags" :key="index3">
                  <van-tag :color="item3.background.color" :text-color="item3.color" class="tag">
                    {{ item3.text }}
                  </van-tag>
                </template>
              </div>
              <div class="price">
                <div class="new">{{ '¥' + item.finalPrice }}</div>
                <div class="old">{{ '¥' + item.productPrice }}</div>
                <van-tag v-if="item.priceTipBadge" class="discount" text-color="#fff" color="rgb(251,74,74)" round>
                  <i class="icon"></i>
                  {{ item.priceTipBadge.text }}
                </van-tag>
              </div>
            </template>
          </div>
        </van-tab>
        <van-tab title="房东" name="landlord">
          <div class="content landlord">
            <img src="@/assets/img/favor/empty_favorite.44731802.png" alt="">
            <div class="word">
              <div class="no-favor">暂无收藏</div>
              <div class="text">
                点击
                <img src="@/assets/img/favor/favor.png" alt="">
                即可收藏对应的房东
              </div>
              <button class="btnGo" @click="btnGoClick">
                随便逛逛
              </button>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="history" v-if="active === 1">
        <div class="content house">
            <template v-for="(item,index) in favorHistory" :key="index">
              <div class="image">
                <img :src="item.defaultPicture" alt="">
                <div class="cover">
                  <div class="commentBrief">
                    <span class="score">{{ item.commentBrief.overall }}分</span>
                    <span class="recommend">{{ item.commentBrief.scoreTitle }}</span>
                  </div>
                  <div class="userInfo">
                    <div class="avatar">
                      <img :src="item.logoUrl" alt="">
                    </div>
                    <div class="like">
                      <img src="@/assets/img/search/tj-mob-ui_unit-item_collected-new.png" alt="">
                    </div>
                    <div class="comment">
                      <img src="@/assets/img/search/tj-mob-ui_unit-item_comment-new.png" alt="">
                    </div>
                    <div class="count">
                        {{ item.commentBrief.totalCount }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="info">
                <van-tag class="address" color="#3f4954">{{ item.address }}</van-tag>
                <!-- <template v-for="(item2,index2) in item.unitSummeries.slice(0,-1)" :key="index2"> -->
                  <span class="houseInfo">{{ item.unitSummeries[0]?.text }} · {{ item.unitSummeries[1]?.text }}</span>
                <!-- </template> -->
              </div>
              <div class="title">
                {{ item.unitName }}
              </div>
              <div class="tags">
                <template v-for="(item3,index3) in item.houseTags" :key="index3">
                  <van-tag :color="item3.background.color" :text-color="item3.color" class="tag">
                    {{ item3.text }}
                  </van-tag>
                </template>
              </div>
              <div class="price">
                <div class="new">{{ '¥' + item.finalPrice }}</div>
                <div class="old">{{ '¥' + item.productPrice }}</div>
                <van-tag v-if="item.priceTipBadge" class="discount" text-color="#fff" color="rgb(251,74,74)" round>
                  <i class="icon"></i>
                  {{ item.priceTipBadge.text }}
                </van-tag>
              </div>
            </template>
        </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import useFavorStore from '@/stores/modules/favor'
import { storeToRefs } from "pinia";

const backClick = () => {
  router.back()
}
const btnGoClick = () => {
  router.push('/home')
}

const active = ref(0)
const titles = ['我的收藏','浏览历史']
const activeName = ref('house')

const favorStore = useFavorStore()
favorStore.fetchFavorlistData()
favorStore.fetchFavorHistoryData()
const { favorlists,favorHistory } = storeToRefs(favorStore)


</script>

<style lang='less' scoped>
.favor {
  .nav-bar {
    --van-nav-bar-text-color:var(--primary-color);
    --van-nav-bar-icon-color:var(--primary-color);
    :deep(.van-nav-bar__text){
      font-size: 16px;
    };

    .tabs {
      --van-tabs-default-color:var(--primary-color);
      :deep(.van-tab) {
        padding: 0 8px;
      }
    }
      .icon {
      display: inline-block;
      width: 20px;
      height: 15px;
      background-image: url(/src/assets/img/home/icon-right-menu.png);
      background-size: 20px 15px;
    }
  }
  .favorlist,
  .history {
    background-color: #f7f8fb;
    .tabs {
      :deep(.van-tab--active){
        font-weight: 400;
      };
      --van-tabs-line-height:50px;
    }
    .content {
      background-color: #f7f8fb;
      overflow-y: auto;
      height: 100vh;
    }

    .house {
      padding:20px 20px 55px 20px;
      .image {
        position: relative;
        // text-align: center;
        img {
          width: 100%;
          border-radius: 6px;
          margin-bottom: 5px;
        }
          .cover {
          .commentBrief {
            position: absolute;
            bottom: 13px;
            left: 10px;
            background-color: #fff;
            opacity: 0.9;
            width: 68px;
            height: 10px;
            padding: 3.5px 0;
            line-height: 10px;
            border-radius: 10px;
            font-size: 12px;
            text-align: center;
            .score {
              font-weight: 500;
              transform: scale(0.9);
              display: inline-block;
            }
            .recommend{
              color: #666;
              transform: scale(0.8);
              display: inline-block;
              padding-left: 4px;
              border-left: 1px solid #eee;
              
            }
          }
          .userInfo {
            display: flex;
            flex-direction: column;
            align-items:center;
            position: absolute;
            top: 15px;
            right: 10px;
            
            .avatar {
              img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }
            }
            .like {
              margin: 5px 0;
              img {
                width: 30px;
                height: 30px;
              }
            }
            .comment {
              img {
                width: 30px;
                height: 30px;
              }
            }
            .count {
              color:#fff;
              font-size: 14px;
              margin-top: -6px;
            }
            
            
          }
        }
      }

      .info{
        margin-bottom: 8px;
        .address {
          margin-right: 10px;
        }
        .houseInfo{
          font-size: 12px;
          color: #666;
        }
      }

      .title {
        line-height: 22px;
        font-size: 18px;
        font-weight: 500;
      }

      .tags {
        margin-top: 5px;
        .tag {
          margin-right:8px;
        }
      }

      .price {
        display: flex;
        align-items: center;
        margin: 7px 0 25px 0;
        .new {
          font-size: 20px;
          color: var(--primary-color);
          padding-right: 10px;
        }
        .old {
          font-size: 12px;
          color: #999;
          text-decoration: line-through;
          padding-right: 5px;
        }
        .discount {
          position: relative;
          font-size: 12px;
          transform: scale(0.9);
          .icon {
            margin-right: 5px;
            display: inline-block;
            width: 10px;
            height: 10px;
            background-image: url(https://fe.tujiacdn.com/pwa/static/fevueui/images/unit-item-m/icon-unit-sound.png);
            background-size: 10px 10px;
            background-repeat: no-repeat;
            background-position: 50%;
          }
        }
      }
    }
    .landlord{

      img {
        width: 100%;
      }

      .word {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .no-favor {
        text-align: center;
        font-size: 18px;
      }
        .text {
          margin-top: 10px;
          font-size: 14px;
          color: #666;
          text-align: center;
          img {
            width: 5%;
          }
        }
        .btnGo {
          width: 156px;
          height: 40px;
          margin-top: 35px;
          background-color: var(--primary-color);
          border: var(--primary-color);
          color: #fff;
          border-radius: 30px;

        }
      }
    }
  }
  // .history{
  // }

}
</style>
