const linkTo = function (url, type) {
  switch (type) {
    case "navigateTo":
      wx.navigateTo({
        url
      });
      break;
    case "switchTab":
      wx.switchTab({
        url
      });
      break;
    case "reLaunch":
      wx.reLaunch({
        url
      });
      break;
    case "redirectTo":
      wx.redirectTo({
        url
      });
      break;
  }
}
//判断传入字符串是否为图片链接
const isPic = function (picStr) {
  var reg = /.+(\.jpeg|\.jpg|\.png)$/;
  return reg.test(picStr.toLowerCase());
}
var _phoneInfo = null;
//获取手机基本信息
const getPhoneInfo = function () {
  if (_phoneInfo) return Promise.resolve(_phoneInfo);
  return new Promise((resolve, reject) => {
    // console.log("get")
    wx.getSystemInfo({
      success: res => {
        var { statusBarHeight, model, windowHeight, windowWidth } = res,
          isIpX = model.indexOf('iPhone X') > -1 ? true : false,
          { top, height } = wx.getMenuButtonBoundingClientRect();
        _phoneInfo = {
          isIpX,
          statusBarHeight,
          safeBottomHeight: isIpX ? 34 : 0,
          menuHeight: (top - statusBarHeight) * 2 + height,
          windowHeight,
          windowWidth
        }
        resolve(_phoneInfo);
      }
    });
  });
}
// HEX颜色值转换为RGB
const hexToRgb = function (hexValue) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    hex = hexValue.replace(rgx, (m, r, g, b) => r + r + g + g + b + b),
    rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (rgb) {
    var r = parseInt(rgb[1], 16),
      g = parseInt(rgb[2], 16),
      b = parseInt(rgb[3], 16);
    return `rgb(${r},${g},${b})`;
  } else {//颜色格式不对默认为白色
    return hexValue == 'transparent'?hexValue:'rgb(255,255,255)'
  }
}
// RGB颜色值转换为HEX
const rgbToHex = function (color) {
  var rgb = color.replace(/\(|\)|rgba|rgb/g, "").split(",");
  var r = parseInt(rgb[0]),
    g = parseInt(rgb[1]),
    b = parseInt(rgb[2]);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
//判断颜色是否深颜色
const isDeepColor = function (color) {
  color = color.toLowerCase();
  if (color.indexOf("rgb") > -1) {
    var rgb = color.replace(/\(|\)|rgba|rgb/g, "").split(",");
    if (rgb.length === 3 || rgb.length === 4) {
      var r = rgb[0],
        g = rgb[1],
        b = rgb[2];
      // 通过把 RGB 模式转换成 YUV 模式，而 Y 是明亮度（灰阶）
      return r * 0.299 + g * 0.578 + b * 0.114 >= 192 ? false : true
    } else {//颜色格式不对默认为浅色
      return false;
    }

  } else {
    return color === "transparent"?false: isDeepColor(hexToRgb(color));
  }
}
//防抖函数
const antiShake = function(){
  var _time = new Date().getTime();
  return function(fun,time){
    var currentTime = new Date().getTime();
    if(currentTime - _time > time){
      fun();
    }
    _time = currentTime
  }
}
const rpxTopx = function(rpxValue){
  return rpxValue / 750 * wx.getSystemInfoSync().windowWidth
}
const pxTorpx = function(pxValue){
  return pxValue * 750 / wx.getSystemInfoSync().windowWidth;
}
module.exports = {
  rpxTopx,
  pxTorpx,
  antiShake,
  linkTo,
  isPic,
  getPhoneInfo,
  isDeepColor,
  rgbToHex
}