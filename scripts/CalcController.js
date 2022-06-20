class CalcController {

    constructor() {
        this._audio = new Audio('click.mp3');
        this._audioOnOff = false;
        this.locale = 'pt-BR';
        this._displayEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._displayLimit = 10;
        this._currentDate;
        this._flag = true;
        this._operation = [];
        this._lastOperation = '';
        this.initialize();
        this.initButtonsEvents();
        this.initKeyboardEvents();
    }

    initialize() {
        setInterval(() => {
            this.setDisplayDateTime();
        }, 500);

        document.querySelectorAll('.btn-ac').forEach(btn => {

            btn.addEventListener('dblclick', e => {

                this.toggleAudio();
            })
        })
    }
    toggleAudio() {
        this._audioOnOff = !this._audioOnOff;
    }

    playAudio() {
        if (this._audioOnOff) {
            this._audio.currentTime=0;
            this._audio.play();
        }
    }

    ac() {
        this.displayCalc = 0;
        this._operation = [];
    }
    ce() {
        this.displayCalc = 0;
        if (this.lastIsNumber()) { this._operation.pop() }
    }
    igual(operator) {
        console.log(this._operation)
        let result
        try {
            result = Number(eval(this._operation.join('')).toFixed(3)).toString()
        } catch (error) {
            result = "S. Error"
        }
        
        if(result.length > 9){
            result = 'L. Number'
            this.displayCalc = result
        }
        else if(operator){
            this.displayCalc = result
            this._operation = [this.displayCalc]
            this._operation.push(operator)
        }
        else {
            this.displayCalc = result
            this._operation = []
        }

    }
    soma() {
        if (this._operation.length == 3) {
            this.igual('+')
        }

        else if (this.lastIsOperator()) {
            this._operation.pop()
            this._operation.push('+')
        }
        else { this._operation.push('+') }

    }
    subtracao() {
        if (this._operation.length == 3) {
            this.igual('-')
        }

        else if (this.lastIsOperator()) {
            this._operation.pop()
            this._operation.push('-')
        }
        else { this._operation.push('-') }
    }
    divisao() {
        if (this._operation.length == 3) {
            this.igual('/')
        }
        else if (this.lastIsOperator()) {
            this._operation.pop()
            this._operation.push('/')
        }
        else { this._operation.push('/') }
    }
    multiplicacao() {
        if (this._operation.length == 3) {
            this.igual('*')
        }
        else if (this.lastIsOperator()) {
            this._operation.pop()
            this._operation.push('*')
        }
        else { this._operation.push('*') }
    }
    porcento() {
        if (this.lastIsNumber) {
            let LastNumber = this._operation.pop()
            this._operation.push((LastNumber / 100).toString())
        }
    }
    ponto() {
        if (this.displayCalc.length > 9) { }
        else if (this.displayCalc === '0' || this.lastIsOperator()) {
            this._operation.push('0.')
            this.displayCalc = '0.';
        }
        else if (this.lastIsNumber() && this.getLastItem() !== '0.' && !(this.getLastItem().includes('.'))) {
            let lastNumber = this._operation.pop()
            this._operation.push(lastNumber + '.')
            this.displayCalc = this.getLastItem()
        }
        else { }
    }
    num(btn) {
        if (this.displayCalc.length > 9) { }
        else if (this.lastIsNumber()) {
            let lastNumber = this._operation.pop()
            this._operation.push(lastNumber + btn)
            this.displayCalc = this.getLastItem()
        }
        else {
            this._operation.push(btn)
            this.displayCalc = this.getLastItem()
        }

    }

    addEventListenerAll(element, events, fn) {

        events.split(" ").forEach((event) => {

            element.addEventListener(event, fn, false);
        })

    }
    getLastItem() {
        return this._operation[this._operation.length - 1]
    }

    lastIsNumber() {
        if (this._operation.length == 0) { return false }
        if (!isNaN(this.getLastItem())) { return true }
        else return false
    }

    lastIsOperator() {
        if (this.getLastItem() == '+' || this.getLastItem() == '-' || this.getLastItem() == '*' || this.getLastItem() == '/') {
            return true
        }
        else return false
    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll('#buttons > g , #parts > g');
        buttons.forEach((btn) => {

            this.addEventListenerAll(btn, "click drag", (element) => {

                if (!isNaN(btn.className.baseVal.replace("btn-", ""))) {
                    this.playAudio()
                    this['num'](btn.className.baseVal.replace("btn-", ""))
                }
                else {
                    try {
                        this.playAudio()
                        this[btn.className.baseVal.replace("btn-", "")](btn.className.baseVal.replace("btn-", ""))
                    } catch (error) { }

                }
            })
        })
    }
    initKeyboardEvents() {
        let translator = {
            'Escape': 'ac',
            'Backspace': 'ce',
            '=': 'igual',
            'Enter': 'igual',
            '+': 'soma',
            '-': 'subtracao',
            '/': 'divisao',
            '*': 'multiplicacao',
            '%': 'porcento',
            '.': 'ponto'
        }
        document.addEventListener('keyup', event => {
            console.log(event.key)
            if (!isNaN(event.key) && event.key != ' ') {
                this.playAudio()
                this['num'](event.key)
            }
            else {
                try {
                    this.playAudio()
                    this[translator[event.key]]()
                } catch (error) {

                }

            }


        })

    }


    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this.locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale)
    }


    get displayTime() {
        return this._timeEl.innerHTML;
    }
    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }
    get displayDate() {
        return this._dateEl.innerHTML;
    }
    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }
    get displayCalc() {
        return this._displayEl.innerHTML;
    }
    set displayCalc(value) {
        this._displayEl.innerHTML = value;
    }
    get currentDate() {
        return new Date();
    }
    set currentDate(value) {
        this._currentDate = value;
    }
    get flag() {
        return this._flag
    }
    set flag(value) {
        this._flag = value;
    }
    get displayLimit() {
        return this._displayLimit
    }
    set displayLimit(value) {
        this._displayLimit = value;
    }
}