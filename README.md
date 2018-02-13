# jason-form

[![npm](https://img.shields.io/npm/dm/jason-form.svg)]()
[![Build Status](https://travis-ci.org/greena13/jason-form.svg)](https://travis-ci.org/greena13/jason-form)
[![GitHub license](https://img.shields.io/github/license/greena13/jason-form.svg)](https://github.com/greena13/jason-form/blob/master/LICENSE)


Utility for converting JavaScript objects to an array of key-value tuples that is compatible with Rails' parameter naming conventions and can easily be used to populate the contents of a FormData instance.

## Usage

```javascript
var RailsFriendly = require('jason-form').FormData;

var json = {
 string: 'string',
 array: [1,2],
 object: {
  foo: 'foo',
  bar: 'bar'
  }
};

var railsFriendlyValues = RailsFriendly.from(json) // [['string', 'string'], ['array[]', 1], ['array[]', 2], ['object[foo]', 'foo'] ['object[bar]', 'bar']]

var formData = new FormData();

railsFriendlyValues.forEach(function(keyAndValue) {
  formData.append(keyAndValue[0], keyAndValue[1]);
})
```
