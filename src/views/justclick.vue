<template>
  <div class="justclick">
    <div class="h2title">
      <h2>今个就要吃</h2>
    </div>
    <div class="showfood">{{resultname}}</div>
    <div class="buttonwarp">
      <mt-button type="primary" size="normal" class="mainbutton" @click="getresult()">{{btnval}}</mt-button>
    </div>
    <div class="header">
      <div class="header-cell" @click="showPopLocation()">
        {{location}}
        <img src="../assets/down.png" width="10x" height="10px" />
      </div>
      <div class="header-cell header-cell-center" @click="showPopKind()">
        {{kind}}
        <img src="../assets/down.png" width="10x" height="10px" />
      </div>
      <div class="header-cell">只看吃过的</div>
    </div>
    <div class="wrap">
      <div class="scrollwrap" ref="listscroll">
        <div class="foodlist">
          <div v-for="(item,index) in list" :key="index">
            <mt-cell :title="item.foodname">
              <span>{{item.discription}}</span>
              <img slot="icon" src="../assets/nophoto.png" width="50" height="50" />
            </mt-cell>
          </div>
        </div>
      </div>
    </div>
    <mt-popup
      v-model="popupLocation"
      popup-transition="popup-fade"
      closeOnClickModal="true"
      position="bottom"
    >
      <locationpicker @listenlocation="getlocation"></locationpicker>
    </mt-popup>
    <mt-popup
      v-model="popupKind"
      popup-transition="popup-fade"
      closeOnClickModal="true"
      position="bottom"
    >
      <kindpicker @listenkind="getkind"></kindpicker>
    </mt-popup>
  </div>
</template>
<script>
import { watchFile } from "fs";
import BScroll from "better-scroll";
import { setInterval, clearInterval } from "timers";
import locationpicker from "../components/locationpicker";
import kindpicker from "../components/kindpicker";
import { MessageBox } from "mint-ui";
export default {
  name: "justclick",
  components: {
    locationpicker,
    kindpicker
  },
  data() {
    return {
      location: "附近",
      kind: "全部",
      value: "",
      popupLocation: false,
      popupKind: false,
      resultname: "啥啊",
      result: {},
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
    showPopLocation() {
      this.popupLocation = true;
    },
    showPopKind() {
      this.popupKind = true;
    },
    getresult() {
      if (this.btnval == "走着") {
        this.intervalId = setInterval(() => {
          let random = Math.round(Math.random() * this.list.length);
          this.result = this.list[random];
          this.resultname = this.list[random].foodname;
        }, 50);
        this.btnval = "停";
      } else {
        clearInterval(this.intervalId);
        this.openConfirm();
        this.btnval = "走着";
      }
    },
    initScroll() {
      new BScroll(this.$refs["listscroll"]);
    },
    getlocation(data) {
      this.location = data;
      this.popupLocation = false;
    },
    getkind(data) {
      this.kind = data;
      this.popupKind = false;
    },
    openConfirm() {
      MessageBox({
        title: "今天就吃",
        message: this.resultname,
        showCancelButton: true,
        confirmButtonText: "就它了",
        cancelButtonText: "再瞅瞅"
      }).then(action => {
        //添加到吃过的
      });
    }
  },
  mounted() {
    //axios.get();
    this.initScroll();
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
  .wrap {
    height: 300px;
    overflow: hidden; //没有这个属性就会溢出，跑上去
    .scrollwrap {
      height: 200px;
      .foodlist {
        text-align: left;
        width: 100%;
        overflow: hidden;
      }
    }
  }
  .mint-popup {
    width: 100%;
  }
}
</style>