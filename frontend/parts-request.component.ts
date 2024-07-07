import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EnglishLabels } from 'src/app/@shared/labels/en-label';
import { PartsRequestService } from '../../services/parts-request.service';
import { DiagnosticOrderService } from 'src/app/@core/DiagnostiOrder/services/diagnostic-order.service';
import { MatDialog } from '@angular/material/dialog';
import { DisableRuleComponent } from '../disable-rule/disable-rule.component';
import { Router } from '@angular/router';
import { DiagnosticOrderPartsNumberComponent } from 'src/app/@core/DiagnostiOrder/component/diagnostic-order-parts-number/diagnostic-order-parts-number.component';

interface Documents {
  name: string;
}
@Component({
  selector: 'app-parts-request',
  templateUrl: './parts-request.component.html',
  styleUrls: ['./parts-request.component.scss']
})
export class PartsRequestComponent implements OnInit{
  documentArray: Documents[] = [
    { name: 'Analysis sheet' },
    { name: 'DAS' },
    { name: 'Guided test documentation' },
    { name: 'failure environment data' },
    { name: 'Control unit protocol' }
  ];

  documentsControl = new FormControl([] as Documents[]);

  onSelectionChange(event: any) {
    this.documentsControl.setValue(event, { emitEvent: false });
  }

  remove(removeDocument: any): void {
    const documentsControl = this.documentsControl.value as Documents[];
    this.documentsControl.setValue(
      documentsControl.filter((selectedDocument) => selectedDocument !== removeDocument)
    );
  }

  labels = EnglishLabels;
  prData!: any;
  createRule:boolean =false;
  hideTable:boolean=false;
  tableName = 'PartsRequestTable';
  showCreateRulePanels: boolean = true;
  createManualRuleUserData!: any;
  ruleID=false;
  auditruleID:String='';
  hideCreateRuleButton=true;
  showCreateRuleButton = false;
  hideBackButton=true;
  enableUpdateRuleButton=false;
  createRuleSuccessMsg = false;
  updateRuleSuccessMsg = false;
  hideSaveButton = false;
  hideDeleteButton = true;
  disableCreateRule : boolean = false;
  insideShowSummary: boolean = false;
  duplicateButtonClicked: boolean = false
  fetchRuleId!: any;
  showDisableButton: boolean = false;
  showDuplicateButton: boolean = false;
  hideDuplicateButton: boolean = false;
  marketDropDown=['market item 1','market item 2','market item 3']
  warrantyFactoryDropDown=['warrantyFactory1','warrantyFactory2','warrantyFactory3']
  unloadingPointDropDown=['unloading item 1','unloading item 2','unloading item 3']
  testingMarketDropDown=['testing 1','testing 2','testing 3']
  ruleOptionDropDown=['option item 1','option item 2','option item 3']
  ruleCategoryDropDown=['category item 1 ','category item 2','category item 3']
  expressDropdown=['yes','no']
  statusDropDown=['approved','pending','rejected']
  documentsDropDown=['Analysis Sheet','Input DAS','Test Step Documentation','Report for guided test']
  createRuleData: any;
  showCreateRuleDOflow: boolean = false;
  creatRuleButtonClicked: boolean = false;
  createManualRuleForm!: FormGroup;
  disableSave: boolean = true;
  partsNumberValue :any[]= [];
  value!:any;
  newRuleId: any;
  damageMainPartDropdown=['yes','no']
  redListDropdown=['with','without']
  yellowListDropdown=['with','without']
  returnValueDropdown=['with','without']
  assemblyFlagDropdown=['yes','no']
  valueLimits=['greater','less']
  unitKmMilesDropdown=['km','miles']
  damageBeforeDropdown=['yes','no']
  serviceTypeDropdown=['item1','item2']
  tgaClaimedDropdown=['claimed1','claimed2']
  specialEquipmentsDropdown=['equipments1','equipments2']
 
