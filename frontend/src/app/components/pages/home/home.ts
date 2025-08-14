import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Food } from '../../../shared/models/Food';
import { FoodService } from '../../../services/food';
import { NgxStarRatingModule  } from 'ngx-star-rating';
import { ActivatedRoute } from '@angular/router';
import { Search } from "../../partials/search/search";
import { TagsComponent } from "../../partials/tags/tags";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxStarRatingModule, Search, TagsComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  foods: Food[] = [];
  constructor(private foodService: FoodService ,activatedRoute:ActivatedRoute) {
    activatedRoute.params.subscribe((params)=> {
      if (params.searchTerm){
        this.foods = foodService.getAllFoodsBySearchTerm(params.searchTerm);
      } else if (params.tag) {
        this.foods = foodService.getAllFoodsByTag(params.tag);
      }
      else {
        this.foods = foodService.getAll();
      }
    })
    
  }


  ngOnInit(): void {
    // Initialization logic can go here

    
  }

}
