/** Print Wanted Form structure for external manipulate */
export interface PrintWantedForm extends HTMLElement {
  /** Only render Form after which parent have to start procedure of print itself */
  render(wantedData: WantedData): Promise<void>;
  /** Render and print by using inside logic of Form */
  print(wantedData: WantedData): Promise<void>;
}

/** Data about a wanted criminal */
export interface WantedData {
  /** Full name of wanted criminal */
  wantedName: string;
  /** Face image of wanted criminal */
  image: File;
  /** List of atrocity */
  atrocityCrimes: string;
  /** Reward for the capture */
  reward: string;
}
