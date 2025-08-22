import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order';
import { CartService } from '../../../services/cart';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// window paypal
declare var paypal: any;

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.html',
  styleUrls: ['./paypal-button.css']
})
export class PaypalButton implements OnInit {
  @Input()
  order!: Order;

  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    const self = this;

    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'CAD',
                  value: self.order.totalPrice,
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          const payment = await actions.order.capture();
          this.order.paymentId = payment.id;

          self.orderService.pay(this.order).subscribe({
            next: (orderId) => {
              this.cartService.clearCart();
              this.router.navigateByUrl('/track/' + orderId);
              this.toastrService.success(
                'Payment Saved Successfully',
                'Success'
              );
            },
            error: () => {
              this.toastrService.error('Payment Save Failed', 'Error');
            },
          });
        },
      })
      .render(this.paypalElement.nativeElement); 
}
}