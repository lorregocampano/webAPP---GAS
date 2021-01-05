function loadPartialHTML(partial) {
  const htmlServ = HtmlService.createTemplateFromFile(partial);
     var usuario = Session.getActiveUser().getEmail();
     var cuenta = Session.getActiveUser().getEmail();  
    var url ="INSERT GOOGLESHEET URL";
    var values = SpreadsheetApp.openByUrl(url);
    var ss= values.getSheetByName("OPCIONES");
    var listamoneda = ss.getRange(2,5,5,1).getValues();
    var listabenef = ss.getRange(2,7,ss.getLastRow()-1,1).getValues();
    var listaresp = ss.getRange(2,6,ss.getLastRow()-1,1).getValues();
    var listamateria = ss.getRange(2,2,18,1).getValues();
    var htmlListArray = listamoneda.map(function(r){ return r[0]; });
    var htmlListArray2 = listabenef.map(function(r){ return r[0]; });
    var htmlListArray3 = listaresp.map(function(r){ return r[0]; });
    var htmlListArray4 = listamateria.map(function(r){ return r[0]; });
    var listaregion = ss.getRange(2,8,ss.getLastRow()-1,1).getValues();
    var listadirec = ss.getRange(2,9,ss.getLastRow()-1,1).getValues();
    var listacentro = ss.getRange(2,6,ss.getLastRow()-1,1).getValues();
    var htmlListArray5 = listaregion.map(function(r){ return r[0]; });
    var htmlListArray6 = listadirec.map(function(r){ return r[0]; });
    var htmlListArray7 = listacentro.map(function(r){ return r[0]; })
    htmlServ.listamoneda=htmlListArray
    htmlServ.listabenef=htmlListArray2
    htmlServ.listaresp=htmlListArray3
    htmlServ.listamateria=htmlListArray4
    htmlServ.listaregion=htmlListArray5
    htmlServ.listadirec=htmlListArray6
    htmlServ.listacentro=htmlListArray7
    htmlServ.usuario= usuario
return htmlServ.evaluate().getContent();
}
function loadSearchView(){

return loadPartialHTML("search");

}

function loadEditCustomerView(){

return loadPartialHTML("edit");

}

function loadEditStatusView(){
return loadPartialHTML("changeStatus") ;

}
