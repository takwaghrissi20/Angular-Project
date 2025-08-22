import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/partials/header/header";
import { Loading } from "./components/partials/loading/loading";



@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Loading], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
