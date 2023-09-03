let trips = JSON.parse(localStorage.getItem('order'));
let arrInCart = [];

$(document).ready(function(){
    if (trips != null) {
        for (let i = 0; i < trips.length; i++) {
            if (i == 0) {
                arrInCart.push(trips[i]);
            } else {
                let replaced = false;
                for (let p = 0; p < arrInCart.length; p++) {
                    if (arrInCart[p].index === trips[i].index) {
                        arrInCart[p] = trips[i];
                        replaced = true
                    }
                }
                if (!replaced) {
                    arrInCart.push(trips[i]);
                }
            }
        }
    }

    
    console.log(arrInCart);
    loadCart(arrInCart);
    if ($("tbody").children().length > 1) {
        $("#book").prop('disabled', false);
    } else {
        $("#book").prop('disabled', true);
    }
    

    $("tbody").on('click', '#circleButton',function() {
        console.log("deleted");
        $(this).parentsUntil("tbody").remove();
    });

    $("#book").click(function(){
        alert("Successful Purchase");
        localStorage.removeItem('order');
        window.location.href = '../index.html';
    });
    $("#remove").click(function(){
        $("#book").prop('disabled', true);
        //localStorage.removeItem('order');
    });
})

loadCart = (array) => {
    for (let i = 0; i < array.length; i++) {
        const plant = array[i];
        
        $("tbody").append($("#tripTemplate").html());
        

        let currentChild = $("tbody").children().eq(i+1);
        let code = array[i].location.substr(0, 3) + array[i].Duration;

        console.log(currentChild);
        $(currentChild).find("#code").text(i+1 + code.toUpperCase())
        $(currentChild).find("#location").text(array[i].location);
        $(currentChild).find("#Passengers").text(array[i].orders);
        $(currentChild).find("#cost").text("R "+(array[i].orders * array[i].cost)+".00");
    }
}