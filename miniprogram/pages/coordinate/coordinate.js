// miniprogram/pages/coordinate/coordinate.js
Page({
  data: {
    imageurl: "",
    height: 400,
    width: 200,
    json_data: "JSON",
    json: "",
    windowWidth:"",
    windowWidth_data: ""
  },
  result() {
    var myThis = this
    wx.redirectTo({
      url: '../result/result?json=' + myThis.data.json + "&imageurl=" + myThis.data.imageurl + "&width=" + myThis.data.width + "&height=" + myThis.data.height + "&web=coordinate" + "&windowWidth=" + myThis.data.windowWidth_data
    })
  },
  onLoad: function (options) {
    var json_parse = JSON.parse(options.json)
    var json_stringify = JSON.stringify(json_parse, null, 2)
    var myThis = this;
    myThis.setData({
      imageurl: options.imageurl,
      width: options.width,
      height: options.height,
      json_data: json_stringify,
      json: options.json,
      windowWidth: options.windowWidth / 2,
      windowWidth_data: options.windowWidth
    })
  }
})