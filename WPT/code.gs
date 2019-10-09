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
    var settingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
    var key = settingsSheet.getRange("B1:B1").getValue();
    var WPTUrl = "https://www.webpagetest.org/runtest.php?url="+ url + "&k="+ key +"&f=json&fvonly=1";
    
    var results = [];
  
    var response = UrlFetchApp.fetch(WPTUrl);
  
    if (response.getResponseCode() == 200) {
        var content = JSON.parse(response.getContentText());

        if ((content != null) && (content["lighthouseResult"] != null)) {

                if (content["captchaResult"]) {
                      var timetointeractive = content["lighthouseResult"]["audits"]["interactive"]["displayValue"].slice(0, -2);
                      var firstcontentfulpaint = content["lighthouseResult"]["audits"]["first-contentful-paint"]["displayValue"].slice(0, -2);
                      var firstmeaningfulpaint = content["lighthouseResult"]["audits"]["first-meaningful-paint"]["displayValue"].slice(0, -2);
                      var timetofirstbyte = content["lighthouseResult"]["audits"]["time-to-first-byte"]["displayValue"].slice(19, -3);
                      var speedindex = content["lighthouseResult"]["audits"]["speed-index"]["displayValue"].slice(0, -2);
            } else {
                      var timetointeractive = "An error occured";
                      var firstcontentfulpaint = "An error occured";
                      var firstmeaningfulpaint = "An error occured";
                      var timetofirstbyte = "An error occured";
                      var speedindex = "An error occured";
            }
        }

    var currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

    array.push([timetointeractive, firstcontentfulpaint, firstmeaningfulpaint, timetofirstbyte, speedindex, currentDate, "complete"]);
    Utilities.sleep(1000);
    return array;

}