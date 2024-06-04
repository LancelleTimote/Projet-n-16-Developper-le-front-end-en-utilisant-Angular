import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "src/app/components/footer/footer.component";
import { HeaderComponent } from "src/app/components/header/header.component";

@Component({
    selector: "app-not-found",
    templateUrl: "./not-found.component.html",
    styleUrls: ["./not-found.component.scss"],
    standalone: true,
    imports: [HeaderComponent, FooterComponent, RouterModule],
})
export class NotFoundComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
