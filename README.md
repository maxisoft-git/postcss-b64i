
Inline base64 image

```css
body {
  background: inline-image-files('../assets/img/logo.png') no-repeat top left transparent;
}
```

```css
body {
  background: url(data:imageimage/png;base64,...) no-repeat top left transparent;
}
```

Font-face base64 inline font

```css
@font-face{
	font-family:"Roboto";
	font-style:normal;
	font-weight:100;
	src:inline-font-files('../fonts/roboto/roboto-thin.woff2') format("woff2");
}	
```

```css
@font-face{
	font-family:"Roboto";
	font-style:normal;
	font-weight:100;
	src:url(data:application/font-woff2;base64,....) format("woff2");
}	
```

## Usage

```js
postcss([ require('postcss-b64i') ])
```

See [PostCSS] docs for examples for your environment.
