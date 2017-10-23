import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };

		this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("handleClick");

    $.ajax({
      url: "/login",
      dataType: 'text',
      type: 'GET',
      data: null,
      success: function(res) {
        console.log("get success",res);
        // move show view
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
      ログイン
      </Button>
    );
  }
}
