<template>
  <div class="justclick">
    <div class="h2title">
      <img src="../assets/bars.png" class="topicons" @click="popupSide=true" />
      <h2 class="title">今个就要吃</h2>
      <img src="../assets/share.png" class="topicons" @click="openalarm()" />
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
      <div class="header-cell" :class="{'chosen':choseflag}" @click="showate()">只看吃过的</div>
    </div>
    <div class="wrap">
      <div class="scrollwrap" ref="listscroll">
        <div class="foodlist">
          <div v-for="(item,index) in list" :key="index">
            <mt-cell :title="item.foodname" :label="item.discription">
              <!-- <img slot="icon" src="../assets/nophoto.png" width="50" height="50" /> -->
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
      style="width: 100%;"
    >
      <locationpicker v-if="city!=''" :city="city" @listenlocation="getlocation"></locationpicker>
    </mt-popup>
    <mt-popup
      v-model="popupKind"
      popup-transition="popup-fade"
      closeOnClickModal="true"
      position="bottom"
      style="width: 100%;"
    >
      <kindpicker @listenkind="getkind"></kindpicker>
    </mt-popup>
    <mt-popup
      v-model="popupSide"
      popup-transition="popup-fade"
      closeOnClickModal="true"
      position="left"
      style="width: 40%;height:100%;"
    >
      <div class="leftbar">
        <mt-cell title="我吃过的" is-link :to="{ name: 'ate' }">
          <img slot="icon" src="../assets/favorite.png" width="24" height="24" />
        </mt-cell>
        <mt-cell title="账号信息" is-link :to="{ name: 'me' }">
          <img slot="icon" src="../assets/account.png" width="24" height="24" />
        </mt-cell>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { setInterval, clearInterval } from "timers";
import locationpicker from "../components/locationpicker";
import kindpicker from "../components/kindpicker";
import { MessageBox } from "mint-ui";
import axios from "../axios/axios";
import urls from "../urls";
import keys from "../keys";
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
//import jsonp from "jsonp";
import { constants } from "crypto";

