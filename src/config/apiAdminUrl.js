// let ipUrl = "http://127.0.0.1:7001";
let ipUrl = "http://121.196.14.20:7001";
// let ipUrl = "http://127.0.0.1:9097";

let servicePath = {
  login: ipUrl + "/login", // 登录接口
  saveArticle: ipUrl + "/saveArticle", //保存文章接口
  updateArticle: ipUrl + "/updateArticle", //文章列表接口
  getArticle: ipUrl + "/getArticle/", // 文章列表
  article: ipUrl + "/article", // 首页接口
  deleteArticle: ipUrl + "/deleteArticle/", //删除文章
  getType: ipUrl + "/getType", //分类接口
  addType: ipUrl + "/addType", //新增分类
  updateType: ipUrl + "/updateType", //修改分类
  deleteType: ipUrl + "/deleteType/", //删除分类
  getMusic: ipUrl + "/getMusic", //获取音乐
  addMusic: ipUrl + "/addMusic", //保存音乐
  updateMusic: ipUrl + "/updateMusic", //修改音乐
  deleteMusic: ipUrl + "/deleteMusic/", //删除音乐
  statistics: ipUrl + "/statistics", //文章数据统计
  pie: ipUrl + "/getPie", //类型访问统计
  upload: ipUrl + "/upload", //提交图片接口
  getSildeShow: ipUrl + "/getSlideShow", //获取轮播图列表
  addSlideShow: ipUrl + "/addSlideShow", //新增轮播图
  updateSlideShow: ipUrl + "/updateSlideShow", //更新轮播图
  deleteSlideshow: ipUrl + "/deleteSlideShow/", //删除轮播图
};

export default servicePath;
