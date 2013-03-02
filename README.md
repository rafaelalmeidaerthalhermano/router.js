Router.js
===============================

Usage examples:

```js
var router = new Router(function () {
    this.track('...', function () {/*...*/});
    this.track('...',  function () {/*...*/});
    this.track('...', function () {/*...*/});
    /*...*/
    
    this.dispatch('...');
});

router.track('...', function () {/*...*/});
router.track('...', function () {/*...*/});
router.track('...', function () {/*...*/});
/*...*/

router.dispatch('...');
```
* * *
###References:

#####Router Object

```js
Router.track(url, callback);
```

```js
Router.dispatch(url);
```

```js
Router.extend(attributes)
```

```js
Router.instaceOf(Class)
```

```js
Router.context.extend(attributes)
```
