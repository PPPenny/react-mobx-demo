import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button, Modal, Toast } from 'antd-mobile';
import styles from './index.module.css';
const MemberList = inject('memberStore')(
    withRouter(
        observer(

            class MemberList extends Component {
                constructor(props) {
                    super(props)
                    this.state = {
                        searchName: '',
                        showPopu: false,
                        name: '',
                        age: '',
                        like: '',
                        isAdd: false, //是否是新增
                        currentId:null //当前操作的id
                    }
                }

                componentDidMount = () => {
                    this.getList()
                }
                getList = () => {
                    this.props.memberStore.getList()
                }
                // 搜索输入
                onChangeInput = (e, key) => {
                    const val = e.target.value
                    this.setState({ [key]: val })
                }
                // 点击搜索
                handleSearch = () => {
                    const { searchName } = this.state
                    this.props.memberStore.getList({ name: searchName })
                }
                // 新增
                handleAdd = () => {
                    this.setState({
                        showPopu: true,
                        isAdd: true
                    })
                }
                // 新增确认
                handleAddSure = async () => {

                    const { name, age, like ,currentId,isAdd} = this.state
                    const params = { name, age, like}
                    let method = 'addUser'
                    if(!isAdd){
                        params.id = currentId
                        method = 'updateUser'
                    }
                    try {
                        const { code, msg } = await this.props.memberStore[method](params)
                        if (+code !== 0) {
                            throw new Error(msg)
                        }
                        this.getList()
                        this.closePopu()
                    } catch ({ message }) {
                        Toast.fail(message)
                    }
                }
                // 关闭弹窗
                closePopu = () => {
                    this.setState({
                        showPopu: false,
                        name: '',
                        age: '',
                        like: '',
                        isAdd: false
                    })
                }
                // 删除
                handleDelete = (id)=>{
                    Modal.alert('删除','确认删除用户信息？',[
                        { text: '取消', onPress: () => console.log('cancel') },  
                        {
                            text:'确定',
                            onPress: async ()=>{
                                try{
                                    const {code,msg} = await this.props.memberStore.deleteUser({id})
                                    if(+code !== 0){
                                        throw new Error(msg)
                                    }
                                    Toast.success("删除成功")
                                    this.getList()

                                }catch({message}){
                                    Toast.fail(message)
                                }
                               
                                
                            }
                        }
                    ])
                }
                // 修改
                handleUpdate = (it) => {
                    const { id, name, age, like } = it
                    this.setState({
                        showPopu: true,
                        currentId:id, name, age, like
                    })
                }
                renderList = () => {
                    const { userList } = this.props.memberStore
                    return userList.map((it) => {
                        return (<div key={it.id} className={styles.listItem}>
                            <p>姓名:{it.name}</p>
                            <p>年龄:{it.age}</p>
                            <p>喜欢：{it.like}</p>
                            <div className={styles.listBtnWrap}>
                                <Button className={styles.searchBtn} inline onClick={() => this.handleUpdate(it)} size="small" type="primary">修改</Button>
                                <Button inline onClick={() => this.handleDelete(it.id)} size="small" type="warning">删除</Button>
                            </div>
                        </div>)
                    })
                }
                render() {
                    const { searchName, showPopu, name, age, like } = this.state
                    const { userList } = this.props.memberStore
                    return <div className={styles.wrap}>
                        <div className={styles.searchContent}>
                            <input className={styles.input} placeholder="请输入姓名" value={searchName} onChange={(e) => this.onChangeInput(e, 'searchName')} />
                            <Button className={styles.searchBtn} inline onClick={this.handleSearch} size="small" type="primary">搜索</Button>
                            <Button inline onClick={this.handleAdd} size="small" type="primary">新增</Button>
                        </div>
                        <div className={styles.listContent}>{userList && this.renderList()}</div>
                        <Modal
                            visible={showPopu}
                            popup
                            animationType="slide-up"
                        >
                            <div className={styles.btnWrap}>
                                <div onClick={this.closePopu} >取消</div>
                                <div onClick={this.handleAddSure}>确定</div>
                            </div>
                            <div>
                                <div className={styles.addItem}>
                                    <span className={styles.label}>姓名</span>
                                    <input className={styles.input} value={name} onChange={(e) => this.onChangeInput(e, 'name')} />
                                </div>
                                <div className={styles.addItem}>
                                    <span className={styles.label}>年龄</span>
                                    <input className={styles.input} value={age} onChange={(e) => this.onChangeInput(e, 'age')} />
                                </div>
                                <div className={styles.addItem}>
                                    <span className={styles.label}>喜欢</span>
                                    <input className={styles.input} value={like} onChange={(e) => this.onChangeInput(e, 'like')} />
                                </div>
                            </div>
                        </Modal>
                    </div>
                }
            }
        )
    )
)
export default MemberList