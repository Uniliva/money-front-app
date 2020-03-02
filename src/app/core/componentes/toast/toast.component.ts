import { Component,Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  template:`
  <span style="color:{{data.cor}}">
  {{data.msg}}
</span>
  `
})
export class ToastComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
