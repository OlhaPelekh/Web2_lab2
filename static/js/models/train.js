class Train extends BaseModel { 
    constructor () {
      super('trains')
  
      this.fields = this.fields.concat(['name', 'route'])
    }
  }
  