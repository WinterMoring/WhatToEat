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
      <span class="oncenter">选择种类</span>
      <span @click="handleConfirm" class="sure">确认</span>
    </mt-picker>
  </div>
</template>
<script>
export default {
  name: "kindpicker",
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
      kinds: [],
      currentTags: {}
    };
  },
  created() {
    // 数据需在create生命周期中设定，否则picker中无法获取,此处进行数据请求操作
    this.kinds = [
      "中餐厅",
      "日韩菜",
      "西餐",
      "烧烤",
      "火锅",
      "海鲜",
      "素食",
      "清真",
      "自助餐",
      "面包甜点",
      "冷饮店",
      "小吃快餐"
    ];
  },
  computed: {
    dataList() {
      let mydata = ["美食"];
      this.kinds.forEach(item => {
        mydata.push(item);
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
      this.$emit("listenkind", this.currentTags);
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