import moment from 'moment'
import React ,{Component}from 'react';
export default class AddTimer extends Component {
    constructor(props){
        super(props)
        this.timer = null;
        this.state = {
            timer: moment().format("YYYY-MM-DD HH:mm:ss")
        }
    }
    componentDidMount(){
        this.initTimer();
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    initTimer = ()=>{
       this.timer = setInterval(()=>{
            this.setState({timer: moment().format("YYYY-MM-DD HH:mm:ss")})
        },1000)
    }
   render(){
       const {timer} = this.state
       return <span>{timer}</span>
   }
}