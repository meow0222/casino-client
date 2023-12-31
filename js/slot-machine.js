document.addEventListener('DOMContentLoaded', () => {
    const betBtn = document.getElementById('bet-button');

    betBtn.addEventListener('click', () => {
        $.ajax({
            url: "http://localhost:8080/slotmachine",
            type: "GET",
            headers: {
                "task": "bet-coin"
            },
            success: function(response) {
                console.log("Response:", response);
            },
            error: function(error) {
                console.error("Error:", error);
            }
        });
    });
})

const spinButton = document.getElementById('spin');


spinButton.addEventListener('click', () => {
    if (spinButton.classList.contains('inactive') || coins <= 0) {
        return;
    }

    panels.forEach(panel => {
        panel.activate();
        panel.spin();
    });

    setTimeout(() => {
        resultDisplay.textContent = "";
        checkWin();
    }, 2000);
});



/*
class Panel {
    constructor() {
        const section = document.createElement('section');
        section.classList.add('panel');

        this.img = document.createElement('img');
        this.img.src = this.getRandomImage();

        this.timeoutId = undefined;

        this.stop = document.createElement('div');
        this.stop.textContent = 'STOP';
        this.stop.classList.add('stop', 'inactive');
        this.stop.addEventListener('click', () => {
            if (this.stop.classList.contains('inactive')) {
                return;
            }
            this.stop.classList.add('inactive');
            clearTimeout(this.timeoutId);

            panelsLeft--;

            if (panelsLeft === 0) {
                spin.classList.remove('inactive');
                panelsLeft = 3;
                checkWin();
            }
        });

        section.appendChild(this.img);
        section.appendChild(this.stop);

        const main = document.getElementById('slot-area');
        main.appendChild(section);
    }

    getRandomImage() {
        const images = [
            '../imgs/seven.png',
            '../imgs/bell.png',
            '../imgs/cherry.png',
        ];
        return images[Math.floor(Math.random() * images.length)];
    }

    spin() {
        this.img.src = this.getRandomImage();
        this.timeoutId = setTimeout(() => {
            this.spin();
        }, 50);
    }

    isUnmatched(p1, p2) {
        // if (this.img.src !== p1.img.src && this.img.src !== p2.img.src) {
        //   return true;
        // } else {
        //   return false;
        // }
        return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    unmatch() {
        this.img.classList.add('unmatched');
    }

    activate() {
        this.img.classList.remove('unmatched');
        this.stop.classList.remove('inactive');
    }

    isMatched(p1, p2) {
        return this.img.src === p1.img.src && this.img.src === p2.img.src;
    }
    
}

// コイン数
let coins = 100;
const coinsDisplay = document.getElementById('coins-display'); // coins-displayのIDを持つ要素を取得

const betInput = document.getElementById('bet-input');
const betButton = document.getElementById('bet-button');
const resultDisplay = document.getElementById('result-display');
const spinButton = document.getElementById('spin');

spin.classList.add('inactive');

betButton.addEventListener('click', () => {
    const betAmount = parseInt(betInput.value);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > coins) {
        return;
    }

    coins -= betAmount;
    coinsDisplay.textContent = `Coins: ${coins}`;

    const rewardCoins = calculateReward(panels, betAmount);
    const reward = betAmount * rewardCoins;
    coins += reward;
    coinsDisplay.textContent = `Coins: ${coins}`;

    resultDisplay.textContent = reward > 0 ? `You won ${reward} coins!` : "Try again!";
    spinButton.classList.remove('inactive');
});



const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
];

let panelsLeft = 3;


// スピンボタンのクリックイベントリスナーを追加
spinButton.addEventListener('click', () => {
    if (spin.classList.contains('inactive')) {
        return;
    }
    spin.classList.add('inactive');
    if (coins <= 0) {
        return;
    }

    // スピン処理
    panels.forEach(panel => {
        panel.activate();
        panel.spin();
    });

    // 2秒後に結果表示をリセット
    setTimeout(() => {
        resultDisplay.textContent = "";
        checkWin();
    }, 2000);
});



panels.forEach(panel => {
    panel.stop.addEventListener('click', () => {
        if (panel.stop.classList.contains('inactive')) {
            return;
        }
        panel.stop.classList.add('inactive');
        clearTimeout(panel.timeoutId);

        panelsLeft--;

        if (panelsLeft === 0) {
            allStopButtonsPressed = true; // すべてのSTOPボタンが押されたことを記録
            spinButton.classList.remove('inactive');
            panelsLeft = 3;
            checkWin();
        }
    });
});



function calculateReward(panels, betAmount) {
    let rewardCoin = 0;

    if (panels[0].isMatched(panels[1], panels[2])) {
        // 3つのカードが一致した場合の報酬
        rewardCoin = 3;
    } else if (
        panels[0].isMatched(panels[1], panels[2]) ||
        panels[1].isMatched(panels[0], panels[2]) ||
        panels[2].isMatched(panels[0], panels[1])
    ) {
        // 2つのカードが一致した場合の報酬
        rewardCoin = 2;
    } else {
        // カードが一致しない場合の報酬
        rewardCoin = 0;
    }
    return betAmount * rewardCoin;
}

let hasWon = false;
// 報酬を既にもらったかどうかのフラグ

function checkWin() {
    if (panels[0].isMatched(panels[1], panels[2]) && !hasWon) {
        const reward = calculateReward(panels, betInput.value);
        coins += reward;
        coinsDisplay.textContent = `Coins: ${coins}`;
        resultDisplay.textContent = `Congratulations! You won ${reward} coins!`;
        hasWon = true; // 報酬をもらったフラグを設定
    }
    // ... (他の条件に基づく報酬の処理を追加)
}
*/




