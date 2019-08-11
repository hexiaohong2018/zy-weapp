// pages/log/index.js
const app = getApp();
Page({

  onTab(){
    app.setTabBarBadge({index:0,count:110})
  }
})