<template>
    <Header :title="address" />
    <van-address-edit :area-list="data.areaList" show-delete show-set-default show-search-result :address-info="data.addressInfo"
        :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" />
</template>
<script setup>
import Header from '@/components/Header.vue';
import { useCartStore } from '@/stores';
import { showToast } from 'vant';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { computed,onMounted } from 'vue';
const store = useCartStore()
const route = useRoute()
const router = useRouter()
const data = reactive({
    areaList: {
        province_list: {
            110000: "广东省",
            120000: "浙江省",
        },
        city_list: {
            110100: "广州市",
            110200: "深圳市",
            120100: "杭州市",
            120200: "宁波市",
        },
        county_list: {
            110101: "天河区",
            110102: "海珠区",
            120102: "上城区",
            130102: "下城区",
        }
    },
    addressInfo: {}

})
const onSave = (content) => {
    // 新增 和 编辑
    if (route.query.type === 'add') {
        store.addaddress(content)
    } else {
        store.editaddress(content)
    }
    showToast('保存成功')
    setTimeout(() => {
        router.back()
    }, 1000)
}

const onDelete = (content) => {
    store.deleteaddress(content)

}
const init = () => {
    store.userAddress.forEach(item => {
        console.log('6');
        
        if (item.id === Number(route.query.id)) {
            data.addressInfo = item
            console.log(data.addressInfo);
            
        }
    })
}

const address = computed(() => {
    return route.query.type === 'add' ? '地址新增' : '地址编辑'
})



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
</style>