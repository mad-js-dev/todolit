import {LitElement, html, css} from 'lit';

export class TodoItem extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
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
    let icon = html`<todo-icon icon="radio_button_unchecked" @click=${this._toogleCompletion}></todo-icon>`;
    console.log(this.isComplete)
    if(this.isComplete) {
      icon = html`<todo-icon icon="check_circle" @click=${this._toogleCompletion}></todo-icon>`;
    }

    return html`
      ${icon}
      ${this.title}
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
