# A prank about wanted criminal which you can print on the letterhead specifying anyone you knows.

This example help you understand or to recall principle of the web-components.
Maybe you can find out some new about web-components or ways to print directly from web browsers.

## How can you run it
The easiest way to run the example is do it in the Stackblitz.
Just pick your stack: 
1. [Run on Stackblitz using Angular](https://stackblitz.com/edit/angular-print-wanted) 
2. [Run on Stackblitz using React](https://stackblitz.com/edit/print-wanted-react)
3. [Run in mobile browsers](https://print-wanted-react.stackblitz.io)

If you want to dive into code use the Webpack Dev Server inside the example via `npm i && npm start`

## What want I point
* You can use instance of web-component to directly work with its properties and methods. It's more convenient than use string attributes and DOM events.
* Use *.d.ts Typescript file to describe interface of your web component in the package.
* Yes, the web component can influence whole DOM of web page after call connectedCallback method. Use it with caution. In this example it have done as an exception to the normal.
* This is a good example a "plug and play" architecture which is the web-component strong suit. The PrintWantedForm does not require further setting for print. You need just call print() method.
* Native JS allowed me made difficult work with async load of Google fonts and fit a whole content into one print page regardless of count of words.
* It is not hard to give up the dependencies and make a little package.
* You may use render() method for the print yourself. For example, you can generate pdf on the server side using [Puppeteer](https://www.npmjs.com/package/puppeteer). Maybe it is difficult way but you will be sure to the expected outcome. 

I hope this example will be useful to you!
