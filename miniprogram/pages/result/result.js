Page({
  data: {
    imageurl: "",
    height: 200,
    width: 200,
    json_data: [],
  },
  onLoad: function(options) {
    var myThis = this;
    var height = options.height
    var width = options.width
    var height_scale = 200 / height
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
        var test_data = cloud_callFunction_res.result.TextDetections[0]
        console.log(cloud_callFunction_res.result.TextDetections.length)
        var newarray = []
        for (var i = 0; i < cloud_callFunction_res.result.TextDetections.length; i++) {
          newarray.push(cloud_callFunction_res.result.TextDetections[i].DetectedText)
        }
        myThis.setData({
          json_data: newarray
        })
      },
    })
  }
})