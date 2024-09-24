<template>
    <div class="login">
        <Header title="登录" />
        <div class="img">买吧</div>
        <van-form @submit="onSubmit">
            <van-field
            v-model="data.username"
            name="user"
            label="用户名"
            placeholder="用户名"
            :rules="[{required:true,message:'请填写用户名'}]"
            />

            <van-field
            v-model="data.password"
            name="pass"
            label="密码"
            placeholder="密码"
            :rules="[{required:true,message:'请填写密码'}]"
            />
            
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" color="#ffc400">
                    登录
                </van-button>
                <van-button round block type="info" color="#ffc400" class="register" @click="toRegister" >
                    注册
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { showToast } from 'vant';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const data = reactive({
    username:'',
    password:''
})

const onSubmit = (value)=>{
    if(!localStorage.userInfo){
        showToast('账号未注册')
        return
    } else{
        let userInfo = JSON.parse(localStorage.userInfo)
        if(userInfo['user'] === value['user']){
            if(userInfo['pass'] === value['pass']){
                showToast('登录成功')
                router.push('/home')
                localStorage.setItem('isLogin','login')
            } else {
                showToast('密码错误')
            }
        } else {
            showToast('账号不存在')
        }
    }
}
const toRegister = ()=>{
    router.push('/register')
}
</script>

<style lang="less" scoped>
.login {
    .img {
        width: 200px;
        height: 200px;
        background-color: #ffc400;
        font-size: 80px;
        line-height: 200px;
        text-align: center;
        border-radius: 40px;
        margin: 20px auto;
    }

    .register {
        margin-top: 20px;
    }
}
</style>