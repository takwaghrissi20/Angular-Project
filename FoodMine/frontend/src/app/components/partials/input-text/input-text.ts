import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl ,ReactiveFormsModule } from '@angular/forms';
import { InputContainer } from "../input-container/input-container";
import { InputValidation } from '../input-validation/input-validation';

@Component({
  selector: 'input-text',
  imports: [InputContainer,InputValidation ,ReactiveFormsModule],
  templateUrl: './input-text.html',
  styleUrl: './input-text.css'
})
export class InputText implements OnInit{



  @Input()
  control!:AbstractControl;
  @Input()
  showErrorWhen:boolean = true ;
  @Input()
  label!: string;
  @Input()
  type:'text' | 'password' | 'email' = 'text' ;
  
  get formControl(){
    return this.control as FormControl
  }
  constructor(){}
  ngOnInit(): void {
    
  }

}
