// components/popup/index.js
import {getPhoneInfo} from "../common.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    position:{
      type:String,
      value:"bottom"
    },
    safeType:{
      type:String,
      value:"top"//top,buttom all是否留出安全距离
    },
    show:Boolean,
    mask:{
      type:Boolean,
      value:true
    }
  },
  lifetimes:{
    attached:function(){
      getPhoneInfo().then(res=>{
        this.setData({
          menuHeight:res.statusBarHeight + res.menuHeight,
          tabBarHeight:res.safeBottomHeight+50
        })
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    menuHeight:0,
    tabBarHeight:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onHidden(){
      this.setData({
        show:false
      })
    }
  }
})
