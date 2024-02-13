import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";

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
    this.description = "Details go here";
    this.img = "imglink";
    this.link = "#"
    this.bgColor = "color";
    this.fancy = false;
  }

  static get styles() {
    return css`
      :host([fancy]) {
        display: block;
      }
      .card {
        max-width: 400px;
        background-color: yellow;
        border: 2px solid black;
        padding: 10px;
        margin: 20px auto;
        text-align: center;
        background-color: var(--background-color);
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
      details summary {
        text-align: left;
        font-size: 20px;
        padding: 8px 0;
      }

      details[open] summary {
        font-weight: bold;
      }
  
      details div {
        border: 2px solid black;
        text-align: left;
        padding: 8px;
        height: 70px;
        overflow: auto;
      }
    `;
  }

  openChanged(e) {
    console.log(e.newState);
    if (e.newState === "open") {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }




  render() {
    return html`
      <div class="card" style="--background-color: ${this.bgColor}">
        <!-- <img class="card-image" src= "${this.img}" alt="${this.title}"  /> -->
        <meme-maker alt="dog mkaing money" image-url="https://th.bing.com/th/id/OIP.upaiXcbBHXuuGUw6QpqmIwHaE8?rs=1&amp;pid=ImgDetMain" top-text="hello i am a dog" bottom-text="and i make money">
</meme-maker>
        <div class="card-text">
          <h3 class="card-title">${this.title}</h3>
          <div class="card-details">
          <details ?open="${this.fancy}" @toggle="${this.openChanged}">
          <summary>Description</summary>
          <div>
            <slot>${this.description}</slot>
          </div>
</details>
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
      description: { type: String },
      img: { type: String },
      bgColor: { type: String },
      fancy: { type: Boolean, reflect: true }
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);


document.querySelector('#duplicate').addEventListener('click', function(event){
  const cardList = document.querySelector('.cardlist');
  const myCardElements = document.querySelectorAll('my-card');

  if (myCardElements.length < 10){
    const lastCard = myCardElements[myCardElements.length -1];
    const newCard = document.createElement('my-card');

    newCard.title = lastCard.title;
    newCard.img = lastCard.img;
    newCard.description = lastCard.description;
    newCard.link = lastCard.description;

    cardList.appendChild(newCard);
  }
});

document.querySelector('#changetitle').addEventListener('click', function(e) {
  const firstCard = document.querySelector('.cardlst my-card');
  if (firstCard) {
    firstCard.title = "anything";
  }
});

document.querySelector('#changeimage').addEventListener('click', function(e) {
  const firstCard = document.querySelector('.cardlst my-card');
  if (firstCard) {
    firstCard.imageUrl = "https://i.ytimg.com/vi/HLairL5Q86Y/maxresdefault.jpg";
  }
});

document.querySelector('#changebg').addEventListener('click', function(e) {
  var cards = document.querySelectorAll('.cardlst my-card');
  cards.forEach(function(card) {
    card.shadowRoot.querySelector('div').classList.toggle('change-color');
  });
  
});


document.querySelector('#delete').addEventListener('click', function(e) {
  const cardList = document.querySelector('.cardlst');
  const myCardElements = cardList.querySelectorAll('my-card');
  if (myCardElements.length > 1) {
    const lastCard = myCardElements[myCardElements.length - 1];
    lastCard.remove();
  }
});
