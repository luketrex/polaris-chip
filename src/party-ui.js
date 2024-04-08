import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class partyUI extends DDD {

  static get tag() {
    return 'party-ui';
  }
  constructor() {
    super();
    this.partyMembers = [];
  }


  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }
      .overallcontainer {
        background-color: #1a1a1a;
      }
      .party-ui-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 180px;
        height: 120px;
        width: 120px;
        background-color: navy;
        padding: 10px;
        margin: 8px;
        text-align: center;
        border: 2px solid #2a2a2a;
        border-radius: 8px;
      }
      .party-members-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      .party-member {
        display: flex;
        margin: 0 8px;
      }
      .party-member rpg-character {
        margin-bottom: .25rem;
      }
      button {
        font-family: "Press Start 2P", system-ui;
        font-size: 12px;
        color: #ffffff;
        margin: 6px;
        padding: 8px;
        border: 1px solid #2a2a2a;
        background-color: #424242;
      }
      button:hover {
        background-color: #5c5c5c;
        color: #7e57c2;
        transition: 0.3s ease-in-out;
      }
      button:focus {
        background-color: #6d6d6d;
        color: #7e57c2;
        transition: 0.3s ease-in-out;
      }
      .rpg-characters {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    `;
  }

  render() {
    return html`
    <div class="overallcontainer">
    <confetti-container id="confetti">
    
    <div class="party-ui-container">
      <input type="text" placeholder="Enter username">
      <button class="addbut" @click="${this.addUser}">Add User</button>
      
      <!-- <button class="rembut" @click="${this.removeUser}">Remove User</button> -->
      <div class="rpg-characters">
        <!-- RPG characters will be dynamically added here -->
      </div>
      
      <button class="savebut" @click="${() => {this.saveParty(); this.makeItRain();}}">Save Members to Party</button>
      <div class="party-members-container">
        ${this.partyMembers.map(member => html`
          <div class="party-member">
            
            <rpg-character seed="${member.username}"></rpg-character>
            <p>${member.username}</p>
          </div>
        `)}
      </div>
    </div>
 
  </confetti-container>
  </div>
  `;
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

addUser() {
  const user = this.shadowRoot.querySelector('.party-ui-container input').value.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (user) {
    const newMember = {
      username: user
    };
    this.partyMembers = [...this.partyMembers, newMember];

    const rpgCharactersContainer = this.shadowRoot.querySelector('.party-ui-container .rpg-characters');
    const characterContainer = document.createElement('div');
    characterContainer.classList.add('rpg-character');
    characterContainer.innerHTML = `
      <rpg-character seed="${userInput}"></rpg-character>
      <p>${userInput}</p>
      <button class="removebut">Remove User</button>
    `;
    characterContainer.querySelector('.removebut').addEventListener('click', () => this.removeUser(userInput));
    
    rpgCharactersContainer.appendChild(characterContainer);
    this.shadowRoot.querySelector('.party-ui-container input').value = '';
  }
}

removeUser(username) {
  this.partyMembers = this.partyMembers.filter(member => member.username !== username);

  // Update the visual representation 
  const rpgCharactersContainer = this.shadowRoot.querySelector('.party-ui-container .rpg-characters');
  const characterToRemove = [...rpgCharactersContainer.querySelectorAll('.rpg-character')].find(character => character.querySelector('p').innerText.trim() === username);
  if (characterToRemove) {
    rpgCharactersContainer.removeChild(characterToRemove);
  }
}


saveParty() {
  const rpgCharactersContainer = this.shadowRoot.querySelector('.party-ui-container .rpg-characters');
  const partyMembers = [...rpgCharactersContainer.querySelectorAll('rpg-character')].map(character => {
    return { 
      username: character.getAttribute('seed')
    };
  });
  this.partyMembers = partyMembers;
  this.requestUpdate(); 
}

}
customElements.define(partyUI.tag, partyUI);




