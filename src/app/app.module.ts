import { AuthGuard } from "./shared/_guards/auth.guard";
import { AuthModule } from "./auth/auth.module";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";
import "hammerjs";

import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule
} from "@fuse/components";

import { fuseConfig } from "app/fuse-config";

import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";
import { SampleModule } from "app/main/sample/sample.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
    const token = localStorage.getItem("token");
    console.log("gotToken", token);
    return token;
}

const appRoutes: Routes = [
    {
        path: "auth",
        loadChildren: "./auth/auth.module#AuthModule"
    },
    // {
    //     path: "login",
    //     loadChildren: "./login-2/login-2.module#Login2Module"
    // },
    // {
    //     path: "register",
    //     loadChildren: "./register/register.module#RegisterModule"
    // },
    {
        path: "sample",
        redirectTo: "sample",
        canActivate: [AuthGuard]
    },
    {
        path: "**",
        redirectTo: "auth"
    }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatCheckboxModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        AuthModule,

        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: [
                    "localhost:44395",
                    "localhost:5000",
                    "localhost:5001"
                ]
            }
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
