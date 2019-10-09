/***************************************************
 * Webpagetest Tool
 * by Guilherme Moser de Souza @mobtec
***************************************************/

function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [
    {name: "Run WPT", functionName: "runWPT"},
  ];
  sheet.addMenu("WebPageTest", entries);
}
    
function runWPT() {
    var WPTUrl = "https://www.webpagetest.org/runtest.php?url=";

    var settingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
    var key = settingsSheet.getRange("B1:B1").getValue();


    
    var results = [];
    var rows = settingsSheet.getLastRow();

    //inicia for a partir da primeira URL na linha 4
    for(var i=4; i <= rows; i++){ 
        var url = settingsSheet.getRange(i, 1).getValue();
        if (url != "") { 
            var urlFinal = WPTUrl + url + "&k="+ key +"&f=json&fvonly=1";
            var response = UrlFetchApp.fetch(urlFinal);

            if (response.getResponseCode() == 200) {
                var content = JSON.parse(response.getContentText());
                var tempURL = content["data"]["jsonUrl"];

                if (tempURL != "") { 
                    var tempURLS = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Temp WPT URLs");
                    var lastRows = tempURLS.getLastRow()+1;
                    tempURLS.getRange(lastRows, "1").setValue(tempURL); //insere a URL temporaria na ultima linha da primeira coluna
                }
            }
        }
    }    
  
}