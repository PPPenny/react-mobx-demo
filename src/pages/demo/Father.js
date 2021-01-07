import React, { Component } from 'react'

// export default class Father extends Component{
//     constructor(props){
//         super(props)
//         this.props={
//             age:13,
//             name:'name'
//         }
//     }
//     render(){
//         const {age,name} = this.props
//         return <Son name={name} age={age}/>
//     }
// }
// export class Son extends Component{ 
//     render(){
//         const {name,age} = this.props
//         return <div>
//          <div>姓名: {name}</div>
//          <div>年龄: {age}</div>
//         </div>
//     }
// }

// 子->父
export default class Total extends Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 0,
            price: 0,
            sex: 0
        }
    }
    countTotal() {
        const { num, price } = this.state
        return Number(num) * Number(price)
    }
    changeNum = (type, value) => {
        this.setState({ [type]: value })
    }
    change = (e) => {
        console.log(e.target.value)
    }
    handleGender = (e) => {
        this.setState({ sex: e.target.value })
    }
    render() {
        return (<div>
            <Input label="数量" type="num" changeNum={this.changeNum} />
            <Input label="单价" type="price" changeNum={this.changeNum} />
            <p>总价{this.countTotal()}</p>
            <UnControlInput />
            <div>
                其他受控组件
                <div>
                    <textarea value={this.state.value} onChange={this.change} />
                </div><div>
                    <select value={this.state.city} onChange={this.change}>
                        <option value='hz'>杭州</option>
                        <option value='bj'>北京</option>
                        <option value='sh'>上海</option>
                    </select>
                </div>
                <div>
                    <p><input type='radio' name='gender' checked={Number(this.state.sex)===1} onChange={this.handleGender} value="1" />女</p>
                    <p><input type='radio' name='gender' checked={Number(this.state.sex)===2} onChange={this.handleGender} value="2" />男</p>
                </div>
            </div>

        </div>)
    }
}
export class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0
        }
    }
    changeInput = (e) => {
        const { type, changeNum } = this.props
        const value = e.target.value
        this.setState({ value: value }, () => {
            changeNum(type, value)
        })
    }
    render() {
        const { label } = this.props
        const { value } = this.state
        return <div>
            <label>{label}</label>
            <input value={value} onChange={this.changeInput} />
        </div>
    }
}

export class UnControlInput extends Component {
    changeInput = (e) => {
        console.log(e.target.value)
    }
    componentDidMount() {
        console.log(this.input)
    }
    render() {
        return <div>
            <input defaultValue="3" ref={(dom) => {
                this.input = dom
            }} onChange={this.changeInput} />
        </div>
    }
}