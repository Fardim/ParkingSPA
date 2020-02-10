import { AlertifyService } from "./alertify.service";
import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";

@Injectable({
    providedIn: "root"
})
export class PwaService {
    promptEvent: any = null;
    constructor(private swUpdate: SwUpdate, private alertify: AlertifyService) {
        swUpdate.available.subscribe(event => {
            alertify.confirm(
                "A new version of the application is available. Do you want to download?",
                () => {
                    window.location.reload();
                }
            );
        });

        window.addEventListener("beforeinstallprompt", event => {
            debugger;
            this.promptEvent = event;
        });
    }
}
