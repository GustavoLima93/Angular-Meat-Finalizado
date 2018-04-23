import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../restaurants/restaurant/restaurants.service';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  //tipo review com referencia para retorno do meu serviço  foi utilizado pipe async para subescrever 
  reviews: Observable<any>

  // instanciando restaurante service para serviços  e activated route  para rotas filhas 
  constructor(private restaurantsService: RestaurantsService, private route: ActivatedRoute) { }

  // sub rota e o parametro e do componenete paramente da rota this.route.parent.snapshot.params['id']
  ngOnInit() {
    this.reviews = this.restaurantsService.reviewsOfRestaurant(this.route.parent.snapshot.params['id'])
  }

}
