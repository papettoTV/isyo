import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class SaveButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };

		this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({isLoading: true});

      var data = {
        body : $("#body").val(),
        userId : $("#userId").val(),
        isyoId : $("#isyoId").val(),
      };

    console.log("val",data);

    var that = this;

    $.ajax({
      url: "/save",
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(res) {
        console.log("post success",res);
        // this.setState({data: data})
        that.setState({isLoading: false});
        // that.props.showBody(res.data.body);

        // 確認画面表示
        // window.location.href = '/#/show';
        window.location.href = '/show/' + res.id;
      },
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());

        that.setState({isLoading: false});
      }.bind(this)
    });
  }

  render() {
    let isLoading = this.state.isLoading;
    return (
      <Button
      bsStyle="primary"
      disabled={isLoading}
      onClick={!isLoading ? this.handleClick : null}>
      {isLoading ? '保存中...' : '保存する'}
      </Button>
    );
  }
}
