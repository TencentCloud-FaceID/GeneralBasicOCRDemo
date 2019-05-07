// miniprogram/pages/coordinate/coordinate.js
Page({
  data: {
    imageurl: "",
    height: 400,
    width: 200,
    json_data: "JSON",
    json: "",
    windowWidth: "",
    windowWidth_data: "",
    height_scale:""
  },
  result() {
    var myThis = this
    wx.redirectTo({
      url: '../result/result?json=' + myThis.data.json + "&imageurl=" + myThis.data.imageurl + "&width=" + myThis.data.width + "&height=" + myThis.data.height + "&web=coordinate" + "&windowWidth=" + myThis.data.windowWidth_data + "&height_scale=" + myThis.data.height_scale
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
      windowWidth_data: options.windowWidth,
      height_scale:options.height_scale
    })
    var width_num = parseFloat(options.width)
    var height_scale_num = parseFloat(options.height_scale)
    const ctx = wx.createCanvasContext('Canvas'); //首页LOGO
    ctx.drawImage(options.imageurl, 0, 0, width_num, 200);
    ctx.setFontSize(10)
    ctx.setFillStyle('red')
    ctx.setTextBaseline('middle')
    for (var i = 0; i < json_parse.result.TextDetections.length; i++) {
      ctx.fillText(json_parse.result.TextDetections[i].DetectedText, json_parse.result.TextDetections[i].Polygon[0].X * height_scale_num, json_parse.result.TextDetections[i].Polygon[0].Y * height_scale_num)
    }
    ctx.draw();
  }
})