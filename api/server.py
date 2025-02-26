import http.server as HttpServer
import socketserver as SocketServer
import json,time,random

def json_server ( port,func ):
    class MyHandler ( HttpServer.BaseHTTPRequestHandler ):
        def do_GET ( self ):
            size = int( self.headers.get('Content-Length','-1') or '-1')
            data = None if size < 0 else self.rfile.read( size )
            code,resp = func( self.command,self.path,dict(self.headers),data )
            self.send_response( code )
            if resp is not None :
                resp = json.dumps( resp ).encode('utf8')
                self.send_header('Content-type','application/json')
                self.send_header('Content-Length',len( resp ))
                self.end_headers()
                self.wfile.write( resp )
        do_POST     = do_GET
        log_message = lambda *args : print( args[1]%tuple( args[2:] ))
    while True :
        SocketServer.TCPServer(('',port),MyHandler ).handle_request()

def func ( verb,path,head,body ):
    now  = int(time.time())
    data = [{"target": "Measure", "datapoints": [[11,now-3],[12,now-2],[13,now-1],[14,now]]}]
    return 200,data
json_server(5000,func)