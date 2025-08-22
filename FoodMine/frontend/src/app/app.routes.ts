import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { FoodPage } from './components/pages/food-page/food-page';
import { CartPage } from './components/pages/cart-page/cart-page';
import { LoginPage } from './components/pages/login-page/login-page';
import { RegisterPage } from './components/pages/register-page/register-page';
import { Checkout } from './components/pages/checkout/checkout';
import { authGuard } from './auth/guards/auth-guard';
import { PaymentPage } from './components/pages/payment-page/payment-page';
import { OrderTrackPage } from './components/pages/order-track-page/order-track-page';

export const routes: Routes = [
    {path:'', component: Home},
    {path:'search/:searchTerm',component:Home,data: { renderMode: 'csr' }},
    {path:'food/:id', component : FoodPage },
    {path:'tag/:tag', component:Home ,data: { renderMode: 'csr' }},
    {path:'cart-page', component:CartPage},
    {path:'login', component:LoginPage},
    {path:'register', component:RegisterPage},
    {path:'checkout', component:Checkout , canActivate:[authGuard]},
    {path:'payment', component: PaymentPage , canActivate:[authGuard]},
    {path:'track/:orderId', component: OrderTrackPage , canActivate:[authGuard],data: { renderMode: 'csr' }},

    
];
