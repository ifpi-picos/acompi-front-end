const cancelar = document.querySelector('#cancelar')
const criar = document.querySelector('#botaoCriar')
var a = 0
cancelar.addEventListener('click', function(){
    var url_atual = window.location.pathname; 

    if(url_atual.endsWith("usuarios/aluno/formulario-reserva-computador.html")){
        window.location.href="escolher-turma.html"
    }
    if(url_atual.endsWith("usuarios/professor/formulario-criar-turma.html")){
        window.location.href="ver-cancelar-turma.html"
    }
    if(url_atual.endsWith("usuarios/professor/formulario-reservar-laboratorio.html")){
        window.location.href="reservar-laboratorio.html"
    }
    if(url_atual.endsWith("/usuarios/administrador/formulario-proibir-laboratorio.html")){
        window.location.href="proibir-lab-adm.html"
    }
})
function submitForm(event){
    event.preventDefault();
    criar.addEventListener('click', function(){
        var url_atual = window.location.pathname; 
        alert('dados enviados com sucesso')
        if(url_atual.endsWith("usuarios/aluno/formulario-reserva-computador.html")){
            const dados = getDadosForm
            enviarDados(dados)
            function getDadosForm(){
                const inputComputador = document.querySelector('#computador?')
                const inputCurso = document.querySelector('#curso')
                const inputConsentimento = document.querySelector('#consentimento')
                if (inputComputador.value === null || inputCurso.value === null || inputConsentimento.value === null){
                    console.log('campos vazios')
                    return
                }
                const dados = {
                    id_turma: 1,
                    id_aluno: 1,
                    id_reserva: 1,
                    computador: "sim",
                    curso: "informática",  
                    consentimento: true   
                    // computador: inputComputador.value,
                    // curso: inputCurso.value,
                    // consetimento: inputConsentimento.value,
                }
            }
            async function enviarDados(dados){
                try{
                const resposta = await fetch('https://acompi-back-end-la29.onrender.com/reservas', {
                    method: 'POST',
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(dados)
                })
                if(resposta.status === 201){
                    // limparCampos()
                    window.location.href="ver-cancelar-reservas.html"
                }else{
                    console.log('Erro ao reservar computador')
                }
            }catch(erro){
                console.error(erro)
            }
            }
            // function limparCampos () {
            //     document.querySelector().value = ''
            // }
            }
            if(url_atual.endsWith("usuarios/professor/formulario-criar-turma.html")){
                window.location.href="ver-cancelar-turma.html"
            }
            if(url_atual.endsWith("usuarios/professor/formulario-reservar-laboratorio.html")){
                window.location.href="reservar-laboratorio.html"
            }
            if(url_atual.endsWith("/usuarios/administrador/formulario-proibir-laboratorio.html")){
                window.location.href="proibir-lab-adm.html"
            }
    })
}