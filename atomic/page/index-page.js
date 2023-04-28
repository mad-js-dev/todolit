import {LitElement, html, css} from 'lit';

export class indexPage extends LitElement {

  static get styles() {
    return css`
    :host div {
      background-color: #181824;
    }
    `;
  }

  static get properties() {
    return {
      listItems: {type: Array},
    };
  }

  constructor() {
    super();
    this.todoItems = [
    ]
  }

  render() {
    return html`
      <div>
        <centerblock-template>
          <todo-component slot="content" .listItems="${this.todoItems}" @onTodoChange=${this._updateData}></todo-component>
        </centerblock-template>
      </div>
    `;
  }

  _updateData(e) {
    
    if(e.detail.action === "create") {
      console.log(e)
      this.todoItems.unshift( e.detail.data);
      
    } else if(e.detail.action === "update") {
      this.listItems.map((item, index) => {
        if(item.id == e.detail.id) {
          this.listItems[index] = e.detail
        }
      })
    }  else if(e.detail.action === "delete") {
      let newList = []
      this.todoItems.map(item => {
        if(!item.isComplete) { 
          newList.push(item)
        }
      })
      this.todoItems = newList;
      this.requestUpdate(); //Trigger re-render manually due to changes inside array
    }
  }
}

window.customElements.define('index-page', indexPage);
