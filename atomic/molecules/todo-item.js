import {LitElement, html, css} from 'lit';

export class TodoItem extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        padding: 6px 12px;
      }
      .iconWrapper {
        border: 1px solid rgba(191, 86, 255, .79);
        border-radius: 50%;
        width: 22px;
        height: 22px;
        text-align: center;
        background: linear-gradient(-45deg, #E600FA, rgba(82, 97, 234, 0))
      }
      .iconWrapper:hover {
        cursor: pointer;
      }
      
      todo-icon {
        margin-top: 3px;
        font-size: 18px;
        color: #FFF;
      }
      .titleWrapper {
        color: rgba(255, 255, 255, .7);
        padding-left: 12px;
        font-size: 16px;
        max-width: 80%;
      }
    `;
  }

  static get properties() {
    return {
      id: {type: Object},
      title: {type: Object},
      isComplete: {type: Object},
    };
  }

  constructor() {
    super();
    this.id = 0
    this.title = "No title"
    this.isComplete = false
  }

  render() {
    let icon = html`<todo-icon icon=""></todo-icon>`;
    console.log(this.isComplete)
    if(this.isComplete) {
      icon = html`<todo-icon icon="check"></todo-icon>`;
    }

    return html`
      <div class="iconWrapper" @click=${this._toogleCompletion}>${icon}</div>
      <div class="titleWrapper">${this.title}</div>
    `;
  }

  _toogleCompletion() {
    this.isComplete = !this.isComplete
    
    let event = new CustomEvent('onItemChange',{ 
      bubbles: true, 
      composed: true, 
      detail: {
        id: this.id, 
        title: this.title, 
        isComplete: this.isComplete},
    })
    
    this.dispatchEvent(event);
  }
}

window.customElements.define('todo-item', TodoItem);
