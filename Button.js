class Button {
    constructor(color, pressFn) {
        this.color = color;
        this.node = document.getElementById(`${this.color}Sq`);

        this.node.addEventListener("mouseover", () => {
            this.setActive(true);
        });
        this.node.addEventListener("mouseleave", () => {
            this.setActive(false)
            this.setLit(false)
        });
        this.node.addEventListener("mousedown", () => {
            this.setLit(true)
        });
        this.node.addEventListener("mouseup", () => {
            pressFn();
            this.setLit(false);
        });
    }

    setActive(bool) {
        if (bool) {
            this.node.classList.add("hover");
        } else {
            this.node.classList.remove("hover");
        }
    }

    setLit(bool) {
        if (bool) {
            this.node.classList.add(`light${this.color}`)
        } else {
            this.node.classList.remove(`light${this.color}`)
        }
    }

    sound() {
        let audio = new Audio(`./sounds/${this.color}.wav`);
        return audio.play()
    }

}