const recoveryUser = JSON.parse(localStorage.getItem('user'))
let cardRecoveryData = document.getElementById("cardRecoveryData")
if (localStorage.user) {
    cardRecoveryData.classList.toggle("alertAtivo")
    
    cardRecoveryData.innerHTML += 

    `   <h1>Usuário cadastrado Anteriormente</h1>
       <span class = "cardData"><label> Nome: </label> ${recoveryUser.Nome}</span>
        <span class = "cardData"><label> E-mail: </label> ${recoveryUser.Email}</span>
        <span class = "cardData"><label> Tel: </label> ${recoveryUser.Telefone}</span>
        <span class = "cardData"><label> CEP: </label> ${recoveryUser.Cep}</span>
        <span class = "cardData"><label> Cidade: </label> ${recoveryUser.Cidade}</span>
        <span class = "cardData"><label> UF: </label> ${recoveryUser.Uf}</span>
        <span class = "cardData"><label> Rua: </label> ${recoveryUser.Rua}</span>
        <span class = "cardData"><label> Numero: </label> ${recoveryUser.numero}</span>
        <span class = "cardData"><label> complemento: </label> ${recoveryUser.complemento}</span>
        
    `
}


let userName= document.getElementById('userName')
let email= document.getElementById('email')
const btnSend = document.getElementById('btn-send')
let telDDD = document.getElementById('ddd')
let telContato = document.getElementById('telefone')
let numbercep = document.getElementById('cep')
let rua = document.getElementById('rua')
let cidade = document.getElementById('cidade')
let uf = document.getElementById('uf')
let numbResidencia = document.getElementById('numbResidencia')
let complementoEndereco = document.getElementById('complementoEndereco')
let msgInvalidName = document.getElementById('msgInvalid-name')
let msgInvalidEmail = document.getElementById('msgInvalid-Email')
let msgInvalidPhone = document.getElementById('msgInvalid-phone')
let msgInvalidCep = document.getElementById('msgInvalid-cep')
let msgInvalidnumber = document.getElementById('msgInvalid-number')
let inputRegisters = [userName,email,telDDD,telContato,numbercep,numbResidencia];

telDDD.setAttribute('maxlength',2)
telContato.setAttribute('maxlength',10)
numbercep.setAttribute('maxlength',8)





btnSend.disabled=true;
cidade.disabled=true
rua.disabled=true
uf.disabled=true


function validationInputs (ipt, status){
    ipt.classList.toggle("successful",status)
    ipt.classList.toggle("error",!status)

    const inputValidation = [...inputRegisters].some((el) => {
        return el.value.trim() === '' ||  el.classList.contains('error')
        });
       btnSend.disabled = inputValidation
          
     switch (ipt.name) {
         case "Nome":
             msgInvalidName.innerText='Campo obrigatório'
             msgInvalidName.classList.toggle("alertAtivo",!status)
             break;
         case "email":
             msgInvalidEmail.innerText='Informe um E-mail válido'
             msgInvalidEmail.classList.toggle("alertAtivo",!status)
             break;
         case "dddPhone":
            msgInvalidPhone.innerText='DDD inválido!'
            msgInvalidPhone.classList.toggle("alertAtivo",!status)
             break;
         case "phone":
            msgInvalidPhone.innerText='Telefone inválido!'
            msgInvalidPhone.classList.toggle("alertAtivo",!status)
             break;
         case "cep":
            msgInvalidCep.classList.remove("alertAtivo",!status)
             break;
         
        default:
            break;
     }

    
}





userName.addEventListener('input',()=>{
    validationInputs(userName,userName.value.trim() !== '')
})

email.addEventListener('input',(e)=>{
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    validationInputs(e.target,regex.test(e.target.value))

})


telDDD.addEventListener('input',(e)=>{
    telDDD.value=   telDDD.value.replace(/\D/g,'')
    const regex = /(^\d{2})$/
    validationInputs(telDDD, regex.test(telDDD.value) )

})

telContato.addEventListener('input',(e)=>{
    telContato.value= telContato.value.replace(/\D/g,'')
    let telValid = /^\d{8,9}$/.test(telContato.value)
    if (telValid) {
          telContato.value = telContato.value.replace(/(\d)(\d{4})$/, "$1-$2")
    }

    validationInputs(telContato,telValid)

})

numbercep.addEventListener('input',(e)=>{

    numbercep.value = numbercep.value.replace(/\D/g,'')
    let cepValid = /^\d{8}$/.test(numbercep.value);
    if (cepValid) {
        numbercep.value = numbercep.value.replace(/(\d{5})(\d{3})$/, "$1-$2")
        searchCep(numbercep.value)
        
    }

    validationInputs(numbercep,cepValid)
})

numbResidencia.addEventListener('input',()=>{
    validationInputs(numbResidencia,numbResidencia.value.trim() !== '')
})


function searchCep(cepNumber){
  
    fetch(`https://brasilapi.com.br/api/cep/v1/${cepNumber}`,
    {method: 'GET',
        headers: {'content-type': "application/json"}
                    
    })
    .then(Response => {
        return Response.json()})
    .then(jsonbBodyceps =>{
        if (jsonbBodyceps.type === 'service_error') {
            msgInvalidCep.innerText='Cep Inexistente!'
            msgInvalidCep.classList.toggle("alertAtivo")

        }else{
            numbercep.disabled = true
            cidade.value = jsonbBodyceps.city
            rua.value = jsonbBodyceps.street
            uf.value = jsonbBodyceps.state

        }
        
        

    
    })
    .catch((error) => {
  
        console.error("error: ", error)
    })

}

btnSend.addEventListener('click', async()=>{
    localStorage.clear()

    const userData = {
        Nome:userName.value,
        Email:email.value,
        Telefone:`(${telDDD.value}) ${telContato.value}`,
        Cep:numbercep.value,
        Rua:rua.value,
        Cidade:cidade.value,
        Uf: uf.value,
        complemento: complementoEndereco.value,
        numero: numbResidencia.value
    }

    localStorage.setItem("user",JSON.stringify(userData));

    await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuário cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 1500
      })

        location.reload()


   
    
    })

