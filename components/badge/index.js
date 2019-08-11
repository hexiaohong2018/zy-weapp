// components/badge/index.js
Component({
  externalClasses:["custom-class"],
  /**
   * 组件的属性列表
   */
  properties: {
    count:String,
    dot:Boolean,
    color:{
      type:String,
      value:"#ed3f14"
    },
    img:String,
  },
  data:{
    info:"",
  },
  observers:{
    "count":function(value){
      value && this.setData({
        info: value > 99?"···":value
      })
    }
  }
})
