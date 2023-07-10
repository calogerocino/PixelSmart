import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "../../../../core/servizi/firebase.service";

// import Swal from "sweetalert2";

@Component({
  selector: "app-prodotti",
  templateUrl: "./prodotti.component.html",
  styleUrls: ["./prodotti.component.scss"],
})
export class ProdottiComponent implements OnInit {
  dataTableRow = [];
  searchText: string;
  DBRes: any[];
  filteredData: any[];

  constructor(private firebaseService: FirebaseService) {
    this.fetch((data) => {
      this.dataTableRow = data;
      this.filteredData = data;
    });
  }

  ngOnInit(): void {}

  fetch(cb) {
    this.firebaseService
      .getDatiDB(this.firebaseService.ApiURL + this.firebaseService.DB_prodotti)
      .subscribe(
        (data: any) => {
          this.DBRes = Object.keys(data).map((key) => {
            data[key]["id"] = key;
            return data[key];
          });
          console.log(this.DBRes);
          cb(this.DBRes);
        },
        (err) => {
          // Swal.fire({
          //   toast: true,
          //   position: "bottom-end",
          //   showConfirmButton: false,
          //   timer: 3000,
          //   title: "Devi effettuare nuovamente il login",
          //   icon: "error",
          // });
        }
      );
  }

  search() {
    if (this.searchText) {
      console.log(this.searchText);
      this.filteredData = this.dataTableRow.filter((item) => {
        return Object.keys(item).some(
          (k) =>
            item[k] != null &&
            item[k]
              .toString()
              .toLowerCase()
              .includes(this.searchText.toLowerCase())
        );
      });
    } else {
      this.filteredData = this.dataTableRow;
    }
  }
}
