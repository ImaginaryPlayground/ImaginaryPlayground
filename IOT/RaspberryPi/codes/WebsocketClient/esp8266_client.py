import websocket
import time
 
ws = websocket.WebSocket()

while True:
    # 계속해서 통신을 시도한다.
    try:
        ws.connect("ws://192.168.1.101/")
    except:
        print("통신 실패")
    else:
        print("통신 성공")

        while True:
            try:
                result = ws.recv()
                print(result)
                time.sleep(0.05)
            except:
                print("시간초과")
                break
            
