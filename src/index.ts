export class WantedPrintForm extends HTMLElement {
  constructor() {
    super();

    const componentShadowRoot = this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = 'Wanted serious offender!';
    componentShadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('wanted-print-form', WantedPrintForm);
