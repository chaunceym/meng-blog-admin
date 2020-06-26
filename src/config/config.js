const adminUrl = 'http://127.0.0.1:7001/admin/'
const servicePath = {
  checkLogin: `${adminUrl}checkLogin`,
  getTypeInfo: `${adminUrl}getTypeInfo`,
  addArticle: `${adminUrl}addArticle`,
  updateArticle: `${adminUrl}updateArticle`,
  getArticleList: `${adminUrl}getArticleList`,
  deleteArticle: `${adminUrl}deleteArticle/`,
  getArticleInfo: `${adminUrl}getArticleInfo/`,
}
export default servicePath