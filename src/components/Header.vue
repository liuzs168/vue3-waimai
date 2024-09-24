<template>
    <div class="header">
        <van-icon class="icon" name="arrow-left" @click="toBack" />
        <div>{{ title }}</div>
        <div class="edit" v-if="edit" @click="handleEdit()">{{ store.edit ? '编辑':'完成' }}</div>

    </div>
</template>

<script setup>
import { useCartStore } from '@/stores';
import { useRouter } from 'vue-router';
import { showFailToast } from 'vant';




const props = defineProps(['title', 'edit'])
const router = useRouter()
const store = useCartStore()

/**
 * 返回上一个页面
 */
const toBack = () => {
    router.back()
}

/**
 * 点击编辑后的操作
 */
const handleEdit = () => {
    if (store.cartList.length) {
        store.changeEdit()
        store.changeDelete()
    } else {
        showFailToast('请添加商品到购物车');
    }
}
</script>

<style lang="less" scoped>
.header {
    background-color: #fff;
    height: 40px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #d7d7d7;

    .edit {
        font-size: 16px;
        position: absolute;
        right: 15px;
        font-weight: normal;
    }

    .icon {
        position: absolute;
        left: 10px;
    }
}
</style>