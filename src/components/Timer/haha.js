import React, { Component } from 'react';
import valueChinese from '../../assets/values/value-chinese.json';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class Timer extends Component {
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
        if (!this.state.time && this.props.isFrom === 2) {
            //
            this.props.timerCallBack && this.props.timerCallBack();
        }
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
        let str;
        if (this.props.isFrom === 0) {
            str = `${hour}${valueChinese.hour}${min}${valueChinese.minute}${sec}${valueChinese.second}`;
        } else if (this.props.isFrom === 2) {
            str = `${day}${valueChinese.day}${hour}${valueChinese.hour}${min}${valueChinese.minute}${sec}${
                valueChinese.second
            }`;
        } else {
            str = `${day}${valueChinese.day}${hour}${valueChinese.hour}${min}${valueChinese.minute}`;
        }
        return str;
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
Timer.propTypes = {
    //截止时间
    endTime: PropTypes.string,
    //系统事件
    sysTime: PropTypes.string,
    //类名
    className: PropTypes.string,
    //倒计时完成过后的回调方法
    timerCallBack: PropTypes.func
};