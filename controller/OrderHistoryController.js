import {Customer, Orders} from "../db/db.js";

$(document).ready(function () {
    loadOrderHistoryTable();
})
function loadOrderHistoryTable() {
    $('#order-history-tbody').empty();

    Orders.forEach((order, index) => {
        order.items.forEach((item, itemIndex) => {
            let row = `<tr>
                                 <td>${index + 1}</td>
                                 <td>${order.customerName}</td>
                                 <td>${order.date}</td>
                                 <td>${order.totalPrice}</td>
                                 <td>${item.itemName}</td>
                                 <td>${item.quantity}</td>
                                 <td>${item.price}</td>
                               </tr>`;
            $('#order-history-tbody').append(row);
        })
    });

}

function loadCustomerNameOrders() {
    const dropdown = $('#Customer-Id');
    dropdown.empty();
    dropdown.append('<option value="" disabled selected></option>');
    Customer.forEach((customer, index) => {
        dropdown.append(`<option value="${customer.customerName}">${customer.customerName}</option>`);
    });
}

$('#customer-order-search-btn').on('click', function () {

    $('#order-history-tbody').empty();

    let customerName = $('#Customer-Id').val();

    Orders.forEach((order, index) => {
        if (order.customerName === customerName) {
            order.item.forEach((item, itemIndex) => {
                let row = `<tr>
                                 <td>${index + 1}</td>
                                 <td>${order.customerName}</td>
                                 <td>${order.date}</td>
                                 <td>${order.totalPrice}</td>
                                 <td>${item.itemName}</td>
                                 <td>${item.quantity}</td>
                                 <td>${item.price}</td>
                               </tr>`;
                $('#order-history-tbody').append(row);
            })
        }
    })
})

$('#customer-order-clear-btn').on('click', function () {
    $('#order-history-tbody').empty();
    loadOrderHistoryTable();
})

export {loadOrderHistoryTable}
export {loadCustomerNameOrders}
