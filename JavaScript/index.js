// Wesley
//tela de cadastro
const senha1Cadastro = document.querySelector('#senha1Cadastro')
const senha2Cadastro = document.querySelector('#senha2Cadastro')
const nomeCadastro = document.querySelector('#nomeCadastro')
const emailCadastro = document.querySelector('#emailCadastro')
const botaoCadastro = document.querySelector('#btnCadastro')

function escapeHTML(str) {
  return str.replace(/[&<>"'\/]/g, function (char) {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      case '/':
        return '&#x2F;';
      case '\ ':
        return '&#92;';
      default:
        return char;
    }
  });
}



//quando clicar no botao cadastrar
//verificar se todos os campos do cadastro estao preenchidos
function validandoCamposCadastro(event) {
  if (nomeCadastro.value != '') {
    if (nomeCadastro.value.length >= 3) {
      if (emailCadastro.value != '') {
        if (
          emailCadastro.value.indexOf('@ifpi.edu.br') != -1 ||
          emailCadastro.value.indexOf('@aluno.ifpi.edu.br') != -1
        ) {
          if (senha1Cadastro.value != '') {
            if (
              senha1Cadastro.value.length >= 8 &&
              senha1Cadastro.value.length <= 12
            ) {
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
async function submitForm(event) {
  event.preventDefault()
  var url_atual = window.location.pathname
  if (url_atual.endsWith('autenticacao/cadastro.html')) {
    const dados = getDadosForm()

    enviarDados(dados)
    function getDadosForm() {
      const nomeCadastro = document.querySelector('#nomeCadastro')
      const emailCadastro = document.querySelector('#emailCadastro')
      const senha1Cadastro = document.querySelector('#senha1Cadastro')
      if (
        nomeCadastro.value === null ||
        emailCadastro.value === null ||
        senha1Cadastro.value === null
      ) {
        console.log('campos vazios')
        return
      }
      const nome_cadastro = escapeHTML(nomeCadastro.value)
      const senha_cadastro = escapeHTML(senha1Cadastro.value)
      const email_cadastro = escapeHTML(emailCadastro.value)
      const dados = {
        nome: nome_cadastro,
        senha: senha_cadastro,
        email: email_cadastro
      }
      return dados
    }
    async function enviarDados(dados) {
      try {
        const resposta = await fetch(
          'https://acompi-back-end-lhbe.onrender.com/cadastro',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
          }
        )
        if (resposta.status === 201) {
          document.querySelector('#senha1Cadastro').value = ''
          document.querySelector('#senha2Cadastro').value = ''
          document.querySelector('#nomeCadastro').value = ''
          document.querySelector('#emailCadastro').value = ''
          alert(
            'usuário cadatrado, clique no link enviado ao email para validar a conta'
          )
          window.location.href = 'login.html'
        } else {
          alert('este email já possui uma conta cadastrada')
          console.log('Erro ao realizar cadastro')
        }
      } catch (erro) {
        console.error(erro)
      }
    }
  }

  if (window.location.href.endsWith('autenticacao/validacao.html')) {
    window.location.href = 'login.html'
  } else if (window.location.href.endsWith('autenticacao/login.html')) {
    const email_login = escapeHTML(emailLogin.value)
    const senha_login = escapeHTML(senhaLogin.value)
    try {
      const usuario = {
        email: email_login,
        senha: senha_login
      }
      const resp = await fetch(
        'https://acompi-back-end-lhbe.onrender.com/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify(usuario)
        }
      )
      if (resp.status === 201) {
        if (usuario.email.indexOf('@aluno.ifpi.edu.br') != -1) {
          const resposta = await resp.json();
          const token = await JSON.parse(atob(resposta.token.split('.')[1]));
          localStorage.setItem("token", JSON.stringify(token))
          localStorage.setItem("acesso", "true")
          window.location.href = '../usuarios/aluno/escolher-turma.html'
        } else if (usuario.email.indexOf('@ifpi.edu.br') != -1) {
          const resposta = await resp.json();
          const token = await JSON.parse(atob(resposta.token.split('.')[1]));
          localStorage.setItem("token", JSON.stringify(token))
          localStorage.setItem("acesso", "true")
          window.location.href = '../usuarios/professor/ver-cancelar-turma.html'
        }
      } else {
        alert("Dados incorretos!")
      }
    } catch (error) {
      alert(error.message)
    }
  } else if (
    window.location.href.endsWith('autenticacao/modificar-senha.html')
  ) {
    const email_m_senha = escapeHTML(emailModificarSenha.value)
    const senha1_m_senha = escapeHTML(senha1ModificarSenha.value)
    const senha2_m_senha = escapeHTML(senha2ModificarSenha.value)
    try {
      const usuario = {
        email: email_m_senha,
        senha: senha1_m_senha,
        confirmasenha: senha2_m_senha
      }
      const resp = await fetch('https://acompi-back-end-lhbe.onrender.com/modificar-senha', {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(usuario)
      })
      resp.json()
      if (resp.status === 201) {
        alert('Tudo Certo')
        location.href = 'login.html'
      } else {
        console.log(resp)
      }
    } catch (error) {
      alert(resp.message)
    }
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

//tela de verificação de codigo

const codigoVerificacao = document.getElementById('codigoVerificacao')

function enviarMsgValidacao(event) {
  if (codigoVerificacao.value != '') {
    alert(
      'Tudo certo!\nCodigo de Validação correto!  ' + codigoVerificacao.value
    )
    // mudar a pagina
    submitForm(event)
  } else {
    alert('Digite o código no campo solicitado!')
    codigoVerificacao.style.boxShadow = '3px 3px 28px #ee6a6e'
    window.setTimeout(function () {
      codigoVerificacao.style.boxShadow = 'none'
    }, 4000)
  }
}

//fim da tela de verificacao de codigo

// tela ver e cancelar reserva (aluno)
// funçao para o butão mudar
function cancelarReserva(numeroParaIdentificarTurma) {
  const btnCancelarReserva = document.getElementsByClassName(
    'btnCancelarReserva'
  )[numeroParaIdentificarTurma]
  if (btnCancelarReserva.innerHTML == 'Cancelar Reserva') {
    btnCancelarReserva.style.backgroundColor = '#3da9fc'
    btnCancelarReserva.innerHTML = 'Reservar Turma'
  } else {
    btnCancelarReserva.style.backgroundColor = '#c54141'
    btnCancelarReserva.innerHTML = 'Cancelar Reserva'
  }
}
// fim tela ver e cancelar reserva (aluno)

// tela de ver e controlar alunos (professor)

// função para dar cor a msg 'possui computador'
const possuiComp = document.querySelectorAll('h4.ausenciaComputador')
possuiComp.forEach(function (possuirCom) {
  if (possuirCom.innerHTML == 'Possui Computador') {
    possuirCom.style.color = '#3da9fc'
  } else {
    possuirCom.style.color = 'red'
  }
})

// funçao para o butão mudar
function removerAluno(numeroParaIdentificarAluno) {
  const btnRemoverAluno = document.querySelectorAll('button.btnRemoverAluno')[
    numeroParaIdentificarAluno
  ]
  if (btnRemoverAluno.innerHTML == 'Remover Aluno') {
    btnRemoverAluno.style.backgroundColor = '#3da9fc'
    btnRemoverAluno.innerHTML = 'Readicionar Aluno'
  } else {
    btnRemoverAluno.style.backgroundColor = '#c54141'
    btnRemoverAluno.innerHTML = 'Remover Aluno'
  }
}

// tela de ver e controlar alunos (professor)

// fim Wesley

//---------------Tela de Login----------------//
const emailLogin = document.querySelector('#emailLogin')
const senhaLogin = document.querySelector('#senhaLogin')

async function enviarMensagemLogin(event) {
  if (emailLogin.value != '') {
    if (senhaLogin.value != '') {
      submitForm(event)
    } else {
      alert('Preencha a senha!')
    }
  } else {
    alert('Preencha o e-mail!')
  }
}

//---------------fim tela de Login---------------//

//---------------Início da tela de Modificar senha---------------//
const emailModificarSenha = document.querySelector('#emailModificarSenha')
const senha1ModificarSenha = document.querySelector('#senha1ModificarSenha')
const senha2ModificarSenha = document.querySelector('#senha2ModificarSenha')

async function enviarMensagemModificarSenha(event) {
  if (emailModificarSenha.value != '') {
    if (senha1ModificarSenha.value != '') {
      if (senha2ModificarSenha.value != '') {
        if (validaSenha(senha1ModificarSenha, senha2ModificarSenha)) {
          alert('Tudo certo!')
          submitForm(event)
        } else {
          alert('A senha de confirmação precisa ser igual a primeira senha!')
          senha1ModificarSenha.value = ''
          senha2ModificarSenha.value = ''
        }
      } else {
        alert('Preencha a senha de confirmação')
      }
    } else {
      alert('Preencha a senha')
    }
  } else {
    alert('Preencha o E-mail!')
  }
}

async function enviarParaApi() {
  alert('foi')
  try {
    const usuario = {
      email: emailModificarSenha.value,
      senha: senha1ModificarSenha.value,
      confirmasenha: senha2ModificarSenha.value
    }
    alert('fjbhdfjbhdflkgkdjghfghdfjghdjhgfghguhepgijengoerhgerhogierg')
    const resp = await fetch('https://acompi-back-end-lhbe.onrender.com/modificar-senha', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(usuario)
    })
    resp.json()
    console.log(resp.status)
    if (resp.status === 201) {
      alert(resp)
      return true
    } else {
      alert(resp)
      return false
    }
  } catch (error) {
    console.error(error.message)
    return false
  }
}

//----------------------------------------------------------------------------------------------------------- //
