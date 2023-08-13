let inputRegisters = document.getElementsByClassName('input-register');

[...inputRegisters].forEach(el => {
    el.addEventListener('focusout',btnAlowed)

});

let userName= document.getElementById('userName')
userName.setAttribute('required','')

let email= document.getElementById('email')
email.setAttribute('required','')
email.addEventListener('focusout',(e)=>emailValidation(e.target.value))


email.addEventListener('focus',()=>{
    invalidEmail.classList.remove('alertAtivo')
})

let invalidEmail = document.getElementById('invalidEmail')

const btnSend = document.getElementById('btn-send')
btnSend.disabled=true;

btnSend.addEventListener('click',()=>{console.log('enviou!!')})

let telDDD = document.getElementById('ddd')
telDDD.setAttribute('maxlength','2')
telDDD.addEventListener('input',(e)=>addTelDDDMasck(e.target.value))
telDDD.addEventListener('focusout',dddValidation)
telDDD.addEventListener('focus',()=>{
    alertTel.classList.remove('alertAtivo')
})

let telContato = document.getElementById('telefone')
telContato.setAttribute('maxlength','10')
telContato.addEventListener('focusout',telValidation)
telContato.addEventListener('input',(e)=>addTelMask(e.target.value))
telContato.addEventListener('change', (e) => addTelMask(e.target.value))
telContato.addEventListener('focus',()=>{
    alertTel.classList.remove('alertAtivo')
})

const alertTel = document.getElementById('alertTel')
const alertCep = document.getElementById('alertCep')




const numbercep = document.getElementById('cep')
numbercep.setAttribute('maxlength','9')
numbercep.addEventListener('input',(e)=>addCepMask(e.target.value))
numbercep.addEventListener('focusout',cepValidation)
numbercep.addEventListener('focus',()=>{
    alertCep.classList.remove('alertAtivo')
})


function addTelMask(tel){
    tel= tel.replace(/\D/g,'')
    tel = tel.replace(/(\d)(\d{4})$/, "$1-$2")
    telContato.value= tel
    
}

function addTelDDDMasck(ddd){
    ddd= ddd.replace(/\D/g,'')
    telDDD.value=ddd
}

function addCepMask(cep){
    cep= cep.replace(/\D/g,'')
    cep = cep.replace(/(\d)(\d{3})$/, "$1-$2")
    numbercep.value= cep
    
}

function alertTelInvalid(el){
    el.classList.toggle('alertAtivo')
    
}

function telValidation(){
   const numberTel = telContato.value
    if (numberTel.length < 9) {
        alertTelInvalid(alertTel)
    } 
}

function dddValidation() {
    let dddNumber= telDDD.value
    if (dddNumber.length <=1) {
        alertTelInvalid(alertTel)        
    }
    
}
function cepValidation(){
   let cep = numbercep.value
    if (cep.length < 9) {
        alertTelInvalid(alertCep)
    } 
}

function emailValidation (email){
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!regex.test(String(email).toLowerCase())) {
         invalidEmail.innerText='E-mail inválido!'
         invalidEmail.classList.add('alertAtivo')
        }

  }

  function btnAlowed (){
      const inputValidation = [...inputRegisters].some((el) => {
      return el.value.length === 0
      });

      if (!inputValidation) {
            btnSend.disabled=false
        
    }
  }