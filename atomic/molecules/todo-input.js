import {LitElement, html, css} from 'lit';

export class TodoInput extends LitElement {

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      value: {type: String},
    };
  }

  constructor() {
    super();
    this.value = '';
  }

  render() {
    return html`
      <input type="text" value="${this.value}" @change=${this._onChange}/>
      <button @click=${this._onClick} part="button">
        <todo-icon icon="add"></todo-icon>
      </button>
    `;
  }

  _onChange(e) {
    this.value = e.target.value
  }

  _onClick() {
    let event = new CustomEvent('onCreate',{ 
      bubbles: true, 
      composed: true, 
      detail: this.value,
    })
    this.value = ""
    this.renderRoot.querySelector('input').value="";
    this.dispatchEvent(event);
  }
}

window.customElements.define('todo-input', TodoInput);
