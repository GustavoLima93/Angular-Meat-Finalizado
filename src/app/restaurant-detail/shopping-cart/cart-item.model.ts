import { MenuItem } from "../menu-item/menu-item.model";

export class CartItem{
    constructor(public menuItem:MenuItem, public quantity: number = 1){ }


    // metodo que vai retornar o total  pegando preço do menuitem * quantidade
    value(){
        return this.menuItem.price * this.quantity
    }

}

// interface do carrinho 