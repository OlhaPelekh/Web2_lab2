// module.exports = {
//   Passenger: class Passenger {
//       constructor(name, surname, passport_id) {
//           this.currId = Passenger.id++
//           this.name = name
//           this.surname = surname
//           this.passport_id = passport_id
//       }
//   },

//   Ticket: class Ticket {
//       constructor(name, price) {
//           this.currId = Ticket.id++
//           // this.name = name
//           this.price = price
//       }
//   },

//   Train: class Train {
//       constructor(name, route, number) {
//           this.currId = Train.id++
//           this.name = name
//           this.route = route
//           // this.number = number
//       }
//   },

//   TicketSold: class TicketSold {
//       constructor(passengerId, trainId, ticketId, date) {
//           this.currId = TicketSold.id++
//           this.passengerId = passengerId
//           this.trainId = trainId
//           this.ticketId = ticketId
//           this.date = date
//       }
//   },

//   add: function add(element, collection) {

//       let currId = element.currId

//       function equalid(element) {
//           return element.currId == currId
//       }

//       let index = collection.findIndex(equalid)

//       if (index == -1)
//           collection.push(element)
//       return collection
//   },

//   editPassenger: function editPassenger(id, editName, editSurname, collection) {

//       function equalid(element) {
//           return element.currId == id
//       }

//       let index = collection.findIndex(equalid)

//       if (index != -1)
//           collection[index].name = editName
//           ollection[index].surname = editSurname
//       return collection
//   },

//   editTrain: function edit(id,editName, editRoute, collection) {

//     function equalid(element) {
//         return element.currId == id
//     }

//     let index = collection.findIndex(equalid)

//     if (index != -1)
//         collection[index].name = editName
//         collection[index].route = editRoute
//     return collection
// },

//   remove: function remove(id, collection) {

//       function equalId(element) {
//           return element.currId == id
//       }

//       let index = collection.findIndex(equalId)

//       if (index != -1)
//           collection.splice(index, 1)
//       return collection
//   },

//   find: function find(name, collection) {

//       function equalName(element) {
//           return element.name == name
//       }

//       let index = collection.findIndex(equalName)

//       if (index != -1) {
//           return collection[index]
//       }
//       else {
//           return null
//       }
//   },

//   purchaseTicketByPassenger: function purchaseTicketByPassenger(passenger, train, ticket, travel, ticketSoldCollection) {
//       let element = new travel(passenger.name, train.name, ticket.name)
//       ticketSoldCollection.push(element)
//   },

//   changeTicketFromTrainToTrain: function changeTicketFromTrainToTrain(tmp, newTrain, ticketSoldCollection) {
//       let currId = tmp.currId
//       function equalId(element) {
//           return element.currId == currId
//       }
//       let index = ticketSoldCollection.findIndex(equalId)
//       if (index != -1)
//           ticketSoldCollection[index].trainId = newTrain.name
//   },

//   findMINMAX: function findMINMAX(ticketSoldCollection, min = true) {
//       train_tickets = {};

//       ticketSoldCollection.forEach(ticket => {
//           if (train_tickets[ticket.trainId]) {
//               train_tickets[ticket.trainId]++
//           } else {
//               train_tickets[ticket.trainId] = 1
//           }
//       })

//       value = 0;
//       values = Object.values(train_tickets)

//       if (min == true) {
//           value = Math.min(...values)
//       } else {
//           value = Math.max(...values)
//       }

//       trains = []

//       for (var key in train_tickets){
//           if (value == train_tickets[key] && !trains.includes(value)) {
//               trains.push(key)
//           }
//       }

//       return trains
//   }
// }

const path = require('path')

// встановлюємо express
const express = require('express')
const app = express()

// встановлюємо директорію для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname))

// налаштовуємо роботу із шаблонізаотором
app.set('views', path.join(__dirname, '/static/views'))
app.set('view engine', 'pug')

// налаштовуємо маршрутизацію
app.get('/', function (request, response) {
  response.render('pages/index', { title: 'Home' })
})
app.get('/train', function (request, response) {
  response.render('pages/train', { title: 'Pasengers' })
})
app.get('/passenger', function (request, response) {
  response.render('pages/passenger', { title: 'Pasengers' })
})
// app.get('/passenger/:id', function (request, response) {
  
//     response.render('pages/passenger-edit', {
//         title: 'Pasenger-edit',
//         id: request.params.id })
//   })
  app.get('/ticket', function (request, response) {
    response.render('pages/ticket', { title: 'Ticket' })
  })
  app.get('/soldticket', function (request, response) {
    response.render('pages/soldticket', { title: 'Sold Ticket' })
  })
  

// запускаємо аплікацію
app.listen(process.env.PORT || 8080)