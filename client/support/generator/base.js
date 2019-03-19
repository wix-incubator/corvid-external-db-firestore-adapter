module.exports = class BaseQueryGenerator {
  constructor(firestore, connectorName) {
    this.firestore = firestore;
    this.connectorName = connectorName;
  }
  
  generate(filter) {
    return [
      this.firestore.collection(this.connectorName)
    ]
  }
}
