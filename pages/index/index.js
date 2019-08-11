//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    titles: ["线上订单", "线下订单", "item1", "itme2", "item1", "itme2"],
    items: [{
      text: "首页",
      icon:"home-o",
    },
    {
      text: "我的",
      icon:"user-o",
    }],
    pullStatus:0,
    show:false
  },
  onChange(e){
    console.log(e.detail);
  },
  onTab(){
    app.setTabBarBadge({index:1,count:2});
  },
 

  onRefresh(e){
    setTimeout(()=>{
      this.setData({
        pullStatus:4
      })
    },1000)
  },
  onSubmit(e){
    console.log(e);
  },
  onTap(){
    this.setData({
      show:true
    })
  },
  test(e){
    console.log(e)
  }
})
