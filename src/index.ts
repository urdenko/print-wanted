import html from './index.html';
import { FontLoader } from './font-loader';

export class WantedPrintForm extends HTMLElement {
  public readyEventName = 'form-ready';
  public errorEventName = 'form-error';

  public wantedName!: string;
  public image!: File;
  public atrocityCrimes!: string;
  public reward!: string;

  private componentShadowRoot!: ShadowRoot;

  constructor() {
    super();

    this.componentShadowRoot = this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = html;
    this.componentShadowRoot.appendChild(template.content.cloneNode(true));
  }

  public async connectedCallback(): Promise<void> {
    try {
      if (!this.isValidInputs()) {
        throw new Error('Invalid input values!');
      }

      const atrocityCrimes = this.componentShadowRoot.getElementById('atrocity-crimes');
      atrocityCrimes && (atrocityCrimes.innerText = this.atrocityCrimes);

      const imageSrc = URL.createObjectURL(this.image);
      const face = this.componentShadowRoot.getElementById('face') as HTMLImageElement | null;

      face && (await this.loadImage(imageSrc, face));

      const wantedName = this.componentShadowRoot.getElementById('wanted-name');
      wantedName && (wantedName.innerText = this.wantedName);

      const reward = this.componentShadowRoot.getElementById('reward');
      reward && (reward.innerText = this.reward);

      const allText: string[] = this.getAllText();
      await FontLoader.loadAllFonts(['Patua One', 'Kalam'], allText);

      this.makeImageFit();
    } catch (error) {
      const errorEvent = new CustomEvent(this.errorEventName, { detail: error });
      this.dispatchEvent(errorEvent);
      return;
    }

    const readyEvent = new CustomEvent(this.readyEventName);
    this.dispatchEvent(readyEvent);
  }

  private loadImage(src: string, img: HTMLImageElement): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', (err) => reject(err));
      img.src = src;
    });
  }

  private isValidInputs(): boolean {
    return Boolean(this.atrocityCrimes && this.wantedName && this.image && this.reward);
  }

  private getAllText(): string[] {
    return [
      'WANTED!',
      'For the following atrocity crimes:',
      'Reward from friends:',
      this.wantedName,
      this.atrocityCrimes,
      this.reward,
      '😈',
      '⍟',
      'PREFERABLE ALIVE WITH ALL OF LIMBS',
    ];
  }

  private makeImageFit(): void {
    const page = this.componentShadowRoot.getElementById('page');
    const image = this.componentShadowRoot.getElementById('face') as HTMLImageElement | null;
    if (!page || !image) {
      throw new Error('Unknown paper size, process aborted');
    }

    const overSize = page.scrollHeight - page.offsetHeight;
    if (overSize + 200 > image.height) {
      throw new Error('Too much paper size!');
    }

    image.style.height = `${image.height - overSize}px`;
  }
}

customElements.define('wanted-print-form', WantedPrintForm);
