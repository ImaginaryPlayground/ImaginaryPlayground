import websocket
import time
import pyautogui as pygui
 
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
                (x, y) = ws.recv().split()
                print(result)
                pygui.moveTo(x, y)
                pygui.click()
                time.sleep(0.05)
            except:
                print("시간초과")
                break
            