  dateEnabled=false;
  constructor(private fb: FormBuilder, private partService: PartsRequestService, private diagnosticorderService: DiagnosticOrderService, private dialog:MatDialog,
    private router:Router) {
    this.createManualRuleForm = this.fb.group({
      storageLocation: [''],
      ruleName: ['', Validators.required],
      express: ['', Validators.required],
      value: [''],
      maxParts: [''],
      recieved: [''],
      validityDate: ['', Validators.required],
      percentage: [''],
      market: ['', Validators.required],
      warrantyFactory: ['', Validators.required],
      unloadingPoint: ['', Validators.required],
      testingMarket: ['', Validators.required],
      ruleOption: ['', Validators.required],
      ruleCategory: ['', Validators.required],
      status: [''],
      fromDate: [''],
      toDate :[''],
   
      partNumber: [''],
      damageMainPart: ['', Validators.required],
      redList: ['', Validators.required],
      yellowList: ['', Validators.required],
      returnValue: [''],
      damageDate: [''],
      assemblyFlag: ['', Validators.required],
      tgaClaimed: [''],
      part: [''],
      partScope: [''],
      opTime: [''],
      valueLimits: [''],
      serviceType: ['', Validators.required],
   
      category: [''],
      subCategory: [''],
      finFromTo: [''],
      modelYearFromTo: [''],
      specialEquipments: [''],
      runningTimeInMonths: [''],
      mileageFromTo: [''],
      unitKmMiles: ['', Validators.required],
      damageBefore: [''],
      productionDateFromTo: [''],
   
      dealerNumber: [''],
      documents: [''],
      documentsControl:[''],
      messageToDealer: [''],

      registrationDateFromTo: [''],
      fromDateRegistration: [''],
      toDateRegistration :[''],

      fromToDateProduction: [''],
      fromDateProduction: [''],
      toDateProduction :[''],
  
    })
        this.createManualRuleForm.get('fromDateRegistration')?.valueChanges.subscribe(() => this.updateRegistrationDate());
        this.createManualRuleForm.get('toDateRegistration')?.valueChanges.subscribe(() => this.updateRegistrationDate());
  }

  ngOnInit(): void {
    let createRuleClicked = this.diagnosticorderService.approvedCreateRule;
    if(createRuleClicked){
          this.showCreateRulePanels = true;
          this.createRule = true;
          this.hideCreateRuleButton = false;
          this.hideTable = true;
        //map whichever field is required from the below line.
        this.createRuleData = this.diagnosticorderService.createRuleData;
        this.createManualRuleForm.patchValue({
          partNumber : this.diagnosticorderService.createRuleData.partNumber
        })
        this.showCreateRuleDOflow = true;
    }


    this.getManualRuleData();
    this.partService.viewRule.subscribe(id => {
      if(id){
        this.newRuleId=id;
        this.ruleID = true;
        this.hideCreateRuleButton = false;
        this.enableUpdateRuleButton = false;
        this.showCreateRulePanels =  false;
        this.fetchManualRuleById(id);
        this.showCreateRuleButton = false;
        this.showDisableButton = false
        this.hideDuplicateButton = false;
        this.showDuplicateButton = true;
    }
    });
  }

  updateRegistrationDate() {
    const fromDateRegistration = this.createManualRuleForm.get('fromDateRegistration')?.value;
    const toDateRegistration = this.createManualRuleForm.get('toDateRegistration')?.value;
 
    if (fromDateRegistration && toDateRegistration) {
        const fromDateString = this.formatDate(fromDateRegistration);
        const toDateString = this.formatDate(toDateRegistration);
        this.createManualRuleForm.get('registrationDateFromTo')?.setValue(`${fromDateString} - ${toDateString}`);
        this.dateEnabled=false;
     
    }
  }
 
  formatDate(date: Date): string {
    return date.toLocaleDateString();
  }

  showRegistrationDate(){
    this.dateEnabled=true;
  }
  //to view selected existing row on the table
  fetchManualRuleById(id: any){
    this.partService.getManulaRuleById(id).subscribe({
      //uncomment the below code once devshpere setup is done
      next: (response:any) => {
        if(response){
          console.log("response", response);
          
          this.createManualRuleUserData = response[0];
          
        }
      },
      error: (err:any) => {
        console.log("error fetching manual rule by id", err);
        
      }
    })
  }

