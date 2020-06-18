import { LightningElement,track,wire,api} from 'lwc';
// import server side apex class method 
import getAccountList from '@salesforce/apex/customSearchController.getAccountList';
// import standard toast event 
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class SearchAccount extends LightningElement {

//@track: Marks a property for internal monitoring. A template or function using- 
    //this property forces a component to rerender when the property’s value changes.
    @api accounts;


    sVal = '';
    sCount = '';

     // update sVal var when input search field value change
     updateSeachKey(event) {
        this.sVal = event.target.value;
    }

    // update sCount var when input search count value change
    updateCountKey(event) {
        this.sCount = event.target.value;
    }

     // call apex method on button click 
     handleSearch() {
        // if search input value is not blank then call apex method, else display error msg 
        if(this.sVal!='' || this.sCount!=''){
        getAccountList({
            searchKey: this.sVal,searchCount: this.sCount
        })
        .then(result => {
            // set @track contacts variable with return contact list from server  
            this.accounts = result;
        })
        .catch(error => {
            // display server exception in toast msg 
            const event = new ShowToastEvent({
                title: 'Error',
                variant: 'error',
                message: error.body.message,
            });
            this.dispatchEvent(event);
            // reset contacts var with null   
            this.contacts = null;
        });
} else {
    // fire toast event if input field is blank
    const event = new ShowToastEvent({
        variant: 'error',
        message: 'Search text missing..',
    });
    this.dispatchEvent(event);
}

     }



}