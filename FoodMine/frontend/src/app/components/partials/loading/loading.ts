import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../services/loading';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [CommonModule],
  templateUrl: './loading.html',
   styleUrls: ['./loading.css'], 
})
export class Loading implements OnInit {
  isLoading!: boolean;
  constructor(public loadingService: LoadingService) {
    loadingService.isLoading.subscribe((isLoading) => {
      //console.log('Loader status:', isLoading);
      this.isLoading = isLoading;
    });

    
  }
  ngOnInit(): void {}
}
