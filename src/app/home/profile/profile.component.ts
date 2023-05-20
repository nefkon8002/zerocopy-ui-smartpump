import { Component, OnInit,Inject } from '@angular/core';
import { ProfileService } from './profile.service';
import {HttpService} from '@core/http.service';
import {Router} from '@angular/router';
import {AuthService} from '@core/auth.service';
import {Observable} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

// import {User} from '@core/user.model';
import {UserDto} from './profile.model';
import { User } from '@core/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //mobile: number;

  profile:UserDto;
  profilesrv: ProfileService;
  title = 'Profile';
  //password: string;

  balance: string;

  constructor( private tokensService: AuthService ,private httpService: HttpService) {
    this.profilesrv = new ProfileService(httpService);

  }

  ngOnInit(): void {
    this.profileUser();
  //  this.profile= this.profileUser();
  //  this.balance = this.profile.balance;
  }

  isObject(value: any): boolean { return typeof value === 'object'; }
  
  profileUser(): void {
    this.profilesrv.getProfilebyMDN(this.tokensService.getMobile()).subscribe(
      (profile:UserDto) => {
        if(profile){
          this.profile = profile;
          this.balance=profile.balance;}

       }

    );

    }

  updateUser(user:UserDto): void {
      // this.profilesrv.updateProfilebyMDN(this.tokensService.getMobile()).subscribe(
      //   () => {
      //    console.log("Update user ok");
      //   }
      // );
      this.profilesrv.updateProfile(user).subscribe(
        () => {
         console.log("Update user ok");
        }
      );


    }

    // login(): void {
    //   this.auth.login(this.mobile, this.password).subscribe(
    //     () => {
    //       if (this.auth.untilOperator()) {
    //         this.router.navigate(['shop']).then().finally(() => this.dialog.closeAll());
    //       } else {
    //         this.dialog.closeAll();
    //       }
    //     }
    //   );
    // }

  }