  editeRow(event: any){
    this.showDisableButton = false;
    this.hideDuplicateButton = true;
    this.showCreateRuleButton = false;
    if(event){
      this.fetchRuleId =event.ruleId;
      this.ruleID = true;
      this.createRule = !this.createRule;
      this.enableUpdateRuleButton = true;
      this.hideTable = !this.hideTable; 
      this.hideCreateRuleButton = false;
      this.fetchManualRuleById(event.ruleId);
      this.createManualRuleUserData = event;
      this.createManualRuleForm.patchValue({
        storageLocation:event?.storageLocation,
        ruleName:event?.ruleName,
        express:event?.express,
        value:event?.value,
        validityDate:event?.validityDate,
        maxParts:event?.maxParts,
        recieved:event?.recieved,
        percentage:event?.percentage,
        market: event?.market,
        warrantyFactory: event?.warrantyFactory,
        unloadingPoint: event?.unloadingPoint,
        testingMarket: event?.testingMarket,
        ruleCategory: event?.ruleCategory,
        ruleOption: event?.ruleOption
      })
      this.hideSaveButton = true;
      this.showCreateRuleButton = false;
    }
  }

  disable(event: any){
    this.ruleID = true;
    this.hideCreateRuleButton = false;
    this.enableUpdateRuleButton = false;
    this.showCreateRulePanels =  false;
    this.showCreateRuleButton = false;
   this.createManualRuleUserData = event;
   this.showDisableButton = true;
   this.hideDuplicateButton = true;
  }

  partsNumberModel(){
    let approveStates = false;
    const dialogRef = this.dialog.open(DiagnosticOrderPartsNumberComponent, {
      autoFocus:false,
      data :{approveStates}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Handle the data received from the dialog here and update the main component
      this.partsNumberValue = result;
      this.value = this.partsNumberValue.map((item:any)=>`${item.partNumber} | ${item.partName}`).join(', ');
    });
  }
  

  onSave() {
    // if (this.createManualRuleForm.status === 'VALID') {
      // const reqJson = {
      //   storageLocation: this.createManualRuleForm.value.storageLocation,
      // ruleName:  this.createManualRuleForm.value.ruleName,
      // express:  this.createManualRuleForm.value.express,
      // value:  this.createManualRuleForm.value.value,
      // maxParts:  this.createManualRuleForm.value.maxParts,
      // recieved:  this.createManualRuleForm.value.recieved,
      // validityDate: this.createManualRuleForm.value. validityDate,
      // percentage:  this.createManualRuleForm.value.percentage,
      // market:  this.createManualRuleForm.value.market,
      // warrantyFactory: this.createManualRuleForm.value.warrantyFactory ,
      // unloadingPoint: this.createManualRuleForm.value.unloadingPoint ,
      // testingMarket: this.createManualRuleForm.value. testingMarket,
      // ruleOption:  this.createManualRuleForm.value.ruleOption,
      // ruleCategory:  this.createManualRuleForm.value.ruleCategory,
      // }
      const partsContent = this.partsNumberValue.map(item => ({
        partId: item.id,
        units: item.units, 
        arrived: 0,
      }));
   let payload = {
    "market": this.createManualRuleForm.value.market,
    "warrantyFactory": this.createManualRuleForm.value.warrantyFactory,
    "unloadingPoint": this.createManualRuleForm.value.unloadingPoint,
    "testingMarket": this.createManualRuleForm.value.testingMarket,
    "ruleName": this.createManualRuleForm.value.ruleName,
    "ruleCategory": this.createManualRuleForm.value.ruleCategory,
    "validityFrom": this.createManualRuleForm.value.validityFrom,
    "validityTo": this.createManualRuleForm.value.validityTo,
    "status": this.createManualRuleForm.value.status,
    "finFromTo": this.createManualRuleForm.value.finFromTo,
    "createdBy": this.createManualRuleForm.value.createdBy,
    "createdDate": this.createManualRuleForm.value.createdDate,
    "modifiedBy": this.createManualRuleForm.value.modifiedBy,
    "modifiedDate": this.createManualRuleForm.value.modifiedDate,
    "createRuleEnabled": this.createManualRuleForm.value.createRuleEnabled,
    "express": this.createManualRuleForm.value.express,
    "maxR_parts": this.createManualRuleForm.value.ruleName,
    "received": this.createManualRuleForm.value.ruleName,
    "damageMainPart": this.createManualRuleForm.value.damageMainPart,
    "redList": this.createManualRuleForm.value.redList,
    "yellowList": this.createManualRuleForm.value.yellowList,
    "returnValue": this.createManualRuleForm.value.returnValue,
    "damageDate": this.createManualRuleForm.value.damageDate,
    "assemblyFlag": this.createManualRuleForm.value.assemblyFlag,
    "tgaClaimed": this.createManualRuleForm.value.tgaClaimed,
    "part": this.createManualRuleForm.value.part,
    "partScope": this.createManualRuleForm.value.partScope,
    "opTime": this.createManualRuleForm.value.opTime,
    "valueLimits": this.createManualRuleForm.value.valueLimits,
    "serviceType": this.createManualRuleForm.value.serviceType,
    "category": this.createManualRuleForm.value.category,
    "subCategory": this.createManualRuleForm.value.subCategory,
    "modelYearFromTo": this.createManualRuleForm.value.modelYearFromTo,
    "specialEquipments": this.createManualRuleForm.value.specialEquipments,
    "runningTime": this.createManualRuleForm.value.runningTime,
    "mileageFromTo": this.createManualRuleForm.value.mileageFromTo,
    "unit": this.createManualRuleForm.value.unit,
    "registrationDateFromTo": this.createManualRuleForm.value.registrationDateFromTo,
    "damageBefore": this.createManualRuleForm.value.damageBefore,
    "productionDateFromTo": this.createManualRuleForm.value.productionDateFromTo,
    "dealerNo": this.createManualRuleForm.value.dealerNo,
    "documents": this.createManualRuleForm.value.documents,
    "partNumbers":  partsContent
  }
      
      this.partService.createNewRule(payload).subscribe({
        next: (val: any) => {
          this.newRuleId=val.ruleId;
          alert("saved successfully");
        },
        error: (err: any) => {
          console.log(err);
        },
      });

    // }
  }


