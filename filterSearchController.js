import {LightningElement,api,track} from 'lwc';

export default class FilterSearchController extends LightningElement {

    @api accountrecords;
    @api originalaccountrecords;
    sFilter = '';
    newArray = [];
    originalArray = [];
    

    updateFilterKey(event)
    {
      this.sFilter = event.target.value;
 
      
      console.log('filterVal'+ this.sFilter)
      console.log('Passed List from Parent'+ this.accountrecords)
    }


handleFilterData(){

   this.accountrecords = this.originalaccountrecords.filter(function(element) {
    return element.Name.toLowerCase().includes(this.sFilter.toLowerCase());
    }, this);

   

    

   

}

}