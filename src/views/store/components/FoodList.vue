<template>
    <div class="food-list" v-if="props.index === 0">
        <van-tree-select @click-nav="navClick" v-model:main-active-index="data.activeIndex" height="88vw"
            :items="data.items">
            <template #content>
                <div class="item-bg" v-for="(item, index) in data.subItem" :key="index">
                    <FoodListItem :item="item" :handleAdd="handleAdd" :handleChange="handleChange" />
                </div>
            </template>
        </van-tree-select>
    </div>
    <div v-else>
        {{ props.foodData.content }}

    </div>
</template>
<script setup lang="js">
import { reactive } from 'vue';
import FoodListItem from './FoodListItem.vue';

const props = defineProps(['index', 'foodData'])


let data = reactive({
    activeIndex: 0,//当前所在导航页
    items: [],
    subItem: []
})


function initData() {
    let newArray = []
    props.foodData?.items?.forEach((item, index) => {
        newArray.push({
            text: item.text
        })
        if (index === data.activeIndex) { //获取对应的subItem
            data.subItem = item.children
        }

    })


    data.items = newArray
}
initData();

/**
 * 点击导航菜单
 * @param i 
 */
const navClick = (i) => {
    console.log(i);
    data.activeIndex = i
    initData()
}

/**
* 点击+按钮时同步data中的add
*/
const handleAdd = (id) => {
    data.subItem.forEach((item, index) => {
        if (item.id === id) {
            item.add = false
            item.num += 1
        }
    })
}

/**
 * 数量改变时同步data中的num
 */
const handleChange = (value, detail) => {
    data.subItem.forEach(item => {
        if (item.id === detail.name) {
            item.num = value;
        }
    })
    /*     console.log(data.subItem); */

}

</script>