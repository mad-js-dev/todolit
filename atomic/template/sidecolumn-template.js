import {LitElement, html, css} from 'lit';

export class SidecolumnTemplate extends LitElement {
  static get styles() {
    return css`
      :host {
      }
      :host > div {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
      }
      #t1 {
        width: 25%;
      }
      #t2 {
        width: 75%;
      }
    `;
  }

  static get properties() {
    return {
      
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div>
        <div id="t1">
          <slot id="leftColumn" name="leftColumn"></slot>
        </div>
        <div id="t2">
          <slot id="rightColumn" name="rightColumn"></slot>
        </div>
      </div>
      
    `;
  }
}

window.customElements.define('sidecolumn-template', SidecolumnTemplate);
