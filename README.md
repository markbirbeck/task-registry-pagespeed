# task-registry-pagespeed

A task registry provides one or more tasks to a Gulpfile by way of a self-registering registry. This particular task registry provides support for the PageSpeed collection of tasks.

To use the task in your project simply do the following:

```javascript
'use strict';
const gulp = require('gulp');

const PageSpeedTaskRegistry = require('task-registry-pagespeed');

gulp.registry(new PageSpeedTaskRegistry({
  url: 'github.com',
  strategy: 'desktop'
}));
```

The task name defaults to 'pagespeed' so this is all that is necessary to add the following command to your Gulpfile:

```shell
gulp pagespeed
```

The task can also be namespaced by adding a namespace option:

```javascript
gulp.registry(new PageSpeedTaskRegistry({
  namespace: 'psi',
  url: 'github.com',
  strategy: 'desktop'
}));
```

or an inital parameter in the call to the constructor:

```javascript
gulp.registry(new PageSpeedTaskRegistry(
  'psi',
  {
    url: 'github.com',
    strategy: 'desktop'
  }
));
```

The result is that the task is now available via the following command:

```shell
gulp psi:pagespeed
```
