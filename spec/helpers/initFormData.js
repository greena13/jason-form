class FormData {
  constructor() {
    this.values = [];
  }

  append(key, value) {
    this.values.push([key, value]);
  }

  getAll() {
    return this.values;
  }
}

global.FormData = FormData;
