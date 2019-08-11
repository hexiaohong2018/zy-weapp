// components/list/index.js
import {linkTo,isPic} from "../common.js";
Component({
  relations: {
    './list-group': {
      type: 'parent', // 关联的目标节点应为父节点
      linked: function (target) {
        // 每次被插入到list-group时执行，target是list-group节点实例对象，触发在attached生命周期之后
      },
      linkChanged: function (target) {
        // 每次被移动后执行，target是list-group节点实例对象，触发在moved生命周期之后
      },
      unlinked: function (target) {
        // 每次被移除时执行，target是list-group节点实例对象，触发在detached生命周期之后
      }
    }
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  externalClasses:["title-class","lable-class","value-class"],
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "标题"
    },
    label: String,
    value:String,
    url: String,
    linkType: {
      type: String,
      value: "navigateTo" //navigateTo,switchTab,reLaunch,redirectTo
    },
    icon: String,
    border:Boolean,
  },
  data:{
    isPic:false,
  },
  observers:{
    "icon":function(value){
      value && this.setData({
        isPic:isPic(value)
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goTo() {
      this.data.url && linkTo(this.data.url,this.data.linkType);
    }
  }
})