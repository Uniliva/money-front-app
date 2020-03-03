import { Component,Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  template:`
  <span [ngStyle]="{'color': (data.error ? 'red' : 'white')}">
  {{data.msg}}
</span>
  `
})
export class ToastComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}


// import { Component,Inject } from '@angular/core';
// import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-toast',
//   template:`
//   <span>
//   {{data.msg}}
// </span>
//   `,
//   styles: [`
//       span {
//         color: red;
//       }

//   `]
// })
// export class ToastComponent {
//   constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
// }

