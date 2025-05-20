export default class Order {
    constructor(items,totalPrice , date , customerName) {
        this.items = items || [];
        this.totalPrice = totalPrice;
        this.date = date;
        this.customerName = customerName;
    }
}