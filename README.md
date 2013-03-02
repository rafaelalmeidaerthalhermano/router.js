Router.js
===============================

This project uses the [Class.js](http://github.com/rafaelalmeidaerthalhermano/class.js) project

## Router Object

The router controls all system routes to structure the program execution

### Track

The method associates a route to a callback when the url is compatible with the rule of the route, the callback is executed. Remember that if an anchor call one of the routes of the router, the page is not reloaded, just executed the callback

Usage example:

```js
var router = new Router(function () {
    this.track('/animals', function () {
        console.log('animals route');
    });
});
```

## Context Object

The context object is where the callbacks are executed.

### Mask

Usage example:

```js
var router = new Router(function () {
    this.track('/animal/:id', function () {
        console.log(this.mask()); // => /animal/:id
    });
});
```

### Url

Usage example:

```js
var router = new Router(function () {
    this.track('/animal/:id', function () {
        console.log(this.url()); // => /animal/dog
    });
});
```

### Extend

Serves to generate plugins for the router, it extends new functionalities for context

Usage example:

```js
Router.Context.extend({
   alert : function (message) {
       alert(message);
   }
});

var router = new Router(function () {
    this.track('/animal/:id', function () {
        this.alert('Hi') // => Hi
    });
});
```
