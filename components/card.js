import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
// import Card from 'react-credit-card';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isLoading: false,
      isDone: false,
      resultMessage: ""
    };

		this.close = this.close.bind(this);
		this.open = this.open.bind(this);

		this.handleClick = this.handleClick.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  handleClick() {
    this.setState({isLoading: true});

      var data = {
        number : $("#card_number").val(),
        name : $("#card_name").val(),
        expiry_year : $("#card_expiry_year").val(),
        expiry_month : $("#card_expiry_month").val(),
        cvc : $("#card_cvc").val(),
      };

    console.log("val",data);

    var that = this;

    $.ajax({
      url: "/pay",
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(res) {
        console.log("post success",res);
        // this.setState({data: data})
        that.setState({isLoading: false});
        that.setState({ isDone: true });

        var mes = "";
        if(res.error){
          mes=res.error.message;
        }else{
          mes="支払い完了しました。遺書をご覧になれます。";
        }
        that.setState({resultMessage:mes});

        // that.props.showBody(res.data.body);

        // var url = '/show/' + res.data.hash;
        // // 新規登録の場合
        // if(res.new=="1"){
        //   url += "/new";
        // }
        //
        // // 確認画面表示
        // window.location.href = url;
      },
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());

        that.setState({isLoading: false});
      }.bind(this)
    });
  }

  render() {
    let isLoading = this.state.isLoading;
    let isDone    = this.state.isDone;
    let mes    = this.state.resultMessage;

    return (
      <li>
        <a className="page-scroll" href="#pay" onClick={this.open}>支払い</a>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>支払い</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {this.state.isDone ?
            <p>{mes}</p>
            :
            <div className='form'>
            <input
            id          = "card_number"
            type        = 'number'
            placeholder = '**** **** **** ****'
            />
            <input
            id          = "card_name"
            type        = 'text'
            placeholder = 'Full Name'
            />
            <br />
            <input
            id          = "card_expiry_month"
            type        = 'text'
            placeholder = 'MM'
            />/
            <input
            id          = "card_expiry_year"
            type        = 'number'
            placeholder = 'YY'
            />
            <br />
            <input
            id          = "card_cvc"
            type        = 'number'
            placeholder = 'cvc'
            />
            <Button
            bsStyle="primary"
            disabled={isLoading}
            onClick={!isLoading ? this.handleClick : null}>
            {isLoading ? '送信中...' : '送信する'}
            </Button>
            </div>
          }
          </Modal.Body>
        </Modal>
      </li>
    );
  }
}
