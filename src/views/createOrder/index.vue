<template>
    <div class="create-order">
        <Header title="生成订单" />
        <van-contact-card type="edit" :tel="data.tel" :name="data.name" @click="onEdit" />
        <div class="content">
            <div v-for="(item, index) in store.orderList">
                <van-card :num="item.num" :price="item.price" :title="item.title" :thumb="item.pic" />
            </div>
        </div>
        <div class="pay-wrap">
            <div class="price">
                <span>商品金额</span>
                <span>￥{{ data.totalPrice }}</span>
            </div>
            <van-button @click="handleCreateOrder()" type="primary" class="pay-btn" block
                color="#ffc400">生成订单</van-button>
        </div>
    </div>
</template>
<script setup>
import Header from '@/components/Header.vue';
import { useCartStore } from '@/stores';
import { onMounted, reactive } from 'vue';
import { showDialog } from 'vant';
import { useRouter,useRoute } from 'vue-router';
const store = useCartStore()
const router = useRouter()
const route = useRoute()

const data = reactive({
    tel: '15264546465',
    name: '张三',
    totalPrice: 0
})

const initPrice = () => {
    let price = 0
    if (store.orderList.length) {
        store.orderList.forEach(item => {
            price += item.num * item.price
        })

    }
    data.totalPrice = price
}
/**
 * 初始化用户地址
 */
const initUser = () => {
    store.userAddress.forEach(item => {
        if (item.isDefault) {
            data.name = item.name
            data.tel = item.tel
        }
    })
}
const handleCreateOrder = () => {
    showDialog({
        title: '提示',
        message: '生成订单成功',
    }).then(() => {
        //要和购物车联系起来
        let newList = store.cartList.filter(item=>{
            return !route.query.list.includes(item.id)
        })
        store.deleteGoods(newList)
        store.orderListEd()
        router.push('/order')
    });
}

const onEdit = ()=>{
    router.push('/address')
}

onMounted(() => {
    initPrice()
})
</script>

<style lang="less" scoped>
.create-order {
    display: flex;
    flex-flow: column;
    height: 100%;

    .content {
        flex: 1;
        overflow-y: auto;
    }

    .pay-wrap {
        padding: 10px 0;
        width: 100%;
        background: #fff;
        border-top: 1px solid #e9e9e9;

        >div {
            display: flex;
            justify-content: space-between;
            padding: 0 5%;
            margin: 10px 0;
            font-size: 14px;

            span:nth-child(2) {
                color: red;
                font-size: 18px;
            }
        }

        .pay-btn {
            width: 90%;
            margin: 0 auto;
        }
    }
}
</style>