let destinations = ["Venice","Barcelona"];

$(document).ready(function(){
    $(".landing-title").text("Vada a bordo, cazzo!!");
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Venice&appid=a4d46b0a196de4ec2ed27b2798a45562",
        success: function (data) {

            tempData = data;

            console.log(tempData.weather[0].main)
        }
    }).done(function(){
        
        $("#weatherOne").append($("#weatherTemplate").html());
        console.log("Weather One");
        $("#weatherOne").find("#weatherDescription").html(tempData.weather[0].main); 
        $("#weatherOne").find("#weatherTemperature").html(Math.trunc(tempData.main.temp - 273) + "°C"); 
        $("#weatherOne").find("#weatherWind").html(tempData.wind.speed+" km/h"); 
        $("#weatherOne").find("#weatherHumid").html(tempData.main.humidity+"%"); 
    })
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=a4d46b0a196de4ec2ed27b2798a45562",
        success: function (data) {

            tempData = data;

            console.log(tempData.weather[0].main)
        }
    }).done(function(){
        
        $("#weatherTwo").append($("#weatherTemplate").html());
        console.log("Weather One");
        $("#weatherTwo").find("#weatherDescription").html(tempData.weather[0].main); 
        $("#weatherTwo").find("#weatherTemperature").html(Math.trunc(tempData.main.temp - 273) + "°C"); 
        $("#weatherTwo").find("#weatherWind").html(tempData.wind.speed+" km/h"); 
        $("#weatherTwo").find("#weatherHumid").html(tempData.main.humidity+"%"); 
    })      
})