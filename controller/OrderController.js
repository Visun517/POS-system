import {Orders,Customer,Item} from "../db/db.js";
import OrderModel from "../model/OrderModel.js";

var labelTotalPrice=0;
var subTotalPrice=0;
$(document).ready(function () {
    $('#place-order-tbody').empty();

    let nextOrderId = Orders.length + 1;
    $('#OrderId').val('Order -' + nextOrderId);

    //loadTable();


    $('#place-order-tbody').on('click', 'tr', function () {
        $('#orderModal').modal('show');

        let rowIndex = $(this).index();
        let clickedOrder =  Orders[rowIndex];

        $('#modalItemName').val(clickedOrder.itemName);
        $('#modalUnitPrice').val(clickedOrder.unitPrice);
        $('#modalQuantity').val(clickedOrder.quantity);
        $('#modalTotalPrice').val(clickedOrder.totalPrice);
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
    let customerIndex = $('#CustomerId').val();
    $('#CustomerName').val(Customer[customerIndex].customerName);
    $('#CustomerAddress').val(Customer[customerIndex].customerAddress);

})

function loadItemIds() {
    const dropdown = $('#itemId');
    dropdown.empty();
    dropdown.append('<option value="" disabled selected></option>');
    Item.forEach((customer , index) => {
        dropdown.append(`<option value="${index}">${index + 1}</option>`);
    });
}
$('#itemId').on('change', function () {
    let itemIndex = $('#itemId').val();
    $('#ItemName').val(Item[itemIndex].itemName);
    $('#Price').val(Item[itemIndex].unitPrice);
    $('#Quantity').val(Item[itemIndex].quantity);

})

$('#add-item').on('click', function () {
    let itemName = $('#ItemName').val();
    let unitPrice = $('#Price').val();
    let quantity = $('#Quantity').val();
    let cartQuantity =parseInt($('#Order-Quantity').val()) || 0;
    let totalPrice = unitPrice * cartQuantity;
    let date = $('#date').val();
    let customerName = $('#CustomerName').val();

    if (itemName === '' || unitPrice === '' || quantity === '' || cartQuantity === '' || totalPrice === '' || date === '' || customerName === '') {
        Swal.fire({
            title: 'Error!',
            text: 'Add item unsuccessfully ..!',
            icon: 'error',
            confirmButtonText: 'Try again'
        })
    }else{

        let itemIndex = 0;
        Item.map((item , index)=>{
            if(item.itemName > itemName){
                itemIndex = index;
            }
        })
        // Item[itemIndex].quantity -= cartQuantity;

        let placeOrderRow = `<tr>
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
        $('#ItemName').val('');
        $('#Price').val('');
        $('#Quantity').val('');
        $('#Order-Quantity').val('');
        $('#itemId').val('');
    }
})

// function loadTable(){
//     Orders.map((order , index ) => {
//         $('#place-order-tbody').empty();
//
//         let placeOrderRow = `<tr>
//                                     <td>${index + 1}</td>
//                                     <td>${order.itemName}</td>
//                                     <td>${order.unitPrice}</td>
//                                     <td>${order.quantity}</td>
//                                     <td>${order.totalPrice}</td>
//                               <tr>`
//         $('#place-order-tbody').append(placeOrderRow);
//
//     })
//
// }

$('#Discount').on('change', function(){
    let cash = $('#cash').val();
    let discount = $('#Discount').val();
    let balance = cash -  (subTotalPrice - discount);

    $('#Balance').val(balance);
})

$('#purchase-btn').on('click', function(){

    let itemName = $('#ItemName').val();
    let unitPrice = $('#Price').val();
    let quantity = $('#Quantity').val();
    let cartQuantity = $('#Order-Quantity').val();
    let totalPrice = unitPrice * cartQuantity;
    let date = $('#date').val();
    let customerName = $('#CustomerName').val();

    if (itemName === '' || unitPrice === '' || quantity === '' || cartQuantity === '' || totalPrice === '' || date === '' || customerName === '') {
        Swal.fire({
            title: 'Error!',
            text: 'Purchase unsuccessfully ..!',
            icon: 'error',
            confirmButtonText: 'Try again'
        })
    }else{

        let newOrder = new OrderModel(itemName,unitPrice,cartQuantity,totalPrice, date,customerName,);
        Orders.push(newOrder);
        
        Swal.fire({
            title: 'success!',
            text: 'Purchase Successfully!',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
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
export {loadCustomerIds}
export {loadItemIds}

