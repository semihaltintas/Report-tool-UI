import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // 
  private baseURL = "https://sso.api.kerzz.com:4000/";
  // private baseURL = "https://localhost:4000/";

  // http options used for making API calls
  private httpOptions: any;

  // JWT token token
  public token: string;

  // the token token expiration date
  public token_expires: number;

  // requester of the logged in user
  public requester: string;

  // serviceId for the secret key request
  public serviceId: string;

  // secret key for validation
  public secretKey: string;

  // userInfo received from the token
  public userAutDetails: any;
  public userAuthGroup: any;
  public userID: any;
  public userIsVerified: any;
  public userLang: any;
  public userLicances: any;
  public userMail: any;
  public userName: any;
  public userPhone: any;
  public userSurname: any;
  public usernameid: any;
  public userType: any;

  // error messages received from the login attempt
  public errors: any = [];

  constructor(private http: HttpClient, private _router:Router, public Translate: TranslateService)
  {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json', 'apiKey':'Z2FuZGFsZiBpcyBjb21pbmcgLSBzc28ua2V5LmFwaQ=='})
    };
  }

  // Uses http.post() to get an auth token from SSO API endpoint
  public login(loginData) {
 
    this.http.post(this.baseURL + 'api/login', JSON.stringify(loginData), this.httpOptions).
    subscribe(
      (val) => { 
     
        this.token = val['token'];
        
        console.log("Token:", this.token);
      },
      response => {
        console.log("POST in error", response);
        notify({
          message: "Giriş başarısız. Email ya da şifreniz hatalı.",
          position: { 
              my: "center top",
              at: "center top"
          }
        }, "error", 2000);
      },
      () => {
        console.log("Login successful.");
        this.updateData(this.token);
        this._router.navigate(['/Layout']); 
    });
  }

  public logout() {
    console.log("Kullanici verileri silindi. Cikis yapildi");
    this.token = null;
    this.token_expires = null;
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
  }

  // Uses http.post() to get a secret key from SSO API endpoint
  public getSecretKey() {
   
    this.http.post(this.baseURL + 'api/servicekey', JSON.stringify({serviceId: "herkul-service", requester: "herkul-service"}), this.httpOptions).subscribe(
      data => {
        console.log('successfull get a secret key', data);
        // TODO
      },
      err => {
        console.error('error on user service', err);
        return err;
      }
    );
  }

  // Uses http.post() to get a permissions from SSO API endpoint
  public getPermissions() {
    this.http.post(this.baseURL + 'api/permissions', JSON.stringify({serviceId: "herkul-service", requester: "herkul-service"}), this.httpOptions).subscribe(
      data => {
        console.log('successfull get a permissions', data);
        // TODO
      },
      err => {
        console.error('error on user service', err);
        return err;
      }
    );
  }

  // Uses http.post() to get token from localStorage SSO API endpoint
  public rememberMe() {
    const token = localStorage.getItem("token");
    const userLang = localStorage.getItem("userLang");
    if (token != null)
    {
      this.updateData(token);
    }

    if (userLang != null)
    {
      console.log("Found userLang session. Updating language...");
      this.Translate.setDefaultLang(userLang);
      this.userLang = userLang;
    }
  }

  public verifyToken() {
    this.http.post('TODO', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      data => {
        console.log('verify is successfully completed', data);
        this.updateData(this.token);
      },
      err => {
        console.error('refresh error', err);
        this.errors = err['error'];
      }
    );
  }

  b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  private updateData(token)
  {
    this.token = token;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_data = this.b64DecodeUnicode(token_parts[1])
    const token_decoded = JSON.parse(token_data);

    //console.log(token_decoded);
    
    var exp = token_decoded.iat * 1000;
    this.token_expires = (exp + 2*60*60*1000);
    var expTime = new Date(this.token_expires)

    this.userAutDetails = token_decoded.userInfo.autDetails;
    this.userAuthGroup = token_decoded.userInfo.authGroup;
    this.userID = token_decoded.userInfo.id;
    this.userIsVerified = token_decoded.userInfo.isVerified;
    //this.userLang = token_decoded.userInfo.lang;
    this.userLicances = token_decoded.userInfo.licances;
    this.userMail = token_decoded.userInfo.mail;
    this.userName = token_decoded.userInfo.name;
    this.userPhone = token_decoded.userInfo.phone;
    this.userSurname = token_decoded.userInfo.surname;
    this.usernameid = token_decoded.userInfo.userName;
    this.userType = token_decoded.userInfo.userType;

    const expiresAt = this.token_expires;
    
    if(this.token_expires > Date.now()){
      console.log("Token Geçerli.", expTime)
      // Check and only accept exp date uncomment these
      //localStorage.setItem('token', token);
      //localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    } else {
      console.log("Token süresi dolmuş", expTime );
      // Check and only accept exp date uncomment these
      //this.token = null;
      //this.token_expires = null;
      //localStorage.removeItem("token");
      //localStorage.removeItem("expires_at");
    }

    // Check and only accept exp date comment 2 lines under this.
    localStorage.setItem('token', token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  // Change the language and save to the localStorage
  useLanguage(lan: string) {
    this.Translate.use(lan);
    this.Translate.setDefaultLang(lan);
    this.userLang = lan;
    localStorage.setItem('userLang', this.userLang);
  }

}
