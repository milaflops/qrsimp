const rand = (min = 0, max) => {
    return Math.round(Math.random() * (max - min)) + min
}

const toBits = string => {
    let bits = [];

    for (let i = 0; i < string.length; i++) {
        let stringbits = string[i].charCodeAt(0).toString(2);
        for (let j = 0; j < stringbits.length; j++) {
            if ( stringbits[j] == "0" ) {
                bits.push(0);
            } else {
                bits.push(1);
            }
        }
    }
    return bits;
}

document.addEventListener("DOMContentLoaded", () => {
    const canvasse = document.getElementById("qrcanv");
    const contexte = canvasse.getContext("2d");
    
    contexte.fillStyle = 'rgb(200, 0, 0)';
    contexte.fillRect(10, 10, 50, 50);
    console.log("document loaded lol");

    // a dummy code g enerator for the fun
    const generateCode = (input) => {
        const arraySize = rand(40,40);
        const bits = toBits(input);

        let ofArrays = [];
        let position = 0;
        for(let i = 0; i < arraySize; i++) {
            ofArrays[i] = [];
            for(let j = 0; j < arraySize; j++) {
                ofArrays[i][j] = bits[position];
                position++;
            }
        }
        return ofArrays;
    }

    const drawQRCode = (context, array) => {
        array.forEach((row, rindex) => {
            row.forEach((element, eindex) => {
                if ( element == 1 ) {
                    context.fillRect(
                        rindex * 10,
                        eindex * 10,
                        10,
                        10
                    )
                }
            })
        })
    }

    const redraw = (event) => {
        const x = Math.floor(Math.random() * 400);
        const y = Math.floor(Math.random() * 400);
        contexte.fillRect(x, y, 20, 20)
        // console.log(generateCode());
        contexte.clearRect(0, 0, 400, 400)
        drawQRCode(contexte, generateCode(event.target.value));
    }

    const inputElement = document.getElementById("textual");
    inputElement.addEventListener('input', redraw);
});
