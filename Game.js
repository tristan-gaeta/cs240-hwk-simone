class Game {
    constructor(rounds) {
        this.rounds = rounds
        this.B = new Button("blue", () => { this.checkInput("B") })
        this.R = new Button("red", () => { this.checkInput("R") })
        this.G = new Button("green", () => { this.checkInput("G") })
        this.Y = new Button("yellow", () => { this.checkInput("Y") })
        this.playStartSeq();
    }

    async playStartSeq(){
        let seq = await Sequences.getStartSeq();
        for(let color of seq){
            this[color].setLit(true)
            this[color].sound()
            await new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve();
                },120)
            });
            this[color].setLit(false)
        }
        await new Promise((resolve)=>{
            setTimeout(()=>{
                resolve()
            },800);
        });
        this.seq = this.getNewSeq()
    }

    async getNewSeq(rounds=1){
        let newSeq = await Sequences.getSeq(rounds);
        this.seq = newSeq;
        this.playSeq();
    }

    async playSeq(){
        for(let color of this.seq){
            this[color].setLit(true);
            this[color].sound();
            await new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve()
                },400);
            });
            this[color].setLit(false);
        }
    }

    checkInput(color){
        if(color==this.seq.splice(0,1)){
            console.log("yes")
        }
        else{
            console.log("no")
        }
    }
}