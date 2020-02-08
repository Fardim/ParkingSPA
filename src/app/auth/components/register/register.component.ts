import { Router } from "@angular/router";
import { AlertifyService } from "./../../../shared/_services/alertify.service";
import { AuthService } from "./../../services/auth.service";
import { User } from "./../../../shared/_models/User";
import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import {
    ValidatorFn,
    AbstractControl,
    ValidationErrors,
    Validators,
    FormBuilder,
    FormGroup
} from "@angular/forms";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { FuseConfigService } from "@fuse/services/config.service";

@Component({
    selector: "register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    user: User;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        private alertify: AlertifyService,
        private router: Router
    ) {
        // Configure the layout
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

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
        this.registerForm = this._formBuilder.group({
            username: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
            dateOfBirth: [null, [Validators.required]],
            password: ["", Validators.required],
            gender: ["male", Validators.required],
            city: [""],
            passwordConfirm: [
                "",
                [Validators.required, confirmPasswordValidator]
            ]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm
            .get("password")
            .valueChanges.pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm
                    .get("passwordConfirm")
                    .updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    register() {
        debugger;
        if (this.registerForm.valid) {
            this.user = Object.assign({}, this.registerForm.value);
            console.log(this.user);
            this.authService.register(this.user).subscribe(
                () => {
                    this.alertify.success("Registration succcessful");
                },
                error => {
                    this.alertify.error(error);
                },
                () => {
                    this.authService.login(this.user).subscribe(() => {
                        this.router.navigate(["/sample"]);
                    });
                }
            );
        }
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get("password");
    const passwordConfirm = control.parent.get("passwordConfirm");

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === "") {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};
