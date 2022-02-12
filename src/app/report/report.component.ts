import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private report:ReportService) { } // service for api call
  // Parameters
  classDropDown:any
  performance:any
  chosenClass:string='10'
  chosenPerf:string
  DataForDisplay:any[]=[]

  ngOnInit(): void {
    // update dropdowns
    this.report.getClass().subscribe({
      next:(res)=>{
      this.classDropDown = res.classDropdown
      this.performance = res.performanceLevel 
      },
      error:(err)=>alert('Something Went Wrong')
    })
    // showing class 10 data on initiL Page load
    this.report.getStudent().subscribe({
      next:(rep)=>{
      this.DataForDisplay = rep.classes.find((obj)=>obj.className==10).studentresults
      },
      error:(err)=>alert('something went wrong')
    })
  }
  // class selection
  classValue(event){
    let selectedClass = event.target.value
    this.chosenClass = selectedClass.split(' ')[1]
  }
  // performance selection
  performanceValue(event){
    this.chosenPerf=event.target.value
  }
  // get student report
  getReport(){
    this.report.getStudent().subscribe((rep)=>{
      let stdRep = rep.classes
      let foundClass = stdRep.find((obj)=>obj.className==this.chosenClass).studentresults
      this.DataForDisplay = foundClass.filter((obj)=>obj.peformanceLevel == this.chosenPerf)
    })
  }
  // sorting
  status:string='asc'
  sortByName(){
    if(this.status=='asc'){
      this.status='desc'
      this.DataForDisplay = this.DataForDisplay.sort((a, b) => a > b ? 1 : -1) //making descending
    }
    else{
      this.status='asc'
      this.DataForDisplay = this.DataForDisplay.sort((a, b) => a < b ? 1 : -1) //making ascending
    }
  }
  // coloumn hiding operation for hiding
  expand:boolean=false
  expandFun(){
    if(this.expand==false){this.expand=true}
    else{this.expand=false}
  }

}

