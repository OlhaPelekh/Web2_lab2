'use strict'

const passengerModel = new Passenger() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#passenger-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    const passangerData = {}
    formData.forEach((value, key) => {
      passangerData[key] = value
    })
    if (document.getElementById("form-button").innerHTML === "Save") {
      passengerModel.Edit(passangerData)
    } else {
      passengerModel.Create(passangerData)
    }
    

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#passenger-list').DataTable({
    data: passengerModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Name',
       data: 'name',
       render: function (data, type, row, meta) {
        if (type === 'display') {
          data = '<a href="passenger/'+ row['id']  + '"  > '+row['name'] +' </a>'
       }
       return data
      }
    },
    { title: 'Surname', data: 'surname',
    render: function (data, type, row, meta) {
      if (type === 'display') {
        data = '<a href="passenger/'+ row['id']  + '"  > '+row['surname'] +' </a>'
     }
     return data
    }
  },
  { title: 'Edit', data: 'id',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<button type="button" onclick="passengerModel.startEdit(' + data + ')"> Edit </button>'
          }
          return data
        }
      },
  {
    title: 'Delete',
    data: 'id',
    render: function (data, type, row, meta) {
      if (type === 'display') {
        data = '<button type="button" onclick="passengerModel.DeleteById(' + row['id'] + ')"> Delete </button>'
      }
      return data
    }
  },
      
    ]
  })
}


function initListEvents () {
  document.addEventListener('passengersListDataChanged', function (e) {
    const dataTable = window.jQuery('#passenger-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}


window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})
