import {Orders,Customer,Item} from "../db/db.js";
import OrderModel from "../model/OrderModel.js";

var labelTotalPrice=0;
var subTotalPrice=0;

if (localStorage.getItem("orders_data")) {
    let raw = JSON.parse(localStorage.getItem("orders_data"));

    let loaded = raw.map(o => new OrderModel(o.items, o.totalPrice, o.date, o.customerName));
    Orders.length = 0;
    Orders.push(...loaded);
}

$(document).ready(function () {

    $('#place-order-tbody').empty();

    let nextOrderId = Orders.length + 1;
    $('#OrderId').val('Order -' + nextOrderId);
    let selectRow;

    $('#place-order-tbody').on('click', 'tr', function () {
        selectRow = $(this)
        let row = selectRow.find('td')
        let orderDate = $('#date').val();

        let itemName = row.eq(2).text().trim();
        let price = row.eq(3).text().trim();
        let quantity = row.eq(4).text().trim();
        let total = row.eq(5).text().trim();

        $('#modalItemName').val(itemName);
        $('#modalUnitPrice').val(price);
        $('#modalQuantity').val(quantity);
        $('#modalTotalPrice').val(total);
        $('#orderDate').val(orderDate);

        $('#orderModal').modal('show');
    })

    $('#updateOrder').on('click', function(){
        let quantity = $('#modalQuantity').val();
        let itemName = $('#modalItemName').val();
        let cartQuantity = $('#Order-Quantity').val();

        if (quantity === ''){
            Swal.fire({
                title: 'Error!',
                text: 'Quantity update unsuccessfully ..!',
                icon: 'error',
                confirmButtonText: 'Try again'
            })
            return;
        }

        Item.forEach((item, index) => {
            if (item.itemName === itemName) {
                if (cartQuantity > quantity){
                    let bal = cartQuantity - quantity;
                    item.quantity += bal;
                }else{
                    let bal =quantity - cartQuantity;
                    item.quantity -= bal;
                }
                selectRow.find('td').eq(4).text(quantity);

                Swal.fire({
                    title: 'success!',
                    text: 'Quantity update Successfully!',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            }
        })

    })
    $('#deleteOrder').on('click', function(){
        selectRow.remove();
        $('#orderModal').modal('hide');

        Swal.fire({
            title: 'success!',
            text: 'Item remove Successfully!',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
    })

})
function loadCustomerIds() {
    const dropdown = $('#CustomerId');
    dropdown.empty();
    dropdown.append('<option value="" disabled selected></option>');
    Customer.forEach((customer , index) => {
        dropdown.append(`<option value="${index}">${index + 1}</option>`);
    });
}

$('#CustomerId').on('change', function () {

    $('#place-order-tbody').empty();

    let customerIndex = $('#CustomerId').val();
    $('#CustomerName').val(Customer[customerIndex].customerName);
    $('#CustomerAddress').val(Customer[customerIndex].customerAddress);

})

function loadItemIds() {
    const dropdown = $('#itemId');
    dropdown.empty();
    dropdown.append('<option value="" disabled selected></option>');
    Item.forEach((item , index) => {
        dropdown.append(`<option value="${index}">${index + 1}</option>`);
    });

    // const dropdown1 = $('#modalItemId');
    // dropdown1.empty();
    // dropdown1.append('<option value="" disabled selected></option>');
    // Item.forEach((item , index) => {
    //     dropdown1.append(`<option value="${index}">${item.itemName}</option>`);
    // });
}
$('#itemId').on('change', function () {
    let itemIndex = $('#itemId').val();
    $('#ItemName').val(Item[itemIndex].itemName);
    $('#Price').val(Item[itemIndex].unitPrice);
    $('#Quantity').val(Item[itemIndex].quantity);

})

$('#add-item').on('click', function () {
    let orderId = $('#OrderId').val();
    let itemName = $('#ItemName').val();
    let unitPrice = $('#Price').val();
    let quantity = $('#Quantity').val();
    let cartQuantity =parseInt($('#Order-Quantity').val()) || 0;
    let totalPrice = unitPrice * cartQuantity;
    let date = $('#date').val();
    let customerName = $('#CustomerName').val();

    if (orderDate === '' || itemName === '' || unitPrice === '' || quantity === '' || cartQuantity === '' || totalPrice === '' || date === '' || customerName === '') {
        Swal.fire({
            title: 'Error!',
            text: 'Add item unsuccessfully ..!',
            icon: 'error',
            confirmButtonText: 'Try again'
        })
    }else{

        let itemIndex = 0;
        Item.map((item , index)=>{
            if(item.itemName === itemName){
                itemIndex = index;
            }
        })

        let placeOrderRow = `<tr>
                                    <td>${orderId}</td>
                                    <td>${itemIndex + 1}</td>
                                    <td>${itemName}</td>
                                    <td>${unitPrice}</td>
                                    <td>${cartQuantity}</td>
                                    <td>${totalPrice}</td>
                              <tr>`
        $('#place-order-tbody').append(placeOrderRow);

        labelTotalPrice += totalPrice;
        subTotalPrice = labelTotalPrice - 50;

        $('#totalPrice').text(`Total : ${labelTotalPrice} Rs/=`);
        $('#subTotal').text(`Sub Total : ${subTotalPrice} Rs/=`);

        Swal.fire({
            title: 'success!',
            text: 'Add item Successfully!',
            icon: 'success',
            confirmButtonText: 'Cool'
        })

    }
})

$('#Discount').on('change', function(){
    let cash = $('#cash').val();
    let discount = $('#Discount').val();
    let balance = cash -  (subTotalPrice - discount);

    $('#Balance').val(balance);
})

    $('#purchase-btn').on('click', function(){

        $('#place-order-tbody').val()
        let cartItemArray = [];
        let item;
        let totalPrice = 0;

        if ($('#place-order-tbody tr').length === 0){
            Swal.fire({
                title: 'Error!',
                text: 'Purchase unsuccessfully ..!',
                icon: 'error',
                confirmButtonText: 'Try again'
            })

        }else{
            $('#place-order-tbody tr').each( function () {
                let row = $(this).find('td');
                let itemName = row.eq(2).text().trim();
                let price = row.eq(3).text().trim();
                let quantity = row.eq(4).text().trim();
                let total = parseInt(row.eq(5).text().trim());

                if (itemName && price && quantity && total) {

                    item = {
                        itemName: itemName,
                        price: price,
                        quantity: quantity,
                        total: total
                    };
                    totalPrice +=total - 50;
                    cartItemArray.push(item);
                    console.log(cartItemArray);

                }
            })
            let date = $('#date').val();
            let customerName = $('#CustomerName').val();

            let newOrder = new OrderModel(
                cartItemArray,
                totalPrice,
                date,
                customerName
            );
            Orders.push(newOrder);
            localStorage.setItem("orders_data", JSON.stringify(Orders.item));
            localStorage.setItem("orders_data", JSON.stringify(Orders));
            console.log(Orders);

            let nextOrderId = Orders.length + 1;
            $('#OrderId').val('Order -' + nextOrderId);

            $('#ItemName').val('');
            $('#Price').val('');
            $('#Quantity').val('');
            $('#Order-Quantity').val('');
            $('#date').val('');
            $('#CustomerName').val('');
            $('#CustomerId').val('');
            $('#CustomerSalary').val('');
            $('#CustomerAddress').val('');
            $('#itemId').val('');
            $('#totalPrice').text(`Total : ${'0000'} Rs/=`);
            $('#subTotal').text(`Sub Total : ${'0000'} Rs/=`);
            $('#cash').val('');
            $('#Discount').val('');
            $('#Balance').val('');

            Swal.fire({
                title: 'success!',
                text: 'Purchase Successfully!',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
        }
    })

$('#Order-Quantity').on('change', function(){
    let cartQuantity = $('#Order-Quantity').val();
    let itemName = $('#ItemName').val();

    Item.forEach((item, index) => {
        if (item.itemName === itemName) {
            item.quantity -= cartQuantity;
        }
    })
})

$('#clear-cart').on('click', function(){
    $('#place-order-tbody').empty();
})
export {loadCustomerIds}
export {loadItemIds}

