// components/view/index.js
import {getPhoneInfo,antiShake} from "../common.js"
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    safeTopArea:Boolean,//是否需要留出顶部安全距离
    refresh:Boolean,
    height: Number,
    refreshColor: {
      type: String,
      value: "#999"
    },
    loadText:{
      type:String,
      value:"到底了"
    },
    load:Boolean,
    
    refreshType: {
      type: String,
      value: "dot" //circle,dot
    },
    status: {
      type: Number,
      value: 0, //0隐藏，1下拉刷新，2松开刷新，3刷新中，4刷新成功,5刷新失败
    }
  },

  observers: {
    "height":function(value){
      value > 0 && this.setData({
        scrollViewHeight:value
      })

    },
    "loadHeight":function(value){
      if (value == 0){
        setTimeout(() => {
          this.setData({
            status: 0,
          })
        }, 300)
      }
    },
    
    "status": function (value) {
      switch (value) {
        case 3:
          this.setData({
            loadHeight: 140
          })
          break;
        case 4:
        case 5:
          setTimeout(() => {
            this.setData({
              loadHeight: 0
            })
          }, 1500)
          break;
      }
    }
  },
  lifetimes: {
    attached: function () {
      if (this.data.refresh){
        this.antiShake = antiShake();
        this.canRefresh = true; //是否满足下拉刷新条件
        this.preY = 0,
          // 在组件实例进入页面节点树时执行
          getPhoneInfo().then(res => {
            this.setData({
              safeTopAreaHeight: this.data.safeTopArea? res.statusBarHeight:0,
              scrollViewHeight: res.windowHeight - res.menuHeight - res.statusBarHeight - res.safeBottomHeight - 50
            })
          })
      }
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    loadHeight: 0,
    safeTopAreaHeight:0,
    scrollViewHeight:0,
  },


  /**
   * 组件的方法列表
   */
  methods: {
    toUpper(e) {
      if (!this.canRefresh && this.data.refresh) {
        this.canRefresh = true;
      }
      this.triggerEvent("scrolltoupper",e);
    },

    toLower(e){
      this.triggerEvent("scrolltolower",e)
    },

    touchStart(e) {
      if (this.data.refresh){
        this.preY = e.touches[0].pageY;
      }
      this.triggerEvent("touchstart",e);
    },
    touchEnd(e) {
      if (this.data.refresh){
        if (this.data.loadHeight >= 140) {
          this.triggerEvent("refresh", e);
          this.setData({
            status: 3
          },()=>{
           setTimeout(()=>{//如果不存在刷新事件，则10后自动关闭刷新
             this.data.status == 3 && this.setData({
               loadHeight:0
             })
           },10000)
          })
        } else {
          this.setData({
            status: 0,
          })
        }
      }
      
      this.triggerEvent("touchend",e);
    },
    touchMove(e) {
      if (this.canRefresh && this.data.refresh) {
        var currentY = e.touches[0].pageY,
          height = currentY - this.preY;
        this.setData({
          loadHeight: height,
          status: height > 140 ? 2 : 1
        })
      }
      this.triggerEvent("touchmove", e);
    },
    onScroll(e) {
      if (e.detail.deltaY < 0 && this.canRefresh && this.data.refresh) { //向上滚屏
        this.antiShake(() => {
          this.canRefresh = false; //向上滚屏时，如果刷新条件为真，则将其变成假，防止长按下拉时误下拉刷新
        }, 300)
      }
      this.triggerEvent("scroll",e);
    }
  }
})