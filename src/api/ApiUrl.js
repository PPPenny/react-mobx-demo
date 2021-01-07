//发布后的相对根目录
const ROOT = `${process.env.PUBLIC_URL}/api`;
const urls = {
    USER_LIST: '/userList', //用户信息列表
    ADD_USER: '/add',//新增用户
    DELETE_USER:'/delete',//删除用户
    UPDATE_USER:'/updateUser'//修改用户
};
for (let key in urls) {
    if (Object.prototype.hasOwnProperty.call(urls, key)) {
        let v = urls[key];
        if (v.indexOf('/') > 0) v = `/${v}`;
        urls[key] = `${ROOT}${v}`;
    }
}
export default urls;
