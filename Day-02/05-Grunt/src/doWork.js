function doWork(){
    for(var i=0; i<10000; i++){
        for(var j=0; j<10000; j++)
            for(var k=0; k<100; k++){}
        if (i % 100 === 0){
            var percentCompleted = (i / 10000) * 100;
            var response = {
                type : 'progress',
                percentCompleted : percentCompleted
            };
            self.postMessage(response);
        }
    }
}
function triggerWork(){
    doWork();
    console.log("job done");
    var response = {
        type : "completed"
    };
    self.postMessage(response);
}

self.addEventListener("message", function(evtArg){
    var reqData = evtArg.data;
    if (reqData.type === "start"){
        triggerWork();
    } else {
        console.log("unknown message from caller ", evtArg.data);
    }
});
