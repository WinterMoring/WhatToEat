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
        handler: ()=>deletecell(item,index)
        }]"
        ></mt-cell-swipe>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "ate",
  data() {
    return {
      list: [
        {
          foodname: "米饭",
          discription: "雁塔区长延堡路1234号",
          image: "public\\images\\/qdcmifan.jpg"
        },
        {
          foodname: "面条",
          discription: "秦都区人民西路24534号",
          image: "public\\images\\/qdcmifan.jpg"
        },
        {
          foodname: "火锅",
          discription: "火锅",
          image: "public\\images\\/qdcmifan.jpg"
        },
        {
          foodname: "黄焖鸡",
          discription: "莲湖区xxxx路346234号",
          image: "public\\images\\/qdcmifan.jpg"
        },
        {
          foodname: "烤肉",
          discription: "莲湖区xxxx路346234号",
          image: "public\\images\\/qdcmifan.jpg"
        },
        {
          foodname: "饺子",
          discription: "莲湖区xxxx路346234号",
          image: "public\\images\\/qdcmifan.jpg"
        },
        {
          foodname: "串串",
          discription: "莲湖区xxxx路346234号",
          image: "public\\images\\/qdcmifan.jpg"
        },
        {
          foodname: "米饭",
          discription: "雁塔区长延堡路1234号",
          image: "public\\images\\/qdcmifan.jpg"
        },
        {
          foodname: "面条",
          discription: "秦都区人民西路24534号",
          image: "public\\images\\/qdcmifan.jpg"
        },
        {
          foodname: "火锅",
          discription: "火锅",
          image: "public\\images\\/qdcmifan.jpg"
        },
        {
          foodname: "黄焖鸡",
          discription: "莲湖区xxxx路346234号",
          image: "public\\images\\/qdcmifan.jpg"
        },
        {
          foodname: "烤肉",
          discription: "莲湖区xxxx路346234号",
          image: "public\\images\\/qdcmifan.jpg"
        },
        {
          foodname: "饺子",
          discription: "莲湖区xxxx路346234号",
          image: "public\\images\\/qdcmifan.jpg"
        },
        {
          foodname: "串串",
          discription: "莲湖区xxxx路346234号",
          image: "public\\images\\/qdcmifan.jpg"
        }
      ]
    };
  },
  methods: {
    deletecell(item, index) {
      this.list.splice(index, 1);
      //删除操作
    },
    initScroll() {
      new BScroll(this.$refs["listscroll"]);
    }
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