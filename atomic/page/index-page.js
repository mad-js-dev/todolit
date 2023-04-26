import {LitElement, html} from 'lit';

export class indexPage extends LitElement {

  static get properties() {
    return {
      listItems: {type: Array},
    };
  }

  constructor() {
    super();
    this.todoItems = [
      {id: 0, title: "meh", isComplete: true}
    ]
  }

  render() {
    return html`
      <div>
        <sidecolumn-template>
          <todo-component slot="leftColumn" listItems="${this.todoItems}" @onTodoChange=${this._updateData}></todo-component>
          <p slot="rightColumn">Right col</p>
        </sidecolumn-template>
      </div>
      
    `;
  }

  _updateData(e) {
    this.todoItems = e.detail
  }
}

window.customElements.define('index-page', indexPage);
