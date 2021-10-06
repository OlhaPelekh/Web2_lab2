class TicketSold extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
      super('ticketSold')
      this.fields = this.fields.concat(['passenger', 'train', 'ticket','date'])
    }
  }