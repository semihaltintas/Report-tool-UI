import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { requestModel, branchModel } from 'src/app/models/globalModel';
import { UserService } from 'src/app/shared/userServices/user.service';
import { Router } from '@angular/router';
import Form from "devextreme/ui/form";
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-requestForm',
  templateUrl: './requestForm.component.html',
  styleUrls: ['./requestForm.component.scss']
})
export class RequestFormComponent implements OnInit {
  colCountByScreen :Object;
  requestForm : requestModel;
  branchList : branchModel[];
  reportTitle = ''
  constructor(public _globalService : GlobalService,public _userServices : UserService,public _router : Router) {
    this.getBranchList()
    console.log(this._globalService.url)
    this.requestForm = _globalService.getNewRequstModel();
    this.colCountByScreen = {
      lg: 3,
      md: 3,
      sm: 1,
      xs: 1
    };
   }
   screen(width) {
    return width < 720 ? "sm" : "md";
  }
  valueChanged(e) {
    if (e.value) {
      this.colCountByScreen = {
        md: 3,
        sm: 1
      }
    } else {
      this.colCountByScreen = null;
    }
  }
  getBranchList()
{  
  this._globalService.getBranchList(this._userServices.userLicances[0].licanceId).subscribe(result => {
    this.branchList = result
  } )
}

getReportData()
{
  // this.reportTitle = "SEMİH"
  let element = document.getElementById("myForm");
  let instance = Form.getInstance(element) as Form;
  var validResult = instance.validate();
  debugger
  if (!validResult.isValid) {     
    notify({
      message: "Uyarı. Lütfen Eksik Alanları Doldurunuz.",
      position: { 
          my: "center top",
          at: "center top"
      }
    }, "error", 2000);
    return
  }
  this._router.navigate(['/Layout/' + this._globalService.url],{ queryParams: { startedDate:this.requestForm.startedDate,endDate:this.requestForm.endDate,branchCode:this.requestForm.branchCode}, skipLocationChange: true });
}

  ngOnInit() {
  }

  

}
