/**
 * 渲染图片
 * @param {String} filePath 图片绝对路径
 * @returns 图片完整路径
 */
export default function getImgFullPath(filePath) {
  return process.env.VUE_APP_BASE_URL + filePath;
}
