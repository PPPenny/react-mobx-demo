import React, { Component } from 'react';
import styles from './List.module.css';
import { withRouter } from 'react-router-dom';
@withRouter
class List extends Component{
 
     renderListItem(){
       const listArr = [{id:1},{id:2},{id:3},{id:4},{id:5}];
         return listArr.map(it=>{
             return <div key={it.id} className={styles.item} onClick = {()=>{
                 this.handleClickItem(it.id)
                 }} >
                        {`这是列表${it.id}`}
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