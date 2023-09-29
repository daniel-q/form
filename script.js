
const form = document.getElementById("form");
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirmation = document.getElementById("password-confirmation");

const CEP = document.getElementById("CEP")
const estado = document.getElementById("region")
const rua = document.getElementById("rua")
const numero = document.getElementById("numero")
const bairro = document.getElementById("bairro")
const complemento = document.getElementById("complemento")
const cidade = document.getElementById("cidade")


CEP.addEventListener("keypress", (e) => {
  const onlyNumbers = /[0-9]|\./;
  const key = String.fromCharCode(e.keyCode);

  console.log(key);

  console.log(onlyNumbers.test(key));

  // allow only numbers
  if (!onlyNumbers.test(key)) {
    e.preventDefault();
    return;
  }
});

// Evento to get address
CEP.addEventListener("keyup", (e) => {
  const inputValue = e.target.value;

  //   Check if we have a CEP
  if (inputValue.length === 8) {
    getAddress(inputValue);
  }
});

const getAddress = async (cep) => {
  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

  const response = await fetch(apiUrl);

  const data = await response.json();

  console.log(data);
  
  console.log(data.erro);

  // Show error and reset form
  if (data.erro === "true") {
    

    addressForm.reset();
    
    errorInput(CEP,"CEP Inválido, tente novamente.");
    return;
  }

    // Activate disabled attribute if form is empty
  

  rua.value = data.logradouro;
  cidade.value = data.localidade;
  bairro.value = data.bairro;
  estado.value = data.uf;
  
  if(rua.value==''){

    rua.value = "Indeterminado"
  }
  if(bairro.value==''){
    bairro.value = "Indeterminado"
  }
  
};


form.addEventListener("submit", async (event) => {
  
  event.preventDefault();
  if(checkForm()){
    const usernamevalue = username.value
    const emailvalue =email.value
    const passwordvalue = password.value

    const cepvalue = CEP.value
    const estadovalue = estado.value
    const cidadevalue = cidade.value 
    const bairrovalue = bairro.value 
    const ruavalue = rua.value
    const numerovalue = numero.value
    const complementovalue = complemento.value
    
    console.log(passwordvalue)
    const response = await fetch('http://127.0.0.1:3000/adicionar-usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usernamevalue, emailvalue, passwordvalue,cepvalue,estadovalue,cidadevalue,bairrovalue,ruavalue,numerovalue,complementovalue}),
    });
    
    if (response.ok) {
      alert('Usuário cadastrado com sucesso!');
      
    } else {
      alert('Erro ao cadastrar usuário.');
    }
  

}
})

email.addEventListener("blur", () => {
  checkInputEmail();
})


username.addEventListener("blur", () => {
  checkInputUsername();
})


function checkInputUsername(){
  const usernameValue = username.value;

  if(usernameValue === ""){
    errorInput(username, "Preencha um username!")
  }else{
    const formItem = username.parentElement;
    formItem.className = "form-content"
  }

}

function checkInputEmail(){
  const emailValue = email.value;

  if(emailValue === ""){
    errorInput(email, "O email é obrigatório.")
  }else{
    const formItem = email.parentElement;
    formItem.className = "form-content"
  }


}


function checkInputPassword(){
  const passwordValue = password.value;

  if(passwordValue === ""){
    errorInput(password, "A senha é obrigatória.")
  }else if(passwordValue.length < 8){
    errorInput(password, "A senha precisa ter no mínimo 8 caracteres.")
  }else{
    const formItem = password.parentElement;
    formItem.className = "form-content"
  }


}


function checkInputPasswordConfirmation(){
  const passwordValue = password.value;
  const confirmationPasswordValue = passwordConfirmation.value;

  if(confirmationPasswordValue === ""){
    errorInput(passwordConfirmation, "A confirmação de senha é obrigatória.")
  }else if(confirmationPasswordValue !== passwordValue){
    errorInput(passwordConfirmation, "As senhas não são iguais.")
  }else{
    const formItem = passwordConfirmation.parentElement;
    formItem.className = "form-content"
  }


}

function checkInputCEP(){
  const cepvalue = CEP.value
  if(cepvalue==""){
    errorInput(CEP,"O CEP é obrigatório")
  }
  else{
    const formItem = CEP.parentElement;
    formItem.className = "form-content"
  }
}



function checkInputEstado(){
  const estadovalue = estado.value
  if(estadovalue==""){
    errorInput(estado,"O Estado é obrigatório")
  }
  else{
    const formItem = rua.parentElement;
    formItem.className = "form-content"
  }
}




function checkInputRua(){
  const ruavalue = rua.value
  if(ruavalue==""){
    errorInput(rua,"A rua é obrigatória")
  }
  else{
    const formItem = rua.parentElement;
    formItem.className = "form-content"
  }
}


function checkInputNumero(){
  const numerovalue = numero.value
  console.log(numero.value)
  if(numerovalue==""){
    errorInput(numero,"O Numero é obrigatório")
  }
  else{
    const formItem = numero.parentElement;
    formItem.className = "form-content"
  }
}


function checkInputBairro(){
  const bairrovalue = bairro.value
  if(bairrovalue==""){
    errorInput(bairro,"O CEP é obrigatório")
  }
  else{
    const formItem = bairro.parentElement;
    formItem.className = "form-content"
  }
}



function checkInputComplemento(){
  
 
  
  const formItem = complemento.parentElement;
  formItem.className = "form-content"
  
}


function checkInputCidade(){
  const cidadevalue = cidade.value
  if(cidadevalue==""){
    errorInput(cidade,"A Cidade é obrigatório")
  }
  else{
    const formItem = cidade.parentElement;
    formItem.className = "form-content"
  }
}


function checkForm(){
  checkInputUsername();
  checkInputEmail();
  checkInputPassword();
  checkInputPasswordConfirmation();
  checkInputCEP();
  checkInputEstado();
  checkInputRua();
  checkInputNumero();
  checkInputBairro();
  checkInputComplemento();
  checkInputCidade();

  const formItems = form.querySelectorAll(".form-content")

  const isValid = [...formItems].every( (item) => {
    return item.className === "form-content"
  });
  console.log(isValid)
  if(isValid){
    return true
  }
  return false
}


function errorInput(input, message){
  const formItem = input.parentElement;
  const textMessage = formItem.querySelector("a")

  textMessage.innerText = message;

  formItem.className = "form-content error"

}

