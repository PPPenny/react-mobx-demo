import { observable,action, decorate } from 'mobx';
import ApiUrls from '../api/ApiUrl';
class MemberStore {
    constructor(rootStore, persistData) {
        this.rootStore = rootStore;
        this.persistData = persistData;
    }
    userList = null
    // 查询
    getList(params) {
        this.rootStore.sendGet(ApiUrls.USER_LIST,params).then(json=>{
            this.userList = json.data
        })
    }
    // 新增
    addUser(params){
        return this.rootStore.sendPost(ApiUrls.ADD_USER,params)
    }
    // 删除
    deleteUser(params){
        return this.rootStore.sendPost(ApiUrls.DELETE_USER,params)
    }
    //修改
    updateUser(params){
        return this.rootStore.sendPost(ApiUrls.UPDATE_USER,params)
    }
}
decorate(MemberStore, {
    userList: observable,
    getList:action
});
export default MemberStore