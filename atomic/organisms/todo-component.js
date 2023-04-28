import {LitElement, html, css} from 'lit';
import {repeat} from 'lit/directives/repeat.js';

export class todoComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      :host > div {
      }
      .title {
        color: #FFF;
      }
      .creatorWrapper {
        margin-bottom: 18px;
        padding: 3px;
      }
      .listWrapper {
        background-color: #25273C;
        padding: 6px 0;
        height: 400px;
        overflow-y: auto;
      }
      .item__notLastItem:after {
        height: 2px;
        width: 100%;
        display: block;
        content: ' ';
      }
      .item__separator {
        height: 2px;
        width: 80%;
        background-color: rgba(72, 64, 64, .50);
        margin: 0 auto;
      }
      .footerWrapper {
        display: flex;
        justify-content: space-between;
        background-color: #25273C;
        border: 1px solid rgba(191, 86, 255, .79);
        color: rgba(255, 255, 255, .7);
      }
      .footerWrapper__amount {
        padding: 6px;
      }
      .footerWrapper__clearBtn {
        border: 0;
        background: none;
        color: rgba(255, 255, 255, .7);
        padding: 6px;
        cursor: pointer;
      }
      .no_data {
        text-align: center;
        color: rgba(255, 255, 255, .7);
        padding-top: 100px;
      }
      ::-webkit-scrollbar {
        width: 10px;
        margin-Right: 10px;
      }
      ::-webkit-scrollbar-track {
        background:rgba(255, 255, 255, .2);
      }
      ::-webkit-scrollbar-thumb {
        background:rgba(255, 255, 255, .4);
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
  }

  render() {
    let list = ""
    if(this.listItems === null || this.listItems.length === 0) {
      list = html`<div class="no_data"><p>No task created</p></div>`;
    } else {
      list = html`
        ${repeat(
          this.listItems,
          (item) => item.id,
          (item, index) => {
            let separator = (index != this.listItems.length - 1) ? html`<div class="item__separator">` : "";
            console.log(item)
            return html`
            <div>
              <todo-item 
                .id="${item.id}"
                .title="${item.title}"
                .isComplete="${item.isComplete}"
                @onItemChange=${this._updateItem}
              / >
            </div>
            ${separator}
          `}
        )}
      `;
    }

    return html`
    <div>
      <h1 class="title">Todo app</h1>
      <div class="creatorWrapper">
        <todo-input @onCreate=${this._createItem}></todo-input>
      </div>
      <div class="listWrapper">
        ${list}
      </div>
      <div class="footerWrapper">
          <div class="footerWrapper__amount"> ${(this.listItems) ? this.listItems.length : 0} items</div>
          <button class="footerWrapper__clearBtn" @click="${this._clearCompleted}">Clear complete</button>
      </div>
    </div>
    `;
  }

  _createItem(e) {
    let event = new CustomEvent('onTodoChange', { 
      bubbles: true, 
      composed: true, 
      detail: { action: 'create', data: {id:Date.now(), title: e.detail, isComplete: false }},
    })
    this.dispatchEvent(event);
    this.requestUpdate(); //Trigger re-render manually due to changes inside array
  }

  _updateItem(e) {
    let event = new CustomEvent('onChange', { 
      bubbles: true, 
      composed: true, 
      detail: { action: 'update', data: e.detail },
    })
    this.dispatchEvent(event);
    console.log(e.detail)
    this.listItems.map((item, index) => {
      if(item.id == e.detail.id) {
        this.listItems[index] = e.detail
        this.requestUpdate(); //Trigger re-render manually due to changes inside array

      }
    })
  }

  _clearCompleted() {
    let event = new CustomEvent('onTodoChange', { 
      bubbles: true, 
      composed: true, 
      detail: { action: 'delete' },
    })
    this.dispatchEvent(event);
  }

  _onChange() {
    let event = new CustomEvent('onTodoChange', { 
      bubbles: true, 
      composed: true, 
      detail: this.listItems 
    })
    this.dispatchEvent(event);
  }
}

window.customElements.define('todo-component', todoComponent);
