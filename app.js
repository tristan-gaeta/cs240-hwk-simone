var game;

let playButton = document.getElementById("play");
playButton.addEventListener("click",()=>{
    if(!game){
        let rounds;
        try{
            rounds = parseInt(document.getElementById("rounds").innerHTML)
            if(rounds < 1){
                rounds = 10
            }
        }catch{
            rounds = 10;
        }
        game = new Game(rounds)
    }
})