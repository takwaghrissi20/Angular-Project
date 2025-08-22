import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart';
import { UserService } from '../../../services/user';
import { ToastrService } from 'ngx-toastr';
import { Title } from "../../partials/title/title";
import { InputText } from "../../partials/input-text/input-text";
import { OrderItemsList } from "../../partials/order-items-list/order-items-list";
import { MapComponent } from "../../partials/map/map";
import {OrderService} from "../../../services/order";
import  {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [Title, ReactiveFormsModule, InputText, OrderItemsList, MapComponent],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit{

  order:Order = new Order();
  checkoutForm!: FormGroup;


  constructor(cartService:CartService ,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private toastrService:ToastrService,
    private orderService:OrderService,
    private router:Router
    
  ){
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice=cart.totalPrice;


  }
  ngOnInit(): void {
      let {name,address} = this.userService.currentUser;
      this.checkoutForm = this.formBuilder.group({
        name:[name,Validators.required],
        address:[address,Validators.required]
      })
    }

    get fc(){
      return this.checkoutForm.controls;
    }

    createOrder(){

      if(this.checkoutForm.invalid){
        this.toastrService.warning('Please fill the inputs','Invalid Inputs');
        return;
      }

      if(!this.order.addressLatLng){
        this.toastrService.warning('Please Select Your Location','Location');
        return;
      }
      this.order.name = this.fc.name.value;
      this.order.address=this.fc.address.value;

      this.orderService.create(this.order).subscribe({
        next:()=> {
          this.router.navigateByUrl('/payment')
        },
        error:(errorResponse) => {
          this.toastrService.error (errorResponse.error,'Cart');
        }
      })

    }

}
