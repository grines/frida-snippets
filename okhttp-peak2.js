// Locate OkhttpClient java files
// grep -rl "OkHttpClient.kt" .
// grep -r "/* compiled from:" // list original files


console.log("\\n [*] Waiting for Requests from OkHttpClient.kt");
Java.perform(function() {
    var okhttp = Java.use("eg.b0");
    okhttp.b.implementation = function(request) {
        var result = this.b(request);
        console.log("\n-----REQUEST------")
        console.log(request.toString());
        console.log("-----REQUEST------\n")
        return result;
    };
});

console.log("\\n [*] Waiting for Responses from OkHttp Response");
Java.perform(function() {
    var class2overload = Java.use("fh.s")
    class2overload.h.overload('java.lang.Object', 'eg.f0').implementation = function(arg1, arg2) {
        console.log("\n-----RESPONSE------")
        console.log("Params: " + arg1 + arg2);
        console.log("-----RESPONSE------\n")
        return this.h(arg1, arg2);

    }
});
