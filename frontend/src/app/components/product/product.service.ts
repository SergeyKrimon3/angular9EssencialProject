import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = "http://localhost:3003/products";

  constructor(private matSnackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router) { }

    /** O valor foi declarado, porém não está sendo lido por nenhum atributo, por isso ele fica com tom de apagado */

  showMessage(msg: string, isError: boolean = false): void {
    this.matSnackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  };

    /**Na busca de dados no servidor você pode tratar com o Observable e extrair estes dados que vieram do servidor através
    da chamada subscribe. O serviço Http do Angular trabalha com Observables.*/
    
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      catchError(e => this.errorHandler(e))
    );
  };

  /**  O tipo "any" pode ser usado sempre que não quiser um valor especifico cause erros na verificação dos tipos. Você pode
    acessar qualquer propriedade dele, chamar como função ou atribuir valor de qualquer tipo.*/

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  };

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      catchError(e => this.errorHandler(e))
    );
  };

  /** Sempre que ao declarar uma variável dentro de um método ela é pertinente ao contexto deste método */

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`; // retorna uma string - http://localhost:3003/products/3
    return this.http.get<Product>(url).pipe(
      catchError(e => this.errorHandler(e))
    );
  };
  
  update(Product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${Product.id}`;
    return this.http.put<Product>(url, Product).pipe(
      catchError(e => this.errorHandler(e))
    );
  };

  delete(id: number): Observable<Product> {
    const url=`${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      catchError(e => this.errorHandler(e))
    );
  };

}
