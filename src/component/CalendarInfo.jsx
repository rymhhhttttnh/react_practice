import React,{Component,useState}  from 'react';
import Modal from './modal';

export default class CalendarInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show:props.show
    }
} 
      setShow(showFlg){
        this.setState = ({show:showFlg})
      }

    
    // const openModal = () => {
    //   setShow(true)
    // }
    render() {
      return (
        <div>
          {/* <button onClick={openModal}>Click</button> */}
          <Modal show={this.show} setShow={this.setShow}/>
        </div>
      )
    }
    
  }