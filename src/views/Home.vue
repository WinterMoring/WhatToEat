<template>
  <div class="home">
<div>
<mt-tab-container v-model="selected">
  <mt-tab-container-item id="我的菜单">
    <transition>
      <keep-alive>
        <myfavour></myfavour>
      </keep-alive>
    </transition>
  </mt-tab-container-item>
  <mt-tab-container-item id="附近吃的">
    <transition>
      <keep-alive>
        <nearby></nearby>
      </keep-alive>
    </transition>
  </mt-tab-container-item>
  <mt-tab-container-item id="其他地方">
    <transition>
      <keep-alive>
        <locate></locate>
      </keep-alive>
    </transition>
  </mt-tab-container-item>
    <mt-tab-container-item id="我的">
    <transition>
      <keep-alive>
        <me></me>
      </keep-alive>
    </transition>
  </mt-tab-container-item>
</mt-tab-container>
</div>
<transition>
<keep-alive>
  <mt-tabbar v-model="selected">
    <mt-tab-item id="我的菜单">
      <img slot="icon" src="../assets/favour.png">
      我的菜单
    </mt-tab-item>
    <mt-tab-item id="附近吃的">
      <img slot="icon" src="../assets/nearby.png">
      附近吃的
    </mt-tab-item>
    <mt-tab-item id="其他地方">
      <img slot="icon" src="../assets/locate.png">
      其他地方
    </mt-tab-item>
    <mt-tab-item id="我的">
      <img slot="icon" src="../assets/me.png">
      我的
    </mt-tab-item>
  </mt-tabbar>
  </keep-alive>
</transition>
</div>
</template>
<script>
import myfavour from './myfavour';
import nearby from  './nearby';
import locate from './locate';
import me from './me'
export default {
  data(){
    return{
      selected:'我的菜单',
    }
  },
  components:{
    myfavour,
    nearby,locate,me
  }
}
</script>
<style lang="scss">
  .mint-tabbar{
    background-color: #e3e3e3;
  }
</style>