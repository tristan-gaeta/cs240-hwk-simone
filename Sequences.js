class Sequences {
    static async getStartSeq() {
        try {
            let startSq = await axios.get(`http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start`);
            return startSq.data.sequence

        } catch (err) {
            console.log("Error")
        }
    }

    static async getSeq(size) {
        try {
            let seq = await axios.get(`http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=getSolution&rounds=${size}`);
            return seq.data.key

        } catch (err) {
            console.log("Error")
        }
    }

    static playthrough(audio){
        audio.play()
        return new Promise((resolve)=>{
            audio.addEventListener("ended",()=>{
                resolve();
            })
        });
    }
}