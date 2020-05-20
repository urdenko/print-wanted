import html from './index.html';
import style from './index.css';
import printRestrictionStyle from './print-restriction.css';
import { FontLoader } from './font-loader';
// eslint-disable-next-line no-unused-vars
import { PrintWantedForm, WantedData } from './form.model';

export class WantedPrintForm extends HTMLElement implements PrintWantedForm {
  private componentShadowRoot = this.attachShadow({ mode: 'open' });
  private DOMConnected = false;

  constructor() {
    super();

    const template = document.createElement('template');
    template.innerHTML = `${html}\n<style>${style}</style>`;
    this.componentShadowRoot.appendChild(template.content.cloneNode(true));
  }

  public async render(wantedData: WantedData): Promise<void> {
    if (!this.DOMConnected) {
      throw new Error('You need to insert <wanted-print-form></wanted-print-form> into DOM in first');
    }

    if (!this.isValidInputs(wantedData)) {
      throw new Error('Invalid input values!');
    }

    const atrocityCrimes = this.componentShadowRoot.getElementById('atrocity-crimes');
    atrocityCrimes && (atrocityCrimes.innerText = wantedData.atrocityCrimes);

    const imageSrc = URL.createObjectURL(wantedData.image);
    const face = this.componentShadowRoot.getElementById('face') as HTMLImageElement | null;

    face && (await this.loadImage(imageSrc, face));

    const wantedName = this.componentShadowRoot.getElementById('wanted-name');
    wantedName && (wantedName.innerText = wantedData.wantedName);

    const reward = this.componentShadowRoot.getElementById('reward');
    reward && (reward.innerText = wantedData.reward);

    const allText: string[] = this.getAllText(wantedData);
    await FontLoader.loadAllFonts(['Patua One', 'Kalam'], allText);

    this.makeImageFit();
  }

  public async print(wantedData: WantedData): Promise<void> {
    await this.render(wantedData);

    const printStyleElement = document.createElement('style');
    printStyleElement.innerHTML = printRestrictionStyle;
    document.body.appendChild(printStyleElement);
    this.style.visibility = 'visible';

    window.print();

    this.onUserActivity(() => {
      printStyleElement.remove();
      this.removeAttribute('style');
    });
  }

  protected connectedCallback(): void {
    this.DOMConnected = true;
  }

  protected disconnectedCallback(): void {
    this.DOMConnected = false;
  }

  private loadImage(src: string, img: HTMLImageElement): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      img.addEventListener('load', () => {
        img.removeEventListener('load', () => {});
        img.removeEventListener('error', () => {});
        resolve(img);
      });

      img.addEventListener('error', (err) => {
        img.removeEventListener('load', () => {});
        img.removeEventListener('error', () => {});
        reject(err);
      });

      img.src = src;
    });
  }

  private isValidInputs(wantedData: WantedData): boolean {
    return Boolean(wantedData.atrocityCrimes && wantedData.wantedName && wantedData.image && wantedData.reward);
  }

  private getAllText(wantedData: WantedData): string[] {
    return [
      'WANTED!',
      'For the following atrocity crimes:',
      'Reward from friends:',
      wantedData.wantedName,
      wantedData.atrocityCrimes,
      wantedData.reward,
      '😈',
      '⍟',
      'PREFERABLE ALIVE WITH ALL OF LIMBS',
    ];
  }

  private makeImageFit(): void {
    const page = this.componentShadowRoot.getElementById('page');

    if (!page?.offsetHeight) {
      throw new Error(
        'It looks like the <wanted-print-form> element is within hidden container. Check if container has not a rule of style `display: none;`'
      );
    }

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

  /** Method calls first argument when a user will become active */
  private onUserActivity(doCallback: () => void): void {
    const eventAction = () => {
      doCallback();
      window.removeEventListener('mousemove', eventAction);
      window.removeEventListener('touchstart', eventAction);
    };

    window.addEventListener('mousemove', eventAction);
    window.addEventListener('touchstart', eventAction);
  }
}

customElements.define('wanted-print-form', WantedPrintForm);
