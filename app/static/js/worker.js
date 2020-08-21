console.log("WORKERTHREAD");
importScripts('Allergy.js');
importScripts('bordClasser.js');
importScripts('canvasControl.js');
importScripts('drawingObject.js');
importScripts('functions.js');
importScripts('globals.js');
importScripts('ProjecClass.js');
importScripts('PersonClass.js');
importScripts('Seat.js');
importScripts('Table.js');
importScripts('projectFunctions.js');

onmessage = function(e) {
    /*
    console.log('Message received from main script');
    var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    console.log('Posting message back to main script');
    */
   console.log(e);
   if(e.data=="updateGui"){
    updateProjectInfoGUIupdateProjectInfoGUI();
    console.log(e);
    postMessage("TEST");
   }else if(e=="drawFrame"){
    drawFrame();
   }
    //postMessage(workerResult);
  }