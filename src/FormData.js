'use strict';

function isArray(object){
  return object !== null && object !== undefined && object.constructor === Array;
}

function isBasicObject(object){
  return object === Object(object);
}

var fileConstantIsDefined = typeof File === 'function';

function isFile(object){
  return fileConstantIsDefined && object.constructor === File
}

function buildFormDataAttributes(key, value){
  var formData = [];

  if(isArray(value)){
    var prefix = key + '[]';

    if(value.length === 0){
      formData.push([prefix, null]);
    } else {
      for(var arrayIndex in value){
        formData = formData.concat(buildFormDataAttributes(prefix, value[arrayIndex]));
      }
    }

  } else if(value && !isFile(value) && isBasicObject(value)){
    for(var objectKey in value){
      if(!value.hasOwnProperty(objectKey)){ continue; }

      formData = formData.concat(buildFormDataAttributes(key + '[' + objectKey +']', value[objectKey]));
    }

  } else {
    formData.push([key, value]);
  }

  return formData;
}

/**
 * Module containing utility functions for converting from JavaScript objects to
 * an array of tuples consistent with the naming and formatting conventions of
 * Ruby on Rails
 */
module.exports  = {

  /**
   * Converts an arbitrarily deep target object into a flat array of key-value
   * tuples with the key converted to a format that is consistent with the
   * naming and formatting conventions of Ruby on Rails.
   *
   * @param {Object} target Object to convert to an array of key-value tuples
   * @returns {Array} array of key-value tuples
   */
  from: function(target){
    var formData = [];

    if(target !== null || target !== undefined){

      for(var key in target){
        if(!target.hasOwnProperty(key)){ continue; }

        formData = formData.concat(buildFormDataAttributes(key, target[key]));
      }

    }

    return formData;
  }
};
