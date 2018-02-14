function isArray(object){
  return object !== null && typeof object !== 'undefined' && object.constructor === Array;
}

function isBasicObject(object){
  return object === Object(object);
}

const fileConstantIsDefined = typeof File === 'function';

function isFile(object){
  return fileConstantIsDefined && object.constructor === File
}

function buildFormDataAttributes(key, value){
  if (isArray(value)){
    const prefix = `${key}[]`;

    if(value.length === 0){
      return [
        [ prefix, null ]
      ];
    } else {
      return value.reduce((memo, element) => memo.concat(buildFormDataAttributes(prefix, element)), []);
    }

  } else if(value && !isFile(value) && isBasicObject(value)){

    return Object.keys(value).reduce((memo, objectKey) => memo.concat(buildFormDataAttributes(`${key}[${objectKey}]`, value[objectKey])), []);

  } else {
    return [
      [ key, value ]
    ];
  }
}

/**
 * Converts an arbitrarily deep target object into a flat array of key-value
 * tuples with the key converted to a format that is consistent with the
 * naming and formatting conventions of Ruby on Rails.
 *
 * @param {Object} target Object to convert to an array of key-value tuples
 * @returns {FormData} form data compatible with Rails
 */
export default function formData(target) {

  const attributesList = function(){
    if(target !== null || typeof target !== 'undefined'){

      return Object.keys(target).reduce((memo, key) => memo.concat(buildFormDataAttributes(key, target[key])), []);

    } else {
      return [];
    }
  }();

  const formDataInstance = new FormData();

  attributesList.forEach(([key, value]) => {
    formDataInstance.append(key, value);
  });

  return formDataInstance;
}
