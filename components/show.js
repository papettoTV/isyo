import React, { Component } from 'react';
import FbLogin from './FacebookLogin';

export default class Show extends Component {

	constructor(props) {
		super(props);
		this.state = {
			body: null,
			message: null,
			messageRow: null,
		};

    console.log("show.js constructor");
    console.log(this.props.params);

	}
	componentDidMount() {
		console.log("show.js componentDidMount");

    var that = this;

      $.ajax({
        url: '/api/isyos?filter={"where":{"hash":"' + this.props.params.isyoId + '"}}',      
        type: 'GET',
        success: function(res) {
          console.log("get api success",res);
          // this.setState({data: data})

          var message = "<p>" + res[0].body.replace("\n","</p><p>") + "</p>";
          that.setState({isLoading: false,message:message,messageRow:res[0].body});

          // TODO 確認画面表示
          // window.location.href = '/#/show';
        },
      }).fail((responseData) => {
        if (responseData.responseCode) {
          console.error(responseData.responseCode);
        }
      });
	}

	componentWillUnmount() {
		console.log("show.js componentWillUnmount");
	}
	render(){
    console.log("render");
    console.dir(this.props);
		return(
			<div className="bgimage">
			<div className="container">
      <div className="lined-paper" dangerouslySetInnerHTML={{ __html: this.state.message}}>
      </div>
      <FbLogin loggedLabel="編集する" isyoId={this.props.params.isyoId} body={this.state.messageRow} />
      </div>
			</div>
		)
	}
}
