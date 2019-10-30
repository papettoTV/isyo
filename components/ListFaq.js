import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class ListFaq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <li>
        <a className="page-scroll" href="#faq" onClick={this.open}>FAQ</a>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>FAQ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>質問１）遺書はいくつ残せますか？<br />
            回答１）一つだけです。遺書はいくつも遺すものではないと考えているためです。</p>
            <p>質問２）書いた遺書は公開してないようですが、本当に書いた本人しか見れないの？<br />
            回答２）はい。現時点では書いた本人しか見れません</p>
            <p>質問３）それだと遺書として意味無くない？<br />
            回答３）はい、今はそうです。本来の遺書だと書いた本人が亡くなってから公開されるべきですが、亡くなったかどうかの判定が難しく、かつ、誰に公開すべきかの判定が難しいのが悩みです。
            そのため今考えているのは、見たい遺書に対して課金した方にだけ参照できる機能を作成しようと思っています。（時期は未定</p>
            <p>以下、追加質問を随時掲載予定</p>
          </Modal.Body>
        </Modal>
      </li>
    );
  }
}
