import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../pages/home/Home.module.css'
export default class Input extends Component{
    constructor(props){
        super(props);
        console.log(this.props)
    }
    componentWillReceiveProps(nextProps){
        console.log(`componentWillReceiveProps${nextProps}`);
    }
    shouldComponentUpdate(newProps,newState){
        console.log(`shouldComponentUpdate${newProps}+${newState}`);
        if(newProps.value > 3){
            return false
        }
        return true
    }
    render(){
        return <input className={styles.input} value={this.props.value} onChange={this.props.onChange}/>
    }
}
PropTypes.Input={
    value:PropTypes.string,
    onChange: PropTypes.func
}
 