  onCreateRuleClick(){
    this.creatRuleButtonClicked = true;
    this.hideTable = false; 
    // this.showCreateRulePanels = true;
    this.hideDuplicateButton = true;

    // if(this.createManualRuleForm.status === 'VALID'){
      this.partService.getManulaRuleById(this.newRuleId).subscribe({
         next: (response: any) => {
          if(response){
            this.createRuleSuccessMsg = true;
            //setting the rule id which is newly generated from BE
           this.createManualRuleUserData.ruleId = response.ruleId;
          }
        },
        error: (err: any) => {
        console.log("error in creating new rule", err)
      }
    }
      )
    // }

  }

  backToCreateRulePanel(){
    this.showCreateRulePanels = true;
    this.createRuleSuccessMsg = false;
    this.enableUpdateRuleButton = false;
    this.updateRuleSuccessMsg = false;
    if(this.insideShowSummary == true && this.creatRuleButtonClicked === true ){
      this.createRule = false;
      this.hideSaveButton = false;
    }
    if(this.insideShowSummary == true && this.createRule == true){
      this.hideCreateRuleButton = false;
    }
    else{
      this.hideCreateRuleButton = true;
    }
  }

  onDisableClicked(){
    this.hideDuplicateButton = true;
    const dialogRef = this.dialog.open(DisableRuleComponent, {
      height: '171px',
      width: '600px',
      panelClass: 'disablerule',
      data: this.createManualRuleUserData.ruleId
    });
    dialogRef.afterClosed().subscribe( data => {
      if(data){
       this.showCreateRulePanels = true;
    this.createRuleSuccessMsg = false;
    this.updateRuleSuccessMsg = false;
    if(this.insideShowSummary == true && this.createRule == true){
      this.hideCreateRuleButton = false;
    }
    else{
      this.hideCreateRuleButton = true;
    }
      }
    })
  }

  showSummary(){
    this.insideShowSummary = true;
    this.showDuplicateButton = false;
     if(this.createManualRuleForm.dirty){
      this.ruleID = true;
      this.showCreateRulePanels =  false;
      this.createManualRuleUserData = this.createManualRuleForm.value;
    }
    if(this.createManualRuleForm.invalid){
      this.disableCreateRule = true
    }
    else{
      this.disableCreateRule = false
    }
    if(this.showCreateRuleDOflow == true){
      this.showCreateRuleButton = true;
    }
  }

  getManualRuleData() {
  
      this.partService.getAllManualRule().subscribe({
        next: (res: any) => {
          res.forEach((element: any) => {
            console.log(element.status)
          });

          this.prData = res;
        },
        error: (err: any) => {
          console.log("error in fetching all manula rule",err);
        },
      }); 
  }
  toCreateRule(){
    this.showDisableButton = false
    this.createManualRuleForm.patchValue({
      storageLocation:"",
      ruleName:"",
      express:"",
      value:"",
      validityDate:"",
      maxParts:"",
      recieved:"",
      percentage:"",
      market: "",
      warrantyFactory: "",
      unloadingPoint: "",
      testingMarket: "",
      ruleCategory: "",
      ruleOption: ""
    })
    this.ruleID = false;
    this.createRule = true;
    this.hideTable = true;
    this.hideCreateRuleButton = false;
    this.enableUpdateRuleButton= false;
    this.showCreateRuleButton = true;
    this.hideSaveButton = false;
    this.diagnosticorderService.updateSecondTableData([])
  }
  
