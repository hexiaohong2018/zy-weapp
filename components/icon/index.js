// components/icon/index.js
Component({
  externalClasses: ['custom-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    name:{
      type:String,
      value:"empty"
    },
    src:String,
    size:{
      type:String,
      value:"45rpx"
    },
    color:{
      type:String,
      value:"#999"
    }
  },
})
