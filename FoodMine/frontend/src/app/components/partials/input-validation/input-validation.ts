import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

const VALIDATION_MESSAGES:any = {
  required:'Should not be empty',
  email:'Email is not valid',
  minlength: 'Field is too short',
  notMatch:'Password and Confirm does not match'
}
@Component({
  selector: 'input-validation',
  imports: [CommonModule],
  templateUrl: './input-validation.html',
  styleUrl: './input-validation.css'
})
export class InputValidation implements OnInit , OnChanges {

  @Input()
  control!:AbstractControl
  @Input()
  showErrorWhen:boolean = true ;
  errorMessages: string[] = [] ;
  constructor(){}

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
    
  }
  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    })
    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    })
    
  }

  checkValidation(){
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages = [] ;
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATION_MESSAGES[key])
  }

}
