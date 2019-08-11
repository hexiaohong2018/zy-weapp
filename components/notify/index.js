// components/notify/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:Boolean,
    type:{
      type:String,
      value: "success"//"success" ? "#07c160" : value == "warning" ? "#ff976a" : value == "danger" ? "#f44" : "#1989fa"
    },
    color:{
      type:String,
      value:"white"
    },
    background:{
      type:String,
      value:"#07c160"
      },
    delay:{
      type:Number,
      value:2000
    },
    text:String
  },
  observers:{
    "show":function(value){
      value && setTimeout(()=>{
        this.setData({
          show:false
        })
      },this.data.delay)
    },
    "type":function(value){
      this.setData({
        background: value=="success" ? "#07c160" : value == "warning" ? "#ff976a" : value == "danger" ? "#f44" : "#1989fa"
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // backgroundData:"#f44",
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
