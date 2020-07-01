const adminUrl = 'http://121.199.1.64:7001/admin/'
const servicePath = {
  checkLogin: `${adminUrl}checkLogin`,
  getTypeInfo: `${adminUrl}getTypeInfo`,
  addArticle: `${adminUrl}addArticle`,
  updateArticle: `${adminUrl}updateArticle/`,
  getArticleList: `${adminUrl}getArticleList`,
  deleteArticle: `${adminUrl}deleteArticle/`,
  getArticleInfo: `${adminUrl}getArticleInfo/`,
  uploadImage: `${adminUrl}uploadImage`,
  getImagesPath: `${adminUrl}getImagesPath`,
  deleteImage: `${adminUrl}deleteImage/`,
  getArticleListByPage: `${adminUrl}getArticleListByPage/`,
}
export default servicePath
