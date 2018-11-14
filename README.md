SVG to Icoinfonts
===

A collection of font icoins of projects.

### Installation
```
npm i git+https://github.com/AoiYamada/svg2iconfont.git
```

### Use In Web
Paths of resouces
css
```
/dest/css/{fontName}.css
```

fonts
```
/dest/fonts/{fontName}.eot
/dest/fonts/{fontName}.ttf
/dest/fonts/{fontName}.woff
```

glyphmaps
```
/dest/glyphmaps/{fontName}.json
```

### Use In React Native
For example:
```jsx
import { Test } from "svg2iconfont/react-native";
...

<Test name="test" size={26} style={{ marginBottom: -3 }} color="blue" />
```

The icon is downloaded from [icons8](https://icons8.com)

### Develop
1.  Clone this repo
2.  ```
    npm i --dev
    ```
2.  Place your svg icons in
    ```
    /svg/{fontName}
    ```
3.  ```sh
    gulp --fontName {fontName} --className {className} --fontPath {fontPath}
    ```
    for example:
    ```
    gulp --fontName test --className ts --fontPath "../fonts/"
    ```
4.  Add the font to */react-native/index.js* if you want

### Preview
```
/dest/index.html
```

### About gyp error
There is a hard time when I install and build the module ttf2woff2, so I zipped this module(OS Win7 64bit) as attachment in */attachment/ttf2woff2.rar*.
