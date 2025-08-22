import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Food } from '../../../shared/models/Food';
import { FoodService } from '../../../services/food';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../../partials/search/search';
import { TagsComponent } from '../../partials/tags/tags';
import { NotFound } from '../../partials/not-found/not-found';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, Search, TagsComponent, NotFound],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  foods: Food[] = [];
  isLoading = true;
  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      this.isLoading = true;
      let foodObservable: Observable<Food[]>;

      if (params.searchTerm) {
        foodObservable = foodService.getAllFoodsBySearchTerm(params.searchTerm);
      } else if (params.tag) {
        foodObservable = foodService.getAllFoodsByTag(params.tag);
      } else {
        foodObservable = foodService.getAll();
      }

      foodObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
        this.isLoading = false;
      });
    });
  }

  ngOnInit(): void {
    
  }
}
