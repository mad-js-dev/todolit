import {LitElement, html, css} from 'lit';

export class TodoInput extends LitElement {

  static get styles() {
    return css`
      :host {
        display: block;
        overflow: hidden;
        border-radius: 24px;
      }
      :host > div {
        background-color: #25273C;
        display: flex;
      }
      input {
        border: none;
        background-color: #25273C;
        flex-grow: 1;
        width: 100%;
        color: rgba(255, 255, 255, .7);
        padding-left: 12px;
      }
      .buttonWrapper {
        flex-grow: 1;
      }
      button {
        border: none;
        background-color: rgba(90, 255, 49, .6);
        color: rgba(255, 255, 255, .7);
      }
      button:hover {
        cursor: pointer;
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
    <div>
      <input type="text" placeholder="Create a new todo..." value="${this.value}" @change=${this._onChange}/>
      <div class="buttonWrapper">
        <button @click=${this._onClick} part="button">
          <todo-icon icon="add"></todo-icon>
        </button>
      </div>
    </div>
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
