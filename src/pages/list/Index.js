import React, { Component } from 'react';
import styles from './List.module.css';
import { withRouter } from 'react-router-dom';
import {inject,observer} from 'mobx-react'
@inject('listStore')
@withRouter
@observer
class List extends Component{
     renderListItem(){
         const listArr = this.props.listStore.listData;
         return listArr.map(it=>{
             return <div key={it.id} className={styles.item} onClick = {()=>{
                 this.handleClickItem(it.id)
                 }} >
                        {`这是列表${it.id}`}
                        <p>{`内容是${it.value}`}</p>
                  </div>
         })
        
     }
     handleClickItem=(id)=>{
        this.props.history.push(`/detail/${id}`);
     }
    render(){
        return(<div className={styles.list}>
           {this.renderListItem()}
        </div>)
    }

}
export default List;