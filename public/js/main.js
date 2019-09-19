$(document).ready(function(){
    //creae product function
    $('#submit').click(function(event) {
        event.preventDefault();
        const productName = $('#product-name').val();
        const productQuantity = $('#product-quantity').val();
        const productPrice = $('#product-price').val();
        const expDate = $('#ExpDate').val();
        //check if user input is empty
        if(!productName || !productQuantity || !productPrice || !expDate){
            // $('.createMessage').html('kindly supply the necessary informations');
            alert('kindly supply the necessary informations');
            return;
        }
        // make get request to check if the product already exists
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/products?productName=${productName}&productPrice=${productPrice}&expDate=${expDate}`,
            success: function(response) {
                if(response.length) {
                    // $('.createMessage').html('product already exists');
                    alert('product already exists')
                } else {
                    //submit the user data if the product does not exist
                    $.ajax({
                        method: 'POST',
                        url: 'http://localhost:3000/products',
                        data: {
                            productName,
                            productQuantity,
                            productPrice,
                            expDate,
                        },
                        success: function() {
                            alert('product successfully added');
                            return;//
                        }
                    })
                }
            }
        })
    });
    //clear the form field function
    $('#cancel').click(function(event){
        event.preventDefault();
        $('#product-name').val('');
        $('#product-quantity').val('');
        $('#product-price').val('');
        $('#ExpDate').val('');
    });
    //read all products function
    $.getJSON("http://localhost:3000/products", function(data){
        let products_details = '';
        $.each(data, function(key,value){
           
            products_details += `<tr id=${value.id}>
            <td>${value.id}</td>
             <td> ${value.productName}</td>
            <td>${value.productQuantity}</td>
            <td><span>&#8358;</span>${value.productPrice}</td>
            <td>${value.expDate}</td>
             <td><button type="button" class="delbtn btn btn-danger"  data-removeid="${value.id}">Delete</button></td>
           </tr>`
        });
        $('#products_table').append(products_details);
        $('.delbtn').on('click',function(event){
            event.preventDefault();
            console.log(event)
            const id = event.currentTarget.dataset.removeid;
            console.log(id);
            $.ajax({
                method: "DELETE",
                url: `http://localhost:3000/products/${id}`,
                
                success: function(){
                   $(`#${id}`).remove();
                }
            });
        });
    });
    //delete function
    
    // $('#delete').click(function(event){
    //     event.preventDefault();
    //     $.ajax({
    //         url:
    //     })
    // })




});//end of jquery document