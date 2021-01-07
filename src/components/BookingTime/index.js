import React, { Component } from 'react';
import moment from 'moment';
import styles from './index.module.css';
import ShowDate from './ShowDate';
import TimeLine from './TimeLine';
import shortid from 'shortid';
import PropTypes from 'prop-types';
// import { inject } from 'mobx-react';
// @inject('finBookingStore')
export default class BookingTime extends Component {
    constructor(props) {
        super(props);
        const dateObj = this.props.initTime;
        this.initDateData(); //初始化所有日期数据
        this.state = {
            currentDay: (dateObj && dateObj.currentDay) || this.initDate(), //当前选择的日期
            currentDayIndex: (dateObj && dateObj.currentDayIndex) || 0, //当前选择的日期index，匹配选中
            currentTime: (dateObj && dateObj.currentTime) || '', //当前时间段
            currentTimeIndex: dateObj && dateObj.currentTimeIndex //当前时间段index
        };
    }
    //日期数组
    dateArray = [];
    // 数据写死。canChoose表示时间是否可选：0表示不可，1表示可选
    timeObj = [
        { canChoose: 1, time: '10:00' },
        { canChoose: 1, time: '10:30' },
        { canChoose: 1, time: '11:00' },
        { canChoose: 1, time: '11:30' },
        { canChoose: 1, time: '12:00' },
        { canChoose: 1, time: '12:30' },
        { canChoose: 1, time: '13:00' },
        { canChoose: 1, time: '13:30' },
        { canChoose: 1, time: '14:00' },
        { canChoose: 1, time: '14:30' },
        { canChoose: 1, time: '15:00' },
        { canChoose: 1, time: '15:30' },
        { canChoose: 1, time: '16:00' },
        { canChoose: 1, time: '16:30' },
        { canChoose: 1, time: '17:00' },
        { canChoose: 1, time: '17:30' },
        { canChoose: 1, time: '18:00' },
        { canChoose: 1, time: '18:30' },
        { canChoose: 1, time: '19:00' },
        { canChoose: 1, time: '19:30' },
        { canChoose: 1, time: '20:00' }
    ];
    /**
     * @description 初始化日期数组
     * @author Penny
     * @date 2018-11-12
     */
    initDateData() {
        const hour = moment().hour(); //当前小时
        const showData = hour > 20 ? moment().add(1, 'days')._d : moment()._d;
        //返回的是英文，翻译为中文
        for (let i = 0; i < 7; i++) {
            let dateObj = {};
            dateObj.year = moment(showData)
                .add(i, 'days')
                .format('YYYY'); //日期
            dateObj.date = moment(showData)
                .add(i, 'days')
                .format('MM.DD'); //日期
            let dStr = moment(showData)
                .add(i, 'days')
                .calendar();
            if (dStr.indexOf('Today') > -1) {
                dateObj.dateTxt = '今天';
            } else if (dStr.indexOf('Tomorrow') > -1) {
                dateObj.dateTxt = '明天';
            } else if (dStr.indexOf('Sunday') > -1) {
                dateObj.dateTxt = '周日';
            } else if (dStr.indexOf('Monday') > -1) {
                dateObj.dateTxt = '周一';
            } else if (dStr.indexOf('Tuesday') > -1) {
                dateObj.dateTxt = '周二';
            } else if (dStr.indexOf('Wednesday') > -1) {
                dateObj.dateTxt = '周三';
            } else if (dStr.indexOf('Thursday') > -1) {
                dateObj.dateTxt = '周四';
            } else if (dStr.indexOf('Friday') > -1) {
                dateObj.dateTxt = '周五';
            } else if (dStr.indexOf('Saturday') > -1) {
                dateObj.dateTxt = '周六';
            } else {
                dateObj.dateTxt = dateObj.date;
            }

            this.dateArray.push(dateObj);
        }
    }
    /**
     * @description
     * @author Penny
     * @date 2018-11-13
     * @returns  当前日期
     */
    initDate() {
        return `${this.dateArray[0].year} ${this.dateArray[0].date}`;
    }

    initTimer = date => {
        let showTimeLine = this.state.currentDay;
        if (date) {
            showTimeLine = date;
        }
        if (moment(moment().format('YYYY-MM-DD')).diff(moment(showTimeLine).format('YYYY-MM-DD'), 'd') === 0) {
            //说明是今天){
            this.timeObj.forEach(item => {
                if (
                    moment().hour() > item.time.substring(0, 2) ||
                    (Number(moment().hour()) === Number(item.time.substring(0, 2)) &&
                        moment().minute() > item.time.substring(3, 5))
                ) {
                    item.canChoose = 0;
                }
            });
        } else {
            this.timeObj.forEach((item, index) => {
                item.canChoose = 1;
            });
        }
        this.timeObj.forEach((item, index) => {
            item.index = index;
        });
        return this.renderTime(this.timeObj);
    };
    //渲染日期
    renderDate = () => {
        return this.dateArray.map((item, index) => {
            item.currentIndex = this.state.currentDayIndex;
            item.index = index;
            return <ShowDate data={item} key={shortid.generate()} chooseDate={this.handleClickDay} />;
        });
    };
    //渲染时间段
    renderTime = data => {
        return data.map((item, index) => {
            item.index = index;
            item.currentTimeIndex = this.state.currentTimeIndex;
            return <TimeLine data={item} key={shortid.generate()} chooseTime={this.handleClickTime} />;
        });
    };

    handleClickDay = e => {
        //选择了日期，重新渲染时间段
        const showTimeLine = `${e.year} ${e.date}`;
        this.setState({
            currentDay: showTimeLine,
            currentDayIndex: e.index,
            currentTimeIndex: '',
            currentTime: ''
        });
    };
    //选中的时间段
    handleClickTime = data => {
        this.setState({
            currentTime: data.time,
            currentTimeIndex: data.index
        });
    };
    //点击确定
    handleSure = () => {
        const bookTimeObject = {
            currentDay: this.state.currentDay, //当前选择的日期
            currentDayIndex: this.state.currentDayIndex, //当前选择的日期index，匹配选中
            currentTime: this.state.currentTime, //当前时间段
            currentTimeIndex: this.state.currentTimeIndex //当前时间段index
        };
        // if (!this.state.currentTime) {
        //     this.props.finBookingStore.rootStore.showToast('请选择时间段');
        //     return;
        // }
        this.props.handleSure && this.props.handleSure(bookTimeObject);
    };
    //点击取消
    handleCancel = () => {
        this.props.handleCancel && this.props.handleCancel();
    };

    render() {
        return (
            <div className={styles.chooseDate}>
                <div className={styles.dateContent}>
                    <div className={styles.showTimeLine}>
                        <div className={styles.cancelTxt} onClick={this.handleCancel}>
                            取消
                        </div>
                        <div className={styles.sureTxt} onClick={this.handleSure}>
                            确定
                        </div>
                    </div>
                    <div className={`${styles.showDate} border-t`}>
                        <div className={styles.scroller}>{this.renderDate()}</div>
                    </div>
                    <div className={styles.showTimePiece}>{this.initTimer()}</div>
                </div>
            </div>
        );
    }
}
PropTypes.BookingTime = {
    //设置默认时间
    initTime: PropTypes.object,
    // 点击取消
    handleCancel: PropTypes.func,
    //点击确定
    handleSure: PropTypes.func
};
