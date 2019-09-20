import React, { Component } from 'react';
import styles from './ShowDate.module.css';
import PropTypes from 'prop-types';
export default class ShowDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hadChoose: this.props.data.currentIndex === this.props.data.index ? 1 : 0
        };
    }
    //选中了日期，返回给父级调用
    handleClickDay = () => {
        this.setState({ hadChoose: 1 });
        this.props.chooseDate && this.props.chooseDate(this.props.data);
    };
    render() {
        let classNameStr = this.state.hadChoose ? styles.choosed : 'border-b';
        return (
            <div className={styles.showDateItem}>
                <div onClick={this.handleClickDay} className={`${styles.showDays} ${classNameStr}`}>
                    <div>{this.props.data.date}</div>
                    <div>{this.props.data.dateTxt}</div>
                </div>
                {/* {this.state.hadChoose === 1 && <IconCaec icon="triangle-down" className={styles.iconChoose} />} */}
            </div>
        );
    }
}
ShowDate.propTypes = {
    //显示的日期对象
    data: PropTypes.object,
    // 点击日期返回的
    chooseDate: PropTypes.func
};
