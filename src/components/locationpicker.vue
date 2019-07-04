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
      axios
        .get(urls.locations, {
          params: {
            id: id,
            key: keys.key
          }
        })
        .then(res => {
          res.data.result[0].forEach(item => {
            this.locations.push(item.fullname);
          });
        });
    },
    getLocationId(city) {
      console.log("执行getlocationid");
      axios
        .get(urls.locationid, {
          params: {
            keyword: city,
            key: keys.key
          }
        })
        .then(res => {
          //console.log(JSON.stringify(res));
          let id = res.data.result[0][0].id;
          console.log(JSON.stringify(res.data.result[0][0].id));
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