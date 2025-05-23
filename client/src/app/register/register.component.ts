import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  model: any = {};
  //Used to get variables from the parent aka home component, home component.html needs to specify a value of this prop is "required is specified"
  //NOTE this way to getting a variable from the parent we need to treat the variable as an angular signal aka () syntax must be followed, signals are used to maintain state that flows down (parent -> child)
  //NOTE Parent to child and Child to parent communication is always initiated by the child, here that would be register
  //NOTE input: get from parent to child, output: child to parent

  cancelRegister = output<boolean>();

  register() {
    this.accountService.register(this.model).subscribe({
        next: response => {
            console.log(response);
            this.cancel();
        },
        error: err => console.log(err)
    })
  }

  cancel() {
    this.cancelRegister.emit(false); //Events are used to communicate actions above  (child -> parent)
  }
}
