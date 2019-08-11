// components/input/index.js
Component({
  externalClasses:["title-class"],
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder:String,
    required:Boolean,
    icon:String,
    iconColor:String,
    rightIcon:String,
    rightIconColor:String,
    disabled:Boolean,
    border:{
      type:Boolean,
      value:true
    },
    value:String,
    autosize:Boolean,//自适应高
    type:{
      type:String,
      value:"text"
    },
    password:Boolean,
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onBindBlur(e){
      if (e.detail.value !== this.data.value){
        this.triggerEvent("change",e.detail.value)
        this.data.value = e.detail.value;
      }
    }
  }
})
