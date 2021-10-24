class TicketSold extends BaseModel {
  constructor() {
    super('ticket_sold')
    this.fields = this.fields.concat(['passenger', 'train', 'ticket', 'date'])
  }
  // is_valid(entry, collection_items) {
  //   console.log('is_valid')
  //   for (const value in collection_items) {
  //     console.log(JSON.stringify(entry) )
  //     console.log(JSON.stringify(value) )


  //     console.log(entry['train'] )
  //     console.log(  value['train'] )
  //     console.log( entry['ticket'] )
  //     console.log(  value['ticket'] )
  //     console.log( entry['date'] )
  //     console.log(  value['date'])
  //     // console.log(true)
  //     console.log(entry['train'] == value['train'] &&
  //       entry['ticket'] == value['ticket'] &&
  //       entry['date'] == value['date']
  //     )
  //     if (entry['train'] == value['train'] &&
  //       entry['ticket'] == value['ticket'] &&
  //       entry['date'] == value['date']) {
  //       return false
  //     }

  //   }
  //   return true
  // }
  is_valid(entry, collection_items) {
    for (let index = 0; index < collection_items.length; index++) {
      const value = collection_items[index];

      console.log(value['train'])
      console.log('entry', entry['train'])
      console.log(value['ticket'])
      console.log('entry', entry['ticket'])
      console.log(value['date'])
      console.log('entry', entry['date'])
      // console.log(entry['train'] === value['train'] &&
      //   entry['ticket'] === value['ticket']
      //   && entry['date'] === value['date'])

      //        console.log('88888888888888')

      //        console.log(entry['train'] == value['train'] &&
      //       entry['ticket'] == value['ticket'] 
      //        && entry['date'] == value['date'])

      // console.log(entry['ticket'] === value['ticket'])
      // console.log(entry['ticket'] == value['ticket'])
      // console.log( entry['ticket'][0])
      // console.log( value['ticket'][0])

      if (entry['train'] === value['train'] &&
        entry['ticket'] === value['ticket'] &&
        entry['date'] === value['date']
      ) {
        console.log('return false')
        return false
      }
    }
    console.log('return true')
    return true
  }
}