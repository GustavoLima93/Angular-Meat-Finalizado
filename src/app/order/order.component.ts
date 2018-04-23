import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'

import { Router } from '@angular/router'

import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';

import 'rxjs/add/operator/do'

//componente de compra criado atraves do cli na aula 56

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'

})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  orderForm: FormGroup

  delivery: number = 8

  orderId: string

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartao de Debito', value: 'DEB' },
    { label: 'Cartao Refeicao', value: 'REF' }
  ]

  constructor(private orderService: OrderService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name:this.formBuilder.control('',[Validators.required, Validators.minLength(5)]),
      email:this.formBuilder.control('',[Validators.required,Validators.pattern(this.emailPattern)]),
      emailConfirmation:this.formBuilder.control('',[Validators.required,Validators.pattern(this.emailPattern)]),
      address:this.formBuilder.control('',[Validators.required, Validators.minLength(5)]),
      number:this.formBuilder.control('',[Validators.required,Validators.pattern(this.numberPattern)]),
      optionalAddress:this.formBuilder.control(''),
      paymentOption:this.formBuilder.control('',[Validators.required])
    },{validator:OrderComponent.equalsTo})

  }

  static equalsTo(group: AbstractControl): {[key:string]:boolean}{
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if(!email || !emailConfirmation){
      return undefined
    }

    if(email.value !== emailConfirmation.value){
      return{emailsNotMatch: true}
    }
    return undefined
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  increaseQty(item: CartItem) {
    return this.orderService.increaseQty(item)
  }
  decreaseQty(item: CartItem) {
    return this.orderService.decreaseQty(item)
  }
  remove(item: CartItem) {
    return this.orderService.remove(item)
  }

  isOrderCompleted(): boolean {
    return this.orderId != undefined
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems().map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)
    .do((orderId:string) => {
      this.orderId = orderId
    })
    .subscribe((orderId: string) => {
      this.router.navigate(['/order-summary'])
      console.log(`Compra concluida: ${orderId}`)
      this.orderService.clear()
    })
    // console.log(order)
    // console.log('chegou essa poha do caralho sem erros nesta merda vai se foder porque nao fiz ADM nesta Merda')
  }
}



// static equalsTo:(group: AbstractControl): {[Key:string]: boolean} {
//     const email = group.get('email')
//     const emailConfirmation = group.get('emailConfirmation')
//     if(!email || !emailConfirmation){
//       return undefined
//     }
//     if(email.value !== emailConfirmation.value){
//       return {emailsNotMatch:true}
//     }
//     return undefined
//   }