class Panel {
    constructor() {
        const section = document.createElement('section');
        section.classList.add('panel');

        this.img = document.createElement('img');
        this.img.src = this.getRandomImage();

        this.timeoutId = undefined;

        this.stop = document.createElement('div');
        this.stop.textContent = 'STOP';
        this.stop.classList.add('stop', 'inactive');
        this.stop.addEventListener('click', () => {
            if (this.stop.classList.contains('inactive')) {
                return;
            }
            this.stop.classList.add('inactive');
            clearTimeout(this.timeoutId);

            panelsLeft--;

            if (panelsLeft === 0) {
                spinButton.classList.remove('inactive');
                panelsLeft = 3;
                checkWin();
            }
        });

        section.appendChild(this.img);
        section.appendChild(this.stop);

        const main = document.getElementById('slot-area');
        main.appendChild(section);
    }

    getRandomImage() {
        const images = [
            '../imgs/seven.png',
            '../imgs/bell.png',
            '../imgs/cherry.png',
        ];
        return images[Math.floor(Math.random() * images.length)];
    }

    spin() {
        this.img.src = this.getRandomImage();
        this.timeoutId = setTimeout(() => {
            this.spin();
        }, 50);
    }

    activate() {
        this.img.classList.remove('unmatched');
        this.stop.classList.remove('inactive');
    }

    isMatched(p1, p2) {
        return this.img.src === p1.img.src && this.img.src === p2.img.src;
    }
}

const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
];

let panelsLeft = 3;

panels.forEach(panel => {
    panel.stop.addEventListener('click', () => {
        if (panel.stop.classList.contains('inactive')) {
            return;
        }
        panel.stop.classList.add('inactive');
        clearTimeout(panel.timeoutId);

        panelsLeft--;

        if (panelsLeft === 0) {
            spinButton.classList.remove('inactive');
            panelsLeft = 3;
            checkWin();
        }
    });
});



/*
const betButton = document.getElementById('bet-button');


function handleBetClick() {
    const betAmount = parseInt(betInput.value);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > coins) {
        return;
    }

    coins -= betAmount;
    coinsDisplay.textContent = `Coins: ${coins}`;

    const reward = calculateReward(panels);
    coins += reward * betAmount;
    coinsDisplay.textContent = `Coins: ${coins}`;

    resultDisplay.textContent = reward > 0 ? `You won ${reward * betAmount} coins!` : "Try again!";
    spinButton.classList.remove('inactive');
}

betButton.addEventListener('click', handleBetClick);
/*
function calculateReward(panels) {
    if (panels[0].isMatched(panels[1], panels[2])) {
        return 3;
    } else if (
        panels[0].isMatched(panels[1], panels[2]) ||
        panels[1].isMatched(panels[0], panels[2]) ||
        panels[2].isMatched(panels[0], panels[1])
    ) {
        return 2;
    }
    return 0;
}
*/




// コイン数
let coins = 100;
const coinsDisplay = document.getElementById('coins-display');
const betInput = document.getElementById('bet-input');
const resultDisplay = document.getElementById('result-display');

let hasWon = false;

function checkWin() {
    if (panels[0].isMatched(panels[1], panels[2]) && !hasWon) {
        const reward = calculateReward(panels);
        coins += reward * parseInt(betInput.value);
        coinsDisplay.textContent = `Coins: ${coins}`;
        resultDisplay.textContent = `Congratulations! You won ${reward * parseInt(betInput.value)} coins!`;
        hasWon = true;
    }
    // ... (他の条件に基づく報酬の処理を追加)
}