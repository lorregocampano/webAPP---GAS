function getDataForSearch() {
 var url = "URL SHEET";
    var ss = SpreadsheetApp.openByUrl(url)
    var ws = ss.getSheetByName("SEARCH");  
    var range = ws.getRange(2,1,ws.getLastRow()-1,5).getValues()
    return range
  }
 function deleteById(id){
  
    var url = "URL SHEET";
    var ss = SpreadsheetApp.openByUrl(url)
    var ws = ss.getSheetByName("DATA");  //MAIN DATA
    var cuentamod= Session.getActiveUser().getEmail()
    var cuentadmin= "admin account"//use the user account
    var fechamod = "'"+ Utilities.formatDate(new Date(), "GMT-4", "dd-MM-yyyy HH:mm:ss")
    var contractId = ws.getRange(2, 1, ws.getLastRow(), 1).getDisplayValues().map(r=> r[0].toString().toLowerCase());
    var posIndex = contractId.indexOf(id.toString().toLowerCase());
    var rowNumber= posIndex <= -1? 0: posIndex +2;
    var subject = "Eliminación de registro de contrato id n°"+contractId;
    var body = "Gestión de Contratos";
    var htmlTemplate = HtmlService.createTemplateFromFile("mailing_eliminación");
    htmlTemplate.cuenta = cuentamod
    htmlTemplate.fecha = fechamod;
    htmlTemplate.contractId = ws.getRange(rowNumber, 1, 1, 1).getDisplayValues()
    var htmlBody= htmlTemplate.evaluate().getContent();
    var emails = cuentamod+","+cuentadmin;
    GmailApp.sendEmail(emails, subject, body,{ htmlBody: htmlBody });
   
    
    ws.deleteRow(rowNumber);  
 
 }

function getVehiculoById(id){

    var url = "URL SHEET";
    var ss = SpreadsheetApp.openByUrl(url)
    var ws = ss.getSheetByName("DATA");  
    var contractId = ws.getRange(2, 1, ws.getLastRow(), 1).getDisplayValues().map(r=> r[0].toString().toLowerCase());
    var posIndex = contractId.indexOf(id);
    var rowNumber= posIndex <= -1? 0: posIndex +2;
    var contractInfo= ws.getRange(rowNumber, 1, 1, 23).getDisplayValues()[0]
   
   return{ contractId: contractInfo[0],ambito: contractInfo[3], materia: contractInfo[4],descripcion: contractInfo[5],
        tipoproceso: contractInfo[6],estado: contractInfo[7],zona: contractInfo[8],region: contractInfo[9],centro: contractInfo[10],
          administrador: contractInfo[11],fechainicio: contractInfo[12],fechatermino: contractInfo[13],
          numres: contractInfo[14],fechares: contractInfo[15],status: contractInfo[16],numexp: contractInfo[17],empresa: contractInfo[18],
          rut: contractInfo[19],moneda: contractInfo[20],montouf: contractInfo[21],montopeso: contractInfo[22]//issueInputsValue3: contractInfo[23]
}
}
function editCarById(id,contractInfo){

    var url = "URL SHEET";
    var ss = SpreadsheetApp.openByUrl(url)
    var ws = ss.getSheetByName("DATA");  
    var cuentamod= Session.getActiveUser().getEmail()
    var fechamod = "'"+ Utilities.formatDate(new Date(), "GMT-3", "dd-MM-yyyy HH:mm:ss")
    var contractId = ws.getRange(2, 1, ws.getLastRow(), 1).getDisplayValues().map(r=> r[0].toString().toLowerCase());
    var posIndex = contractId.indexOf(id);
    var rowNumber= posIndex <= -1? 0: posIndex +2;
    var htmlTemplate = HtmlService.createTemplateFromFile("mailing"); 
    var cuentamod= Session.getActiveUser().getEmail()
    var cuentadmin= "admin account"
    var fechamod = "'"+ Utilities.formatDate(new Date(), "GMT-3", "dd-MM-yyyy HH:mm:ss")
    var subject = "Edición de registro de contrato id n°"+ contractInfo.id;
    var body = "Gestión de Flota";
    htmlTemplate.cuenta = cuentadmin
    htmlTemplate.cuentamod = cuentamod
    htmlTemplate.fecha = fechamod;
    htmlTemplate.contractId = contractInfo.id
    var emails = cuentamod+","+cuentadmin+","+"another account"
    var htmlBody= htmlTemplate.evaluate().getContent(); 
  

  ws.getRange(rowNumber, 4, 1, 5).setValues([[ contractInfo.ambito,contractInfo.materia,contractInfo.descripcion,contractInfo.tipoproceso,contractInfo.estado]]);
  ws.getRange(rowNumber, 9, 1, 1).setValues([[  contractInfo.zona]]);
  ws.getRange(rowNumber, 10, 1, 1).setValues([[ contractInfo.region]]);
  ws.getRange(rowNumber, 11, 1, 1).setValues([[  contractInfo.centro]]);
  ws.getRange(rowNumber, 12, 1, 1).setValues([[ contractInfo.administrador]]);
  ws.getRange(rowNumber, 13, 1, 11).setValues([[ contractInfo.fechainicio, contractInfo.fechatermino,contractInfo.numres,contractInfo.fechares,contractInfo.status, 
                                                 contractInfo.numexp,contractInfo.empresa,contractInfo.rut,contractInfo.moneda,contractInfo.montouf,contractInfo.montopeso]]);
  ws.getRange(rowNumber, 30, 1, 2).setValues([[ fechamod,cuentamod]]);
 
 GmailApp.sendEmail(emails, subject, body,{ htmlBody: htmlBody }); 
return true; 

}

