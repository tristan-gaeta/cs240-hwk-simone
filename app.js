var game;

let playButton = document.getElementById("play");
playButton.addEventListener("click", () => {
    let rounds = parseInt(document.getElementById("rounds").value)
    if (!rounds || rounds < 1) {
        rounds = 10;
        document.getElementById("rounds").value = 10;
    }
    document.body.style.backgroundColor = "black"
    console.log(rounds)
    game = new Game(rounds)

})