import { Component ,OnInit } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { ActivatedRoute ,Router} from '@angular/router';
import { FoodService } from '../../../services/food';
import { CommonModule} from '@angular/common';
import { TagsComponent } from "../../partials/tags/tags";
import { CartService } from '../../../services/cart';


@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [CommonModule, TagsComponent],
  templateUrl: './food-page.html',
  styleUrl: './food-page.css'
})
export class FoodPage implements OnInit {
  food!: Food;
  constructor(  activatedRoute:ActivatedRoute , 
     foodService:FoodService,
     private cartService:CartService,
     private router: Router
    
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.food = foodService.getFoodById(params.id);
      }
    });
  }
  

  ngOnInit(): void {
    // Initialization logic can go here
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
    

}
}
