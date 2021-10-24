class Passenger extends BaseModel { 
  constructor () {
    super('passengers')

    this.fields = this.fields.concat(['name', 'surname'])
  }
}
