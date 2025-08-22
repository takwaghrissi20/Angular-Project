import { Component, Input, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common'

@Component({
  selector: 'input-container',
  imports: [CommonModule],
  templateUrl: './input-container.html',
  styleUrl: './input-container.css'
})
export class InputContainer implements OnInit {

@Input()
label !: string;
@Input ()
bgcolor = 'white';
  constructor(){}
  ngOnInit(): void {
    
  }

}
