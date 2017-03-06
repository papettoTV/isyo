import React, { Component } from 'react';
// import SampleStore from '../stores/SampleStore'
// import SampleActions from '../actions/SampleActions'

// function getSapmleState() {
//   return {
//     sample: "sample"
//   }
// }

// class ExampleApp extends Component{
// var ExampleApp = React.createClass({
export default class ExampleApp extends Component {
  // constructor(props){
  //   super(props)
  //   this._onChange = this._onChange.bind(this)
    // this.state = getSapmleState()
  // }

  // getDefaultProps() {
  //   // コンポーネント１つにつき一度だけ呼ばれる
  //   console.log("getDefaultProps");
  // }
		//
  // getInitialState() {
  //   // インスタンス作成のたびに呼ばれる
  //   console.log("getInitialState");
  //   return {temp: "EMPTY"};
  // }

  componentDidMount() {
    console.log("componentDidMount");
    // SampleStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    // SampleStore.removeChangeListener(this._onChange);
  }

  handleClick(){
    console.log("handleClick");
  }

  render(){
    return(
      <div>
        <input type="button" value="click" onClick={this.handleClick} />
        <h1>h1</h1>
      </div>
    )
  }

  _onChange() {
	  console.log("onChange");
    this.setState(getSapmleState());
  }
}
