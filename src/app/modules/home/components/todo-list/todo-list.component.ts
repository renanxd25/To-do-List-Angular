import { Component, DoCheck } from '@angular/core';

//interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {
  
  
  //taskList é a variavel do tipo array que contem um contrato json com o <TaskList>
  //ele recebe os dados do LocalStorage, atravez do JSON.parse(localStorage.getItem("list")||'[]');
  // Onde o JSON.parse() esta convertendo os dados do Localstrorage que estão em STRING para JSON.
  //o localStorage esta pegando os itens da lista, se tiver algum valor em list ele recebe e converte se não, ele passa um array vazio.
  public taskList: Array<TaskList> =JSON.parse(localStorage.getItem("list")||'[]');

  constructor() { }

  ngDoCheck(): void {
    //Funcao que recebe dados do lacal storage.
      this.setLocalStorate();
    
  }
  /*
    A funcao setEmitTaskList() foi criada pra receber um evento do tipo string dentro do input do HTML. O valor dela é passado para um objeto do tipo EventEmitter()
    que esta declarado na tag do HTML.
  */
  public setEmitTaskList(event: string){
    //Estamos chamando a variavel que tem o contrato array e adicionando mas um item no array.
    this.taskList.push({task: event, checked:false})
  }
  //Funcao de deletar apenas um item da lista.
  public deleteItemTaskList(event:number){
    /* Funcao Splice  deletar itens da lista, ele recebe um evento que seu valor é passado no botão do HTML, esse evento define a posição do item a ser deletado
       e o segundo parametro do metodo define a quantidade de itens a ser deletado.  
    */
    this.taskList.splice(event,1);
  }
  /*Metodo de deletar todos os itens*/
  public deleteAllTaskList(){
    //Variavel confirm recebe um window.confirm() que exibi um PopAp com valor booleano, se for escolhido SIM ele recebe TRUE e se for escolhido NÃO recebe FALSE.
    const confirm = window.confirm("Você deseja realmente deletar tudo?");
    //Se o valor de confim for TRUE a condição e favorecida.
    if(confirm){
      //O array taskList recebe o valor de array vazio.
      this.taskList = [];
    }
  }
  // validationInput(event: string, index: number) é uma fução declarada para excluir um item em branco na lista de tarefa. ela rececebe um evento que verifica se o item esta em branco e o outro o index do item no array.
  public validationInput(event: string, index: number){
    //Se o item estiver vazio ele entra nessa condição
    if(!event.length){
      // a variavel confirm recebe uma função window.confirm() que recebe um valor booleano
      const confirm = window.confirm("Task está vazia, deseja Deletar?");
      //Se a varivavel confirm for True ela entra nessa condição que chama a função deleItemTaskList(index) que deleta o item com caractere vazio na lista de itens. 
      if(confirm){
        this.deleteItemTaskList(index);
      }
    }
  }
  // Funcao que recebe dados do local storage.
  public setLocalStorate(){
    //condicao booleana que perguntao se a variavel taskList existe
    if(this.taskList){
      //Se for TRUE o array taskList recebe um SORT que ordena os objetos detro do array. 
      //Dentro do SORT é recebido um arrou function que contem dois parametros (FIRST, LAST) ele retorna uma condição matematica onde os itens checados irão para baixo dos itens nao checados.
      this.taskList.sort((first, last)=> Number(first.checked)-Number(last.checked));
      //O locaStorage é uma funcao do javaScript para armazena dados no storage local.
      //o setItm é uma funcao que recebe chave e valor, no caso passamos como chava o nome LIST e como valor os dados armazenados no array
      //como o setitem do localStorage so aceita String, convertemos o valor de taskList que esta como objeto Json para string.
      localStorage.setItem("list",JSON.stringify(this.taskList))
    }

  }

}
