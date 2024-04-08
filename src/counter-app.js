
import { LitElement, html, css } from 'lit';
export class CounterApp extends LitElement {

    static get tag() {
      return 'counter-app';
    }
  
    constructor() {
      super();
      this.value = 0;
      this.min = 0;
      this.max = 100;
    }
  
    static get styles() {
      return css`
        :host([fancy]) {
          display: block;
        }
        .box {
          max-width: 100px;
          max-height: 164px;
          background-color: white;
          border: 2px solid black;
          padding: 10px;
          margin: 20px auto;
          text-align: center;
        }
    
        .counter-number {
          border: 3px solid black;
          background-color: white;
          padding: 5px;
          color: black;
          font-size: 24px;
        }
        :host([value="16"]).counter-number{
            color: orange;
        }

        .btnup{
          background-color: black;
          color: white;
          font-size: 20px;
          border-radius: 10px;
          padding: 10px 20px;
          margin: 10px;
        }
        .btnup:hover{
            background-color: grey;
        }

        .btndown{
          background-color: black;
          color: white;
          font-size: 20px;
          border-radius: 10px;
          padding: 10px 20px;
          margin: 10px;
        }
        .btndown:hover{
            background-color: grey;
        }
      `;
    }

  
    increase() {
        if (this.value < this.max) {
          this.value += 1;
          this.updateNumColor();
        } 
      }
      
    decrease() {
        if (this.value > this.min) {
          this.value -= 1;
          this.updateNumColor();
        }
      }

    updateNumColor(){
        const counterNumber = this.shadowRoot.querySelector('.counter-number');
        if(counterNumber){
            if (this.value === 18 || this.value === 21 || this.value === this.max || this.value === this.min){
                counterNumber.style.color ='red';
            } else{
                counterNumber.style.color = 'black';
            }
        }
    }

    updated(changedProperties) {
        if (changedProperties.has('value') && this.value === 21) {
          this.makeItRain();
        }
      }

    makeItRain() {
        import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
          (module) => {
            setTimeout(() => {
              this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
            }, 0);
          }
        );
      }  
  
  
    render() {
      return html`
        <confetti-container id="confetti">
        <div class="box" style="--background-color: white">
        <div class= "counter-number">${this.value}</div>
     
        <div class="btn-wrapper">
            <button class="btnup" @click="${this.increase}" ?disabled="${this.value === this.max}">+</button>
            <button class="btndown" @click="${this.decrease}" ?disabled="${this.value === this.max}">-</button>
          </div>
    </div>
    </confetti-container>
      `;
    }
  
  
    static get properties() {
      return {
        value: {type: Number, reflect:true},
        min: {type: Number, reflect:true},
        max: {type:Number, reflect:true},
      };
    }
  }

  globalThis.customElements.define(CounterApp.tag, CounterApp);


  
