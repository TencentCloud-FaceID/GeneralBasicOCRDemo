// miniprogram/pages/index/index.js

Page({
  data: {

  },
  uploadImage() {
    var myThis = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(chooseImage_res) {
        wx.getFileSystemManager().readFile({
          filePath: chooseImage_res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success(base64_res) {
            wx.getImageInfo({
              src: chooseImage_res.tempFilePaths[0],
              success(getImageInfo) {
                wx.navigateTo({
                  url: '../result/result?base64=' + base64_res.data + "&imageurl=" + chooseImage_res.tempFilePaths[0] + "&width=" + getImageInfo.width + "&height=" + getImageInfo.height
                })
              }
            })
          }
        })
      }
    })
  }
})