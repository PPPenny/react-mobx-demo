import React, { Component } from 'react'
export default class BindThis extends Component{
    // constructor(props){
    //     super(props)
    //     this.handleClick = this.handleClick.bind(this)
    // }
    handleClick=()=>{
        console.log(this)
    }
    render(){
        return <div onClick={this.handleClick}>点击我啦</div>
        // return <div onClick={()=>{
        //     this.handleClick()
        // }}>点击我啦</div>
    }
}