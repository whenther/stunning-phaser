stunning-phaser
===============

A repo for playing around with [[Phaser](http://phaser.io/) games, plus
ES6 with [jspm](http://jspm.io/).

setup
-----
```
npm install jspm -g
npm install gulp-cli -g
npm install
jspm install
```

development
-----------
To run the development server with livereload, run
```
gulp serve
```

To add client libraries, run
```
jspm install <lib name>
```
then use an
[ES6 `import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
to use it.
