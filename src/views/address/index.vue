<template>
    <Header title="地址管理" />
    <van-address-list :list="data.list" default-tag-text="默认" @add="onAdd" @edit="onEdit" />
</template>
<script setup>
import Header from '@/components/Header.vue';
import { useCartStore } from '@/stores';
import { computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
const store = useCartStore()
const router = useRouter()

const data = reactive({
    list: [],

})

const init = () => {
    data.list = store.userAddress.map(item => {
        return {
            id: item.id,
            name: item.name,
            tel: item.tel,
            address: `${item.province}${item.city}${item.county}${item.addressDetail}`,
            isDefault: item.isDefault
        }
    })
    console.log(data.list);
    
}
const onAdd = () => {
    router.push({
        path:'/addressedit',
        query:{
            type:'add'
        }
    })
 }
const onEdit = (item) => { 
    router.push({
        path:'/addressedit',
        query:{
            id:item.id,
            type:'edit'
        }
    })
}


onMounted(() => {
    init()
})
</script>

<style lang="less" scoped>
/deep/ .van-button--danger {
    background-color: #ffc400;
    border-color: #ffc400;
}

/deep/ .van-switch--on {
    background-color: #ffc400;
}

/deep/ .van-radio__icon {
    display: none;
}
</style>