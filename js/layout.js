$('#go-signup').click(function(){
    $('#signup').css("display", "flex");
    $('#login').css("display", "none");
});

$('#go-login').click(function(){
    $('#login').css("display", "flex");
    $('#signup').css("display", "none");
});

$('#slot-btn').click(function(){
    $('#slotmachine').css("display", "block");
    $('#blackjack').css("display", "none");
});

$('#blackjack-btn').click(function(){
    $('#blackjack').css("display", "block");
    $('#slotmachine').css("display", "none");
});
