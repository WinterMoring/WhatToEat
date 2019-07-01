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
export default {
  name: "locationpicker",
  data() {
    return {
      dateSlots: [
        // 当slots这样定义时，因为tagList是通过api异步请求的，无法正常渲染，出现下图空白
        /* {
          flex: 1,
          values: this.$store.state.tagList,
          className: 'slot1',
          textAlign: 'center'
        } */
      ],
      locations: [],
      currentTags: {}
    };
  },
  created() {
    // 数据需在create生命周期中设定，否则picker中无法获取,此处进行数据请求操作
    this.locations = [
      {
        id: "110101",
        name: "东城",
        fullname: "东城区",
        pinyin: ["dong", "cheng"],
        location: {
          lat: 39.92855,
          lng: 116.41637
        }
      },
      {
        id: "110102",
        name: "西城",
        fullname: "西城区",
        pinyin: ["xi", "cheng"],
        location: {
          lat: 39.91231,
          lng: 116.36611
        }
      },
      {
        id: "110105",
        name: "朝阳",
        fullname: "朝阳区",
        pinyin: ["chao", "yang"],
        location: {
          lat: 39.9219,
          lng: 116.44355
        }
      },
      {
        id: "110106",
        name: "丰台",
        fullname: "丰台区",
        pinyin: ["feng", "tai"],
        location: {
          lat: 39.85856,
          lng: 116.28616
        }
      },
      {
        id: "110107",
        name: "石景山",
        fullname: "石景山区",
        pinyin: ["shi", "jing", "shan"],
        location: {
          lat: 39.90569,
          lng: 116.22299
        }
      },
      {
        id: "110108",
        name: "海淀",
        fullname: "海淀区",
        pinyin: ["hai", "dian"],
        location: {
          lat: 39.95933,
          lng: 116.29845
        }
      },
      {
        id: "110109",
        name: "门头沟",
        fullname: "门头沟区",
        pinyin: ["men", "tou", "gou"],
        location: {
          lat: 39.94048,
          lng: 116.10146
        }
      },
      {
        id: "110111",
        name: "房山",
        fullname: "房山区",
        pinyin: ["fang", "shan"],
        location: {
          lat: 39.74788,
          lng: 116.14294
        }
      },
      {
        id: "110112",
        name: "通州",
        fullname: "通州区",
        pinyin: ["tong", "zhou"],
        location: {
          lat: 39.90998,
          lng: 116.65714
        }
      },
      {
        id: "110113",
        name: "顺义",
        fullname: "顺义区",
        pinyin: ["shun", "yi"],
        location: {
          lat: 40.13012,
          lng: 116.65477
        }
      },
      {
        id: "110114",
        name: "昌平",
        fullname: "昌平区",
        pinyin: ["chang", "ping"],
        location: {
          lat: 40.22077,
          lng: 116.23128
        }
      },
      {
        id: "110115",
        name: "大兴",
        fullname: "大兴区",
        pinyin: ["da", "xing"],
        location: {
          lat: 39.72684,
          lng: 116.34159
        }
      },
      {
        id: "110116",
        name: "怀柔",
        fullname: "怀柔区",
        pinyin: ["huai", "rou"],
        location: {
          lat: 40.316,
          lng: 116.63177
        }
      },
      {
        id: "110117",
        name: "平谷",
        fullname: "平谷区",
        pinyin: ["ping", "gu"],
        location: {
          lat: 40.14062,
          lng: 117.12141
        }
      },
      {
        id: "110118",
        name: "密云",
        fullname: "密云区",
        pinyin: ["mi", "yun"],
        location: {
          lat: 40.37625,
          lng: 116.84317
        }
      },
      {
        id: "110119",
        name: "延庆",
        fullname: "延庆区",
        pinyin: ["yan", "qing"],
        location: {
          lat: 40.45678,
          lng: 115.97503
        }
      }
    ];
  },
  computed: {
    dataList() {
      let mydata = ["附近"];
      this.locations.forEach(item => {
        mydata.push(item.name);
      });
      let dateSlots = [
        {
          flex: 1,
          values: mydata,
          className: "slot1",
          textAlign: "center"
        }
      ];
      return dateSlots;
    }
  },
  methods: {
    handleConfirm() {
      this.currentTags = this.$refs.picker.getValues()[0];
      this.$emit("listenlocation", this.currentTags);
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