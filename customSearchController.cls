public with sharing class customSearchController {
    @AuraEnabled(cacheable=true)
    public static list<Account> getAccountList(string searchKey,string searchCount) {
        string sTempSearchKey = '%' + searchKey + '%';
        Integer searchLimit = Integer.valueOf(searchCount);
		
       // create contact list to store search result 
        list<Account> lstAccount = new list<Account>();
     
	   // query contact records
        for(Account oAcc : [Select id,Name
                            From Account
                          WHERE name LIKE : sTempSearchKey LIMIT : searchLimit]){
                                lstAccount.add(oAcc);
        }
		
       //If there are no records found with searchKey then, throw aura exception with a message
         if(lstAccount.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
         
        return lstAccount;
    }
}