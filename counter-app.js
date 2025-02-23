/**
 * Copyright 2025 nickcos912
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.counter = 0;
    this.min = 0;
    this.max = 100;
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      count: {type: Number, reflect: true },
      min: {type: Number},
      max: {type: Number},
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      :host([count = "10"]) {
        color: var(--ddd-them-default-athertonViolet);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        border: var(--ddd-border-md);
        border-radius: var(--ddd-radius-lg);
        background-color: var(--ddd-theme-accent, #f0f0f0);
        color: var(--ddd-theme-primary, #333);
        text-align: center;
      }
      .counter {
        font-size: var(--counter-app-label-font-size, var(--ddd-font-size-xxl));
        margin-bottom: var(--dd-spacing-2);
      }
      .counter.at-18 {
        color: var(--ddd-color-at-18, orange);
      }
      .counter.at-21 {
        color: var(--ddd-color-at-21, green);
      }
      .counter.at-boundary {
        color: var(--ddd-color-at-boundary, red);
      }
      .buttons{
        display: flex;
        justify-content: center;
        gap: var(--ddd-spacing-2);
      }
      button {
          padding: var(--ddd-spacing-1) var(--ddd-spacing-2);
          border: var(--ddd-border-sm);
          border-radius: var(--ddd-radius-sm);
          background-color: var(--ddd-button-bg, #fff);
          cursor: pointer;
          transition: background-color 0.3s, box-shadow 0.3s;
        }
        button:hover,
        button:focus {
          background-color: var(--ddd-button-hover-bg, #e0e0e0);
          box-shadow: var(--ddd-boxShadow-sm);
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        confetti-container {
          display: block;
        }
    `];
  }

  // Lit render the HTML
  render() {
    const counterClass = this.getCounterClass();
    return html`
    <confetti-container id="confetti">
        <div class="wrapper">
          <div class="counter ${counterClass}">${this.counter}</div>
          <div class="buttons">
            <button @click="${this.decrease}" ?disabled="${this.counter <= this.min}">-</button>
            <button @click="${this.increase}" ?disabled="${this.counter >= this.max}">+</button>
          </div>
        </div>
      </confetti-container>
    `;
  }
  getCounterClass() {
    if (this.counter === this.min || this.counter === this.max) {
      return "at-boundary";
    }
    if (this.counter === 18) {
      return "at-18";
    }
    if (this.counter === 21) {
      return "at-21";
    }
    return "";
  }

  increase() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }

  decrease() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }

  reset() {
    this.counter = 0;
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has("counter")) {
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
      setTimeout(() => {
        const confetti = this.shadowRoot.querySelector("#confetti");
        if (confetti) {
          confetti.setAttribute("popped", "");
        }
      }, 0);
    });
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);
  /*increase() {
    this.count++;
  }
  decrease() {
    this.count--;
  }
  reset() {
    this.count = 0;
  }

  /**
   * haxProperties integration via file reference
   * 
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);*/