// components/list/list-group.js
Component({
  externalClasses:["custom-class"],
  properties:{
    border:{
      type:Boolean,
      value:true
    }
  },
  relations: {
    './index': {
      type: 'child', // 关联的目标节点应为子节点
      linked: function (target) {
        // 每次有list被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
      },
      linkChanged: function (target) {
        // 每次有list被移动后执行，target是该节点实例对象，触发在该节点moved生命周期之后
      },
      unlinked: function (target) {
        // 每次有list被移除时执行，target是该节点实例对象，触发在该节点detached生命周期之后
      }
    }
  },


  methods: {
    _getAllLi: function () {
      // 使用getRelationNodes可以获得nodes数组，包含所有已关联的list，且是有序的
      var nodes = this.getRelationNodes('./index')
      // console.log(nodes);
    }
  },
  ready: function () {
    this._getAllLi()
  }
})
