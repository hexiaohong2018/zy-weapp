// components/nav-bar/index.js
import {getPhoneInfo} from "../common.js"
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active:Number,
    border:Boolean,
    items:Array,
    color:{
      type:String,
      value:"#666"
    }
  },
  data:{
    safeHeight:0,
  },

  lifetimes:{
    created:function(){
      if(typeof app.setTabBarBadge !== "function"){
        app.setTabBarBadge = this.setTabBarBadge.bind(this);//绑定一个全局setTabBardge函数
      }
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
      getPhoneInfo().then(res =>{
        this.setData({
          safeHeight: res.safeBottomHeight,
        })
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(e){
      this.setData({
        active: e.currentTarget.dataset.index,
      })
      this.triggerEvent('change', this.data.active)
    },
    setTabBarBadge({index,count}){
      var name = "items["+index+"].count";
      this.setData({
        [name]:count
      })
    }
  }
})
