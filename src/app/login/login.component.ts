import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { UserService } from '../shared/userServices/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: any;



  constructor(private _router:Router, public _userService: UserService) { }

  ngOnInit() {
    this.user = {
      userName: '',
      password: '',
      requester: ''
    };

    this._userService.rememberMe();
    if (this._userService.token)
    {
      notify({
        message: "Giriş başarılı! Ana sayfaya yönlendiriliyorsunuz.",
        position: {
            my: "center bottom",
            at: "center bottom"
        }
      }, "success", 2000);
      this._router.navigate(['/Layout']);  
    }
  }

  onFormSubmit = function(e) { 
    this._userService.login({userName: this.user.userName, password: this.user.password, requester: "herkul-service"});
    e.preventDefault();
  }

}
