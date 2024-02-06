let health = 100;
let gold = 50;
let xp = 0;
let laserDamage = 5;
let shipHealth;
let shipDamage;
let shipXp;
let shipType;

const mainBoard = document.querySelector("#mainScreen");
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const dialogue = document.querySelector("#dialogue");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const xpText = document.querySelector("#xpText");
const shipBoard = document.querySelector("#shipBoard");
const shipName = document.querySelector("#shipName");
const visShipHealth = document.querySelector("#shipHealth");
const locations = [
    {
        name: "home",
        "buttons": [
            "Marketplace",
            "Battle",
            "Conquer Moon (200 Gold)"
        ],
        "button functions": [
            goStore,
            goBattle,
            goConquer
        ],
        text: "Welcome back to the home! What do you plan to do next?"
    },
    {
        name: "marketplace",
        "buttons": [
            "Upgrade Laser (20 Gold)",
            "Buy Health\n(10 Gold)",
            "Leave Marketplace"
        ],
        "button functions": [
            upgradeLaser,
            buyHealth,
            goHome,
        ],
        text: "Welcome to the Marketplace! Buy up what you need!"
    },
    {
        name: "battle",
        "buttons": [
            "Fight Small Ship",
            "Fight Large Ship",
            "Go Back"
        ],
        "button functions": [
            fightSShip,
            fightLShip,
            goHome
        ],
        text: "You want to battle?!?! Choose a ship to take down!"
    },
    {
        name: "in battle",
        "buttons": [
            "Attack",
            "Dodge",
            "Fly Away"
        ],
        "button functions": [
            attack,
            dodge,
            goHome
        ],
        text: "You are in battle! Pick your move!",       
    },
    {
        name: "loss",
        "buttons": [
            "New Game",
            "New Game",
            "New Game"
        ],
        "button functions": [
            goReset,
            goReset,
            goReset
        ],
        text: "You have lost! Press New Game to play again!"

    },
    {
        name: "win",
        "buttons": [
            "Leave Battle",
            "Leave Battle",
            "Leave Battle"
        ],
        "button functions": [
            goHome,
            goHome,
            goHome
        ],
        text: "You have defeated the ship! Leave the area to decide what's next!"
    },
    {
        name: "conquer",
        "buttons": [
            "New Game",
            "New Game",
            "New Game"
        ],
        "button functions": [
            goReset,
            goReset,
            goReset
        ],
        text: "You have conquered the Moon... Congratulations... Is there more?"        
    }
];

const ships = [
    {
        name: "Small Ship",
        health: 20,
        damage: 15,
        xp: 2,
        gold: 30
    },
    {
        name: "Large Ship",
        health: 50,
        damage: 30,
        xp: 4,
        gold: 60
    },
    {
        name: "Moon",
        health: 500,
        damage: 60,
        xp: 200,
        gold: 200
    }
];
button1.onclick = goStore;
button2.onclick = goBattle;
button3.onclick = goConquer;

function update(location) {
    button1.innerText = location["buttons"][0];
    button2.innerText = location["buttons"][1];
    button3.innerText = location["buttons"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    dialogue.innerText = location["text"]

}

function goHome() {
    update(locations[0]);
    if(mainBoard.style.height !== "425px") {
        mainBoard.style.height = "425px";
        shipBoard.style.display = "none";
    }
}
function goStore() {
    update(locations[1]);
    mainBoard.style.height = "425px"
}

function upgradeLaser() {
    if(gold >= 20) {
        gold -= 20;
        laserDamage ++;
        goldText.innerText = gold;
        dialogue.innerText = "Your laser now does a minimum of " + laserDamage + " damage!"
    } else {
        dialogue.innerText = "You do not have enough money to upgrade your laser!";
    }

}

function buyHealth() {
    if(gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        dialogue.innerText = "You do not have enough gold to buy more health! Good luck out there!";
    }

}
function goBattle() {
    update(locations[2]);
}

function setFight(ship) {
    shipHealth = ship.health;
    shipDamage = ship.damage;
    shipXp = ship.xp;
    shipBoard.style.display = "flex";
    mainBoard.style.height = "450px";
    shipName.innerText = ship.name;
    visShipHealth.innerText = shipHealth;
    console.log(2);

}
function fightSShip() {
    update(locations[3]);
    setFight(ships[0]);
    shipType = 0;

}
function fightLShip() {
    update(locations[3]);
    setFight(ships[1]);
    shipType = 1;

}

function attack() {
    if(Math.floor(Math.random()*10) >= 3) {
        health -= ships[shipType].damage;
        health = setZero(health);
        healthText.innerText = health;
        dialogue.innerText = "The Ship hit you for " + ships[shipType].damage + " damage!\n\n";
        if(health === 0) {
            goLoss();
            return;

        }
    }else{
        dialogue.innerText = "The Ship has missed and has done 0 damage!\n\n";
    }
    if(Math.floor(Math.random()*10) >= 2) {
        let turnDamage = laserDamage + Math.floor(xp * Math.random());
        shipHealth -= turnDamage;
        shipHealth = setZero(shipHealth);
        visShipHealth.innerText = shipHealth;
        dialogue.innerText += "You hit the enemy ship for " + turnDamage + " damage!";
        if(shipHealth === 0) {
            goWin();
        }
    } else {
        dialogue.innerText  += "You missed the enemy ship!";
    }

}

function setZero(x) {
    if (x < 0) {
        return 0;
    } else {
        return x;
    }
}
function dodge() {
    if(Math.floor(Math.random()*10) > 5) {
        dialogue.innerText = "You have successfully dodged the ships attack!\n\n";
        let goldReward = ships[shipType].gold;
        gold += goldReward;
        goldText.innerText = gold;
        xp++;
        xpText.innerText = xp;
        dialogue.innerText += "You have recieved " + goldReward + " gold and 1 xp!";
    } else {
        dialogue.innerText = "You have failed to dodge the ships attack!\n\n You have taken " + ships[shipType].damage + " damage!";
        health -= ships[shipType].damage;
        healthText.innerText = health;
    }

}
function goConquer() {
    if(gold >= 200) {
        update(locations[3]);
        setFight(ships[2]);
        shipType = 2;
        dialogue.innerText = "You have chosen to conquer the Moon and win it for all... Good luck..."
    } else {
        dialogue.innerText = "You do not have enough money to battle the Moon. To conquer it all..."
    }
}

function goLoss() {
    update(locations[4]);
}

function goReset() {
    goHome();
    health = 100;
    healthText.innerText = health;
    gold = 50;
    goldText.innerText = gold;
    xp = 0;
    xpText.innerText = xp;
    laserDamage = 5;
    console.log(laserDamage);
}

function goWin() {
    if(shipType == 2) {
        update(locations[6]);
    } else {
        update(locations[5]);
        xp += ships[shipType].xp;
        xpText.innerText = xp;
        gold += Math.floor(ships[shipType].gold + (ships[shipType].gold * (Math.random()*2)));
        goldText.innerText = gold;
    }
}