import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";
import { Injectable } from "@angular/core";
import { NotificationService } from "../../shared/messages/notification.service";

@Injectable()

export class ShoppingCartService {
    items: CartItem[] = []

    constructor(private notificationService: NotificationService){}

    // metodo para limpar carrinho 
    clear() {
        this.items = []

    }
    //adiciono item do menu no carrinho
    addItem(item: MenuItem) {
        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)

        if (foundItem) {
            this.increaseQty(foundItem)
        } else {
            this.items.push(new CartItem(item))
        }
        this.notificationService.notify(`Você adicionou um item no carrinho ${item.name}`)
    }
    //incremento do carrinho na pagina de pedido finalizado
    increaseQty(item: CartItem) {
        item.quantity = item.quantity + 1
    }
    //decremento do carrinho na pagina de pedido finalizado
    decreaseQty(item: CartItem ){
        item.quantity = item.quantity -1
        if(item.quantity === 0){
            this.removeItem(item)
        }
    }
    //remove item do carrinho     
    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1)
        this.notificationService.notify(`Você removeu um item do carrinho ${item.menuItem.name}`)

    }
    //metodo totaliza itens do carrinho
    total(): number {
        return this.items.map(item => item.value()).reduce((prev, value) => prev + value, 0)
    }
}