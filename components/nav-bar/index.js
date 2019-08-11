// components/nav-bar/index.js
import { getPhoneInfo, isDeepColor, rgbToHex } from "../common.js"
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  externalClasses: ['title-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    background: {
      type: String,
      value: "#fff"//只支持RGBA,RGB HEX
    },
    title: String,
    back: Boolean,
    color: {
      type: String,
      value: "#000000"
    },
    clearFloat:Boolean,
    opacity:{
      type:Number,
      value:1
    }
  },
  observers: {
    "background": function (value) {
      var deepColor = isDeepColor(value),
        background = value.indexOf("#") == -1 ? rgbToHex(value) : value,
        color = this.data.color;
      wx.setNavigationBarColor({
        frontColor: deepColor ? '#ffffff' : "#000000",
        backgroundColor: background,
        animation: {
          duration: 300,
          timingFunc: 'easeOut'
        }
      })
      this.setData({
        color: (color === "#ffffff" || color == "#000000") ? (isDeepColor(value) ? '#ffffff' : "#000000") : color
      })
    },
  },


  /**
   * 组件的初始数据
   */
  data: {
    height: 0,
    statusBarHeight: 0,
    menuHeight: 0,
  },
  lifetimes: {
    attached: function () {

      // 在组件实例进入页面节点树时执行
      getPhoneInfo().then(res => {
        var { statusBarHeight, menuHeight } = res;
        this.setData({
          statusBarHeight,
          menuHeight,
          height: statusBarHeight + menuHeight,
        })
      })


    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBack() {
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})
