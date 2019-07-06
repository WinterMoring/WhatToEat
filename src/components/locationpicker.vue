<template>
  <div class="pickerwrap">
    <mt-picker
      :slots="dataList"
      :visible-item-count="5"
      :show-toolbar="true"
      ref="picker"
      value-key="cName"
    >
      <span class="onleft"></span>
      <span class="oncenter">选择地区</span>
      <span @click="handleConfirm" class="sure">确认</span>
    </mt-picker>
  </div>
</template>
<script>
import axios from "../axios/axios";
import urls from "../urls";
import keys from "../keys";
import jsonp from "jsonp";
export default {
  name: "locationpicker",
  props: ["city"],
  data() {
    return {
      dateSlots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],
      locations: ["附近"],
      currentTags: {},
      locationid: ""
    };
  },
  computed: {
    dataList() {
      let dateSlots = [
        {
          flex: 1,
          values: this.locations,
          className: "slot1"
        }
      ];
      return dateSlots;
    }
  },

  methods: {
    handleConfirm() {
      this.currentTags = this.$refs.picker.getValues()[0];
      this.$emit("listenlocation", this.currentTags);
    },
    getLocations(id) {
      this.$jsonp(urls.locations, {
        id: id,
        key: keys.key,
        output: "jsonp"
      }).then(res => {
        //console.log(res);
        res.result[0].forEach(item => {
          this.locations.push(item.fullname);
        });
      });
    },
    getLocationId(city) {
      //console.log("执行getlocationid");
      this.$jsonp(urls.locationid, {
        keyword: city,
        key: keys.key,
        output: "jsonp"
      }).then(res => {
        //console.log(res);
        let id = res.result[0][0].id;
        //console.log(JSON.stringify(res.data.result[0][0].id));
        //console.log(id);
        this.getLocations(id);
      });
    }
  },
  watch: {
    city: {
      handler: function(val, oldval) {
        this.getLocationId(val);
        //this.getLocations();
      },
      immediate: true, //关键
      deep: true
    }
  }
};
</script>
<style lang="scss">
.pickerwrap {
  width: 100%;
  .picker {
    .picker-toolbar {
      display: flex;
      justify-content: flex-end;
      .onleft {
        flex: 25%;
      }
      .oncenter {
        flex: 50%;
        font-size: 18px;
        margin-top: 5px;
      }
      .sure {
        flex: 25%;
        color: red;
        border: 0px;
        font-size: 18px;
        margin-top: 5px;
      }
    }
    //.picker-slot-wrapper,
    .picker-item {
      backface-visibility: hidden;
      width: 100%;
    }
  }
}
</style>