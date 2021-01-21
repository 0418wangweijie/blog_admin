let ipUrl = 'http://127.0.0.1:7001'

let servicePath = {
    login: ipUrl + '/login',     // 登录接口
    saveArticle: ipUrl + '/saveArticle', //保存文章接口
    updateArticle: ipUrl + '/updateArticle',//文章列表接口
    getArticle: ipUrl + '/getArticle', // 文章列表
    deleteArticle: ipUrl + '/deleteArticle/', //删除文章
    getType: ipUrl + '/getType',  //分类接口
    addType: ipUrl + '/addType',     //新增分类
    updateType: ipUrl + '/updateType', //修改分类
    deleteType: ipUrl + '/deleteType/',    //删除分类
    getMusic: ipUrl + '/getMusic',       //获取音乐
    addMusic: ipUrl + '/addMusic',      //保存音乐
    updateMusic: ipUrl + '/updateMusic',   //修改音乐
    deleteMusic: ipUrl + '/deleteMusic/',       //删除音乐
}

export default servicePath;