import { serve } from "bun";

serve({
    fetch(request){
        const url = new URL(request.url);

        if(url.pathname === "/"){
            return new Response("Hello from the BUN server", {status : 200});
        }else if(url.pathname === "/test"){
            return new Response("Successfully routed", { status: 200 });
        }else{
            return new Response("Not Found", { status: 404 });
        }
    },
    port: 3000,
    hostname: '127.0.0.1'
})