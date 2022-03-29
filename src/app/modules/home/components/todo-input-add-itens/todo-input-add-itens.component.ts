
//importando elementos do Angular/core
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-todo-input-add-itens',
  templateUrl: './todo-input-add-itens.component.html',
  styleUrls: ['./todo-input-add-itens.component.scss']
})


export class TodoInputAddItensComponent implements OnInit {
  //Criando um metodo Output para enviar um dado que se comunica com outro componente
  @Output() public emitItemTaskList = new EventEmitter();
  
  //Variavel 
  //Variavel addItemTaskList usada com NgModel para capturar o valor passado no input.
  public addItemTaskList: string ="";
  
  constructor() { }

  ngOnInit(): void {
  }
  //Metodo SubmitItemTaskList() usado para enviar dados para fora do compontente.
  public submitItemTaskList(){
    //nessa linha a variavel addItemTaskList recebe ela mesmo junto da função trim() essa funcao elimina todos os espaços do valor.
    this.addItemTaskList = this.addItemTaskList.trim();
    /*A condição é chamada para validar o valor, se a variavel addItemTaskList estiver com algum valor a condição é acionada. 
      dentro da condição o output esta sendo chamado atraves do emitItemTaskList que contem um metodo emit() que recebe o valor de addItemTaskList
      que jogar o valor de addItemTaskList para fora do componente.
      a variavel addItemTaskList recebe um valor vazio para limpar o input. 
    */
    if(this.addItemTaskList){
      this.emitItemTaskList.emit(this.addItemTaskList);
      this.addItemTaskList = "";
    }
  }

}
