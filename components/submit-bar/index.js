// components/submit-bar/index.js
import {getPhoneInfo} from "../common.js"
Component({
  externalClasses: ['label-class', 'value-class','btn-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    buttonType:{
      type:String,
      value: "danger"
    },
    buttonText:{
      type:String,
      value:"提交订单"
    },
    buttonColor:String,
    buttonTextColor:String,
    fixedType:{
      type:String,
      value:"bottom"//bottom 定为到底部，tabBarTop 定位到tabBar的顶部
    },
    safeBottom:Boolean,
    border:{
      type:Boolean,
      value:true
    },
    loading:Boolean,
    price:Number,
    labelText:{
      type:String,
      value:"合计"
    }
  },
  lifetimes:{
    attached:function(){
      this.data.safeBottom && getPhoneInfo().then(res=>{
        this.setData({
          safeBottomHeight: res.safeBottomHeight
        })
      })
    }
  },
  observers:{
    "fixedType":function(value){
      if(value == "tabBarTop"){
        var safeBottomHeight = this.data.safeBottomHeight;
        if (safeBottomHeight == 0) {
          getPhoneInfo().then(res=>{
            safeBottomHeight = res.safeBottomHeight
            this.setData({
              fixedBottomHeight: 50 + safeBottomHeight
            })
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    safeBottomHeight:0,
    fixedBottomHeight:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSubmit(e){
      this.triggerEvent("submit",e)
    }
  }
})
