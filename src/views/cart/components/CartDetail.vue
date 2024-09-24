<template>
    <div class="cartDetail">
        <div class="content">
            <van-checkbox-group v-model="data.checked" ref="checkboxGroup" @change="groupChange">
                <div v-for="(item, index) in store.cartList" :key="index">
                    <ListItem :item="item" :handleChange="handleChange" :showCheckBox="true" />
                </div>
            </van-checkbox-group>
        </div>

        <van-submit-bar class="submit-all" :price="allPrice * 100" button-text="结算" @submit="onSubmit"
            buttonColor="#ffc400" v-if="store.isDelete">
            <van-checkbox v-model="data.submitChecked" checked-color="#ffc400" @click="choseAll()">全选</van-checkbox>
        </van-submit-bar>
        <div class="buy" v-else>
            <div class="left">
                <van-checkbox v-model="data.submitChecked" checked-color="#ffc400" @click="choseAll()">全选</van-checkbox>
            </div>
            <div class="delete" @click="handleDelete()">删除</div>
        </div>

    </div>
</template>
<script setup>
import ListItem from '@/components/ListItem.vue';
import { useCartStore } from '@/stores';
import { showFailToast } from 'vant';
import { computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
const store = useCartStore()
const props = defineProps(['changeShow'])

const router = useRouter()

const data = reactive({
    /**存储选中的商品的id */
    checked: [],
    submitChecked: true
})



/**
 * 购物车中商品数量改变时，更新购物车商品的数量
 * @param value 新的值
 * @param detals 
 */
const handleChange = (value, detals) => {
    store.cartList.map(item => {
        if (item.id === detals.name) {
            item.num = value;
        }
    })

}

/**
 * 初始化复选框，使复选框全部选中
 */
const init = () => {
    data.checked = store.cartList.map(item => item.id)
}

/**
 * 复选框组的复选框状态改变时，同步“全选”复选框的状态
 * @param result 响应数组，存储了选中的复选框的索引
 */
const groupChange = (result) => {
    console.log(result);

    if (result.length === store.cartList.length) {
        data.submitChecked = true
    } else {
        data.submitChecked = false
    }
    data.checked = result;
}

/**
 * 计算属性，计算所有选中商品的总价
 */
const allPrice = computed(() => {
    let countList = updateData();
    let sum = 0
    countList?.forEach(item => {
        sum += item.num * item.price
    })
    return sum;
})
/**
 * 删除购物车中的商品
 */
const handleDelete = () => {
    //判断data的checked是否有值
    if (data.checked.length) {
        store.deleteGoods(updateData('delete'))
        data.checked = []
        //购物车没有数据的时候
        if (!store.cartList.length) {
            props.changeShow()
            store.changeEdit("delete")
        }
    } else {
        showFailToast('请选择要删除的商品')
    }
}
/**
 * 筛选出选中（未被选中）的商品
 * @param type “delete”：筛选出未被选中的商品,null:筛选出被选中的商品
 * @return 商品列表
 */
const updateData = (type) => {
    return store.cartList.filter(item => {
        return type === 'delete' ? !data.checked.includes(item.id) : data.checked.includes(item.id)
    })
}

const choseAll = () => {
    if (data.checked.length !== store.cartList.length) {
        init()
    } else {
        data.checked = []
    }

}

/**
 * 结算
 */
const onSubmit = () => {
if(data.checked.length){
    store.pay(updateData())
    router.push({
        path:'/createorder',
        query:{
            list:data.checked
        }
    })
    
} else {
    showFailToast('请选择！！！')
}
}
onMounted(()=>{
    init()
})

</script>

<style lang="less" scoped>
.cartDetail {
    font-size: 14px;
    flex: 1;
    position: relative;
    overflow-y: auto;
    padding: 20px 20px 55px;

    .submit-all {
        position: fixed;
        bottom: 46px;
    }

    .buy {
        position: fixed;
        bottom: 48px;
        right: 0;
        display: flex;
        justify-content: space-between;
        width: 100%;
        background-color: #fff;
        border-radius: 10px;
        height: 50px;
        align-items: center;
        padding: 0 16px;
        box-sizing: border-box;

        .left {
            display: flex;
            align-items: center;
        }

        .delete {
            color: #fff;
            background-color: #ffc400;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            width: 110px;
            height: 40px;
            text-align: center;
            line-height: 40px;
        }
    }

    .content {
        padding: 10px;
        background-color: #fff;
        border-radius: 10px;
    }
}
</style>