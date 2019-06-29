<template>
  <div class="Regist">
    <div class="header">
    <mt-header title="注册">
      <router-link to="/" slot="left">
      <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
  </div>
    <div class="regist-warpper">
      <div class="input-warpper">
        <label >用户名：</label>
        <mt-field placeholder="请输入用户名" type="text" v-model="username"></mt-field>
      </div>
      <div class="input-warpper">
        <label >密码：</label>
        <mt-field placeholder="请输入密码" type="password" v-model="password"></mt-field>
      </div>
      <div class="input-warpper">
        <label >确认密码：</label>
        <mt-field placeholder="请再次输入密码" type="password" v-model="checkpassword"></mt-field>
      </div>

      <div class="operate-warpper">
        <mt-button @click="regist()" type="primary" size="large" plain>注册</mt-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.Regist{
  height: 100%;
  width: 100%;
  .header{
    .mint-header-title{
      font-size: 20px;
    }
  }
  .input-warpper{
    padding: 10px 20px  10px;
    text-align: left;
    .mint-cell-wrapper{
      margin-top: 5px;
      background-color: #d7d7d7;
      .mint-field-core{
        background-color: #d7d7d7;
      }
    }
  }
  .operate-warpper{
    padding: 20px;
  }
}
  
</style>
<script>
import { setTimeout } from 'timers';
import  {Toast} from 'mint-ui';
export default {
  name:'Regist',
  data(){
    return{
      username:'',
      password:'',
      checkpassword:'',
    }
  },
  methods: {
    regist(){
      //TODO:连后台，做判断
      //弹出Toast提示
      let instance=Toast('注册成功');
      setTimeout(()=>{
        instance.close();
      },1500)
      //跳转页面
      this.$router.push({path:'/home'});

    }
  }, 
}
</script>