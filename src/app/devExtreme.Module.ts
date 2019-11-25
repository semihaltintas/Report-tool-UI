import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import  {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {DxSelectBoxModule
        ,DxTextBoxModule
        ,DxTemplateModule
        ,DxFormModule
        ,DxButtonModule
        ,DxCheckBoxModule
        ,DxTagBoxModule
        ,DxAutocompleteModule
        ,DxDataGridModule
        ,DxValidatorModule
        ,DxDropDownBoxModule
        ,DxDateBoxModule
        ,DxPopupModule
        ,DxValidationSummaryModule
        ,DxLoadPanelModule
        ,DxTextAreaModule} from 'devextreme-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        DxSelectBoxModule,       
        DxTextBoxModule,    
        DxTemplateModule,    
        DxFormModule,   
        DxTagBoxModule, 
        DxButtonModule,    
        DxCheckBoxModule,                
        DxAutocompleteModule,    
        DxDataGridModule,             
        DxDateBoxModule,
        DxDropDownBoxModule,
        DxLoadPanelModule,
        DxPopupModule,
        DxValidatorModule,
        DxValidationSummaryModule,        
        DxTextAreaModule        
    ],
    exports: [
        CommonModule,
        DxSelectBoxModule,
        DxTextBoxModule,    
        DxTemplateModule,    
        DxFormModule,    
        DxButtonModule,    
        DxCheckBoxModule,    
        DxAutocompleteModule,    
        DxDataGridModule,
        DxDateBoxModule,
        DxDropDownBoxModule, 
        DxPopupModule,
        DxValidatorModule,
        DxLoadPanelModule,
        DxValidationSummaryModule,
        DxTextAreaModule,
     ],
  })
  export class CustomDevExtremeModule { }

