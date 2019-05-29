/**
 * 预约到店，H5模式打开
 */
import { observable, action, decorate } from 'mobx';
class ListStore {
    constructor(rootStore, persistData) {
        this.rootStore = rootStore;
        this.persistData = persistData;
    }
    listData = [
        {id:1,value:"hahaha"},
        {id:2,value:"hahaha"},
        {id:3,value:"hahaha"},
        {id:4,value:"hahaha"},
        {id:5,value:"hahaha"}
       ];

    setData=(id,value)=>{
       const index = this.listData.findIndex(it=>it.id === Number(id));
       this.listData[index].value = value;
    }

}
decorate(ListStore, {
    listData:observable,
    setData:action
});
export default ListStore;
