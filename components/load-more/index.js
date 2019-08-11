// components/load-more/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loading:{
      type:Boolean,
      value:true
    },
    type:{
      type:String,
      value: "circle"//dot circle
    },
    tip:{
      type:String,
      value:""
    },
    color:{
      type:String,
      value:"#ed3f14"
    },
    row:Boolean
  }
})
