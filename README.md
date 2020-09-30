# MarketplaceBooking

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.

## ADD NG-ZORRO

In an existing angular project, install the zorro components

`ng add ng-zorro-antd`

During installation, there are a number of config questions that aid setup, these are the answers that have been selected for this setup;

	1. Enable icon dynamic loading [ Detail: https://ng.ant.design/components/icon/en ] `Yes`

	2. Set up custom theme file [ Detail: https://ng.ant.design/docs/customize-theme/en ] `Yes`

	3. Choose your locale code: `en_GB`

	4. Choose template to create project: `blank`



Once the zorro coponents are installed, you can then start the server

`ng serve --port 0 --open`

## ADD NG-ZORRO / Transform theme


...todo - instructions

Add the Roboto condensed font to index.html

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&family=Roboto:wght@100;300;400;700;900&display=swap" rel="stylesheet">
```

Add the global styles to the styles.css

```css
html {
	box-sizing: border-box;
}
*, *:before, *:after {
	box-sizing: inherit;
}
body {
	padding: 0;
	margin: 0;
	font-family: 'Roboto Condensed', sans-serif;
	background-color: #224595;
	width: 100%;
	height: 100vh;
}
```



## ADD TF-NG-CORE

Install the Transform Angular Components [tf-ng-core](https://www.npmjs.com/package/tf-ng-core)  from npm

`npm i tf-ng-core`


## POLYFILLS 

in polyfill.ts

Uncommented...
import 'classlist.js'; 
import 'web-animations-js';
import 'zone.js/dist/zone';

... save

Install below npm

npm install --save classlist.js
npm install --save web-animations-js






ng serve --port 0 --open



ng build --prod
npm run scully