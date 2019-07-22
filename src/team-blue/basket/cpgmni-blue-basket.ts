/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window, CustomEvent */

export class BlueBasket extends HTMLElement {

  static get tag() {
    return "cpgmni-blue-basket";
  }

  public shadowRootBasket: any = this.attachShadow({mode: "open"});
  private prices = {
    t_eicher: "58,00 €",
    t_fendt: "54,00 €",
    t_porsche: "66,00 €",
  };

  private state: {count: number, sku: string} = {
    count: 0,
    sku: "",
  };
  constructor() {
    super(); // always call super() first in the constructor.
  }

  public connectedCallback() {
    this.refresh = this.refresh.bind(this);
    this.log("connected");
    this.render();
    document.addEventListener("blue:basket:changed", this.refresh);
  }

  public refresh(e: CustomEvent) {
    this.log('event recieved "blue:basket:changed"');
    console.log("§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§");
    console.log(e.detail);

    this.state = e.detail;
    this.render();
  }

  public updateState(data: { count: number, sku: string}) {
    console.log("§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§");
    console.log(data);
    this.state = data;
  }

  public render() {
    const classname = this.state.count === 0 ? "empty" : "filled";
    this.shadowRootBasket.innerHTML = `

      <link rel="stylesheet" href="team-blue/basket/basket.css">
      <div class="${classname} title">
          <slot class="title" name="title">Basket: </slot>
          <div class="title" id="items">${this.state.count} item(s) ${this.state.sku ? "of " + this.state.sku : ""}</div>
      </div>
    `;
  }

  public disconnectedCallback() {
    document.removeEventListener("blue:basket:changed", this.refresh);
    this.log("disconnected");
  }

  private log(...args: any) {
    // tslint:disable-next-line:no-console
    console.log("🛒 blue-basket", ...args);
  }
}
window.customElements.define("cpgmni-blue-basket", BlueBasket);
