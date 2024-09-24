<template>
  <div class="storeDetails">
    <Header title="店铺" />
    <div class="content">
      <div class="img"></div>
      <div class="foodSort">
        <div class="name">
          {{ data.title }}
          <img class="store-img" :src="data.img" alt="暂无图片">
        </div>
        <van-tabs color="#ffc400">
          <van-tab v-for="(item, index) in data.storeData" :key="index" :title="item.name">
            <FoodList :index="index" :foodData="item.data" />
          </van-tab>
        </van-tabs>


      </div>
    </div>

    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon icon="cart-o" text="购物车" :badge="store.cartList.length" @click="goCart()" />
      <van-action-bar-button type="warning" text="加入购物车" @click="handleAddCart()" />
      <van-action-bar-button type="danger" text="立即购买" @click="goBuy()" />
    </van-action-bar>

  </div>
</template>
<script setup>
import Header from '@/components/Header.vue';
import { onMounted, reactive } from 'vue';
import FoodList from './components/FoodList.vue';
import { useCartStore } from '@/stores';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';
import axios from 'axios';
import {getApiStoreData} from '../../api/api.js'
let store = useCartStore()
let router = useRouter()
let data = reactive({
  title: "鱼拿酸菜鱼",
  img: 'https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440',
  storeData: [],
})

/**
 * 添加商品到购物车
 * @param type 'buy'：立即购买
 */
const handleAddCart = (type) => {
  const newList = []
  data.storeData.forEach(item => {
    item.data.items?.forEach(item => {
      item.children.forEach(item => {
        if (item.num > 0) {
          newList.push(item)
        }
      })
    })
  })
  if (newList.length === 0){
    showToast("请选择商品")
    return
  }
    store.addcart(newList)
  type === 'buy' ? goCart() : "";
}

/**
 * 跳转到购物车
 */
const goCart = (type) => {
  router.push('/cart')
}

/**
 * 立即购买
 */
const goBuy = () => {
  handleAddCart()
}

const getStoreData = ()=>{
getApiStoreData().then(res=>{
  data.storeData = res
})



/*   axios.get('/store/getStoreData').then((res)=>{
    console.log(res);
    const {code, data} = res.data
    if(code == 200){
      data.storeData = data
    }
    
  }) */
}

onMounted(()=>{
  getStoreData()
})
</script>

<style lang="less" scoped>
.storeDetails {
  height: 100%;
  display: flex;
  flex-flow: column;

  .content {
    flex: 1;
    overflow-y: auto;

    .img {
      background: url("../../assets/yuna.jpg") no-repeat center/cover;
      width: 100%;
      height: 150px;
    }

    .foodSort {
      height: 500px;
      background-color: #fff;
      margin-top: -30px;
      border-radius: 20px 20px 0 0;

      .sort {
        margin-top: 10px;
      }

      .name {
        display: flex;
        padding: 20px;
        justify-content: space-between;

        .store-img {
          width: 80px;
          height: 80px;
          border-radius: 10px;
          margin-top: -30px;
        }
      }
    }
  }
}
</style>