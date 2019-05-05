// miniprogram/pages/coordinate/coordinate.js
Page({
  data: {
    imageurl: "",
    height: 200, 
    width: 200,
    json_data:"JSON"
  },
  onLoad: function (options) {
    var myThis = this;
    var height = options.height
    var width = options.width
    var height_scale = 200/height
    var width_height = height_scale * width
    myThis.setData({
      imageurl: options.imageurl,
      width: width_height
    })
    wx.cloud.callFunction({
      name: "GeneralBasicOCR",
      data: {
        SecretId: secret.SecretId,
        SecretKey: secret.SecretKey,
        base64: options.base64,
      },
      success(cloud_callFunction_res) {
        console.log(cloud_callFunction_res.result)
        myThis.setData({
          json_data: JSON.stringify(cloud_callFunction_res.result.TextDetections)
        })
      },
    })
  }
})