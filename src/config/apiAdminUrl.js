let ipUrl = 'http://127.0.0.1:7001'

let servicePath = {
    login: ipUrl + '/login',     // 登录接口
    getType: ipUrl + '/getType',  //分类接口
    saveArticle: ipUrl + '/saveArticle', //保存文章接口
    updateArticle: ipUrl + '/updateArticle',//文章列表接口
    getArticle: ipUrl + '/getArticle', // 文章列表
    deleteArticle: ipUrl + '/deleteArticle/' //删除文章
}

export default servicePath;