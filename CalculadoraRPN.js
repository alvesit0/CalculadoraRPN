"use strict";

class CalculadoraRPN {
    constructor() { 
        // Pila para operaciones
        this.stack = new Array();

        // Pantalla superior e inferior
        this.stackScreen = '';
        this.screen = '';

        // Operando actualmente en pantalla
        this.active = '';

        // Flag para la tecla shift
        this.shifted = false;

        // Acceso por teclado
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            
            if (key !== ' ')
                if (Number.isInteger(Number(key))) this.value(key);
                else
                switch(key) {
                    case '.': this.dot(); break;
                    case ',': this.dot(); break;
                    case '+': this.sum(); break;
                    case '-': this.substract(); break;
                    case '*': this.product(); break;
                    case '/': this.division(); break;
                    case 'c': this.clear(); break;
                    case 's': this.sin(); break;
                    case 'c': this.cos(); break;
                    case 't': this.tan(); break;
                    case 'l': this.log(); break;
                    case 'q': this.sqrt(); break;
                    case 'p': this.powerOf2(); break;
                    case 'Enter': this.enter(); break;
                }
        });
    }

    enter() {
        this.stack.push(Number(this.screen));
        this.updateAll();
    }

    value(num) {
        this.screen += num;
        this.updateResultScreen();
    }

    dot() {
        this.screen += '.';
        this.updateResultScreen();
    }

    sum() {
        if (this.screen == '' && this.stack.length > 1) {
            let n1 = this.stack.pop();
            let n2 = this.stack.pop();
            this.screen = n1 + n2;
            this.enter();
        }
    }

    substract() {
        if (this.screen == '' && this.stack.length > 1) {
            let n1 = this.stack.pop();
            let n2 = this.stack.pop();
            this.screen = n1 - n2;
            this.enter();
        }
    }

    product() {
        if (this.screen == '' && this.stack.length > 1) {
            let n1 = this.stack.pop();
            let n2 = this.stack.pop();
            this.screen = n1 * n2;
            this.enter();
        }
    }

    division() {
        if (this.screen == '' && this.stack.length > 1) {
            let n1 = this.stack.pop();
            let n2 = this.stack.pop();
            this.screen = n1 / n2;
            this.enter();
        }
    }

    sqrt() {
        if (this.screen == '') {
            let n1 = this.stack.pop();
            this.screen = Math.sqrt(n1);
            this.enter();
        }
    }

    log() {
        if (this.screen == '') {
            let n1 = this.stack.pop();
            this.screen = Math.log(n1);
            this.enter();
        }
    }

    powerOf2() {
        if (this.screen == '') {
            let n1 = this.stack.pop();
            this.screen = Math.pow(n1, 2);
            this.enter();
        }
    }

    sin() {
        if (this.screen == '') {
            let n1 = this.stack.pop();
            if (this.shifted)
                this.screen = Math.asin(n1);
            else
                this.screen = Math.sin(n1);
            this.enter();
        }
    }

    tan() {
        if (this.screen == '') {
            let n1 = this.stack.pop();
            if (this.shifted)
                this.screen = Math.atan(n1);
            else
                this.screen = Math.tan(n1);
            this.enter();
        }
    }

    cos() {
        if (this.screen == '') {
            let n1 = this.stack.pop();
            if (this.shifted)
                this.screen = Math.acos(n1);
            else
                this.screen = Math.cos(n1);
            this.enter();
        }
    }

    clear() {
        this.stack = new Array();
        this.updateAll();
    }

    shift() {
        if (!this.shifted){
            document.getElementsByTagName('input')[1].value = 'sin⁻¹';
            document.getElementsByTagName('input')[2].value = 'cos⁻¹';
            document.getElementsByTagName('input')[3].value = 'tan⁻¹';
            this.shifted = true;
        }
        else {
            document.getElementsByTagName('input')[1].value = 'sin';
            document.getElementsByTagName('input')[2].value = 'cos';
            document.getElementsByTagName('input')[3].value = 'tan';
            this.shifted = false;
        }
        this.updateAll();
    }

    updateAll() {
        this.screen = '';
        this.updateResultScreen();
        this.updateStackScreen();
    }

    updateResultScreen() {
        document.getElementsByTagName('input')[0].value = this.screen;
    }

    updateStackScreen() {
        this.stackScreen = '';
        for (var i = 0; i < this.stack.length; i++)
            this.stackScreen += this.stack[i].toString() + '\n';
        document.getElementsByTagName('textarea')[0].value = this.stackScreen;
    }
    
}

var RPNCalculator = new CalculadoraRPN();