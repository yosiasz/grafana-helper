#!/usr/bin/env python

import socket
import time


CARBON_SERVER = '127.0.0.1'
CARBON_PORT = 2003

message = 'foo.bar.baz 0.76 %d\n' % int(time.time())
print('sending message:\n%s' % message)
sock = socket.socket()
sock.connect((CARBON_SERVER, CARBON_PORT))
sock.sendall(message.encode())
sock.close()