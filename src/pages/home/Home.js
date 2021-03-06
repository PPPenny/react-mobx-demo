/*
 * @Author: Penny 
 * @Date: 2019-05-23 10:47:10 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-12-Mo 11:35:56
 */

import React, { Component } from 'react';
import styles from './Home.module.css';
import { Input, BookingTime, AddTimer, SubTimer } from '../../components'
import { inject, observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import { Modal } from 'antd-mobile';
import moment from 'moment';

@inject('finBookingStore')
@withRouter
@observer
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            showChoose: false,
            num: 5,
        }
    }
    handleBtn = (e) => {
        this.setState({ count: this.state.count - 1 })
    }
    /**
     * @description
     * @author Penny
     * @date 2019-05-23
     * @memberof Home
     */
    handleAdd = () => {
        this.setState({ count: this.state.count + 1 }, () => {
            console.log(`回调的${this.state.count}`)
        })
        this.setState({ count: this.state.count + 1 }, () => {
            console.log(`回调的${this.state.count}`)
        })
        this.setState({ count: this.state.count + 1 }, () => {
            console.log(`回调的${this.state.count}`)
        })
        this.setState({ count: this.state.count + 1 }, () => {
            console.log(`回调的${this.state.count}`)
        })
        console.log(this.state.count);

    }
    handleInput = (e) => {
        this.setState({ count: e.target.value })
    }
    handleSureTime = (e) => {
        this.props.finBookingStore.setBookTime(e);
        this.hideTimeSelect();
    }
    hideTimeSelect = () => {
        this.setState({ showChoose: false })
    }
    handleShowTimer = () => {
        this.setState({ showChoose: true })
    }


    render() {
        const { count, showChoose, num } = this.state
        const { bookTime } = this.props.finBookingStore;
        return (
            <div className={styles.main}>
                <label>state状态管理demo:</label>
                <div>{count + num}</div>
                <div className={styles.count}>
                    <div className={styles.countIcon} onClick={(e) => {
                        this.handleBtn(e)
                    }}>-</div>
                    <input className={styles.input} value={count} onChange={this.handleInput} />
                    <div className={styles.countIcon} onClick={this.handleAdd}>+</div>
                </div>
                <label>组件props</label>
                <div className={styles.count}>
                    <div className={styles.countIcon} onClick={(e) => {
                        this.handleBtn(e)
                    }}>-</div>
                    <Input value={count} onChange={this.handleInput} />
                    <div className={styles.countIcon} onClick={this.handleAdd}>+</div>
                </div>
                <label>mobx使用</label>
                <div className={styles.chooseTime} onClick={this.handleShowTimer}>
                    <label>时间</label>
                    <input value={bookTime.currentTime ? `${moment(bookTime.currentDay).format('YYYY-MM-DD')} ${bookTime.currentTime}` : ''}
                        placeholder="请选择时间" readOnly />
                </div>
                <Modal visible={showChoose} popup animationType="slide-up" onClose={this.hideTimeSelect}>
                    <BookingTime
                        handleCancel={this.hideTimeSelect}
                        handleSure={this.handleSureTime}
                        initTime={bookTime}
                    />
                </Modal>
                <Link to='/member/list' className={styles.link}>用户列表</Link>
                <Link to='/demo' className={styles.link}>简单的demo</Link>
                <Link to='/params' className={styles.link}>父子传参</Link>
                <Link to='/my' className={styles.link}>跳转到另一个页面</Link>
                <Link to='/list' className={styles.link}>跳转到列表</Link>
                <Link to='/animate' className={styles.link}>跳转到动画页面</Link>
                <div><label>正向计时器</label><AddTimer /></div>
                <div><label>倒计时(endTime 2020-08-27 00:00:00)</label>
                    <div><SubTimer endTime='2020-08-27 00:00:00' /></div></div>
            </div>
        );
    }
}

export default Home;
