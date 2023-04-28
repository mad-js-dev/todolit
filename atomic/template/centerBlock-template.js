import {LitElement, html, css} from 'lit';

export class CenterBlock extends LitElement {
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
        width: 300px;
        height: 80vh;
        margin: 10vh auto;
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
          <slot id="content" name="content"></slot>
        </div>
      </div>
      
    `;
  }
}

window.customElements.define('centerblock-template', CenterBlock);
