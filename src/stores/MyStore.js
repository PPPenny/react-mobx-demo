/*
 * @Author: Penny 
 * @Date: 2019-05-24 13:40:28 
 * @Last Modified by: Penny
 * @Last Modified time: 2019-05-24 14:06:33
 */

import { observable, decorate, action, computed } from 'mobx';
class MyStore {
    constructor(rootStore, persistData) {
        this.rootStore = rootStore;
        this.persistData = persistData;
    }
    price = 0;
    count = 1;
    get total(){
        let allPrice ='0.00'
        if(this.price && this.count){
            allPrice = Number(this.price * this.count).toFixed(2)
        }
        return allPrice
    }
    setValue=(value,type)=>{
      this[type] = value;
    }

}
decorate(MyStore, {
    price: observable,
    count: observable,
    total:computed,
    setValue:action
});
export default MyStore;
