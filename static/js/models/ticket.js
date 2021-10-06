class Ticket extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
      super('ticket')
      this.fields = this.fields.concat(['price'])
    }
  }