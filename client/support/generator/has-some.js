module.exports = class HasSomeQueryGenerator {
  constructor(firestore, connectorName) {
    this.firestore = firestore;
    this.connectorName = connectorName;
  }
  
  generate(filter) {
    return filter.value.map(value => this.firestore
      .collection(this.connectorName)
      .where(filter.fieldName, '==', value))
  }
}
