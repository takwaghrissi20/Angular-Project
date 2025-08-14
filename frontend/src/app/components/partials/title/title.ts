import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-title',
  imports: [CommonModule],
  templateUrl: './title.html',
  styleUrl: './title.css'
})
export class Title implements OnInit {
  

  constructor() {}


  @Input()
  title!: string;

  @Input()
  margin? = '1rem 0 1rem 0.2rem'

  @Input()
  fontSize? = '1.7rem';

  ngOnInit(): void {
    // Initialization logic can go here
  }

}
