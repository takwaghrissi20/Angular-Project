import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderItemsList } from "../../partials/order-items-list/order-items-list";
import { Title } from "../../partials/title/title";
import { MapComponent } from '../../partials/map/map';

@Component({
  selector: 'app-order-track-page',
  imports: [CommonModule, OrderItemsList, Title ,MapComponent ],
  templateUrl: './order-track-page.html',
  styleUrl: './order-track-page.css'
})
export class OrderTrackPage  implements OnInit{

  order!:Order;
  constructor(activatedRoute:ActivatedRoute,orderService:OrderService){

    const params = activatedRoute.snapshot.params;
    if(!params.orderId)return;

    orderService.trackOrderById(params.orderId).subscribe(order => {
      this.order = order;
    })
    
  }
  ngOnInit(): void {
    
  }

}
