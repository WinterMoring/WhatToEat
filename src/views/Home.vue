<template>
  <div class="home" @touchmove.prevent @scroll.prevent>
    <div>
      <router-view></router-view>
    </div>

    <mt-tabbar v-model="selected">
      <mt-tab-item id="1">
        <img slot="icon" src="../assets/favour.png" />
        点就完事了
      </mt-tab-item>
      <mt-tab-item id="2">
        <img slot="icon" src="../assets/nearby.png" />
        我吃过的
      </mt-tab-item>
      <mt-tab-item id="3">
        <img slot="icon" src="../assets/me.png" />
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import { switchCase, breakStatement } from "@babel/types";
export default {
  data() {
    return {
      selected: "1"
    };
  },
  watch: {
    selected(newval, oldval) {
      switch (newval) {
        case "1":
          this.$router.push({
            name: "justclick"
          });
          break;
        case "2":
          this.$router.push({
            name: "ate"
          });
          break;
        case "3":
          this.$router.push({
            name: "me"
          });
          break;
      }
    }
  },
  created() {
    this.$router.push({
      name: "justclick"
    });
  }
};
</script>
<style lang="scss">
.mint-tabbar {
  background-color: #e3e3e3;
}
</style>