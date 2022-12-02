// objeto despesa
class Despesa {
  // constructor: faz a construção do objeto, é iniciada sozinha
  constructor(ano, mes, dia, tipo, descricao, valor) {
    // this faz referência as variaveis do próprio objeto, as que estão sem o this, fazem referência as variaveis do escopo global ou da função
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }

  // função que verifica se os dados estão devidamente preenchidos
  validarDados() {
    // for que percorre cada var do objeto despesa. e verifica se os inputs tem valores ou não.
    for (let i in this) {
      // this[i]: acessa o valor de cada var do objeto(tbm pode ser usada em arrays)
      // se algum dos inputs for vazio, retorna falso, se não fica como true.
      if (this[i] === undefined || this[i] === null || this[i] === "") {
        return false;
      }
    }
    return true;
  }
}

// objeto bd que representa o banco de dados(localStorage)
class Bd {
  // constructor: faz a construção do objeto, é iniciada sozinha
  constructor() {
    let id = localStorage.getItem("id");
    // se o id não existir, ele receberá o valor 0, Pois será o id inicial. Se houver segue o fluxo.
    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }

  // função que verifica se um id existe no localStorage, e se existir recupera o id que existe e add + 1.
  getProximoId() {
    // recebe o ultimo id do localStorage
    let proximoId = localStorage.getItem("id");
    return parseInt(proximoId) + 1;
  }

  // função que adicona uma despesa ao localStorage
  gravar(d) {
    // recebe o valor do id pela func proximoID, que é responsável por recuperar e add mais um valor no id.
    let id = this.getProximoId();
    // armazena o registro da despesa no LS, e converte pra JSON.
    localStorage.setItem(id, JSON.stringify(d));
    // atualiza o valor de id(do local storage, que vem da func constructor()), com o novo valor do id(que é recebido pela func proximoID)
    localStorage.setItem("id", id);
  }

  // função que recupera todos os registros de localStorage
  recuperarTodosRegistros() {
    // array de despesas
    let despesas = Array();

    let id = localStorage.getItem("id");
    // recuperar todas as despesas de localStorage
    for (let i = 1; i <= id; i++) {
      // recuperar despesa. mas antes a converte de json para objeto literal
      let despesa = JSON.parse(localStorage.getItem(i));

      // se uma despesa for null, não será inserida no array de despesas.
      if (despesa === null) {
        // continue: pula a interação, indo para a proxima interação
        continue;
      }
      // add o elemento i, que passa pelo id. gerando um elemento id no objeto.
      despesa.id = i;
      // adicionando as despesas no array de despesas.
      despesas.push(despesa);
    }
    return despesas;
  }

  // função que faz a pesquisa filtrada de despesas
  pesquisar(despesa) {
    let despesasFiltradas = Array();
    despesasFiltradas = this.recuperarTodosRegistros();

    // filtros de ano
    // se for diferente de vazio, realiza o filtro do ano pesquisado pelo usuario
    if (despesa.ano != "") {
      // o valor recebido pelo filter não atua no array original, então para pegar o resultado, é necessário sobrepor o array
      despesasFiltradas = despesasFiltradas.filter((d) => d.ano == despesa.ano);
    }
    // filtros de mes
    if (despesa.mes != "") {
      despesasFiltradas = despesasFiltradas.filter((d) => d.mes == despesa.mes);
    }
    // filtros de dia
    if (despesa.dia != "") {
      despesasFiltradas = despesasFiltradas.filter((d) => d.dia == despesa.dia);
    }
    // filtros de descricao
    if (despesa.descricao != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.descricao == despesa.descricao
      );
    }
    // filtros de tipo
    if (despesa.tipo != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.tipo == despesa.tipo
      );
    }
    // filtros de valor
    if (despesa.valor != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.valor == despesa.valor
      );
    }

    return despesasFiltradas;
  }

  // funcão que remove uma despesa
  remover(id) {
    localStorage.removeItem(id);
  }
}

// instância do objeto BD
let bd = new Bd();

