document.addEventListener('DOMContentLoaded', ()=>{
    const hitBtn = document.getElementById('hitBtn');
    const stayBtn = document.getElementById('stayBtn');
    const startBtn = document.getElementById('startBtn');

    let currentPlayer = 0;

    function createPlayersUI(players) {
        document.getElementById('players').innerHTML = '';
        for(let i = 0; i < players.length; i++)
        {
            let div_player = document.createElement('div');
            let div_playerid = document.createElement('div');
            let div_hand = document.createElement('div');
            let div_points = document.createElement('div');
    
            div_points.className = 'points';
            div_points.id = 'points_' + i;
            div_player.id = 'player_' + i;
            div_player.className = 'player';
            div_hand.id = 'hand_' + i;
    
            div_playerid.innerHTML = 'Player ' + players[i].ID;
            div_player.appendChild(div_playerid);
            div_player.appendChild(div_hand);
            div_player.appendChild(div_points);
            document.getElementById('players').appendChild(div_player);
        }
    }

    function dealHands(players, deck) {
        // alternate handing cards to each player
        // 2 cards each
        for(let i = 0; i < 2; i++)
        {
            for (let x = 0; x < players.length; x++)
            {
                let card = deck.pop();
                players[x].Hand.push(card);
                renderCard(card, x);
                updatePoints(players);
            }
        }
        updateDeck(deck);
    }
    
    function renderCard(card, player) {
        let hand = document.getElementById('hand_' + player);
        hand.appendChild(getCardUI(card));
    }
    
    function getCardUI(card) {
        let el = document.createElement('div');
        let icon = '';
        if (card.Suit == 'Hearts')
        icon='&hearts;';
        else if (card.Suit == 'Spades')
        icon = '&spades;';
        else if (card.Suit == 'Diamonds')
        icon = '&diams;';
        else
        icon = '&clubs;';
        
        el.className = 'card';
        el.innerHTML = card.Value + '<br/>' + icon;
        return el;
    }
    
    // returns the number of points that a player has in hand
    function getPoints(player, players) {
        let points = 0;
        for(let i = 0; i < players[player].Hand.length; i++)
        {
            points += players[player].Hand[i].Weight;
        }
        players[player].Points = points;
        return points;
    }
    
    function updatePoints(players) {
        for (let i = 0 ; i < players.length; i++)
        {
            getPoints(i, players);
            document.getElementById('points_' + i).innerHTML = players[i].Points;
        }
    }

    function updateDeck(deck) {
        document.getElementById('deckcount').innerHTML = deck.length;
    }

    function end(players) {
        let winner = -1;
        let score = 0;
    
        for(let i = 0; i < players.length; i++)
        {
            if (players[i].Points > score && players[i].Points < 22)
            {
                winner = i;
            }
    
            score = players[i].Points;
        }
    
        document.getElementById('status').innerHTML = 'Winner: Player ' + players[winner].ID;
        document.getElementById("status").style.display = "inline-block";
    }


    // START
    startBtn.addEventListener('click', ()=>{
        document.getElementById('startBtn').value = 'Restart';
        document.getElementById("status").style.display="none";

        $.ajax({
            url: "http://localhost:8080/blackjack",
            type: "GET",
            headers: {
                "casino": "blackjack"
            },
            success: function(response){
                // console.log("Response: ", response);
                const deck = response.deck;
                const players = response.players;
                console.log(players);
                currentPlayer = 0;
                createPlayersUI(players);
                dealHands(players, deck);
                document.getElementById('player_' + currentPlayer).classList.add('active');
                // HIT ME
                hitBtn.addEventListener('click', ()=>{
                    let card = deck.pop();
                    players[currentPlayer].Hand.push(card);
                    renderCard(card, currentPlayer);
                    updatePoints(players);
                    updateDeck(deck);
                    if (players[currentPlayer].Points > 21) {
                        document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + ' LOST';
                        document.getElementById('status').style.display = "inline-block";
                        end(players);
                    }
                });
                // STAY
                stayBtn.addEventListener('click', ()=>{
                    if (currentPlayer != players.length-1) {
                        document.getElementById('player_' + currentPlayer).classList.remove('active');
                        currentPlayer += 1;
                        document.getElementById('player_' + currentPlayer).classList.add('active');
                    } else {
                        end(players);
                    }
                });
            },
            error: function(error){
                console.error("Something wrong..", error);
            }
        });
    });
});