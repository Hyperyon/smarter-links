import { writable } from 'svelte/store';

export let storedb = writable({});
export let id = writable({});
export let tag = writable({});


let snippet = `
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
        self.end_headers()`

tag.set(false)
storedb.set([{id:0, link:'google.fr',title:'first link'},
			{id:1, link:'another element',tags:'all about tags'},
			{id:2,link:'if 1:\n\tprint("hello world")'},
			{id:3,link:snippet,title:'server example'}])