Page({
  data: {
    imageurl: "",
    height: 200,
    width: 200,
    json_data: [],
    json: "",
    windowWidth:"",
    windowWidth_data:""
  },
  coordinate() {
    var myThis = this
    wx.redirectTo({
      url: '../coordinate/coordinate?json=' + myThis.data.json + "&imageurl=" + myThis.data.imageurl + "&width=" + myThis.data.width + "&height=" + myThis.data.height + "&windowWidth=" + myThis.data.windowWidth_data
    })
  },
  onLoad: function(options) {
    var myThis = this;
    switch (options.web) {
      case "index":
        var height = options.height
        var width = options.width
        var height_scale = 200 / height
        var width_height = height_scale * width
        myThis.setData({
          imageurl: options.imageurl,
          width: width_height,
          windowWidth: options.windowWidth / 2,
          windowWidth_data: options.windowWidth
        })
        wx.cloud.callFunction({
          name: "GeneralBasicOCR",
          data: {
            base64: options.base64,
          },
          success(cloud_callFunction_res) {
            var newarray = []
            for (var i = 0; i < cloud_callFunction_res.result.TextDetections.length; i++) {
              newarray.push(cloud_callFunction_res.result.TextDetections[i].DetectedText)
            }
            myThis.setData({
              json_data: newarray,
              json: JSON.stringify(cloud_callFunction_res)
            })
          },
        })
        break;
      case "coordinate":
        var json_parse = JSON.parse(options.json)
        var newarray = []
        for (var i = 0; i < json_parse.result.TextDetections.length; i++) {
          newarray.push(json_parse.result.TextDetections[i].DetectedText)
        }
        myThis.setData({
          imageurl: options.imageurl,
          width: options.width,
          height: options.height,
          json_data: newarray,
          json: JSON.stringify(json_parse),
          windowWidth: options.windowWidth/2,
          windowWidth_data: options.windowWidth
        })
        break;
    }

  }
})