/**
 * 预约到店，H5模式打开
 */
import { observable, action, decorate } from 'mobx';
// import ApiUrls from '../transport-layer/ApiUrl';
// import moment from 'moment';
class FinBookingStore {
    constructor(rootStore, persistData) {
        this.rootStore = rootStore;
        this.persistData = persistData;
        // 获取省市信息
        // this.rootStore.addressStore.getCaecArea().then(data => this.initPrinceData(data));
    }
    bookTime = {};//预约时间


    setBookTime(data) {
        console.log(data)
        this.bookTime = data;
    }
    /**
     * @description 传入字符，移除字符中所有空格
     * @author Penny
     * @date 2018-11-14
     * @param {*} str {字符串}
     * @returns 移除字符中所有空格
     */
    removeAllStringSpace(str) {
        return (str && str.replace(/ /g, '')) || '';
    }
}
decorate(FinBookingStore, {
    bookTime: observable,
    setBookTime: action
});
export default FinBookingStore;
