<template>
  <div class="me">
    <mt-header title="我的">
      <router-link to="/justclick" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <mt-cell title="待完善"></mt-cell>
    <mt-button type="danger" size="large" @click="logout()">退出登录</mt-button>
  </div>
</template>
<script>
export default {
  name: "me",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style lang="scss">
.mint-header {
  background-color: inherit;
  color: inherit;
  .mintui-back {
    color: #cfcfcf;
  }
  .mint-header-title {
    font-size: 1.5em;
  }
}
</style>