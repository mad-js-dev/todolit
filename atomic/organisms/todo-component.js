import {LitElement, html, css} from 'lit';
import {repeat} from 'lit/directives/repeat.js';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class todoComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
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
    this.listItems = [
    ]
  }

  render() {
    let list = ""
    if(this.listItems === null || this.listItems.length === 0) {
      list = html`<div><p>No data</p></div>`;
    } else {
      list = html`
        ${repeat(
          this.listItems,
          (item) => item.id,
          (item, index) => {
            console.log(item)
            return html`
              <todo-item 
                .id="${item.id}"
                .title="${item.title}"
                .isComplete="${item.isComplete}"
                @onItemChange=${this._updateItem}
              / >
            `}
        )}
      `;
    }

    return html`
      <todo-input @onCreate=${this._createItem}></todo-input>
      ${list}
      <div>
          <div> ${(this.listItems) ? this.listItems.length : 0} items</div>
          <button @click="${this._clearCompleted}">Clear complete</button>
      </div>
      
    `;
  }
  _createItem(e) {
    this.listItems.unshift({id:Date.now(), title: e.detail, isComplete: false});
    this.requestUpdate(); //Trigger re-render manually due to changes inside array
  }
  _updateItem(e) {
    this.listItems.map((item, index) => {
      console.log(e.detail, index)
      if(item.id == e.detail.id) {
        this.listItems[index] = e.detail
        this.requestUpdate(); //Trigger re-render manually due to changes inside array
      }
    })
  }

  _clearCompleted() {
    console.log('clear')
    let newList = []

    this.listItems.map(item => {
      if(!item.isComplete) { 
        newList.push(item)
      }
    })

    this.listItems = newList;
    this.requestUpdate(); //Trigger re-render manually due to changes inside array
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
