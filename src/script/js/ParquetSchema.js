/* export default ParquetSchema({
    name: { type: 'UTF8' },
    quantity: { type: 'INT64' },
    price: { type: 'DOUBLE' },
    date: { type: 'TIMESTAMP_MILLIS' },
    in_stock: { type: 'BOOLEAN' }
  }); */

  class ParquetSchema {
    // The body of class
    constructor(name, quantity, price, date, in_stock) { 
      this.name = name; 
      this.quantity = quantity; 
      this.price = price; 
      this.date = date; 
      this.in_stock = in_stock; 
    }
   }