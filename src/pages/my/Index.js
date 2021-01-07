import React, { Component } from 'react';
import styles from './Index.module.css';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

const MyIndex = inject('myStore')(
    withRouter(
        observer(
            class MyIndex extends Component {

                changeInput = (e,type)=>{
                    this.props.myStore.setValue(e.target.value,type)
                }
                render() {
                    const {count,price,total} =  this.props.myStore;
                    console.log(this.props.myStore);
                    return (
                        <div className={styles.main}>
                            <h2>测试computed</h2>
                             <div className={styles.countPrice}>
                                 <div className={styles.tab}>
                                 <label>数量</label>
                                 <input className={styles.input} value={count} onChange={(e)=>{
                                     this.changeInput(e,'count')
                                 }}/>
                                 </div>
                                 <div className={styles.tab}>
                                 <label>价格</label>
                                 <input className={styles.input} value={price} onChange={(e)=>{
                                     this.changeInput(e,'price')
                                 }}/>
                                 </div>
                                 <div className={styles.tab}>
                                 <label>总价</label>
                                 <input value={total} readOnly/>
                                 </div>
                             </div>
                            <button onClick={this.handleBackClick}>返回首页</button>
                        </div>
                    );
                }
                handleBackClick = () => {
                    this.props.history.replace('/');
                };
            }
        )
    )
);

export default MyIndex;
