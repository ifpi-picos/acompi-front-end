// Wesley
//tela de cadastro
const senha1Cadastro = document.querySelector('#senha1Cadastro')
const senha2Cadastro = document.querySelector('#senha2Cadastro')
const nomeCadastro = document.querySelector('#nomeCadastro')
const emailCadastro = document.querySelector('#emailCadastro')
const botaoCadastro = document.querySelector('#btnCadastro')

//quando clicar no botao cadastrar
//verificar se todos os campos do cadastro estao preenchidos
function validandoCamposCadastro(event) {
  if (nomeCadastro.value != '') {
    if (nomeCadastro.value.length >= 3) {
      if (emailCadastro.value != '') {
        if (emailCadastro.value.indexOf('@ifpi.edu.br') != -1 || emailCadastro.value.indexOf('@aluno.ifpi.edu.br') != -1) {
          if (senha1Cadastro.value != '') {
            if (senha1Cadastro.value.length >= 8 && senha1Cadastro.value.length <= 12) {
              if (senha2Cadastro.value != '') {
                enviarMsgCadastro(
                  nomeCadastro,
                  emailCadastro,
                  senha1Cadastro,
                  senha2Cadastro,
                  event
                )
              } else {
                alert('Preencha senha de confirmação')
              }
            } else {
              alert('A senha deve conter entre 8 e 12 caracteres')
            }
          } else {
            alert('Preencha senha')
          }
        } else {
          alert('Utilize um email do instituto federal do piauí')
        }
      } else {
        alert('Preencha e-mail')
      }
    } else {
      alert('utilize um nome com mais de 2 caracteres')
    }
  } else {
    alert('Preencha nome')
  }
}

//emitir alerta avisando se estar tudo certo ou se a senha1 esta diferente da senha2
function enviarMsgCadastro(nome, email, senha1, senha2, event) {
  if (validaSenha(senha1Cadastro, senha2Cadastro)) {
    // mudar a pagina
    submitForm(event)
  } else {
    alert('A senha de confirmação precisa ser igual a primeira senha!')
    senha1Cadastro.value = ''
    senha2Cadastro.value = ''
  }
}

//nao envia o formulario e navega entre as paginas mudando a url
function submitForm(event) {
  event.preventDefault();
  var url_atual = window.location.pathname;
  if (url_atual.endsWith("autenticacao/cadastro.html")) {
    botaoCadastro.addEventListener('click', function () {
      const dados = getDadosForm()
      enviarDados(dados)
      function getDadosForm() {
        const nomeCadastro = document.querySelector('#nomeCadastro')
        const emailCadastro = document.querySelector('#emailCadastro')
        const senha1Cadastro = document.querySelector('#senha1Cadastro')
        if (nomeCadastro.value === null || emailCadastro.value === null || senha1Cadastro.value === null) {
          console.log('campos vazios')
          return
        }
        const dados = {
          nome: nomeCadastro.value,
          senha: senha1Cadastro.value,
          email: emailCadastro.value,
        }
        return dados
      }
      async function enviarDados(dados) {
        try {
          const resposta = await fetch('https://acompi-back-end-la29.onrender.com/cadastro', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
          })
          if (resposta.status === 201) {
            document.querySelector('#senha1Cadastro').value = ''
            document.querySelector('#senha2Cadastro').value = ''
            document.querySelector('#nomeCadastro').value = ''
            document.querySelector('#emailCadastro').value = ''
            alert('Dados enviados, clique no link enviado ao email para verificar a conta')
            window.location.href = "validacao.html"
          } else {
            alert('este email já possui uma conta cadastrada')
            console.log('Erro ao realizar cadastro')
          }
        } catch (erro) {
          console.error(erro)
        }
      }
    })
  };
  if (window.location.href.endsWith("autenticacao/validacao.html")) {
    window.location.href = "login.html"
  } else if (window.location.href.endsWith("autenticacao/login.html")) {
    window.location.assign("../usuarios/aluno/professores.html")
  } else if (window.location.href.endsWith("autenticacao/modificar-senha.html")) {
    location.href = "login.html"
  }
}


//verificar se a senha1 digitada esta igual a senha2
function validaSenha(senha1, senha2) {
  if (senha1.value == senha2.value) {
    return true
  } else {
    return false
  }
}
//fim da tela de cadastro