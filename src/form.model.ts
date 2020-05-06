/** Print Wanted Form structure for external manipulate */
export interface PrintWantedForm extends HTMLElement {
  /** Full name of wanted criminal */
  wantedName: string;
  /** Face image of wanted criminal */
  image: File;
  /** List of atrocity */
  atrocityCrimes: string;
  /** Reward for the capture */
  reward: string;
}
