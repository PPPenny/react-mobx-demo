import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {inject,observer} from 'mobx-react'
@inject('listStore')
@withRouter
@observer
class Detail extends Component{
    constructor(props){
        super(props);
        this.id = this.props.match.params.id
    }
    handleBackClick=()=>{
        this.props.history.goBack();
    }
    onChangeInput=(e)=>{
        const target = e.target;
        this.props.listStore.setData(this.id,target.value)

    }
 
    render(){
        const data = this.props.listStore.listData.find(it=>it.id === Number(this.id))
        return(<div>
          <h1>{`这是详情页${data.id}`}</h1>
          <div>你可以修改它的内容</div>
          <input value = {data.value} onChange={this.onChangeInput}/>
          <button onClick={this.handleBackClick}>返回列表</button>
        </div>)
    }

}
export default Detail;