import {Orders} from "../db/db.js";

// $(document).ready(function(){
//     loadOrderHistoryTable();
// });
function loadOrderHistoryTable() {
    $('#order-history-tbody').empty();

    Orders.forEach((order , index)=>{
        order.item.forEach((item , itemIndex) => {
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

export {loadOrderHistoryTable}
