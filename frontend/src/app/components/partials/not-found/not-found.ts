import { Component ,Input,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-not-found',
  imports: [RouterModule ,CommonModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFound implements OnInit {
  @Input()
  visible= false;
  @Input()
  notFoundMessage = 'Nothing Found!';
  @Input()
  resetLinkText = 'Reset';
  @Input()
  resetLinkRoute = '/';
  constructor() {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

}
