import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "My card";
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .card {
        max-width: 400px;
        background-color: yellow;
        border: 2px solid black;
        padding: 10px;
        margin: 20px auto;
        text-align: center;
      }
      .card-image {
        width: 200px;
        height: 75%;
      }
      .card-text {
        border: 3px solid black;
        background-color: white;
        padding: 5px;
        color: red;
      }
      .btn {
        background-color: blue;
        color: white;
        font-size: 20px;
        border-radius: 10%;
        padding: 10px 20px;
        margin: 70%;
      }
    `;
  }


  render() {
    return html`
      <div class="card">
        <img class="card-image" alt="balloons" src="https://th.bing.com/th/id/OIP.Tc1XQe5_lbOnOjmV2FHaegHaLi?rs=1&pid=ImgDetMain" />
        <div class="card-text">
          <h3 class="card-title">${this.title}</h3>
          <div class="card-details">
            <p>Wishing you a day filled with joy and celebration.</p>
          </div>
          <div class="btn-wrapper">
            <a href="https://hax.psu.edu" class="btn">Details</a>
          </div>
        </div>
      </div>
    `;
  }


  static get properties() {
    return {
      title: { type: String },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
