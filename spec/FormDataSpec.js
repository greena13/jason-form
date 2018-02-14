import JasonForm from '../jason-form.development';

describe('FormData.from', () => {

  it('does not change keys for simple data type values', () =>{
    const input = {
      string: 'string',
      integer: 1,
      float: 1.0,
      null: null,
      undefined: undefined
    };

    expect(JasonForm.FormData.from(input)).toEqual([
      [
        'string',
        'string'
      ],
      [
        'integer',
        1
      ],
      [
        'float',
        1.0
      ],
      [
        'null',
        null
      ],
      [
        'undefined',
        undefined
      ]
    ]);

  });

  it('it appends [] to keys for array values', () => {
    const input = {
      array: [1, 2, 3]
    };

    expect(JasonForm.FormData.from(input)).toEqual([
      [
        'array[]', 1
      ],
      [
        'array[]', 2
      ],
      [
        'array[]', 3
      ]
    ]);
  });

  it('it correctly encodes an empty array []', () => {
    const input = {
      array: []
    };

    expect(JasonForm.FormData.from(input)).toEqual([
      [
        'array[]', null
      ]
    ]);
  });

  it('it postfixes [][key] to keys for arrays of objects', () => {
    const input = {
      array: [
        {
          one: 'one',
          two: 'two'
        },
        {
          one: 'three',
          two: 'four'
        }
      ]
    };

    expect(JasonForm.FormData.from(input)).toEqual([
      [
        'array[][one]', 'one'
      ],
      [
        'array[][two]', 'two'
      ],
      [
        'array[][one]', 'three'
      ],
      [
        'array[][two]', 'four'
      ]
    ]);
  });

  it('it postfixes [key] to keys for object values', () => {
    const input = {
      object: {
        one: 'one',
        two: 'two',
        three: 'three'
      }
    };

    expect(JasonForm.FormData.from(input)).toEqual([
      [
        'object[one]', 'one'
      ],
      [
        'object[two]', 'two'
      ],
      [
        'object[three]', 'three'
      ]
    ]);
  });

  it('it postfixes [key1][key2] to keys for objects containing objects', () => {
    const input = {
      object: {
        one: {
          oneA: 'one',
          oneB: 'two'
        },
        two: {
          oneA: 'three',
          oneB: 'four'
        }
      }
    };

    expect(JasonForm.FormData.from(input)).toEqual([
      [
        'object[one][oneA]', 'one'
      ],
      [
        'object[one][oneB]', 'two'
      ],
      [
        'object[two][oneA]', 'three'
      ],
      [
        'object[two][oneB]', 'four'
      ]
    ]);
  });


});
