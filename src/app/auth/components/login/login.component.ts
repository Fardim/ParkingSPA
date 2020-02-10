import { AlertifyService } from "./../../../shared/_services/alertify.service";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { FuseConfigService } from "@fuse/services/config.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private alertify: AlertifyService
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    ngOnInit() {
        this.loginForm = this._formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.required]
        });
    }

    login() {
        this.authService.login(this.loginForm.value).subscribe(
            () => {
                this.alertify.success("Successfully logged in");
            },
            error => {
                this.alertify.error(error);
            },
            () => {
                this.router.navigate(["/sample"]);
            }
        );
    }
}
