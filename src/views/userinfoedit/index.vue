<template>
    <Header />
    <div>
        <van-field v-model="name" label="昵称" placeholder="请输入昵称" />
        <van-field v-model="sign" label="个性签名" placeholder="个性签名" disabled />
        <van-field v-model="pass" label="密码" placeholder="请输入密码" />
    </div>

    <van-button class="save-btn" type="primary" color="#ffc400" round block @click="save">保存</van-button>
    <van-button class="save-btn" type="primary" color="#ffc400" round block @click="logOut">退出登录</van-button>
</template>
<script setup>
import Header from '@/components/Header.vue';
import { showToast } from 'vant';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const data = reactive({
    name:'',
    sign:'战胜自己',
    pass:''
})

const save = ()=> {
    if(data.name && data.pass){
        let userInfo = JSON.parse(localStorage.userInfo)
        let newUserInfo = {
            user:data.name || userInfo.name,
            pass:data.pass || userInfo.pass
        }
        localStorage.setItem('userInfo',JSON.stringify(newUserInfo))
        showToast('修改成功')
        router.push('/mine')
    } else {
        showToast('请输入内容')
    }

}
const logOut = () =>{
    localStorage.removeItem('isLogin')
    showToast('退出成功')
    router.push('/login')
}

</script>

<style lang="less" scoped>
/deep/ .van-button--danger {
    background-color: #ffc400;
    border-color: #ffc400;
}

.save-btn {
    width: 80%;
    margin: 20px auto;
}
</style>