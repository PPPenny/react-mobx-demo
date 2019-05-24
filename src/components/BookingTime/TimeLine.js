import React, { Component } from 'react';
import styles from './TimeLine.module.css';
import PropTypes from 'prop-types';
import { Button } from 'antd-mobile';
export default class TimeLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hadChoose: this.props.data.currentTimeIndex === this.props.data.index ? 1 : 0
        };
    }
    handleClickTime = () => {
        this.setState({ hadChoose: 1 });
        this.props.chooseTime && this.props.chooseTime(this.props.data);
    };
    render() {
        return (
            <Button
                size="small"
                type={this.state.hadChoose ? 'primary' : 'default'}
                onClick={this.handleClickTime}
                disabled={this.props.data.canChoose ? false : true}
                className={`${styles.showTime} border`}>
                {this.props.data.time}
            </Button>
        );
    }
}
TimeLine.propTypes = {
    //显示的日期对象
    data: PropTypes.object,
    //点击小块
    chooseDate: PropTypes.func
};