function cadastrarDespesa() {
  // variaveis de manipulação de interface, referenciadas atraves do id.
  let ano = document.getElementById("ano");
  let mes = document.getElementById("mes");
  let dia = document.getElementById("dia");
  let tipo = document.getElementById("tipo");
  let descricao = document.getElementById("descricao");
  let valor = document.getElementById("valor");

  // instância do objeto despesa
  let despesa = new Despesa(
    // valores das variaveis que são recebidas através do ID
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  );

  // condição para verificar se todos os dados estão devidamente preenchidos.
  // se true, exibe o dialog de sucesso, se false, dialog de erro.
  if (despesa.validarDados() === true) {
    // uso da função gravar, que vem do objeto BD. E recebe a var despesa que é a instância do obj despesa como param
    bd.gravar(despesa);

    // dialog de sucesso
    $("#registraDespesa").modal("show");
    document.querySelector("#modal_titulo_div").className =
      "modal-header text-success";
    document.querySelector("#mensagem_modal").className = "modal-body";
    document.querySelector("#btnFechar").className = "btn btn-success";

    document.querySelector("#titulo_div").innerHTML =
      "Despesa Inserida com Sucesso";
    document.querySelector("#mensagem_modal").innerHTML =
      "Sua nova despesa foi adicionada a lista de despesas.";
    document.querySelector("#btnFechar").innerHTML = "Fechar";

    // limpando os inputs de inserção
    ano.value = "";
    mes.value = "";
    dia.value = "";
    tipo.value = "";
    descricao.value = "";
    valor.value = "";
  } else {
    // dialog de erro
    $("#registraDespesa").modal("show");
    document.querySelector("#modal_titulo_div").className =
      "modal-header text-danger";
    document.querySelector("#mensagem_modal").className = "modal-body";
    document.querySelector("#btnFechar").className = "btn btn-danger";

    document.querySelector("#titulo_div").innerHTML =
      "Erro Na Gravação da Despesa";
    document.querySelector("#mensagem_modal").innerHTML =
      " Existem campos que não foram preenchidos. Por favor, preencha todos.";
    document.querySelector("#btnFechar").innerHTML = "Fechar";
  }
}

// funçao que carrega as despesas e a coloca na view consulta.html
// recebe um array como um valor padrão, para caso de uso da função de pesquisar que realiza o filtro. Se não usarmos o filtro, retorna todos as despesas de LocalStorage.
function carregaListaDespesas(despesas = Array(), filtro = false) {
  // se for igual a 0, significa que o array despesas está vazio, ou seja sem filtro. Se não for igual a 0 um filtro estará acontecendo.
  if (despesas.length == 0 && filtro == false) {
    // o array despesas(que está como padrão), recebe o outro array despesas, da função recuperarTodosRegistros.
    despesas = bd.recuperarTodosRegistros();
  }

  // elemento tbody da tabela da view consulta.html
  let listaDespesas = document.getElementById("listaDespesas");
  // limpando o tbody da view consulta.html
  listaDespesas.innerHTML = "";

  // percorrendo o array despesas, listando cada despesa de forma dinamica
  despesas.forEach(function (d) {
    // criando tr da tabela
    let linha = listaDespesas.insertRow();
    // criando colunas da tabela, e adicionando os valores do array na interface
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
    // ajuste da exibição do tipo da despesa
    switch (d.tipo) {
      case "1":
        d.tipo = "Alimentação";
        break;
      case "2":
        d.tipo = "Educação";
        break;
      case "3":
        d.tipo = "Lazer";
        break;
      case "4":
        d.tipo = "Saúde";
        break;
      case "5":
        d.tipo = "Transporte";
        break;
    }
    linha.insertCell(1).innerHTML = d.tipo;
    linha.insertCell(2).innerHTML = d.descricao;
    linha.insertCell(3).innerHTML = d.valor;

    // criar o botão de exclusão
    let btn = document.createElement("button");
    btn.className = "btn btn-danger";
    btn.innerHTML = '<i class="fas fa-times"></i>';
    // adicionando um texto ao id, para evitar conflitos internos com a execução do id da armazenado em localstorage.
    btn.id = `id_despesa_${d.id}`;
    btn.onclick = function () {
      // removendo a parte a esquerda do identificador do id, para obter apenas o valor do id respectivo.
      let id = this.id.replace("id_despesa_", "");

      // dialog de deleção
      $("#deletaDespesa").modal("show");
      document.querySelector("#modal_titulo_div").className =
        "modal-header text-success";
      document.querySelector("#mensagem_modal").className = "modal-body";
      document.querySelector("#btnFechar").className = "btn btn-success";
      document.querySelector("#titulo_div").innerHTML =
        "Despesa Deletada com Sucesso";
      document.querySelector("#mensagem_modal").innerHTML =
        "Sua despesa foi deletada da lista de despesas.";
      document.querySelector("#btnFechar").innerHTML = "Fechar";
      // adição da função para refresh na página.
      document.querySelector("#btnFechar").onclick = function () {
        window.location.reload();
      };
      // uso da função de remover, do objeto BD.
      bd.remover(id);
    };
    linha.insertCell(4).append(btn);
  });
}

