import { Component, Input, OnInit } from '@angular/core';
import { FoodService } from './../../../services/food';
import { Tag } from './../../../shared/models/Tag';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.html',
  styleUrls: ['./tags.css'],
  imports: [CommonModule,]

})
export class TagsComponent implements OnInit {

// @Input()
  //foodPageTags?:string[];

  //@Input()
  //justifyContent:string = 'center';

  tags?:Tag[];
  constructor(foodService:FoodService) { 
    foodService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags;
  })
}

  ngOnInit(): void {
    


  }
}