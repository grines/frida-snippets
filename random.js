Java.perform(function() {
    var class2overload = Java.use("okhttp3.RequestBody")
    class2overload.create.overload('okhttp3.MediaType', 'java.lang.String').implementation = function(arg1, arg2) {
        console.log("\n-----BODY------")
        console.log("Params: " + arg1 + arg2);
        console.log("-----BODY------\n")
        return this.create(arg1, arg2);

    }       
    
    });
