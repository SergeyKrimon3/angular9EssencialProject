import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {

  /**Variável do tipo "Product" sendo inicializada com = e abaixo segue os atributos de meu objeto. Declaração de variável*/

  public myProduct: Product = {
    name: null,
    price: null,
    date: null,   
  };

  /** ; encerra minha declaração e a , da continuidade */

  /** Indentação do código */

  /**Injeção de dependência */

  constructor(private myRouter: Router,
    private myProductService: ProductService) { }

  //public customPatterns = { 'A': { pattern: new RegExp('\[a-zA-Z\]')} };

  public ngOnInit(): void {
  };

  /**O this menciona que estamos utilizando o atributo da classe.
   Quando alguém lê this.myRouter não tem dúvidas que "myRouter" é um contexto da classe.*/

  public productCreate(): void {
    this.myProductService.create(this.myProduct).subscribe(() => {
      this.myProductService.showMessage('Produto criado com sucesso!');
      this.myRouter.navigate(['/products']);
    });
  };

  public cancel(): void {
    this.myRouter.navigate(['/products']);
  };

};
