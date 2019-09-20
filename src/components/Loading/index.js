import React ,{Component}from 'react';
import Run from './run.json'
import lottie from 'lottie-web'

export default class Loading extends Component{
   constructor(props){
       super(props)
       this.containerDiv = ''
      this.anim = ''
   }
   componentDidMount(){
    this.anim = lottie.loadAnimation({
        container: this.containerDiv,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: Run //动画json
      })
      this.anim.play()
   }
    render(){
        return <div ref={(c)=>{
           this.containerDiv = c
        }}/>
    }
}
