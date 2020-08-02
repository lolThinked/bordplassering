///project/save/<identifier>

function saveProjectToServer(projectClass){
    let me = projectClass;
    let objectForSave = {};

    objectForSave.project = me.exportForJson();
    objectForSave.drawing = me.expor



}