import React, { Component } from 'react';
import { Link } from 'react-router'
import FbLogin from './FacebookLogin';
import Isyo from '../common/models/isyo';

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

		// TODO model内 で処理するようリファクタリングする
      $.ajax({
        url: '/api/isyos?filter={"where":{"hash":"' + this.props.params.isyoHash + '"}}',
        type: 'GET',
        success: function(res) {
          console.log("showjs get api success",res);
          // this.setState({data: data})

          // var message = "<p>" + res[0].body.replace("\n","</p><p>") + "</p>";
          var message = "<p>" + res[0].body.replace(/\n/g,"</p><p>") + "</p>";
          message = message.replace(/<p><\/p>/g,"<p>&nbsp;<p>");
          that.setState({isLoading: false,message:message,messageRow:res[0].body});
        },
      }).fail((responseData) => {
        if (responseData.responseCode) {
          console.error(responseData.responseCode);
        }
      });


			// facebook load
			window.fbAsyncInit = function() {
				FB.init({
					appId            : '<%= app_id %>',
					autoLogAppEvents : true,
					xfbml            : true,
					version          : 'v2.10'
				});
				FB.AppEvents.logPageView();
			};

			 // faceboo init
			 (function(d, s, id){
				 var js, fjs = d.getElementsByTagName(s)[0];
				 if (d.getElementById(id)) {return;}
				 js = d.createElement(s); js.id = id;
				 js.src = "//connect.facebook.net/en_US/sdk.js";
				 fjs.parentNode.insertBefore(js, fjs);
			 }(document, 'script', 'facebook-jssdk'));

		 }

	componentWillUnmount() {
		console.log("show.js componentWillUnmount");
	}

	share(){
		FB.ui({
			method:  'share',
			display: 'popup',
			hashtag: "#遺書一筆",
			href: '<%= url %>'
		}, function(response){});
	}

	render(){
    console.log("render");
    console.dir(this.props);
		var edit_link = "/#/edit/" + this.props.params.isyoHash;

		return(
			<div className="bgimage">
			<div className="container">
      <div className="lined-paper" dangerouslySetInnerHTML={{ __html: this.state.message}}>
      </div>
			<Link to={edit_link} >
			<button>編集する</button>
			</Link>
            <p>
              <a href={edit_link}><button className="btn btn-primary" >編集する</button></a>
              &nbsp;&nbsp;&nbsp;
              <a href="#" className="btn btn-facebook" id="shareBtn" onClick={this.share}>
							<i className="fa fa-facebook fa-fw"></i>書いたことを残す
							</a>
            </p>
            <p>※書いた内容は本人しか見れません。<br />
              ※今後のversion upで、課金した人にだけ公開する機能を作成予定です。
            </p>

      </div>
			</div>
		);
	}
}
