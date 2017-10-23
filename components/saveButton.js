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
        userHash : $("#userId").val(),
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

        var url = '/show/' + res.data.hash;
        // 新規登録の場合
        if(res.new=="1"){
          url += "/new";
        }

        // 確認画面表示
        window.location.href = url;
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
