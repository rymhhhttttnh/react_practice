import React,{Component,useState}  from 'react';
import Modal from './modal';

export default class CalendarInfo extends Component {
  constructor(props) {
    super(props);
    console.log("props.show:" + props.show)
    this.state = {
      show:props.show
    }
  }
   
  setShow(showFlg){
    console.log("setShow")
    this.setState({show:true})
    
  }

  
    
    // const openModal = () => {
    //   setShow(true)
    // }
    render() {
      console.log("clickReturn")
      return (
        <div>
          {/* <button onClick={openModal}>Click</button> */}
          <Modal show={this.state.show} setShow={this.setShow}/>
        </div>
      )
    }
    
  }