// função usada para pesquisar e/ou filtrar as despesas
function pesquisarDespesa() {
  // variaveis de manipulação de interface, referenciadas atraves do id.
  let ano = document.getElementById("ano").value;
  let mes = document.getElementById("mes").value;
  let dia = document.getElementById("dia").value;
  let tipo = document.getElementById("tipo").value;
  let descricao = document.getElementById("descricao").value;
  let valor = document.getElementById("valor").value;

  // instância do objeto Despesa
  let despesa = new Despesa(
    // valores das variaveis que são recebidas através do ID
    ano,
    mes,
    dia,
    tipo,
    descricao,
    valor
  );
  // variavel que recebe o uso da função pesquisar(que retorna o array de despesas com filtros que são passados pelo usuário)
  let despesas = bd.pesquisar(despesa);
  // enviando a lista de despesas filtradas, para a função carrega lista despesas. e trocando o valor de filter para true.
  carregaListaDespesas(despesas, true);
}

// adicionar feature que apresente o valor total das despesas por tipo

// adicionar feature que apresente o valor total das despesas por mes
// entender como recuperar o valor do mês de cada item. (feito)
// fazer a parte visual e fazer os testes para realizar a busca por cada mês.

function recuperaValorMes() {
  // array de despesas, que recebe o retorno dos registros da função bd, recuperar todos registros.
  let despesas = Array();
  despesas = bd.recuperarTodosRegistros();
  // var que recebe o valor filtrado do mês
  let valorMes = 0;
  // selects dos formulários
  let anoSelect = document.querySelector("#ano").value;
  let mesSelect = document.querySelector("#mes").value;

  // tds da tabela, onde serão colocados os resultados dos filtros.
  let tbl_ano = document.getElementById("tbl_ano");
  let tbl_mes = document.getElementById("tbl_mes");
  let tbl_valor = document.getElementById("tbl_valor");

  for (i = 0; i < despesas.length; i++) {
    // se o input de ano ou mês estiver vazio, exibe o dialog de erro.
    if (anoSelect == "" || mesSelect == "") {
        // dialog de campos incompletos dos inputs de ano e mês
      $("#erroDespesa").modal("show");
      document.querySelector("#modal_titulo_div").className =
        "modal-header text-danger";
      document.querySelector("#mensagem_modal").className = "modal-body";
      document.querySelector("#btnFechar").className = "btn btn-danger";
      document.querySelector("#titulo_div").innerHTML =
        "Preencha Todos os Campos";
      document.querySelector("#mensagem_modal").innerHTML =
        "Preencha os campos de ano e de mês corretamente.";
      document.querySelector("#btnFechar").innerHTML = "Fechar";  
    } 
    // filtro do ano. comparando se o valor do ano e do array são iguais.
    else if ((anoSelect == 2022 && despesas[i].ano == 2022) ||
    (anoSelect == 2023 && despesas[i].ano == 2023) ||
    (anoSelect == 2024 && despesas[i].ano == 2024) ||
    (anoSelect == 2025 && despesas[i].ano == 2025)) {
      if (
        (mesSelect == 1 && despesas[i].mes == 1) ||
        (mesSelect == 2 && despesas[i].mes == 2) ||
        (mesSelect == 3 && despesas[i].mes == 3) ||
        (mesSelect == 4 && despesas[i].mes == 4) ||
        (mesSelect == 5 && despesas[i].mes == 5) ||
        (mesSelect == 6 && despesas[i].mes == 6) ||
        (mesSelect == 7 && despesas[i].mes == 7) ||
        (mesSelect == 8 && despesas[i].mes == 8) ||
        (mesSelect == 8 && despesas[i].mes == 9) ||
        (mesSelect == 8 && despesas[i].mes == 10) ||
        (mesSelect == 8 && despesas[i].mes == 11) ||
        (mesSelect == 8 && despesas[i].mes == 12)
      ) {
        // valor do mês
        valorMes += parseFloat(despesas[i].valor);
        // inserção dos valores na view
        tbl_ano.innerHTML = despesas[i].ano;
        tbl_mes.innerHTML = despesas[i].mes;
        tbl_valor.innerHTML = valorMes.toFixed(2);
      }
    }
  }
}
