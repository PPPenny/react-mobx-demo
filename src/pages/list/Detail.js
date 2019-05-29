import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
@withRouter
class Detail extends Component{
    constructor(props){
        super(props);
        this.id = this.props.match.params.id
    }
    handleBackClick=()=>{
        this.props.history.goBack();
    }
 
    render(){
        return(<div>
          <h1>{`这是详情页${this.id}`}</h1>
          <button onClick={this.handleBackClick}>返回列表</button>
        </div>)
    }

}
export default Detail;