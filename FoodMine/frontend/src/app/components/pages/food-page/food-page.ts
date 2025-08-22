import { Component ,OnInit } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { ActivatedRoute ,Router} from '@angular/router';
import { FoodService } from '../../../services/food';
import { CommonModule} from '@angular/common';
import { CartService } from '../../../services/cart';
import { NotFound } from "../../partials/not-found/not-found";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [CommonModule, NotFound,RouterModule],
  templateUrl: './food-page.html',
  styleUrl: './food-page.css'
})
export class FoodPage implements OnInit {
  food!: Food;
  isLoading = true;
  constructor(  activatedRoute:ActivatedRoute , 
     foodService:FoodService,
     private cartService:CartService,
     private router: Router
    
  ) {
    activatedRoute.params.subscribe((params) => {
      this.isLoading = true;
      if (params.id) {
        foodService.getFoodById(params.id).subscribe((serverFood) => {
          this.food = serverFood;
          this.isLoading = false;
        });
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