  toCancelRule(){
    this.createRule = false;
    this.hideTable  = false
  }

  onEditCancelClick(){
    this.showCreateRulePanels = true;
    this.createRule = false;
    this.hideTable = false; 
    this.hideCreateRuleButton = true
  }

  onUpdateRuleClick(){
    this.updateRuleSuccessMsg = true;

    const reqJson = {
      id: this.fetchRuleId,
      data: this.createManualRuleForm.value
    }
   
    // if(this.createManualRuleForm.status === 'VALID'){
      
    this.partService.updateExistingRule(reqJson).subscribe({
         next: (response: any) => {
          if(response){
           this.updateRuleSuccessMsg = true;
          }
        },
        error: (err: any) => {
        console.log("error in updating an existing rule", err)
      }
    }
      )
    // }

  }

  onCopyRuleClicked(selectedId: any){
    this.ruleID=false;
    this.disableSave = false;
    this.duplicateButtonClicked = true;
    this.showCreateRulePanels = true;
    this.showCreateRuleButton = true;
    this.hideTable = true;
    this.createRule = true;
    if(this.insideShowSummary == true && this.createRule == true){
      this.hideCreateRuleButton = false;
    }
    else{
      this.hideCreateRuleButton = true;
    }
    this.fetchManualRuleById(this.newRuleId);
    this.createManualRuleForm.patchValue({
      storageLocation:this.createManualRuleUserData[0].storageLocation,
      ruleName:this.createManualRuleUserData[0].ruleName,
      express:this.createManualRuleUserData[0].express,
      value:this.createManualRuleUserData[0].value,
      validityDate:this.createManualRuleUserData[0].validityDate,
      maxParts:this.createManualRuleUserData[0].maxParts,
      recieved:this.createManualRuleUserData[0].recieved,
      percentage:this.createManualRuleUserData[0].percentage,
      market: this.createManualRuleUserData[0].market,
      warrantyFactory: this.createManualRuleUserData[0].warrantyFactory,
      unloadingPoint: this.createManualRuleUserData[0].unloadingPoint,
      testingMarket: this.createManualRuleUserData[0].testingMarket,
      ruleCategory: this.createManualRuleUserData[0].ruleCategory,
      ruleOption: this.createManualRuleUserData[0].ruleOption,
       yellowList : this.createManualRuleUserData[0].yellowList,
     returnValue : this.createManualRuleUserData[0] .returnValue,
     damageDate : this.createManualRuleUserData[0] .damageDate,
     assemblyFlag : this.createManualRuleUserData[0] .assemblyFlag,
     tgaClaimed : this.createManualRuleUserData[0] .tgaClaimed,
     part : this.createManualRuleUserData[0].part,
     partScope : this.createManualRuleUserData[0] .partScope,
     opTime : this.createManualRuleUserData[0] .opTime,
     valueLimits : this.createManualRuleUserData[0].valueLimits,
     serviceType : this.createManualRuleUserData[0].serviceType,
     category : this.createManualRuleUserData[0].category,
     subCategory : this.createManualRuleUserData[0].subCategory,
     modelYearFromTo : this.createManualRuleUserData[0].modelYearFromTo,
     specialEquipments : this.createManualRuleUserData[0].specialEquipments,
     runningTime :this.createManualRuleUserData[0].runningTime,
     mileageFromTo : this.createManualRuleUserData[0].mileageFromTo,
     unit : this.createManualRuleUserData[0].unit,
     registrationDateFromTo :this.createManualRuleUserData[0].registrationDateFromTo,
     productionDateFromTo : this.createManualRuleUserData[0].productionDateFromTo,
     dealerNo : this.createManualRuleUserData[0].dealerNo,
     documents :this.createManualRuleUserData[0].documents,
    })
    
  }
btnauditLog(auditruleID:String){
    this.router.navigate(['partsRequest/audit-log',auditruleID]);
  }
}
