//HIDE And SHOW Functions
let hideShowChecks = {
    "presets" : true,
    "tablePreview" : true,
    "tablesList":true,
    "mouseTools":true,
};
//Hide/Show Presets
let hideshowpresetcheck = true;
function hideshowpresets(){
    let hideShowEL = document.querySelector(".hideShowPresets");
    let presetsList = document.getElementById("presetsList");
    if(hideshowpresetcheck){
        hideshowpresetcheck = false;
        hideShowEL.innerHTML = "<h1>❯</h1>";
        presetsList.className = "presetsListHidden";
        //document.querySelector(".presetsList").style.display = "none";
        //document.querySelector(".presetsMeny").style.display = "none";
        //hideShowEL.style.marginTop = "90px";

    }else{
        hideshowpresetcheck = true;
        hideShowEL.innerHTML = "<h1>❮</h1>";
        //document.querySelector(".presetsList").style.display = "";
        //document.querySelector(".presetsMeny").style.display = "";
        //hideShowEL.style.marginTop = "0px";
        presetsList.className = "presetsList customScrollBar";

    }
}


//Hide/Show TablePreview-Window

function hideShowTablePreview(){
    let hideShowEL = document.querySelector(".hideShowPreview");
    let hideShowContainer = document.getElementById("tablePreviewDiv");
    if(hideShowChecks.tablePreview){
        hideShowChecks.tablePreview = false;
        hideShowEL.innerHTML = "<h1>❮</h1>";
        hideShowContainer.className = "tablePreviewDivHidden";
        
    }else{
        hideShowChecks.tablePreview = true;
        hideShowEL.innerHTML = "<h1>❯</h1>";
        hideShowContainer.className = "tablePreviewDiv";

    }
}
function hideShowAddTables(){
    let hideShowEL = document.querySelector(".hideShowTables");
    let hideShowContainer = document.getElementById("addTableContainer");
    let hideTables = document.getElementById("utilityButtons");
    if(hideShowChecks.tablesList){
        hideShowChecks.tablesList = false;
        hideShowEL.innerHTML = "<h1 style='margin-top: -2px'>﹀</h1>";
        hideShowContainer.className = "addTableContainerHidden";
        hideTables.className = "utilityButtonsHidden";
        
    }else{
        hideShowChecks.tablesList = true;
        hideShowEL.innerHTML = "<h1 style='margin-top: -2px'>︿</h1>";
        hideShowContainer.className = "addTableContainer";
        hideTables.className = "utilityButtons customScrollBar";
        

    }
}

function hideShowMouseTools(){
    let hideShowEL = document.getElementById("mouseToolsHideShow");
    
    let images = document.getElementById("mouseToolsImages");
    let hideShow = document.getElementById("mouseToolsHideShow");
    if(hideShowChecks.mouseTools){
        hideShowChecks.mouseTools = false;
        hideShowEL.innerHTML = "<h1 style='margin-top: -6px;'>︿</h1>";

        images.className = "mouseToolsImagesHidden";
        hideShow.className = "mouseToolsHideShowHidden";
        
    }else{
        hideShowChecks.mouseTools = true;
        hideShowEL.innerHTML = "<h1 style='margin-top: 37px;'>﹀</h1>";

        images.className = "mouseToolsImages";
        hideShow.className = "mouseToolsHideShow";
        

    }
}