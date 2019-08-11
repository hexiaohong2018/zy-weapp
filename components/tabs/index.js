// components/tabs/index.js
Component({
  externalClasses: ["title-class"],
  /**
   * 组件的属性列表
   */
  properties: {
    // type:{
    //   type:String,
    //   value:"normal"//"normal" "card" "capsule"
    // },

    titles: {
      type: Array,
      value: []
    },
    active: Number,
    border: {
      type: Boolean,
      value: true
    }
  },
  observers: {
    "titles": function(value) {
      value.length > 0 && this.setData({
        itemWidth: value.length < 4 ? Math.ceil(100 / value.length * 100) / 100 : 25
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemWidth: 25,
    scrollIndex: "_0"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTab: function(e) {
      var index = e.target.dataset.index;
      if (index != null) {
        this.setData({
          active: index,
          scrollIndex: "_" + (index - 1 < 0 ? 0 : index - 1)
        })
        this.triggerEvent("change", index);
      }
    }
  }
})