import Agent from '../api/Agent';
import ResponseCode from '../api/ResponseCode';
import UserStore from './UserStore';
import UIStore from './UIStore';
import FinBookingStore from './FinBookingStore'
import MyStore from './MyStore'
import ListStore from './ListStore';
import MemberStore from './MemberStore';
import { action, decorate } from 'mobx';


class RootStore {
    constructor() {
        this.agent = new Agent();
        // const persistData = new PersistData()
        this.userStore = new UserStore(this);
        this.UIStore = new UIStore(this);
        this.finBookingStore = new FinBookingStore(this);
        this.myStore = new MyStore(this);
        this.listStore = new ListStore(this);
        this.memberStore = new MemberStore(this);
    }
    /**
     * @description 发送POST请求
     * @param {*} url 请求地址
     * @param {*} _params 参数
     * @param {*} showLoading 显示loading图像
     * @returns Promise
     */
    sendPost(url, _params, showLoading) {
        showLoading && this.showLoading();
        const params = this._buildParams(_params);
        return this.agent.post(url, params).then(json => this._handleData(json, url, params));
    }
    /**
     * @description 发送GET请求
     * @param {*} url 请求地址
     * @param {*} _params 参数
     * @param {*} showLoading 显示loading图像
     * @returns Promise
     */
    sendGet(url, _params, showLoading) {
        showLoading && this.showLoading();
        const params = this._buildParams(_params);
        return this.agent.get(url, params).then(json =>this._handleData(json, url, params));
    }
    /**
     * @description 显示提示信息，默认3秒
     * @author Huang Li
     * @date 2018-06-22
     * @param {*} msg 提示的内容
     * @param {*} distance 展示的时长 单位：秒
     */
    showToast(msg, distance) {
        // Toast.hide();
        // Toast.info(msg, distance || 3, null, false);
    }
    /**
     * 显示加载框，期间不可操作
     */

    showLoading() {
        this.UIStore.isShowLoading = true;
    }
    hideLoading() {
        this.UIStore.isShowLoading = false;
    }
    /**
     * @description 构建参数
     * @author Huang Li
     * @date 2018-06-22
     * @param {*} par 参数
     * @returns Promise
     */
    _buildParams(par) {
        const params = { ...par };
        //某些接口希望不传token，就需要删除token字段，默认都带token
        if (params.noToken) {
            delete params.noToken;
            delete params.token;
        } else {
            /*如果没有this.UIStore.token就不代token，
            如果有params.token就不将this.UIStore.token覆盖它，
            如果有this.UIStore.token而没有params.token，就将this.UIStore.token付个params.token
            */
            this.UIStore.token && (params.token = params.token ? params.token : this.UIStore.token);
        }
        return params;
    }
    /**
     * @description 处理获取的结果，
     * 1.为了实现token自动刷新功能
     * 2.实现自动根据api/ResponseCode中的错误信息显示
     * @author Huang Li
     * @date 2018-06-22
     * @param {*} json 获取到的结果
     * @param {*} url 请求的url
     * @param {*} params 参数
     * @returns 获取的数据
     */
    _handleData(json, url, params) {
        this.hideLoading();
        if (!json || json.code === undefined) return {};
        switch (Number(json.code)) {
            //获取数据成功
            case 0:
                return json;
            //token过期
            case -1:
                return this.UIStore.refreshToken(url, params);
            //自动显示错误信息
            default: {
                console.log(`Requst is get Error,Code :${json.code}`);
                const msg = ResponseCode.showMsg(json.code);
                msg && this.showToast(msg);
                return json;
            }
        }
    }
}
decorate(RootStore, {
    hideLoading: action,
    showLoading: action
});
export default new RootStore();
