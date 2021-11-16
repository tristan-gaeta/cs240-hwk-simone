class Game {
    constructor(rounds) {
        this.rounds = rounds
        this.currentRound = 1;
        this.status = document.getElementById("status")
        this.B = new Button("blue", () => { this.checkInput("B") })
        this.R = new Button("red", () => { this.checkInput("R") })
        this.G = new Button("green", () => { this.checkInput("G") })
        this.Y = new Button("yellow", () => { this.checkInput("Y") })
        this.playStartSeq();
    }

    async playStartSeq() {
        let seq = await Sequences.getStartSeq();
        await this.playSeq(seq, 240);
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 2000);
        });
        this.getNewSeq()
    }

    async getNewSeq() {
        let newSeq = await Sequences.getSeq(this.currentRound);
        this.currentRound++;
        this.seq = newSeq;
        await this.playSeq(this.seq, 800);
    }

    async playSeq(seq, delay) {
        if (seq.length == 0) {
            return;
        }
        let color = seq.slice(0, 1);
        this[color].setLit(true);
        await this[color].sound();
        await new Promise((resolve) => {
            setTimeout(() => {
                this[color].setLit(false);
                resolve();
            }, delay - 50);
        });
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 50);
        });
        await this.playSeq(seq.slice(1), delay);
    }

    async checkInput(color) {
        let ans = this.seq.splice(0, 1)
        if (color == ans) {
            this[color].sound()
            if (this.seq.length == 0) {
                if (this.currentRound > this.rounds) {
                    document.body.style.backgroundColor = "DeepSkyBlue"
                    new Audio("sounds/win.mp3").play()
                } else {
                    this.status.innerHTML = `Good job! Prepare for the next round.`
                    await new Audio("sounds/nextRound.wav").play();
                    await new Promise((resolve) => {
                        setTimeout(resolve, 800);
                    })
                    this.status.innerHTML = `Round ${this.currentRound} of ${this.rounds}.`
                    await new Promise((resolve) => {
                        setTimeout(resolve, 800);
                    })
                    this.getNewSeq();
                }
            } else {
                this.status.innerHTML = `So far so good! ${this.seq.length} more to go!`
            }
        }

        else {
            if (ans) {
                document.body.style.backgroundColor = "hotpink"
                let audio1 = new Audio("sounds/wrong.wav");
                audio1.play();
                let audio2 = new Audio("sounds/lose.wav");
                audio2.play();
            }
        }
    }
}