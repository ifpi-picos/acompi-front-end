const divReservas = document.querySelector('#reservas')

async function getReservas() {
    const search = window.location.search.substring(1).substring(6)
    const id_turma = parseInt(search)
    const res = await fetch('https://acompi-back-end-lhbe.onrender.com/turmas/reservas/' + id_turma.toString());
    const turma = await res.json();
    preencherReservas(turma[0].reservas);
}
function preencherReservas(reservas) {
    function encodeInput (input)  {
        const encoded = document.createElement('div');
        encoded.innerText = input;
        return encoded.innerHTML;
      }
    reservas.forEach(async reserva => {
        const alunoID = reserva.id_aluno
        const res = await fetch('https://acompi-back-end-lhbe.onrender.com/cadastro/aluno/' + alunoID.toString())
        const aluno = await res.json();
        const nome_aluno = encodeInput(aluno.nome)
        const email_aluno = encodeInput(aluno.email)
        const reserva_curso = encodeInput(reserva.curso)
        const reserva_computador = encodeInput(reserva.computador)
        const novaReservaHTML = '<div>\n<h1>'+nome_aluno+'</h1>\n<p>E-mail: '+email_aluno+'</p>\n<p>Curso: '+reserva_curso+'</p>\n<h4 class="ausenciaComputador" >'+'Possui Computador: '+reserva_computador+'</h4>\n<button onclick="excluirReserva(' + reserva.id + ')" class="btnRemoverAluno" id="excluirReserva">Remover Aluno</button>\n</div>'
        divReservas.innerHTML = divReservas.innerHTML + novaReservaHTML
    });
}
getReservas()
const botaoExcluirReserva = document.querySelector('#excluirReserva')
async function excluirReserva (id) {
    try {
        const resposta = await fetch('https://acompi-back-end-lhbe.onrender.com/reservas/' + id.toString(), {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }); if (resposta.status === 200) {
            alert('Reserva excluída')
            window.location.reload();
        };
    } catch (erro) {
        console.error(erro)
    }
}