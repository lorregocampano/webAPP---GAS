function sendMessage(webhooklink, mensaje) {
    const payload = JSON.stringify({ text: mensaje });
    const options = {
        method: 'POST',
        contentType: 'application/json',
        payload: payload,
    };
    UrlFetchApp.fetch(webhooklink, options);
}

function enviarAviso() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Planificación"); // Acá va el niombre de tu hoja
    var data = sheet.getDataRange().getValues();
    var hoy = new Date();
    //Esta es la esteructura de mi archivo: Responsable	Tarea	Descripción	Fecha Inicio	Fecha Término	Duración	Duración_Hábil	Color	Tipo de tarea
    // Iteración
    for (var i = 1; i < data.length; i++) { 
        var responsable = data[i][0];
        var tarea = data[i][1];
        var descripcion = data[i][2];
        var fechaTermino = new Date(data[i][4]);
        
        // Un día antes de la fecha de término
        var unDiaAntes = new Date(fechaTermino);
        unDiaAntes.setDate(unDiaAntes.getDate() - 1);
        
        // aviso un día antes de la fecha de término
        if (hoy.getFullYear() === unDiaAntes.getFullYear() && hoy.getMonth() === unDiaAntes.getMonth() && hoy.getDate() === unDiaAntes.getDate()) {
            var mensaje = "Recordatorio: La tarea '" + tarea + "' asignada a " + responsable + " está próxima a vencer mañana.";
            var webhook = "https://chat.googleapis.com/v1/spaces/AAAA5wb3tQw/messages?key=xxxxxxx&token=xxxxxx";
            sendMessage(webhook, mensaje);
        }

        // aviso el mismo día de la fecha de término
        if (hoy.getFullYear() === fechaTermino.getFullYear() && hoy.getMonth() === fechaTermino.getMonth() && hoy.getDate() === fechaTermino.getDate()) {
            var mensaje = "Aviso: Hoy es la fecha de término para la tarea '" + tarea + "' asignada a " + responsable + ".";
            sendMessage(webhook, mensaje);
        }
    }
}
