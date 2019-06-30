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
      <mt-button type="primary" size="normal" class="mainbutton" @click="getresult()">
        <slot>{{btnval}}</slot>
      </mt-button>
    </div>

    <div v-cloak class="foodlist">
      <mt-cell class="foodcell" title="名字">
        <span>地址</span>
        <img slot="icon" src="../assets/nophoto.png" width="50" height="50" />
      </mt-cell>
    </div>

    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      closeOnClickModal="true"
      position="bottom"
    >
      <span>弹出框</span>
    </mt-popup>
  </div>
</template>
<script>
import { watchFile } from "fs";
export default {
  name: "Myfavour",
  data() {
    return {
      selected: "1",
      value: "",
      popupVisible: false,
      food: "啥啊",
      btnval: "走着"
    };
  },
  methods: {
    showPop() {
      this.popupVisible = true;
    },
    getresult() {}
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
  .foodlist {
    text-align: left;
    width: 100%;
    .foodcell {
      height: 70px;
      padding: 10px;
      border-top: #c3c3c3 1px solid;
      border-bottom: #c3c3c3 1px solid;
    }
  }
}
</style>