Java.perform(function () {
    const Request = Java.use("okhttp3.Request"); // okhttp3.Request

    const Response = Java.use("okhttp3.Response"); // okhttp3.Response
        
    const BridgeInterceptor = Java.use("okhttp3.internal.http.BridgeInterceptor"); // okhttp3.internal.http.BridgeInterceptor

    function formatHeaders(headers) {
        return headers.toString();
    }

    function interceptRequest(request) {
        console.log(request.method() + " " + request.url() + " HTTP/1.1")
        console.log("HOST: " + request.url())
        console.log(request.headers().toString())
        var requestBody = request.body()
        if(requestBody){
            // ref: https://github.com/frida/frida/issues/1493
            const buffer = Java.use('okio.c'); //okio.Buffer // Buffer.java
            const bufferInstance = buffer.$new(); 
            requestBody.writeTo(bufferInstance); 
            var request_body_str = bufferInstance.i1(); //need to find readUtf8..
           // console.log(request_body_str)
            var result = "";
            for(var i = 0; i < request_body_str.length; ++i){
                result+= (String.fromCharCode(request_body_str[i]));
            }
            console.log(result);
            console.log("\n")
            
        }


    }

    function interceptResponse(response) {
        console.log("HTTP/1.1 " + response.code() + " " + response.message())
        console.log(response.headers())
        const response_body = response.body();
        if(response_body && response_body.contentLength() != -1){
            const new_response_body = response.peekBody(1024 * 128);
            var response_body_str = new_response_body.string();
            console.log(response_body_str + "\n")
        }
    }

    BridgeInterceptor.intercept.implementation = function(chain) {
        let request = chain.request();
        interceptRequest(request);

        let response = this.intercept(chain);

        interceptResponse(response);
        return response;
    }
});
