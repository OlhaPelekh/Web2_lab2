class SoldTicket extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
      super('sold_ticket')
  
      this.fields = this.fields.concat(['passenger', 'train', 'ticket','date'])
    }
  }
  