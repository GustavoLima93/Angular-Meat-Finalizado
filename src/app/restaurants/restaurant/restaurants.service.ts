import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { Restaurant } from "../restaurant/restaurant.model"

// importador Meat api constante criada para instansiar json => assistir aula 43
// importado error handler para tratar erro com catch  => assistir aula 44 

import { MEAT_API } from 'app/app.api'

import { MenuItem } from '../../restaurant-detail/menu-item/menu-item.model';


@Injectable()
export class RestaurantsService {


  constructor(private http: HttpClient) { }

  // utilizado metodo observable 
  //foi pego  uma response e tratado essa response para que virasse um array de restaurantes , essa response veio do Json 

  restaurants(search?:string): Observable<Restaurant[]> {
    let params: HttpParams = undefined
    if(search){
      params = new HttpParams().append('q', search)
    }
    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`,{params:params})
  }
  restaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
  }
  // foi criado os metodos reviews  igual acima mapeando  e tratando a response 
  reviewsOfRestaurant(id:string): Observable<any>{
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
  }
  menuOfRestaurant(id: string): Observable<MenuItem[]>{
    return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
  } 
  
}
