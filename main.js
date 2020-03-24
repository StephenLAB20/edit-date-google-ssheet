  // ****** START FOR F TO PASTE YEAR INTO WHOLE RANGE
function changeDate() {
  let ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // get active sheet
  let year = ss.getRange(1, 4).getValue(); // cell with year
  let lastRow = ss.getLastRow(); // last not-empty row
  let targetRange = ss.getRange(2, 4, lastRow-1, 1); // range to search
  
  targetRange.setNumberFormat("@STRING@");

  let targetData = targetRange.getValues();
  
  let changedData = targetData.map(function(item) {
    if (item[0].indexOf(year) < 0 && item[0] != "") {
      item[0] = year + "-" + item[0];
}
    return item;
});
  
  targetRange.setValues(changedData);

  finishAlert();
  function finishAlert() {
    let ui = SpreadsheetApp.getUi();
    ui.alert("Done");
}
} // ****** END FOR F TO PASTE YEAR


  // ****** START FOR F TO REMOVE TIME INTO ACTIVE RANGE
function removeTime() {
  let ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // get active sheet
  let activeRange = ss.getActiveRange(); // get active range
  
  activeRange.setNumberFormat("@STRING@");

  let activeData = activeRange.getValues();
  
  let changedData = activeData.map(function(item) {
    if (item.length == 2) {
      item[0] = item[0].substr(0, 10);
      item[1] = item[1].substr(0, 10);
} 
    else if (item.length == 1) {
      item[0] = item[0].substr(0, 10);
}
    return item;
});
  
  activeRange.setValues(changedData);
  
  finishAlert();
  function finishAlert() {
    let ui = SpreadsheetApp.getUi();
    ui.alert("Done");
}
} // ****** END FOR F TO REMOVE TIME


// BUTTONS
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('My Scripts')
      .addItem('Add year', 'changeDate')
      .addSeparator()
      .addItem('Remove time', 'removeTime')
      .addToUi();
}
