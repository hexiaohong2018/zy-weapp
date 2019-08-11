// components/ad/index.js
import {getPhoneInfo,pxTorpx,rpxTopx} from "../common.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {
      type: Array,
      value: []
    },
    dotType: String,//dot rect
    dotPosition: {
      type: String,
      value: "center"
    },
    imgMargin:Number,
    autoplay:Boolean,
    displayMultipleItems:{
      type:Number,
      value:1
    }
  },
  lifetimes: {
    attached: function() {
      this.maxHeight = 0;
      this.maxZoom = 0;
      this.index = 0;
      const query = this.createSelectorQuery();
      query.select('#img').boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec((res)=>{
        this.windowWidth = res[0].width;//获取图片的显示宽度
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 0,
    height: 300,
    zoom:0.1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      this.setData({
        current: e.detail.current
      })
    },
    onload(e) {
      var zoom = this.windowWidth/e.detail.width,
        zoomHeight = pxTorpx(Math.ceil(e.detail.height * zoom *100)/100);
      (this.maxHeight < zoomHeight) && (this.maxHeight = zoomHeight);
      (this.maxZoom < zoom) && (this.maxZoom = Math.ceil(zoom * 10) / 10);
      this.index++;
      if (this.index == this.data.items.length) {
        this.setData({
          zoom:this.maxZoom,
          height: this.maxHeight
        })
      }
    }
  }
})