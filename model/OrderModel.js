export default class Order {
    constructor(itemName , unitPrice , quantity , totalPrice , date , customerName) {
        this.itemName = itemName;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.date = date;
        this.customerName = customerName;
    }
}