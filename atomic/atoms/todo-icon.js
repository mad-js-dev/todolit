import {LitElement, html, css} from 'lit';

/**
 * An icon component using google icons
 *
 */

export class TodoIcon extends LitElement {
  static get styles() {
    return css`
      :host {
        font-family: 'Material Symbols Outlined';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
      }
      }
    `;
  }

  static get properties() {
    return {
      /**
       * The name to say "Hello" to.
       * @type {string}
       */
      icon: {type: String},
    };
  }

  constructor() {
    super();
    this.icon = 'check_circle';
  }

  render() {
    return html`
      <span>
        ${this.icon}
      </span>
    `;
  }
}

window.customElements.define('todo-icon', TodoIcon);
