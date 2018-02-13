# jason-form

[![npm](https://img.shields.io/npm/dm/jason-form.svg)]()
[![Build Status](https://travis-ci.org/greena13/jason-form.svg)](https://travis-ci.org/greena13/jason-form)
[![GitHub license](https://img.shields.io/github/license/greena13/jason-form.svg)](https://github.com/greena13/jason-form/blob/master/LICENSE)


Simple node module for converting JSON objects to form data that is compatible with Rails' parameter naming conventions.

It accepts a JSON object and returns an array of key-value pairs.

## Examples

```javascript
var FormData = require('jason-form').FormData;

var json = {
 string: 'string',
 array: [1,2],
 object: {
  foo: 'foo',
  bar: 'bar'
  }
};

FormData.from(json) // [['string', 'string'], ['array[]', 1], ['array[]', 2], ['object[foo]', 'foo'] ['object[bar]', 'bar']]
```
