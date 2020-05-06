/* eslint-disable no-unused-vars */

/** Events that can emerge from Wanted Form DOM element */
export enum FormEvents {
  /** Wanted Form indicate that it is ready to print */
  ready = 'form-ready',
  /** Wanted Form indicate that it wasn't assemble due to errors */
  error = 'form-error',
}
