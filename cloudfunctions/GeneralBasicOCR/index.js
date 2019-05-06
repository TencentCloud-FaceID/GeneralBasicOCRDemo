// 云函数入口文件
const cloud = require('wx-server-sdk') //小程序云开发SDK
const tencentcloud = require("tencentcloud-sdk-nodejs"); //腾讯云API 3.0 SDK
const secret = require('config.js')

cloud.init({
  env: 'test-aa10b0'
}) //云开发初始化
var synGeneralBasicOCR = function (imgbase64) { //人脸识别API
  const OcrClient = tencentcloud.ocr.v20181119.Client;
  const models = tencentcloud.ocr.v20181119.Models;

  const Credential = tencentcloud.common.Credential;
  const ClientProfile = tencentcloud.common.ClientProfile;
  const HttpProfile = tencentcloud.common.HttpProfile;

  let cred = new Credential(secret.SecretId, secret.SecretKey);
  let httpProfile = new HttpProfile();
  httpProfile.endpoint = "ocr.tencentcloudapi.com";
  let clientProfile = new ClientProfile();
  clientProfile.httpProfile = httpProfile;
  let client = new OcrClient(cred, "ap-guangzhou", clientProfile);

  let req = new models.GeneralBasicOCRRequest();

  let params = '{"ImageBase64":"' + imgbase64 + '"}'
  req.from_json_string(params);
  return new Promise(function (resolve, reject) { //构造异步函数
    client.GeneralBasicOCR(req, function (errMsg, response) {
      if (errMsg) {
        reject(errMsg)
      } else {
        resolve(response);
      }
    })
  })
}

exports.main = async (event, context) => {
  const imgbase64 = [event.base64] //读取来自客户端图片base64
  datas = await synGeneralBasicOCR(imgbase64) //调用异步函数，向腾讯云API发起OCR人脸融合请求
  return datas //返回腾讯云API的数据到客户端
}