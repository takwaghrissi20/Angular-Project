import { Component, Input, OnInit, Output ,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'default-button',
  imports: [CommonModule],
  templateUrl: './default-button.html',
  styleUrl: './default-button.css'
})
export class DefaultButton implements OnInit {

@Input()
type:'submit'|'button' = 'submit';
@Input()
text:string = 'submit';
@Input()
bgcolor = '#e72929';
@Input()
color = 'white';
@Input()
fontSizeRem = 1.3;
@Input()
widthRem = 12;
@Output()
onClick = new EventEmitter ()
  constructor(){}
  ngOnInit(): void {
    
  }

}
