import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class SubTimer extends Component {
    constructor(props) {
        super(props);
        this.setTimer = '';
        this.allSecond = moment(this.props.endTime).diff(this.props.sysTime) / 1000;
        this.state = {
            time: this.renderTime(this.allSecond)
        };
        this.setTime(this.allSecond);
        this.sysTime = this.props.sysTime || moment().format('YYYY-MM-DD HH:mm:ss');
    }
    render() {
        this.props.timerCallBack && this.props.timerCallBack();
        return <span className={this.props.className}>{this.state.time}</span>;
    }

    componentWillUnmount = () => {
        // 清理定时器
        clearTimeout(this.setTimer);
    };
    renderTime = allSeconds => {
        let allSecond = allSeconds;
        const time = allSecond * 1000;
        const day = parseInt(time / 1000 / 60 / 60 / 24);
        const hour = moment.duration(time).hours();
        const min = moment.duration(time).minutes();
        const sec = moment.duration(time).seconds();
        return `${day}天${hour}时${min}分${sec}秒`;
    };
    setTime = allSeconds => {
        this.setTimer = setTimeout(() => {
            let allSecond = allSeconds;
            if (allSecond <= 0) {
                clearTimeout(this.setTimer);
                this.setState({ time: '' });
                return;
            }
            allSecond--;
            this.setState({ time: this.renderTime(allSecond) });
            this.setTime(allSecond);
        }, 1000);
    };
}
SubTimer.propTypes = {
    //截止时间
    endTime: PropTypes.string,
    //系统事件
    sysTime: PropTypes.string,
    //类名
    className: PropTypes.string,
    //倒计时完成过后的回调方法
    timerCallBack: PropTypes.func
};