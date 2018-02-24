// With callback:

var elementArray=new Array();
function fetchdata(callback){
db.transaction(function(tx){
    tx.executeSql("Select * from contactTable",[],function(tx,results){
        for(var i=0;i<results.rows.length;i++){
            var element=new Object();
            element.Name=results.rows.item(i).name;
            element.Lastname=results.rows.item(i).last_name;
            element.Mobile=resulst.rows.item(i).mobile_no;
            // ****and so on***//
            elementArray[i]=element;
        }
        callback(elementArray);
    });
});
}

function dbTranscation()
{
        console.log("$ function");
        fetchdata(createfield);

}

// another function 
function createfield(elementArray)
{ 
   // some logic 
};