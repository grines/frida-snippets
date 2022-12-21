// smali_classes10/okhttp3/internal/http/BridgeInterceptor.smali

Java.perform(function () {

   function interceptRequest(request) { //eg.d0 //Request.kt
    console.log("\n--request--") // Somtimes headers are hidden
    console.log(request)
    console.log("--request--\n")

    var tester = request.k().toString()
        var pathArray = tester.split( '/' );
        var protocol = pathArray[0];
        var fhost = pathArray[2];
        var furl = protocol + '//' + fhost;

        var newPathname = "";
        for (i = 3; i < pathArray.length; i++) {
            newPathname += "/";
            newPathname += pathArray[i];
        }

        console.log(request.h() + " " + newPathname + " HTTP/1.1")
        console.log("Host: " + fhost)
        console.log(request.e().toString())
        var requestBody = request.a()
        if(requestBody){
            const buffer = Java.use('sg.f'); //okio.Buffer // Buffer.java
            const bufferInstance = buffer.$new(); 
            requestBody.h(bufferInstance); 
            var request_body_str = bufferInstance.H(); //need to find readUtf8..

            var result = "";
            for(var i = 0; i < request_body_str.length; ++i){
                result+= (String.fromCharCode(request_body_str[i]));
            }
            console.log(result);
            console.log("\n")
            
        }
   }

   function interceptResponse(response) { //eg.f0 //Response.kt
   console.log("\n--response--") // Somtimes headers are hidden
    console.log(response)
    console.log("--response--\n")

   console.log("HTTP/1.1 " + response.l())
    console.log(response.U().toString())
    const response_body = response.f();
        const new_response_body = response.A0(1024 * 128); //peakBody
        var response_body_str = new_response_body.s(); //string
        console.log(response_body_str + "\n")
}
        
    const BridgeInterceptor = Java.use("kg.a"); // okhttp3.internal.http.BridgeInterceptor //BridgeInterceptor.kt

    BridgeInterceptor.a.implementation = function(chain) {
        let request = chain.l(); //invoke-interface {p1}, Leg/y$a;->l()Leg/d0; // request //invoke-interface {p1}, Lokhttp3/Interceptor$Chain;->request()Lokhttp3/Request;

        interceptRequest(request);

        let response = this.a(chain);

        interceptResponse(response);
        return response;
    }
});
