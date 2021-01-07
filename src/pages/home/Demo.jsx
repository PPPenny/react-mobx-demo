import React, { Component } from 'react';
export default class Demo extends Component {
    renderForm() {
        return <form className="form">
            <label htmlFor="male">Male</label>
            <input type="radio" name="sex" id="male" />
            <label htmlFor="female">Female</label>
            <input type="radio" name="sex" id="female" />
        </form>
    }

    renderArr() {
        const arr = [<span key="hello">Hello</span>, <span key="world">World</span>]
        return <div>{arr}</div>
    }
    render() {
        return <div>
            Hello,world!
            <div>{this.renderForm()}</div>
            <div>{this.renderArr()}</div>
        </div>
    }
}