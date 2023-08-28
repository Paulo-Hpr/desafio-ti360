const recoveryUser = JSON.parse(localStorage.getItem("user"));
let cardRecoveryData = document.getElementById("cardRecoveryData");
let userCard = document.getElementById("userCard");
if (recoveryUser != null || recoveryUser != undefined) {
  const itensName = [
    "Nome",
    "Email",
    "Telefone",
    "Cep",
    "Cidade",
    "Uf",
    "Rua",
    "numero",
    "complemento",
  ];
  userCard.classList.toggle("alertAtivo");
  const list = document.createElement("ul");
  list.classList.add("cardListData");

  itensName.forEach((names) => {
    const listItens = document.createElement("li");
    listItens.textContent = `${names} : ${recoveryUser[names]}`;
    list.appendChild(listItens);
  });

  cardRecoveryData.appendChild(list);
}

let userName = document.getElementById("userName");
let email = document.getElementById("email");
const btnSend = document.getElementById("btn-send");
let telDDD = document.getElementById("ddd");
let userPhone = document.getElementById("userPhone");
let numbercep = document.getElementById("cep");
let street = document.getElementById("street");
let neighborhood = document.getElementById("neighborhood");
let city = document.getElementById("city");
let uf = document.getElementById("uf");
let numbResidence = document.getElementById("numbResidence");
let complementAddress = document.getElementById("complementAddress");
let msgInvalidName = document.getElementById("msgInvalid-name");
let msgInvalidEmail = document.getElementById("msgInvalid-Email");
let msgInvalidPhone = document.getElementById("msgInvalid-phone");
let msgInvalidCep = document.getElementById("msgInvalid-cep");
let msgInvalidnumber = document.getElementById("msgInvalid-number");
let inputRegisters = [userName, email, telDDD, userPhone, numbercep];

telDDD.setAttribute("maxlength", 2);
userPhone.setAttribute("maxlength", 10);
numbercep.setAttribute("maxlength", 8);

btnSend.disabled = true;
neighborhood.disabled = true;
city.disabled = true;
street.disabled = true;
uf.disabled = true;

function validationInputs(ipt, status) {
  ipt.classList.toggle("successful", status);
  ipt.classList.toggle("error", !status);

  const inputValidation = [...inputRegisters].some((el) => {
    return el.value.trim() === "" || el.classList.contains("error");
  });
  btnSend.disabled = inputValidation;

  switch (ipt.name) {
    case "Nome":
      msgInvalidName.textContent = "Campo obrigatório";
      msgInvalidName.classList.toggle("alertAtivo", !status);
      break;
    case "email":
      msgInvalidEmail.textContent = "Informe um E-mail válido";
      msgInvalidEmail.classList.toggle("alertAtivo", !status);
      break;
    case "dddPhone":
      msgInvalidPhone.textContent = "DDD inválido!";
      msgInvalidPhone.classList.toggle("alertAtivo", !status);
      break;
    case "phone":
      msgInvalidPhone.textContent = "Telefone inválido!";
      msgInvalidPhone.classList.toggle("alertAtivo", !status);
      break;
    case "cep":
      msgInvalidCep.textContent = "CEP inválido!";
      msgInvalidCep.classList.toggle("alertAtivo", !status);
      break;

    default:
      break;
  }
}

userName.addEventListener("input", () => {
  validationInputs(userName, userName.value.trim() !== "");
});

email.addEventListener("input", (e) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  validationInputs(e.target, regex.test(e.target.value));
});

telDDD.addEventListener("input", (e) => {
  telDDD.value = telDDD.value.replace(/\D/g, "");
  const regex = /(^\d{2})$/;
  validationInputs(telDDD, regex.test(telDDD.value));
});

userPhone.addEventListener("input", (e) => {
  userPhone.value = userPhone.value.replace(/\D/g, "");
  let telValid = /^\d{8,9}$/.test(userPhone.value);
  if (telValid) {
    userPhone.value = userPhone.value.replace(/(\d)(\d{4})$/, "$1-$2");
  }

  validationInputs(userPhone, telValid);
});

numbercep.addEventListener("input", (e) => {
  numbercep.value = numbercep.value.replace(/\D/g, "");
  let cepValid = /^\d{8}$/.test(numbercep.value);
  if (cepValid) {
    numbercep.value = numbercep.value.replace(/(\d{5})(\d{3})$/, "$1-$2");
    searchCep(numbercep.value);
  }

  validationInputs(numbercep, cepValid);
});

function searchCep(cepNumber) {
  fetch(`https://brasilapi.com.br/api/cep/v1/${cepNumber}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((Response) => {
      if (Response.ok) {
        return Response.json();
      } else {
        throw new Error("Erro na requisição");
      }
    })
    .then((jsonbBodyceps) => {
      numbercep.disabled = true;
      city.value = jsonbBodyceps.city;
      street.value = jsonbBodyceps.street;
      uf.value = jsonbBodyceps.state;
      neighborhood.value = jsonbBodyceps.neighborhood;
    })
    .catch((error) => {
      validationInputs(numbercep, false);
      console.error("error: ", error);
    });
}

btnSend.addEventListener("click", async () => {
  localStorage.clear();

  const userData = {
    Nome: userName.value,
    Email: email.value,
    Telefone: `(${telDDD.value}) ${userPhone.value}`,
    Cep: numbercep.value,
    Rua: street.value,
    Cidade: city.value,
    Uf: uf.value,
    complemento:
      complementAddress.value != "" ? complementAddress.value : "Não informado",
    numero: numbResidence.value != "" ? numbResidence.value : "N/S",
  };

  localStorage.setItem("user", JSON.stringify(userData));

  await Swal.fire({
    position: "center",
    icon: "success",
    title: "Usuário cadastrado com sucesso!",
    showConfirmButton: false,
    timer: 1500,
  });

  location.reload();
});
