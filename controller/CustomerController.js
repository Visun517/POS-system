import {Customer} from "../db/db.js";
import CustomerModel from "../model/CustomerModel.js";

var clickedCustomerIndex = '';

$('#saveCustomerBtn').on('click', function(){
    let register = $('#register').val();
    let customerName = $('#customerName1').val();
    let customerAddress = $('#customerAddress1').val();
    let customerSalary = $('#customerSalary1').val();

    console.log(`Register = ${register} customerName=${customerName} customerAddress=${customerAddress} customerSalary=${customerSalary} `);

    const isUpdateMode = $(this).data('update-mode');
    console.log(isUpdateMode);

    if (register === '' || customerName === '' || customerAddress === '' ||  customerSalary === '' ) {

        Swal.fire({
            title: 'Error!',
            text: 'Invalid inputs ..!',
            icon: 'error',
            confirmButtonText: 'Try again'
        })

    }else if (isUpdateMode){
        updateCustomer();

    }else{
        let newCustomer = new CustomerModel(register, customerName, customerAddress, customerSalary);
        Customer.push(newCustomer);
        console.log(Customer);
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

    $('#customer-tbody').empty();

    Customer.map((customer , index) => {
        let register = customer.register;
        let customerName = customer.customerName;
        let customerAddress = customer.customerAddress;
        let customerSalary = customer.customerSalary;


        let newCustomerDate =`<tr>
                                        <td>${index + 1}</td>
                                        <td>${register}</td>
                                        <td>${customerName}</td>
                                        <td>${customerSalary}</td>
                                        <td>${customerAddress}</td>
                                  <tr>`

        $('#customer-tbody').append(newCustomerDate);
    })
}

$('#customer-tbody').on('click', 'tr', function () {
    clickedCustomerIndex = $(this).index();
    let clickCustomer = Customer[clickedCustomerIndex];

    let index = clickedCustomerIndex;
    let register = clickCustomer.register;
    let customerName = clickCustomer.customerName;
    let customerAddress = clickCustomer.customerAddress;
    let customerSalary = clickCustomer.customerSalary;

    // console.log(`Register = ${register} customerName=${customerName} customerAddress=${customerAddress} customerSalary=${customerSalary} `);

    $('#register').val(register);
    $('#customerName1').val(customerName);
    $('#customerAddress1').val(customerAddress);
    $('#customerSalary1').val(customerSalary);

    $('#addCustomerModalLabel').text('Update customer');

    if ($('#addCustomerModal .modal-body').find('#customerIdInput').length === 0) {
            $('#addCustomerModal .modal-body').append(`
                    <div class="mb-3">
                        <label for="customerIdInput" class="form-label">Customer ID</label>
                        <input type="text" id="customerIdInput" class="form-control mt-2" disabled placeholder="Enter Customer ID" value="${index + 1}">
                    </div>
                `);
        }
    $('#saveCustomerBtn').text('Update').data('update-mode', true).data('index', clickedCustomerIndex);


    $('#addCustomerModal').modal('show');

})


function updateCustomer(){
    console.log('updateCustomer');
    let index = clickedCustomerIndex;
    console.log(index);
    let register = $('#register').val();
    let customerName = $('#customerName1').val();
    let customerAddress = $('#customerAddress1').val();
    let customerSalary = $('#customerSalary1').val();

    if (register === '' || customerName === '' || customerAddress === '' ||  customerSalary === '' ) {

        Swal.fire({
            title: 'Error!',
            text: 'Invalid inputs ..!',
            icon: 'error',
            confirmButtonText: 'Try again'
        })

    }else{
        let updatedCustomer = new CustomerModel(register, customerName, customerAddress, customerSalary);
        Customer[index] = updatedCustomer;
        loadTable();

        Swal.fire({
            title: 'success!',
            text: 'Added successfully!',
            icon: 'success',
            confirmButtonText: 'Cool'
        })

    }



}
