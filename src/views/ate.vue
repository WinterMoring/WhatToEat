<template>
  <div class="ate">
    <mt-header title="我吃过的">
      <router-link to="/justclick" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="scrollwrap" ref="listscroll">
      <div class="cellwrap">
        <mt-cell-swipe
          v-for="(item,index) in list"
          :key="index"
          :title="item.foodname"
          :label="item.discription"
          :right="[{
        content:'删除',
        style: { background: 'red', color: '#fff' },
        handler: function(){deletecell(item,index)}
        }]"
        ></mt-cell-swipe>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import axios from "axios";
import urls from "../urls";
import { MessageBox } from "mint-ui";
export default {
  name: "ate",
  data() {
    return {
      list: []
    };
  },
  methods: {
    deletecell(item, index) {
      //console.log(this.list[index].id);
      console.log("点了删除");
      //删除操作
      axios
        .get(urls.delfavours, {
          params: {
            foodid: this.list[index].id
          }
        })
        .then(res => {
          if (res.data.code == 2 || res.data.code == 3) {
            //console.log(res.data);
            MessageBox("错误", "信息已超时，请重新登录");
            this.$router.push({ path: "/" });
          }
          //console.log(res.data);
        });
      this.list.splice(index, 1);
    },
    initScroll() {
      new BScroll(this.$refs["listscroll"]);
    }
  },
  created() {
    axios
      .get(urls.getfavours, {
        params: {
          username: localStorage.getItem("username")
        }
      })
      .then(res => {
        if (res.data.code == 2 || res.data.code == 3) {
         // console.log(res.data);
          MessageBox("错误", "信息已超时，请重新登录");
          this.$router.push({ path: "/" });
        }
        //console.log(res.data.data);
        this.list = res.data.data;
      });
  },
  mounted() {
    this.initScroll();
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
.scrollwrap {
  height: 500px;
  overflow: hidden;
  .cellwrap {
    text-align: left;
  }
}
</style>