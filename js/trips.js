const arrTrips =[{
    index: 0,
    location: "Italy",
    cost: 500,
    ID: "collapseOne",
    startDate: new Date("11/1/2023"),
    endDate: new Date("11/3/2023"),
    Duration: 2,
    round: false,
    destinations: ["Genoa"],
    destinationAmount: 1,
    orders: 0
    
},{
    index: 1,
    location: "Spain",
    cost: 950,
    ID: "collapseTwo",
    startDate: new Date("12/10/2023"),
    endDate: new Date("12/25/2023"),
    Duration: 15,
    round: false,
    destinations: ["Melilla","Almeria","Palma","Sagunto"],
    destinationAmount: 4,
    orders: 0
},{
    index: 2,
    location: "Spain",
    cost: 700,
    ID: "collapseThree",
    startDate: new Date("12/10/2023"),
    endDate: new Date("12/17/2023"),
    Duration: 6,
    round: false,
    destinations: ["Melilla","Almeria"],
    destinationAmount: 2,
    orders: 0
},{
    index: 3,
    location: "Greece",
    cost: 1500,
    ID: "collapseFour",
    startDate: new Date("2023-10-10"),
    endDate: new Date("11/20/2023"),
    Duration: 40,
    round: true,
    destinations: ["Corfu","Mykonos","Antirrio","Thasos","Heraklion","Zakynthos","Rafina","Igoumenitsa"],
    destinationAmount: 8,
    orders: 0
},{
    index: 4,
    location: "Greece",
    cost: 1000,
    ID: "collapseFive",
    startDate: new Date("2023-11-10"),
    endDate: new Date("12/10/2023"),
    Duration: 31,
    round: false,
    destinations: ["Corfu","Mykonos","Antirrio","Thasos","Heraklion","Zakynthos"],
    destinationAmount: 6,
    orders: 0
},{
    index: 5,
    location: "Italy",
    cost: 1250,
    ID: "collapseSix",
    startDate: new Date("12/30/2023"),
    endDate: new Date("01/30/2024"),
    Duration: 31,
    round: true,
    destinations: ["Genoa","Sicily","Florence","Rome","Naples","Trieste","Venice"],
    destinationAmount: 7,
    orders: 0
}] 

let trips = [];

checkout = () => {
    document.location.href = "../pages/checkout.html";
}

$(document).ready(function(){

    $("#accordionExample").on('click', '#tripContainer', function() {
        let index = $(this).find(".accordion-item").attr("data-index");
        let round = "";
        
        const trip = arrTrips[index];
        
        if (trip.round) {
            round = "Round Trip";
        }
        $(this).find(".accordion-body").html(`
        <P>${round}</P>
        <p>Destination(s): ${trip.destinations}</p>
        <p>Start Date: ${trip.startDate}</p>
        <p>End Date: ${trip.endDate}</p>`);

        if (!$(this).find(".accordion-collapse").hasClass("show")) {
            $(this).find(".ticket-order").toggle();
            $(this).find("#price").toggle();
        }
        
    });

    appliedFilter = arrTrips;
    loadTrips (appliedFilter);

    $(".ticket-order").hide();
})

loadTrips = (tripsToShow) => {
    $("#accordionExample").empty();
    for (let i = 0; i < tripsToShow.length; i++){
        const trip = tripsToShow[i];
        
        $("#accordionExample").append($("#tripTemplate").html());
        let currentChild = $("#accordionExample").children().eq(i);

        $(currentChild).find("button").attr("data-bs-target","#"+trip.ID)
        $(currentChild).find("button").attr("aria-controls",trip.ID)
        $(currentChild).find("#collapseOne").attr("id",trip.ID)
        $(currentChild).find(".accordion-item").attr("data-index",i)
        $(currentChild).find("#button").find("#location").text(trip.location);
        $(currentChild).find("#button").find("#price").text("- R"+trip.cost);
        $(currentChild).find("#order-inputs").attr("data-index",i)
        if (!$(currentChild).find(".accordion-collapse").hasClass("show")) {
            $(currentChild).find(".ticket-order").toggle();
        }
    }
}

Destinations = () => {
    let trips = [];
    let tripType = document.getElementById("destinations").selectedIndex ;
    switch (tripType){
        case 0:
            trips = arrTrips;
        break;
        case 1:
            trips = arrTrips.filter(trips => trips.destinationAmount === 1);
        break;
        case 2:
            trips = arrTrips.filter(trips => trips.destinationAmount > 1);
        break;
        case 3:
            trips = arrTrips.filter(trips => trips.round === true);
        break;
    }
    
    loadTrips (trips);
}

Duration = () => {
    let trips = [];
    let tripLength = document.getElementById("durations").selectedIndex ;
    switch (tripLength){
        case 0:
            trips = arrTrips;
        break;
        case 1:
            trips = arrTrips.filter(trips => trips.Duration <= 5);
        break;
        case 2:
            trips = arrTrips.filter(trips => trips.Duration > 5);
        break;
    }
    loadTrips (trips);
}

specials = () => {
    if (document.getElementById("rowBoat").checked){
        let filteredSortedArrTrips;
        filteredSortedArrTrips = arrTrips.sort((a, b) => {
            return a.cost - b.cost;
        });
        $("#accordionExample").empty();
        for (let i = 0; i < 5; i++){
            const trip = filteredSortedArrTrips[i];
            
            $("#accordionExample").append($("#tripTemplate").html());
            
            let currentChild = $("#accordionExample").children().eq(i);
    
            $(currentChild).find("button").attr("data-bs-target","#"+trip.ID)
            $(currentChild).find("button").attr("aria-controls",trip.ID)
            $(currentChild).find("#collapseOne").attr("id",trip.ID)
            $(currentChild).find(".accordion-item").attr("data-index",trip.index)
            $(currentChild).find("#button").find("#location").text(trip.location);
            $(currentChild).find("#button").find("#price").text("- R"+trip.cost);
            $(currentChild).find("#order-inputs").attr("data-index",trip.ID)
            if (!$(currentChild).find(".accordion-collapse").hasClass("show")) {
                $(currentChild).find(".ticket-order").toggle();
            }
        }
        
    } else {
        loadTrips(arrTrips);
        $(currentChild).find(".ticket-order").hide();
    }
    
}

book = (parent) => {
    let parentIndex = $(parent).attr("data-index");
    console.log(parentIndex);
    let arrTrip = arrTrips[parentIndex];
    arrTrip.orders += 1;

    trips.push(arrTrip);
    
    let data = JSON.stringify(trips);
    localStorage.setItem('order' , data);
    $(parent).parent().find(".accordion-collapse").removeClass("show");
}