function getMaxFromArrayOfArray(aoa){
let maxID = 0;
aoa.forEach(r =>{
if(r[0]>maxID) maxID = r[0]
});
return maxID

}

function addNewRow(rowData) {

  var url ="URL SHEET";
  var values = SpreadsheetApp.openByUrl(url);
  var ss= values.getSheetByName("DATA");  
  const fechainicial= Utilities.formatDate(new Date(), "GMT-3", "dd-MM-yyyy HH:mm:ss");
  const aoaIds = ss.getRange(2,1,ss.getLastRow(),1).getValues();
  var row = ss.getLastRow();
  var archivo1= ss.getRange(row,27).getValues();
  var archivo2=  ss.getRange(row,28).getValues(); 
  const newIdNumber = getMaxFromArrayOfArray(aoaIds) +1;
  var id = newIdNumber
  var htmlTemplate = HtmlService.createTemplateFromFile("mailing_cambio");
  var fecha = new Date()
  var fechaformated = Utilities.formatDate(fecha, "GMT-3", "yyyy-MM-dd HH:mm:ss")
  var fechainicioform =Utilities.formatDate( new Date(rowData.fechainicio),"GMT-3", "yyyy-MM-dd")
  var fechaterminoform =Utilities.formatDate(new Date(rowData.fechatermino),"GMT-3", "yyyy-MM-dd")
  var fecharesform =Utilities.formatDate(new Date(rowData.fechares),"GMT-3", "yyyy-MM-dd")
  htmlTemplate.cuenta = rowData.cuenta;
  htmlTemplate.empresa = rowData.empresa;
  htmlTemplate.numexp = rowData.numexp;
  htmlTemplate.numres = rowData.numres;
  htmlTemplate.id = newIdNumber;
  htmlTemplate.fecha = fechaformated;
  htmlTemplate.archivo1 = archivo1;
  htmlTemplate.estado= rowData.estado
  htmlTemplate.fechainicioform = fechainicioform;
  
  var subject = "NOTIFICACIÓN DE INGRESO DE RESOLUCIÓN N° "+rowData.numres;
  var body = "Gestión de Contratos";
  var htmlBody= htmlTemplate.evaluate().getContent();
  var emails = rowData.cuenta;
      
  ss.appendRow([id,fechainicial,rowData.cuenta,rowData.ambito,rowData.materia,rowData.descripcion,rowData.tipoproceso,rowData.estado,rowData.zona,
  rowData.region,rowData.centro,rowData.administrador,fechainicioform,fechaterminoform,rowData.numres,fecharesform,rowData.status,rowData.numexp,rowData.empresa,rowData.rutempresa,
  rowData.moneda,rowData.montouf,rowData.montopeso,rowData.issueInputsValue3," "," ",," ",rowData.contractId

                ]);
                
              
 Utilities.sleep(10000)

 // GmailApp.sendEmail(emails, subject, body,{ htmlBody: htmlBody });                 
 GmailApp.sendEmail(emails+","+"another account", subject, body,{ htmlBody: htmlBody }); 
  
}
function saveFile(obj) {
 var blob = Utilities.newBlob(Utilities.base64Decode(obj.data), obj.mimeType, obj.fileName);
 var folder = "FOLDER ID"
 var file = DriveApp.getFolderById(folder).createFile(blob);
 var cellFormula = '='+'hyperlink("' + file.getUrl() + '";"' + file.getName() + '")';
 var urlFile =file.getUrl()
 var url ="URL SHEET";
  var values = SpreadsheetApp.openByUrl(url);
  var ss= values.getSheetByName("DATA"); 
  var row = ss.getLastRow();
  ss.getRange(row, 27).setValue(urlFile);
  ss.getRange(row, 25).setValue(cellFormula);

  
 return file.getId();
}

