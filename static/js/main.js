'use strict'
console.log('Hello Node + JS')

const { Passenger, Ticket, Train, TicketSold, add, edit, remove, find, purchaseTicketByPassenger, changeTicketFromTrainToTrain, findMINMAX } = require('./7.js')
let passengerCollection = Array()
let ticketCollection = Array()
let trainCollection = Array()
let ticketSoldCollection = Array()

Passenger.id = 1
Ticket.id = 1
Train.id = 1
TicketSold.id = 1

let passenger1 = new Passenger('Inna')
let passenger2 = new Passenger('Ivan')
let passenger3 = new Passenger('Oleh')

add(passenger1, passengerCollection)
add(passenger2, passengerCollection)
add(passenger3, passengerCollection)
console.log(passengerCollection)

edit(1, passengerCollection, 'Mark')
console.log(passengerCollection)

remove(1, passengerCollection)
console.log(passengerCollection)

console.log(find('Ivan', passengerCollection))

let train1 = new Train('Lviv')
let train2 = new Train('Odessa')
let train3 = new Train('Poland')

add(train1, trainCollection)
add(train2, trainCollection)
add(train3, trainCollection)
console.log(trainCollection)

edit(2, trainCollection, 'Kiev')
console.log(trainCollection)

remove(2, passengerCollection)
console.log(passengerCollection)

console.log(find('Lviv', trainCollection))

let ticket1 = new Ticket('22')
let ticket2 = new Ticket('21')
let ticket3 = new Ticket('10')

add(ticket1, ticketCollection)
add(ticket2, ticketCollection)
add(ticket3, ticketCollection)
console.log(ticketCollection)

purchaseTicketByPassenger(passenger1, train1, ticket1, TicketSold, ticketSoldCollection)
purchaseTicketByPassenger(passenger2, train1, ticket2, TicketSold, ticketSoldCollection)
purchaseTicketByPassenger(passenger1, train3, ticket3, TicketSold, ticketSoldCollection)
purchaseTicketByPassenger(passenger1, train2, ticket1, TicketSold, ticketSoldCollection)
purchaseTicketByPassenger(passenger2, train2, ticket2, TicketSold, ticketSoldCollection)
purchaseTicketByPassenger(passenger2, train3, ticket3, TicketSold, ticketSoldCollection)
console.log(ticketSoldCollection)

changeTicketFromTrainToTrain(ticket1,train3,ticketSoldCollection)
console.log(ticketSoldCollection)

console.log(findMINMAX(ticketSoldCollection))
console.log(findMINMAX(ticketSoldCollection,false))

remove(1, ticketSoldCollection)
console.log(ticketSoldCollection)