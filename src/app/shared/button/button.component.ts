import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor() { }

  @Input() buttonText : string = ""
  @Input() isLoading : boolean = false
  @Output() onButtonClickEventEmitter = new EventEmitter();

  ngOnInit(): void {
  }

  onButtonClick(){
    if(!this.isLoading)
    {
      this.onButtonClickEventEmitter.emit()
    }
  }
}
