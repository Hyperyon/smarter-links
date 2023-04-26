#!/usr/bin/env python3
import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from datetime import datetime

def red(filename):
    with open(filename, 'r',encoding='utf-8') as f:return f.read()
def ouate(data, filename):
    with open(filename,'w+') as f:f.write(data)
def get_time():
    return datetime.now().strftime('%d/%m %H:%M')

class S(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-type', 'text/html')
        self.end_headers()
    def do_HEAD(self):
        self._set_headers()

    def do_GET(self):
        self._set_headers()
        try:content= open(self.path[1:]).read()
        except:content=open("data.json").read()
        self.end_headers()
        self.wfile.write(bytes(content, "UTF-8"))

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode("utf-8")
        self._set_headers() #print information
        self.end_headers()

        
        if self.path == '/lapost':
            req = json.loads(post_data)
            req = sorted(req, key=lambda d: d['id'])
            for i,element in enumerate(req):element['id'] = i
            print(req)
            ouate(json.dumps(req,indent=4),"data.json")
                    

        self.wfile.write(bytes(json.dumps(req),"UTF-8"))

def run(server_class=HTTPServer, handler_class=S, port=7999):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print('Starting httpd...')
    httpd.serve_forever()

if __name__ == "__main__":
    from sys import argv

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()