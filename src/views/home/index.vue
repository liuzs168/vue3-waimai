<template>
    <div class="home">
        <div class="content">
            <!-- 头部 -->
            <div class="header">
                <div class="text">外卖</div>
                <div class="location">
                    <van-icon name="location-o" />
                    <span>json课程 </span>
                    <van-icon name="arrow" />

                </div>
            </div>
            <!-- 主要内容-->
            <div class="main">
                <div class="main-bg">
                    <div class="search">
                        <input type="text">
                        <div class="search-text">搜索</div>
                    </div>
                    <div class="sort">
                        <div class="big-sort">
                            <div v-for="(item, index) in data.big_sort" :key="index">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="`#${item.icon}`"></use>
                                </svg>
                                {{ item.name }}
                            </div>
                        </div>

                        <div class="small-sort">
                            <div v-for="(item, index) in data.small_sort" :key="index">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="`#${item.icon}`"></use>
                                </svg>
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                </div>
                <van-tabs class="van-tabs" v-model:active="active">
                    <van-tab v-for="(item, index) in data.centent_nav_list" :title="item.tab" :key="index">
                        <NavList :navList="item.data" />
                    </van-tab>
                </van-tabs>


            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '@/components/Footer.vue';
import { reactive, ref, onMounted } from 'vue';
import NavList from './components/NavList.vue';
import axios from 'axios';
import { getApiHomeData } from '../../api/api.js'

let data = reactive({
    big_sort: [],
    small_sort: [],
    centent_nav_list: [],
})

const getHomeData = () => {

    getApiHomeData().then((res) => {
        console.log(res);
        data.big_sort = res.big_sort
        data.small_sort = res.small_sort
        data.centent_nav_list = res.centent_nav_list
        console.log(data);

    })



    /*     axios.get('/home/getHomeData').then((res) => {
            console.log(res);
            const { code, data } = res.data;
            console.log(data,code);
            
            if (code == 200) {            
                data.big_sort = data.big_sort
                data.small_sort = data.small_sort
                data.centent_nav_list = data.centent_nav_list
                console.log(data);
                
            }
        }) */


}
onMounted(() => {
    getHomeData()
})

const active = ref(0)


</script>
<style lang="less" scoped>
.home {
    display: flex;
    flex-flow: column;
    height: 100%;
    font-size: 12px;

    .content {
        flex: 1;
        overflow-y: auto;

        .header {
            background-image: linear-gradient(#ffc400, #fff);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 20px 40px 20px;

            .text {
                font-size: 20px;
                font-weight: 600;
            }

            .location {
                span {
                    margin: 0 5px;
                }

                font-size: 14px;
            }
        }

        .main {
            margin-top: -30px;

            .main-bg {
                background-image: linear-gradient(#fff, #f5f5f5);
                padding: 10px 20px 0px 20px;
                border-radius: 30px 30px 0 0;
            }

            .van-tabs {
                padding: 0 20px 10px;

            }

            .search {
                position: relative;

                input {
                    width: 100%;
                    border: 1px solid #ffc400;
                    border-radius: 20px;
                    height: 30px;
                }

                .search-text {
                    position: absolute;
                    right: -6px;
                    top: 1px;
                    background-color: #ffc400;
                    border-radius: 16px;
                    width: 50px;
                    height: 32px;
                    line-height: 32px;
                    font-size: 14px;
                    text-align: center;
                }
            }

            .sort {
                padding: 20px 0;

                .big-sort {
                    display: flex;

                    div {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        flex-flow: column;
                        align-items: center;

                        .icon {
                            width: 50px;
                            height: 50px;
                            margin-bottom: 5px;
                        }
                    }
                }

                .small-sort {
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 20px;

                    div {
                        display: flex;
                        justify-content: center;
                        flex-flow: column;
                        align-items: center;
                        width: 20%;
                    }

                    .icon {
                        width: 30px;
                        height: 30px;
                        margin: 10px;
                    }
                }
            }
        }
    }

}

/deep/ .van-tabs__wrap {
    border-radius: 10px;
}
</style>