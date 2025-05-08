import {loadCustomerIds} from "./OrderController.js";
import {loadItemIds} from "./OrderController.js";
import {loadTable} from "./ItemController.js";

$('#home').css('display', 'block');
$('#customer').css('display', 'none');
$('#item').css('display', 'none');
$('#placeOrder').css('display', 'none');


$('#home-btn').on('click', function(){

    $('#home').css('display', 'block');
    $('#customer').css('display', 'none');
    $('#item').css('display', 'none');
    $('#placeOrder').css('display', 'none');

});

$('#customer-btn').on('click', function(){

    $('#home').css('display', 'none');
    $('#customer').css('display', 'block');
    $('#item').css('display', 'none');
    $('#placeOrder').css('display', 'none');

});

$('#item-btn').on('click', function(){

    $('#home').css('display', 'none');
    $('#customer').css('display', 'none');
    $('#item').css('display', 'block');
    $('#placeOrder').css('display', 'none');

    loadTable();
});

$('#place-order-btn').on('click', function(){

    $('#home').css('display', 'none');
    $('#customer').css('display', 'none');
    $('#item').css('display', 'none');
    $('#placeOrder').css('display', 'block');

    loadCustomerIds();
    loadItemIds();

});

