class BaseModel {// eslint-disable-line no-unused-vars
  constructor(collectionName) {
    this.collectionName = collectionName
    this.fields = ['id']
  }

  is_valid(value, collection_items) {
    return true
  }

  is_valid_all(collection_items) {
    for (let index = 0; index < collection_items.length; index++) {
      const value = collection_items[index];
      let short_collection_items = [...collection_items];
      short_collection_items.splice(index, 1);
      console.log("short_collection_items", JSON.stringify(short_collection_items))
      console.log("value", value)

      if (this.is_valid(value, short_collection_items) == false) {
        return false
      }
    };
    return true
  }

  /**
   * @returns {Number}
   */
  getNextId(collection) {
    return collection.length + 1
  }
  /**
   * @returns {Object}
   */
  GetEmpty() {
    const entry = {}

    this.fields.forEach(element => {
      entry[element] = null
    })

    return entry
  }
  /**
   * @returns {Array}
   */
  Select() {
    const stored = localStorage.getItem(this.collectionName)
    const collection = stored ? JSON.parse(stored) : []

    return collection
  }
  Commit(collection) {
    localStorage.setItem(this.collectionName, JSON.stringify(collection))
  }
  /**
   * @param {Number} id
   * @returns {BaseModel|undefined}
   */
  FindById(id) {
    return this.Select().find(item => item.id === id)
  }
  /**
   * @param {Number} id
   * @returns {Number}
   */
  FindIndexById(id) {
    return this.Select().findIndex(item => item.id === id)
  }

  Create(row) {

    const collection = this.Select()
    const entry = this.GetEmpty()

    for (const key in row) {
      if (key !== 'id' && row[key] === '') {
        document.getElementById('error-text').innerHTML = "Empty object is inalid"
        return;
      }
    }
    document.getElementById('error-text').innerText = ""


    for (const key in row) {
      if (entry.hasOwnProperty(key) &&
        entry.key !== 'id') {
        entry[key] = row[key]
      }
    }
    entry.id = this.getNextId(collection)

    collection.push(entry)

    this.Commit(collection)

    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }
  startEdit(ID) {
    let object = this.FindById(ID);
    Object.keys(object).forEach(function (item) {
      document.getElementById(item).value = object[item];
    })
    document.getElementById("form-button").innerHTML = "Save";
  }

  Edit(row) {

    for (const key in row) {
      if (key !== 'id' && row[key] === '') {
        document.getElementById('error-text').innerHTML = "Empty object is inalid"
        return;
      }
    }

    document.getElementById('error-text').innerText = ""
    let collection_items = JSON.parse(localStorage.getItem(this.collectionName))
    for (let index = 0; index < collection_items.length; index++) {
      const element = collection_items[index];
      if (element.id === parseInt(document.getElementById('id').value)) {
        for (const key in row) {
          if (element.hasOwnProperty(key)) {
            element[key] = row[key]
          }
        }
        element['id'] = parseInt(element['id']);
        break;
      }
    }

    if (!this.is_valid_all(collection_items)) {
      console.log('is_not_valid_all')
      document.getElementById('error-text').innerHTML = "Duplicate object found"
      return
    }
    console.log('is_valid_all')


    this.Commit(collection_items)
    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection_items })
    document.dispatchEvent(event)
    document.getElementById('form-button').innerHTML = "Create"
  }

  DeleteById(ID) {
    var collection_items = JSON.parse(localStorage.getItem(this.collectionName))
    for (let index = 0; index < collection_items.length; index++) {
      const element = collection_items[index];
      if (element.id == ID) {
        collection_items.splice(index, 1)
      }
    }

    localStorage.setItem(this.collectionName, JSON.stringify(collection_items));
    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection_items })
    document.dispatchEvent(event)
  }
  EditById(ID) {

    var collection_items = JSON.parse(localStorage.getItem(this.collectionName))

    for (let index = 0; index < collection_items.length; index++) {
      const element = collection_items[index];
      if (element.id == ID) {
        var current_item = element;
        break
      }
    }
    console.log(current_item)
    var currnt_item = this.FindById(ID);
    this.fields.forEach(element => {
      if (element !== 'id') {
        document.getElementById(element).value = current_item[element];
      }
    })
    const form = window.document.querySelector('#passenger-add-form')
    form.addEventListener('submit', function (e) {
      e.preventDefault()

      e.target.reset()
    })
  }


}