export default {
  name: "justclick",
  components: {
    locationpicker,
    kindpicker
  },
  data() {
    return {
      location: "附近",
      lat: "",
      lng: "",
      choseflag: false,
      city: "",
      kind: "美食",
      value: "",
      popupLocation: false,
      popupKind: false,
      popupSide: false,
      resultname: "啥啊",
      result: {},
      btnval: "走着",
      list: [],
      intervalId: null
    };
  },
  methods: {
    showPopLocation() {
      this.popupLocation = true;
      this.getLocationNearby();
      this.choseflag = false;
    },
    showPopKind() {
      this.popupKind = true;
      this.getLocationNearby();
      this.choseflag = false;
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
        title: this.resultname,
        message: this.result.discription,
        showCancelButton: true,
        confirmButtonText: "就它了",
        cancelButtonText: "再瞅瞅",
        closeOnClickModal: false
      }).then(() => {
        //添加到吃过的
        axios
          .post(urls.addfavours, {
            username: localStorage.getItem("username"),
            foodname: this.result.foodname,
            discription: this.result.discription
          })
          .then(res => {
            //console.log(res);
            let msg = "";
            switch (res.data.state) {
              case 0:
                msg = "已添加到我吃过的";
                break;
              case -1:
                msg = `这家吃过，味道不错`;
                break;
              default:
                msg = "啊哦，出错了";
            }
            let instance = Toast(msg);
            setTimeout(() => {
              instance.close();
            }, 2000);
          });
      });
    },
    openalarm() {
      MessageBox({
        title: "抱歉",
        message: "分享功能尚未完成",
        showCancelButton: false,
        showConfirmButton: true,
        closeOnClickModal: true
      });
    },
    routetoate() {
      this.$router.push({
        name: "ate"
      });
    },
    routetome() {
      this.$router.push({
        name: "me"
      });
    },
    getMyLocation() {
      Indicator.open({
        text: "正在获取附近美食...",
        spinnerType: "fading-circle"
      });
      //let geolocation = new qq.maps.Geolocation(keys.key, "myapp");
      //geolocation.getIpLocation(this.showPosition, this.showErr);
      this.$jsonp("https://apis.map.qq.com/ws/location/v1/ip", {
        key: keys.key,
        output: "jsonp"
      })
        .then(res => {
          //console.log(res.result);
          let position = {
            city: res.result.ad_info.city,
            lat: res.result.location.lat,
            lng: res.result.location.lng
          };
          this.showPosition(position);
        })
        .catch(err => {
          this.showErr();
        });
    },

    showPosition(position) {
      // console.log(
      //   "lat：" +
      //     position.lat +
      //     "  lng:" +
      //     position.lng +
      //     "  city:" +
      //     position.city
      // );
      this.city = position.city;
      this.lat = position.lat;
      this.lng = position.lng;
      this.getNearby(position.lat, position.lng);
    },
    showErr() {
      console.log("定位失败");
      this.getMyLocation();
    },
    getNearby(lat, lng) {
      let kind = this.kind;

      //console.log("执行getNearby");
      for (let i = 1; i < 5; i++) {
        this.$jsonp(urls.mapsearch, {
          boundary: `nearby(${lat},${lng},1000)`,
          page_size: 20,
          page_index: i,
          keyword: kind,
          output: "jsonp",
          orderby: "_distance",
          key: keys.key
        }).then(res => {
          //console.log(res.data);
          Indicator.close();
          let list = [];
          res.data.forEach(item => {
            list.push({
              foodname: item.title,
              discription: item.address
            });
          });
          this.list = list;
        });
      }
    },
    getLocationNearby() {
      //console.log("执行getLocationNearby:" + this.location + this.kind);
      if (this.location == "附近") {
        this.getNearby(this.lat, this.lng);
      } else {
        let kind = this.kind;

        for (let i = 1; i < 5; i++) {
          this.$jsonp(urls.mapsearch, {
            boundary: `region(${this.location},0)`,
            page_size: 20,
            page_index: i,
            keyword: kind,
            orderby: "_distance",
            output: "jsonp",
            key: keys.key
          }).then(res => {
            //console.log(JSON.stringify(res));
            this.list = [];
            res.data.forEach(item => {
              this.list.push({
                foodname: item.title,
                discription: item.address
              });
            });
          });
        }
      }
    },
    showate() {
      this.choseflag = !this.choseflag;
      if (this.choseflag) {
        axios
          .get(urls.getfavours, {
            params: {
              username: localStorage.getItem("username")
            }
          })
          .then(res => {
            //console.log(res.data.data);
            if (res.data.code == 2 || res.data.code == 3) {
              console.log(res.data);
              MessageBox("错误", "信息已超时，请重新登录");
              this.$router.push({ path: "/" });
            }
            this.list = res.data.data;
          });
      } else {
        this.getLocationNearby();
      }
    }
  },
  created() {
    this.getMyLocation();
  },
  mounted() {
    this.initScroll();
  },
  watch: {
    location: {
      handler: function(val) {
        this.getLocationNearby();
      }
    },
    kind: {
      handler: function() {
        this.getLocationNearby();
      }
    }
  }
};
</script>
<style lang="scss">
.chosen {
  color: #0080ff;
  border-bottom: 1px solid #0080ff;
}
.justclick {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .h2title {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .topicons {
      height: 25px;
      width: 25px;
    }
  }
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
      box-shadow: 0px 0px 50px 0px #0080ff;
    }
  }
  .wrap {
    height: 60%;
    overflow: hidden; //没有这个属性就会溢出，跑上去
    .scrollwrap {
      height: 17rem;
      .foodlist {
        text-align: left;
        width: 100%;
        overflow: hidden;
      }
    }
  }
  // .mint-popup {
  //   .leftbar {
  //     height: 100%;
  //     width: 30%;
  //     background-color: whitesmoke;
  //   }
  // }
}
</style>