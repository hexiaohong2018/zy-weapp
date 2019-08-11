// components/button/index.js
Component({
  externalClasses: ["coustom-class"],
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: "default", //default success  warning danger info
    },
    background: {
      type: String,
      value: "white"
    },
    color: {
      type: String,
      value: "#333"
    },



    plain: Boolean,
    openType: String,
    formType: String, //submit/reset 
    disabled: Boolean,

    icon: String,
    rightIcon: String,
    size: {
      type: String,
      value: "normal" // normal large small min
    },
    round: Boolean,
    loading: Boolean
  },
  observers: {
    "loading": function (value) {
      value && this.setData({
        disabled: true
      })
    },
    "type": function (value) {
      value && value != "default" && this.setData({
        colorData: "white",
        backgroundData: value == "success" ? "#07c160" : value == "warning" ? "#ff976a" : value == "danger" ? "#f44" : "#1989fa",
      })
    },
    "background": function (value) {
      value && this.setData({
        backgroundData: value,
        borderColor: value
      })
    },
    "color": function (value) {
      value && this.setData({
        colorData: value
      })
    },
    "size": function (value) {
      value && this.setData({
        borderSadius: value == "normal" ? 80 : value == "large" ? 100 : value == "small" ? 65 : 48,
        fontSize: value == "normal" ? 28 : value == "large" ? 34 : value == "small" ? 24 : 20
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    fontSize: 28,
    borderColor: "#eee",
    borderSadius: 80,
    backgroundData: "white",
    colorData: "#333",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo(e) {
      this.triggerEvent("getuserinfo", e);
    },
    contact(e) {
      this.triggerEvent("contact", e);
    },
    getphonenumber(e) {
      this.triggerEvent("getphonenumber", e);
    },
    opensetting(e) {
      this.triggerEvent("opensetting", e);
    },
    launchapp(e) {
      this.triggerEvent("launchapp", e);
    },
  }
})