import {Customer, Item} from "../db/db.js";
import ItemModel from "../model/ItemModel.js";

var  clickedItemIndex = 0;

$('#saveItemBtn').on('click', function(){
    let stock = $('#stock').val();
    let itemName = $('#itemName1').val();
    let itemPrice = $('#itemPrice1').val();
    let itemQuantity = $('#itemQuantity1').val();

    console.log(`stock = ${stock} itemName=${itemName} itemPrice=${itemPrice} itemQuantity=${itemQuantity} `);

    const isUpdateMode = $(this).data('update-mode');

    if (stock === '' || itemName === '' || itemPrice === '' ||  itemQuantity === '' ) {

        Swal.fire({
            title: 'Error!',
            text: 'Invalid inputs ..!',
            icon: 'error',
            confirmButtonText: 'Try again'
        })

    }else if (isUpdateMode){
        updateItem();

    }else{
        let newItem = new ItemModel(stock, itemName, itemPrice, itemQuantity);
        Item.push(newItem);
        loadTable();

        Swal.fire({
            title: 'success!',
            text: 'Added successfully!',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
    }
})

function loadTable() {

    $('#item-tbody').empty();

    Item.map((item , index) => {
        let stock = item.stock;
        let itemName = item.itemName;
        let itemQuantity = item.quantity;
        let unitPrice = item.unitPrice;

        let newItemData = `<tr>
                     <td>${index + 1}</td>
                     <td>${stock}</td>
                     <td>${itemName}</td>
                     <td>${itemQuantity}</td>
                     <td>${unitPrice}</td>
                   </tr>`;

        $('#item-tbody').append(newItemData);
    })
}

$('#item-tbody').on('click', 'tr', function () {
    clickedItemIndex = $(this).index();
    let clickedItem = Item[clickedItemIndex];

    let index = clickedItemIndex;
    let stock = clickedItem.stock;
    let itemName = clickedItem.itemName;
    let quantity = clickedItem.quantity;
    let unitPrice = clickedItem.unitPrice;


    $('#stock').val(stock);
    $('#itemName1').val(itemName);
    $('#itemPrice1').val(quantity);
    $('#itemQuantity1').val(unitPrice);

    $('#addItemModalLabel').text('Update item');

    if ($('#addItemModal .modal-body').find('#itemIdInput').length === 0) {
        $('#addItemModal .modal-body').append(`
                    <div class="mb-3">
                        <label for="itemIdInput" class="form-label">Item ID</label>
                        <input type="text" id="itemIdInput" class="form-control mt-2" disabled placeholder="Enter item ID" value="${index + 1}">
                    </div>
                `);
    }
    $('#saveItemBtn').text('Update').data('update-mode', true).data('index', clickedItemIndex);


    $('#addItemModal').modal('show');

})

function updateItem(){
    console.log('updateItem');
    let index = clickedItemIndex;
    let stock = $('#stock').val();
    let itemName = $('#itemName1').val();
    let quantity = $('#itemPrice1').val();
    let unitPrice = $('#itemQuantity1').val();

    if (stock === '' || itemName === '' || quantity === '' ||  unitPrice === '' ) {

        Swal.fire({
            title: 'Error!',
            text: 'Invalid inputs ..!',
            icon: 'error',
            confirmButtonText: 'Try again'
        })

    }else{
        let updatedItem = new ItemModel(stock, itemName, quantity, unitPrice);
        Item[index] = updatedItem;
        loadTable();

        Swal.fire({
            title: 'success!',
            text: 'Added successfully!',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
    }

}
$('#item-search-btn').on('click', function(){
    let itemName = $('#item-input').val();

    Item.map((item, index) => {
        if (item.itemName === itemName){

            $('#item-tbody').empty();

            let stock = item.stock;
            let itemName = item.itemName;
            let quantity = item.quantity;
            let unitPrice = item.unitPrice;


            let newItemData =`<tr>
                                        <td>${index + 1}</td>
                                        <td>${stock}</td>
                                        <td>${itemName}</td>
                                        <td>${quantity}</td>
                                        <td>${unitPrice}</td>
                                  <tr>`

            $('#item-tbody').append(newItemData);
        }
    })
})

$('#item-clear-btn').on('click', function(){
    $('#item-input').val('');
    loadTable();
})

$('#item-stock-btn').on('click', function(){

    let itemName = $('#item-input').val();

    Item.map((item, index) => {
        if (item.itemName === itemName) {
            item.stock = 'stock out';
            loadTable();
        }
    })
})
$('#clearItemBtn').on('click', function(){
    $('#stock').val('');
    $('#itemName1').val('');
    $('#itemPrice1').val('');
    $('#itemQuantity1').val('');
})


