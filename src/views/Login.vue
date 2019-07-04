<template>
  <div class="login">
    <div class="image-warpper">
      <img class="image" alt="logo" src="../assets/logo.gif" />
    </div>
    <h2 class="title">今天吃什么</h2>
    <div class="login-warpper">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    </div>
    <div class="operate-warpper">
      <mt-button type="primary" size="large" @click="login()">登录</mt-button>
      <div class="rememberme">
        <input type="checkbox" v-model="rememberflag" @click="rememberUser()" />记住我
      </div>
      <div class="regist-link">
        <a href @click.prevent="goRegist">没有账号？注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import urls from "../urls";
import axios from "../axios/axios";
import { mapMutations } from "vuex";
import { MessageBox } from "mint-ui";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      rememberflag: false
    };
  },
  methods: {
    login() {
      axios
        .get(urls.login, {
          params: {
            username: this.username,
            password: this.password
          }
        })
        .then(res => {
          //console.log(res);
          if (res.data.state == 0) {
            localStorage.setItem("token", res.data.token); //存储token
            localStorage.setItem("username", this.username); //存储用户
            this.$router.push({ path: "/justclick" });
          } else {
            MessageBox("", res.data.msg);
          }
        })
        .catch(err => {
          MessageBox("", err);
        });
    },
    goRegist() {
      this.$router.push({ path: "/regist" });
    },
    rememberUser() {
      this.rememberflag = !this.rememberflag;
      if (this.rememberflag == true) {
        localStorage.setItem("password", this.password);
      } else {
        localStorage.setItem("password", "");
      }
    }
  },
  created() {
    let name = localStorage.getItem("username");
    let pswd = localStorage.getItem("password");
    if (pswd != "") {
      this.username = name;
      this.password = pswd;
      this.rememberflag = true;
    }
  }
};
</script>
<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  background-color: white;
  .image-warpper {
    padding: 20% 20px 20px;
    .image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
  }
  .title {
    font-weight: normal;
  }
  .login-warpper {
    padding-left: 20px;
    padding-right: 20px;
    .mint-cell-wrapper {
      border-radius: 15px;
      border: 1px solid #e2e2e2;
      margin: 5px 0 5px;
    }
  }
  .operate-warpper {
    padding: 20px;
    .mint-button {
      border-radius: 15px;
    }
    .rememberme {
      padding: 10px;
      float: left;
    }
    .regist-link {
      padding: 10px;
      float: right;
      input[type="checkbox"] {
        width: 10px;
        height: 10px;
      }
    }
  }
}
</style>