class CalcController{

    constructor(){
        this.locale = 'pt-BR'
        this._displayEl = document.querySelector("#display")
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._displayLimit = 10;
        this._currentDate;
        this._flag = true;
        this._operation = []
        this._operator = ''
        this.initialize();
        this.initButtonsEvents()
    }

    initialize(){
        setInterval(() => {
           this.setDisplayDateTime();
        }, 500);
    }
    
    addEventListenerAll(element, events, fn){

        events.split(" ").forEach((event) => {

            element.addEventListener(event,fn,false);
        })

    }

    ac(){
        this.displayCalc = 0;
        this._flag = true;
        this._operation = [];
        this._operator = '';
    }
    ce(){
        this.displayCalc = 0;
        this._flag = true;}
    igual(){
        this._operation.push(this.displayCalc)
        console.log(this._operation)
        this.displayCalc = Number(eval(this._operation.join('')).toFixed(3)).toString()
        this._operation = []
        this._flag = true;
        }

    soma(){ 
        if(this._flag == true){this._operator = '+'}
        else{
            this._flag = true
            this._operation.push(this.displayCalc)
            this._operator = '+'
        }
    }

    subtracao(){
        if(this._flag == true){this._operator = '-'}
        else{
            this._flag = true
            this._operation.push(this.displayCalc)
            this._operator = '-'
        }
    }

    divisao(){ 
        if(this._flag == true){this._operator = '/'}
        else{
            this._flag = true
            this._operation.push(this.displayCalc)
            this._operator = '/'
        }
    }

    multiplicacao(){ 
        if(this._flag == true){this._operator = '*'}
        else{
            this._flag = true
            this._operation.push(this.displayCalc)
            this._operator = '*'
        }
    }

    porcento(){}

    ponto(){
        
        if(this.displayCalc.length >= this.displayLimit){}
        else if(this._flag == true){
            
            this.displayCalc = '.'
            if(this._operator != ''){
                this._operation.push(this._operator)
                this._operator = ''
            }
            this._flag = false
        }
        else this.displayCalc += '.'
    }

    num(btn){
        console.log(this.displayLimit,'-',this.displayCalc.length )
        if(this.displayCalc.length == this.displayLimit){}
        else if(this._flag == true){
            
            this.displayCalc = btn
            if(this._operator != ''){
                this._operation.push(this._operator)
                this._operator = ''
            }
            this._flag = false
        }
        else this.displayCalc += btn
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll('#buttons > g , #parts > g');
        buttons.forEach((btn) => {

            this.addEventListenerAll(btn,"click drag",(element)=>{
        
                if(!isNaN(btn.className.baseVal.replace("btn-",""))){
                   
                    this['num'](btn.className.baseVal.replace("btn-",""))
                }
                else {
                    this[btn.className.baseVal.replace("btn-","")](btn.className.baseVal.replace("btn-",""))
                }
            })
        })
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this.locale,{
            day:"2-digit",
            month:"long",
            year:"numeric"
        })
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale)
    }


    get displayTime(){
        return this._timeEl.innerHTML;
    }
    set displayTime(value){
        this._timeEl.innerHTML = value;
    }
    get displayDate(){
        return this._dateEl.innerHTML;
    }
    set displayDate(value){
        this._dateEl.innerHTML = value;
    }
    get displayCalc(){
        return this._displayEl.innerHTML;
    }
    set displayCalc(value){
        this._displayEl.innerHTML = value;
    }
    get currentDate(){
        return new Date();
    }
    set currentDate(value){
        this._currentDate = value;
    }
    get flag(){
        return this._flag
    }
    set flag(value){
        this._flag = value;
    }
    get displayLimit(){
        return this._displayLimit
    }
    set displayLimit(value){
        this._displayLimit = value;
    }
}