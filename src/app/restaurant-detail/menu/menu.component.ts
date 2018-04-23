import { Component, OnInit } from '@angular/core';

import { RestaurantsService } from '../../restaurants/restaurant/restaurants.service';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable'
import { MenuItem } from '../menu-item/menu-item.model';


@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
  
})
export class MenuComponent implements OnInit {

  menu: Observable<MenuItem[]>

  constructor(private restaurantsService: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.menu = this.restaurantsService.menuOfRestaurant(this.route.parent.snapshot.params['id'])
    //parametrizaçao nao acontece no menu acontece no componente parents
  }

  addMenuItem(item: MenuItem){
     console.log(item)
  }

}
