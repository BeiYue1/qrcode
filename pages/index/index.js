//index.js
//获取应用实例
const app = getApp()
let QRCode = require('../../utils/weapp-qrcode.js') ; 
let qrcode;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: 'https://www.baidu.com',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // canvas的宽高
    let size = this.getCanvasSize();
    qrcode = new QRCode('myCanvas', {
      text: "https://www.baidu.com",
      width: size.w,
      height: size.w,
      colorDark: "black",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
  formSubmit(e){
    let url = e.detail.value.url||this.data.text ; 
    qrcode.makeCode(url) ; 
    wx.showToast({
      title: '生成中,不急',
      icon:'loading',
      duration:2000
    })
  },
  toFocus(){
     this.setData({text:''})
  },
  getCanvasSize(){
    let size = {} ; 
    let res = wx.getSystemInfoSync() ; 
    let sacle = 686/750;
    let canvasWidth = res.windowWidth*sacle ; 
    let canvasHeight = res.windowHeight*sacle ; 
    size.w = canvasWidth ; 
    size.h = canvasHeight ; 
    return size ; 
  }
})
