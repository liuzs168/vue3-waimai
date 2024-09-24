<template>
    <div class="order">
        <Header title="订单" />
        <div class="content">
            <van-tabs v-model:active="active">
                <van-tab :title="item" v-for="(item,index) in data.navData">
                    <div v-if="item==='全部'&& store.orderListEnd.length" v-for="(i,index) in store.orderListEnd">
                        <van-card
                        :num="i.num"
                        :price="i.price"
                        :title="i.title"
                        :thumb="i.pic"
                        />
                    </div>

                    <div v-else>
                        <Empty/>
                    </div>
                </van-tab>
               </van-tabs>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import Empty from '@/components/Empty.vue';
import { useCartStore } from '@/stores';
import { reactive } from 'vue';
const store = useCartStore()
const data = reactive({
    navData:['全部','交易完成','待付款','待发货','已发货']
})
</script>
<style lang="less" scoped>
.order {
    display: flex;
    flex-flow: column;
    height: 100%;

    .content {
        flex: 1;
        overflow-y: auto;
    }

}
</style>