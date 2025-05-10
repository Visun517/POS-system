export default class Order {
    constructor(items,totalPrice , date , customerName) {
        this.item = items;
        this.totalPrice = totalPrice;
        this.date = date;
        this.customerName = customerName;
    }
}