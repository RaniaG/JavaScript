

var new_game_btn = document.querySelector(".btn-new");
var roll_dice_btn = document.querySelector(".wrapper .btn-roll");
var hold_btn = document.querySelector(".wrapper .btn-hold");

var player_0_panel = document.querySelector(".wrapper .player-0-panel");
var player_1_panel = document.querySelector(".wrapper .player-1-panel");

var active_player = document.querySelector(".wrapper .active");

var active_current = document.querySelector(".wrapper .active .player-current-box .player-current-score");
var active_score = document.querySelector(".wrapper .active .player-score");

var dice_img = document.querySelector(".wrapper .dice");

var player_current = document.querySelectorAll(".player-current-score");
var player_score = document.querySelectorAll(".player-score");

function clearAll() {
    player_current[0].innerText = "0";
    player_current[1].innerText = "0";

    player_score[0].innerText = "0";
    player_score[1].innerText = "0";

    dice_img.style.visibility = "hidden";

}
function new_game() {
    clearAll();
    active_player.classList.remove("winner");
    counter = 0;

    hold_btn.addEventListener("click", hold);
    roll_dice_btn.addEventListener("click", roll);
    console.log('here');
    document.getElementById("name-0").innerText = "player 1";
    document.getElementById("name-1").innerText = "player 2";

    player_0_panel.classList.add("active");
    player_1_panel.classList.remove("active");

}

function toggle_player_panel() {
    console.log("sth");
    player_0_panel.classList.toggle("active");
    player_1_panel.classList.toggle("active");
}
function update_current(val) {
    active_current = document.querySelector(".wrapper .active .player-current-box .player-current-score");
    active_current.innerText = val;
}

function update_dice() {
    dice_img.style.visibility = 'visible';
    dice_img.src = "dice-" + rand + ".png";
}
function roll() {

    rand = Math.ceil(Math.random() * 6);
    update_dice();
    if (rand == 1) {
        update_current("0");
        toggle_player_panel();
        counter = 0;
    }
    else {
        counter += rand;
    }
    update_current(counter);
}
function hold() {
    active_score = document.querySelector(".wrapper .active .player-score");
    active_score.innerText = parseInt(active_score.innerText) + counter;
    update_current("0");
    dice_img.style.visibility = "hidden";
    console.log(check_win());
    if (!check_win())
        toggle_player_panel();
    counter = 0;
}
function check_win() {
    active_score = document.querySelector(".wrapper .active .player-score");
    if (parseInt(active_score.innerText) >= win_score) {
        console.log("!");

        var active_player_name = document.querySelector(".wrapper .active .player-name");
        active_player_name.innerText = 'winner';
        active_player = document.querySelector(".wrapper .active");

        active_player.classList.add("winner");
        hold_btn.removeEventListener("click", hold);
        roll_dice_btn.removeEventListener("click", roll);
        dice_img.style.visibility = "hidden";
        return true;
    }
    return false;
}

var counter = 0;
var win_score = 25;
var rand = 0;
clearAll();
new_game_btn.addEventListener("click", new_game);
hold_btn.addEventListener("click", hold);
roll_dice_btn.addEventListener("click", roll);
