import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order';
import { Router } from '@angular/router';
import { OrderItemsList } from "../../partials/order-items-list/order-items-list";
import { Title } from "../../partials/title/title";
import { MapComponent } from "../../partials/map/map";
import { PaypalButton } from "../../partials/paypal-button/paypal-button";

@Component({
  selector: 'app-payment-page',
  imports: [OrderItemsList, Title, MapComponent, PaypalButton],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.css'
})
export class PaymentPage implements OnInit{


  order:Order = new Order();
  constructor(orderService:OrderService , router : Router){

    orderService.getNewOrderForCurrentUser().subscribe({
      next:(order) => {
        this.order = order;
      },
      error:() => {
        router.navigateByUrl('/checkout');
      }
    })
  }
  ngOnInit(): void {
    
  }

}
