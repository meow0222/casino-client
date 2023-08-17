$(document).ready(function() {
    
    // Login(GET)
    $('#login-btn').click(function(e){
        e.preventDefault();

        const username = $("#username").val();
        const password = $("#password").val();

        console.log("Username:", username);
        console.log("Password:", password);

        $.ajax({
            url: "http://localhost:8080/login",
            type: 'GET',
            headers: {
                "casino": "login"
            },
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                console.log("Response:", response); 

                if (response === "Login Successful") {
                    console.log("if condition for Login Successful triggered");
                    $('#main-content').css("display", "flex");
                    $('#print-username').text(username);
                    $('#login').css("display", "none");
                } else {
                    alert(response);
                }
            },
            error: function(error) {
                console.error("Error:", error);
            }
        });
    });

    // Sign up(POST)
    $('#signup-btn').click(function(e){
        e.preventDefault();

        const username = $("#username").val();
        const password = $("#password").val();
        const coins = $("#coins").val();
        const tickets = $("#tickets").val();

        console.log("Username:", username);
        console.log("Password:", password);

        $.ajax({
            url: "http://localhost:8080/login",
            type: 'POST',
            headers: {
                "casino": "signup"
            },
            data: {
                username: username,
                password: password,
                coins: coins,
                tickets: tickets
            },
            success: function(response) {
                console.log("Response:", response);
                $('#login').css("display", "flex");
                $('#signup').css("display", "none");
            },
            error: function(error) {
                console.error("Error:", error);
            }
        });
    });

    // Change username(PATCH)
    $('#change-btn').click(function(e){
        e.preventDefault();

        const newName = $("#change-name").val();
        const username = $("#print-username").text();

        console.log("Username:", newName);

        $.ajax({
            url: "http://localhost:8080/login",
            type: 'PATCH',
            headers: {
                "casino": "change"
            },
            data: {
                username: username,
                newName: newName,
            },
            success: function(response) {
                console.log("Response:", response);
                $('#login').css("display", "flex");
                $('#signup').css("display", "none");
            },
            error: function(error) {
                console.error("Error:", error);
            }
        });
    });
});
