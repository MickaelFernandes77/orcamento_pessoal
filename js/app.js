// objeto despesa
class Despesa{
    // constructor: faz a construção do objeto, é iniciada sozinha
    constructor(ano, mes, dia, tipo, descricao, valor){
        // this faz referência as variaveis do próprio objeto, as que estão sem o this, fazem referência as variaveis do escopo global ou da função
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao 
        this.valor = valor
    }

    // função que verifica se os dados estão devidamente preenchidos
    validarDados(){
        // for que percorre cada var do objeto despesa. e verifica se os inputs tem valores ou não.
        for(let i in this){
            // this[i]: acessa o valor de cada var do objeto(tbm pode ser usada em arrays)
            // se algum dos inputs for vazio, retorna falso, se não fica como true.
            if(this[i] === undefined || this[i] === null || this[i] === ''){
                return false;
            }
        }
        return true;
    }
}

// objeto bd que representa o banco de dados(localStorage)
class Bd{
    // constructor: faz a construção do objeto, é iniciada sozinha
    constructor(){
        let id = localStorage.getItem('id');
        // se o id não existir, ele receberá o valor 0, Pois será o id inicial. Se houver segue o fluxo.
        if(id === null){
            localStorage.setItem('id', 0);
        }
    }

    // função que verifica se um id existe no localStorage, e se existir recupera o id que existe e add + 1.
    getProximoId(){
                        // recebe o ultimo id do localStorage
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }
    
    // função que adicona uma despesa ao localStorage
    gravar(d){
        // recebe o valor do id pela func proximoID, que é responsável por recuperar e add mais um valor no id.
        let id = this.getProximoId();
        // armazena o registro da despesa no LS, e converte pra JSON.
        localStorage.setItem(id, JSON.stringify(d));
        // atualiza o valor de id(do local storage, que vem da func constructor()), com o novo valor do id(que é recebido pela func proximoID)
        localStorage.setItem('id', id)
    }
}

// instância do objeto BD
let bd = new Bd()

function cadastrarDespesa(){
    // variaveis de manipulação de interface, referenciadas atraves do id.
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    // instância do objeto despesa
    let despesa = new Despesa(
        // valores das variaveis que são recebidas através do ID
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )
    
    // condição para verificar se todos os dados estão devidamente preenchidos.
    // se true, exibe o dialog de sucesso, se false, dialog de erro.
    if(despesa.validarDados() === true){
        // uso da função gravar, que vem do objeto BD. E recebe a var despesa que é a instância do obj despesa como param
        // bd.gravar(despesa);

        // dialog de sucesso
        $('#registraDespesa').modal('show')
        document.querySelector('#modal_titulo_div').className = 'modal-header text-success';
        document.querySelector('#mensagem_modal').className = 'modal-body';
        document.querySelector('#btnFechar').className = 'btn btn-success';

        document.querySelector('#titulo_div').innerHTML = 'Despesa Inserida com Sucesso'; 
        document.querySelector('#mensagem_modal').innerHTML = 'Sua nova despesa foi adicionada aos registros.';
        document.querySelector('#btnFechar').innerHTML = 'Fechar';   
    }else{
        // dialog de erro
        $('#registraDespesa').modal('show')
        document.querySelector('#modal_titulo_div').className = 'modal-header text-danger';
        document.querySelector('#mensagem_modal').className = 'modal-body';
        document.querySelector('#btnFechar').className = 'btn btn-danger';

        document.querySelector('#titulo_div').innerHTML = 'Erro Na Gravação da Despesa'; 
        document.querySelector('#mensagem_modal').innerHTML = ' Existem campos que não foram preenchidos. Por favor, preencha todos.';
        document.querySelector('#btnFechar').innerHTML = 'Fechar';

    
    }
    
}