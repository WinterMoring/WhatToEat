<template>
  <div class="justclick">
    <div></div>
    <div class="header">
      <div class="header-cell" @click="showPop()">
        附近
        <img src="../assets/down.png" width="10x" height="10px" />
      </div>
      <div class="header-cell header-cell-center">
        分类
        <img src="../assets/down.png" width="10x" height="10px" />
      </div>
      <div class="header-cell">只看吃过的</div>
    </div>
    <div class="h2title">
      <h2>今个就要吃</h2>
    </div>
    <div class="showfood">{{food}}</div>
    <div class="buttonwarp">
      <mt-button type="primary" size="normal" class="mainbutton" @click="getresult()">{{btnval}}</mt-button>
    </div>
    <div class="scrollwrap" ref="listscroll">
      <div class="foodlist">
        范围：
        <div v-for="(item,index) in list" :key="index">
          <mt-cell :title="item.foodname">
            <span>{{item.discription}}</span>
            <img slot="icon" src="../assets/nophoto.png" width="50" height="50" />
          </mt-cell>
        </div>
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      closeOnClickModal="true"
      position="bottom"
    >
      <locationpicker @listenlocation="getlocation"></locationpicker>
    </mt-popup>
  </div>
</template>
<script>
import { watchFile } from "fs";
import BScroll from "better-scroll";
import { setInterval, clearInterval } from "timers";
import locationpicker from "../components/locationpicker";
export default {
  name: "justclick",
  components: {
    locationpicker
  },
  data() {
    return {
      location: "",
      selected: "1",
      value: "",
      popupVisible: false,
      food: "啥啊",
      btnval: "走着",
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
        }
      ],
      intervalId: null
    };
  },
  methods: {
    showPop() {
      this.popupVisible = true;
    },
    getresult() {
      if (this.btnval == "走着") {
        this.intervalId = setInterval(() => {
          let random = Math.round(Math.random() * this.list.length);
          this.food = this.list[random].foodname;
        }, 50);
        this.btnval = "停";
      } else {
        clearInterval(this.intervalId);
        this.btnval = "走着";
      }
    },
    initScroll() {
      new BScroll(this.$refs["listscroll"]);
    },
    getlocation(data) {
      this.location = data;
      this.popupVisible = false;
      alert(this.location);
    }
  },
  mounted() {
    //axios.get();
    this.initScroll();
  },
  watch: {
    selected(newval, oldval) {
      switch (newval) {
        case "1":
          this.popupVisible = true;
          break;

        default:
          break;
      }
    }
  }
};
</script>
<style lang="scss">
.justclick {
  height: 100%;
  width: 100%;
  .header {
    margin: 5px 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #c3c3c3;
    .header-cell {
      margin: 10px;
      flex: 1;
      font-size: 15px;
    }
    .header-cell-center {
      border-left: 1px solid #c3c3c3;
      border-right: 1px solid #c3c3c3;
    }
  }
  .showfood {
    font-size: 18px;
  }
  .buttonwarp {
    height: 30%;
    padding: 10%;
    .mainbutton {
      height: 150px;
      width: 150px;
      border-radius: 50%;
    }
  }
  .scrollwrap {
    height: 250px;
    .foodlist {
      text-align: left;
      width: 100%;
      overflow: hidden;
    }
  }
  .mint-popup {
    width: 100%;
  }
}
</style>