##JS Blade [![Build Status](https://travis-ci.org/shakyShane/js-blade.svg?branch=master)](https://travis-ci.org/shakyShane/js-blade)

> Javascript port of Laravel's Blade Templating language for NodeJS

###TODO - tags

- [x] `@section`
- [x] `@yield`
- [ ] `@extends`
- [ ] `@include`

##`@section` & `@yield`
One thing that has always driven me CRAZY about all templating
languages is that they always assume that the formatting of output
is irrelevant - and it mostly is.

But sometimes it's incredibly important (source code snippet, for example) - so I've decided that right from the word go, I'd fix this in js-blade.

Given this input

```html
@section("shane")
<p>Saving sections is a cool feature
    <span>Especially if indentation is respected</span>
</p>
@stop

<header>
    <h1>Yields are cool!</h1>
    @yield("shane")
</header>
```

In Laravel's Blade, you'd get this:

```html
<header>
    <h1>Yields are cool!</h1>
    <p>Saving sections is a cool feature
    <span>Especially if indentation is respected</span>
</p>
</header>
```

But in Blade JS, you'll get exactly what you wanted

```html
<header>
    <h1>Yields are cool!</h1>
    <p>Saving sections is a cool feature
        <span>Especially if indentation is respected</span>
    </p>
</header>
```


