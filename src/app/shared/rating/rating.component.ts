import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  @Output() rated= new EventEmitter<number>()

  rates:number[]=[1,2,3,4,5]
  rate:number = 0
  previusRate: number

  constructor() { }

  ngOnInit() {
  }

  setRate(r:number){
    this.rate=r
    this.previusRate = undefined
  }
  setTemporaryRate(r:number){
    if(this.previusRate === undefined){
      this.previusRate = this.rate
      this.rated.emit(this.rate)
    }
    this.rate=r
    console.log("setouuuuu!!")
  }
  clearTemporaryRate(){
    if(this.previusRate !== undefined){
      this.rate=this.previusRate
      this.previusRate=undefined
    }
  }

}
