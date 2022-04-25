var tbTarefas = localStorage.getItem("tbTarefas");
tbTarefas = JSON.parse(tbTarefas);
if (tbTarefas == null) {
    tbTarefas = [];
    localStorage.setItem("tbTarefas", JSON.stringify(tbTarefas));
} else {
    montar(tbTarefas);
}


function montar(tbTarefas) {
    console.log(tbTarefas);
    var cardCor = "";
    tbTarefas.forEach(function (tarefas, i) {
        console.log("case : " + tarefas.etapa);
        var divEtapa = "#" + tarefas.etapa
        switch (tarefas.etapa) {
            case "AFazer":
                cardCor = "bg-primary";
                break;
            case "Emprogresso":
                cardCor = "bg-warning  text-white ";
                break;
            case "Feito":
                cardCor = "bg-secondary  text-white ";
                break;
            case "Aprovado":
                cardCor = "bg-success";
                break;
            
        }
        console.log(divEtapa);

        $(divEtapa).append(`
        <div draggable="true" class="card  mb-3 shadow-sm" id="`+ i + `">
            <div class="card-header `+ cardCor + ` "></div>
                <div class="card-body">
                <h5 class="card-title">`+ primeiraLetraMaiscula(tarefas.titulo) + `</h5>
                <p class="card-text">`+ primeiraLetraMaiscula(tarefas.descricao) + `</p>
                <a href="#" class="btn btn-danger"  onclick="deletar(`+ i + `)">Deletar</a>
               
                </div>
                <div class="card-footer bg-transparent border-success"> <small class="text-muted"> Criado: `+ tarefas.data + `</small></div>
        </div>
        `);
        // console.log('[forEach]', tarefas.titulo, i);
    })
}
function primeiraLetraMaiscula(palavra) {
    if (palavra) {
        return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    }
}

function deletar(i) {
    tbTarefas.splice(i, 1);
    localStorage.setItem("tbTarefas", JSON.stringify(tbTarefas));
    console.log(i);
    $("#" + i).hide();
    toast("Deletado")
}

function salvar() {
    const data = new Date();
    var dataFormatada = (data.getDate() + "/" + ((data.getMonth() + 1)) + "/" + (data.getFullYear()));

    var tbTarefas = localStorage.getItem("tbTarefas");
    var obj = JSON.parse(tbTarefas);
    var txtTitulo = $("#titulo").val();
    var txtEtapa = $("#etapa").val();
    var txtDescricao = $("#descricao").val();
    const myObj = { titulo: txtTitulo, descricao: txtDescricao, etapa: txtEtapa, data: dataFormatada };
    obj.push(myObj);
    localStorage.setItem("tbTarefas", JSON.stringify(obj));
    window.location.reload();

}

const cards = document.querySelectorAll(".card");
const grids = document.querySelectorAll(".dropzone");

cards.forEach(function (card) {
    card.addEventListener('dragstart', dragstart)
    card.addEventListener('dragend', dragend)
    card.addEventListener('drag', drag)
})
//coomaca o arrastar 
function dragstart() {
    this.classList.add("card-selecionado")
}
//quando para de arrastar
function dragend(e) {
    this.classList.remove("card-selecionado")
}
//ennquanto se arrasta
function drag() {
    // console.log('drag ')
}

grids.forEach(function (grid) {
    grid.addEventListener('dragenter', dragenter)
    grid.addEventListener('dragover', dragover)
    grid.addEventListener('dragleave', dragleave)
    grid.addEventListener('drop', drop)
})
function dragenter(event) {

}

function montaCores(etapa, cardSelect) {
    switch (etapa) {
        case "AFazer":
            cardSelect.classList.add("bg-primary")
            cardSelect.classList.remove("bg-warning")
            cardSelect.classList.remove("bg-secondary")
            cardSelect.classList.remove("bg-success")
            break;
        case "Emprogresso":
            cardSelect.classList.add("bg-warning")
            cardSelect.classList.remove("bg-primary")
            cardSelect.classList.remove("bg-secondary")
            cardSelect.classList.remove("bg-success")
            break;
        case "Feito":
            cardSelect.classList.add("bg-secondary")
            cardSelect.classList.remove("bg-warning")
            cardSelect.classList.remove("bg-primary")
            cardSelect.classList.remove("bg-success")
            break;

        case "Aprovado":
            cardSelect.classList.add("bg-success")
            cardSelect.classList.remove("bg-primary")
            cardSelect.classList.remove("bg-warning")
            cardSelect.classList.remove("bg-secondary")
            break;
    }
}

function dragover() {
    this.classList.add("hover")
    const cardSelect = document.querySelector('.card-selecionado')
    const cardSelectHeader = document.querySelector('.card-selecionado .card-header')
    let posicao = parseInt(cardSelect.id);
    montaCores(this.id, cardSelectHeader);
    this.appendChild(cardSelect)
    var objectLocal = localStorage.getItem('tbTarefas');
    objectLocal = JSON.parse(objectLocal);
    tbTarefas[posicao] = JSON.parse(JSON.stringify(
        {
            titulo: objectLocal[posicao].titulo,
            data: objectLocal[posicao].data,
            descricao: objectLocal[posicao].descricao,
            etapa: this.id
        }
    ));

    localStorage.setItem("tbTarefas", JSON.stringify(tbTarefas));
    toast("Tarefa :" + objectLocal[posicao].titulo + ", Etapa :" + this.id + " !")
}

function toast(txtMensagem) {
    var toastLiveExample = document.getElementById('liveToast')
    var toast = new bootstrap.Toast(toastLiveExample)
    $(".toast-body").text(txtMensagem);
    toast.show()
}
function dragleave() {
    this.classList.remove("hover")
}
function drop() {
    console.log('salvo')
    salvarCard(cardSelect);
}

function salvarCard(event) {
    console.log(event)
}
