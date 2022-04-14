import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create2',
  templateUrl: './product-create2.component.html',
  styleUrls: ['./product-create2.component.css'],
})
export class ProductCreate2Component implements OnInit {

  /**Variável userForm do tipo FormGroup */

  public productsForm: FormGroup;

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
    private myProductService: ProductService,
    private formBuilder: FormBuilder) { }

    /**FormBuilder é o nosso construtor de formulário */

  ngOnInit(): void {
    this.productsForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      date: [null, [Validators.required]],
    });
  };

  /**O this menciona que estamos utilizando o atributo da classe.
   Quando alguém lê this.myRouter não tem dúvidas que "myRouter" é um contexto da classe.*/

  productCreate2(): void {
    this.myProductService.create(this.myProduct).subscribe(() => {
      this.myProductService.showMessage('Produto criado com sucesso!');
      this.myRouter.navigate(['/products']);
    });
  };

  cancel(): void {
    this.myRouter.navigate(['/products']);
  };

};
