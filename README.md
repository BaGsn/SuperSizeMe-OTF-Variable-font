# SuperSizeMe

Super Size Me is a free library under SIL Licence built on the top of [Plumin.js](https://github.com/byte-foundry/plumin.js) and [FontFaceObserver](https://github.com/bramstein/fontfaceobserver) that allow to easily stretch font to the size of its container.

#How to use
To use it, you only need to apply a class [.rt] to the blocks of texts you want to fit.

##Example
``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Example</title>
    <script src="js/fontfaceobserver.js"></script>
    <script src="js/plumin.js"></script>
    <script src="js/supersizeme.js"></script>
    <script type="text/javascript">
        ssm.fontBook = {  wdth :
                        ['font/0.otf',
                        'font/1.otf',
                        'font/2.otf']
                      };
    </script>
  </head>
  <body>
 
       <div class="rt" style="width:50%">Here a fitted text</div>
        
  </body>
</html>
```

##Installation
Just import the 3 libraries in your HTML page.
```html
<script src="js/fontfaceobserver.js"></script>
<script src="js/plumin.js"></script>
<script src="js/supersizeme.js"></script>
```

##Configuration

Run a fonction before SuperSizeMe has loaded.
```javascript
ssm.beforeLoad={
myFunction();
};
```

--

Run a fonction when all the fonts are ready be displayed:
```javascript
ssm.afterFontReady={
myFunction();
};
```

--

To get the loading informations
```javascript
ssm.loading = [Array];
```

--

To define a pre-rendered specific subset:
```javascript
ssm.subset = [String];
```
**Default: _Null_**

--

To change the opacity of the fitting preview:
```javascript
ssm.opacityPreview = [Number];
```
**Default: _0.5_**

--

Enable or disable the fitting preview:
```javascript
ssm.preview = [Boolean];
```
**Default: _true_**

--

Enable or disable the text to fit to its container:
```javascript
ssm.fit = [Boolean];
```
**Default: _true_**

--

Change the number of insterpolated fonts:
```javascript
ssm.generatedFontNbr = [Number];
```
**Default: _100_**

--

Add fitting elements without a 'rt' class:
```javascript
ssm.elementsToFit = "#myId .myClass";
```
**Default: _Null_**
