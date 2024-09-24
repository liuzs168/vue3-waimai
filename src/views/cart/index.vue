<template>
    <div class="cart">
        <Header title="购物车" :edit="true" />
        <CartDetail :changeShow="changeShow" v-if="isShow" />
        <Empty v-else />
        <Footer />
    </div>
</template>

<script setup>
import Empty from '@/components/Empty.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import CartDetail from './components/CartDetail.vue';
import { useCartStore } from '@/stores';
import { ref, onMounted } from 'vue';


const isShow = ref(true)
const store = useCartStore()
const init = () => {


    if (store.cartList.length === 0) {
        isShow.value = false
    }

}

const changeShow = () => {
    isShow.value = false
}

onMounted(() => {
    init()
})
</script>
<style lang="less" scoped>
.cart {
    display: flex;
    flex-flow: column;
    height: 100%;

    .content {
        flex: 1;
        overflow-y: auto;
    }

}
</style>