function saveFile2(obj) {
 var blob = Utilities.newBlob(Utilities.base64Decode(obj.data), obj.mimeType, obj.fileName);
 var folder = "FOLDER ID"
 var file = DriveApp.getFolderById(folder).createFile(blob);
 var cellFormula = '='+'hyperlink("' + file.getUrl() + '";"' + file.getName() + '")';
 var url ="URL SHEET";
  var values = SpreadsheetApp.openByUrl(url);
  var ss= values.getSheetByName("DATA"); 
  var row = ss.getLastRow();
  var urlFile =file.getUrl()
ss.getRange(row, 28).setValue(urlFile);
ss.getRange(row, 26).setValue(cellFormula);

  
 return file.getId();
}

function getDropdownArray(){
var url ="URL SHEET";
var values = SpreadsheetApp.openByUrl(url);
var ws= values.getSheetByName("OPCIONES")
return ws.getRange(2,1,ws.getLastRow(),2).getValues();

}
function getDropdownArray2(){
var url ="URL SHEET";
var values = SpreadsheetApp.openByUrl(url);
var ws= values.getSheetByName("OTHEROPTIONS")

return ws.getRange(2,1,ws.getLastRow(),3).getValues();

}
function getDropdownArray3(){
var url ="URL SHEET";
var values = SpreadsheetApp.openByUrl(url);
var ws= values.getSheetByName("BENEFICIARIOS")
//var test = ws.getRange(2,1,ws.getLastRow()-1,3).getValues();
//console.log(test)
return ws.getRange(2,1,ws.getLastRow(),3).getValues();

}
function getBeneficiarios() {
var url ="URL SHEET";
var values = SpreadsheetApp.openByUrl(url);
var ws= values.getSheetByName("BENEFICIARIOS")
  var rangeValues = ws.getRange(2,3,ws.getLastRow(),1).getValues();
  return rangeValues;
}

function mailingcontractedit(id){

    var url = "URL SHEET";
    var ss = SpreadsheetApp.openByUrl(url)
    var ws = ss.getSheetByName("DATA"); 
    var contractId = ws.getRange(2, 1, ws.getLastRow(), 1).getDisplayValues().map(r=> r[0].toString().toLowerCase());
    var posIndex = contractId.indexOf(id);
    var rowNumber= posIndex <= -1? 0: posIndex +2;
    var htmlTemplate = HtmlService.createTemplateFromFile("mailing"); 
    var cuentamod= Session.getActiveUser().getEmail()
    var cuentadmin= "admin account"
    var fechamod = "'"+ Utilities.formatDate(new Date(), "GMT-3", "dd-MM-yyyy HH:mm:ss")
    var subject = "Edición de registro de contrato id n°"+ contractId;
    var body = "Gestión de contratos";
    htmlTemplate.cuenta = cuentadmin
    htmlTemplate.cuentamod = cuentamod
    htmlTemplate.fecha = fechamod;
    htmlTemplate.contractId = contractId
    var emails = cuentamod+","+cuentadmin
    var htmlBody= htmlTemplate.evaluate().getContent(); 
  GmailApp.sendEmail(emails, subject, body,{ htmlBody: htmlBody });  
}
//the format date in the sheets is rigth as follow = yyyy-mm-dd
