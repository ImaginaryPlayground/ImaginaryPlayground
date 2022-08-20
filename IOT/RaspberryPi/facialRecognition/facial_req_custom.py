# facial_recognition의 facial_req.py를 기반으로 알고리즘을 조금 수정한 파일
# train_model.py를 실행하면 얻는 encodings.pickle 파일이 필요하다.

#! /usr/bin/python

# import the necessary packages
from imutils.video import VideoStream
from imutils.video import FPS
import face_recognition
import imutils
import pickle
import time
import cv2
import socketio

# 소캣통신을 위함
sio = socketio.Client()
# 카메라 사용 여부를 위함
isFaceOn = False

@sio.event
def connect():
	print("I'm connected!")

@sio.event
def connect_error(data):
	print("The connection failed!")

@sio.event
def disconnect():
	print("I'm disconnected!")

@sio.event
def faceOn():
	# 아.. 글로벌까먹고 해맷다..;
	global isFaceOn

	print("faceOn")
	isFaceOn = True
	cameraOn()


@sio.event
def faceOff():
	global isFaceOn

	print("faceOff")
	isFaceOn = False

# wifi를 통해 서버와 연결
sio.connect('http://192.168.1.103:3001')

#Determine faces from encodings.pickle file model created from train_model.py
# 미리 아는 얼굴을 학습한 파일을 사용한다.
encodingsP = "./encodings.pickle"

# load the known faces and embeddings along with OpenCV's Haar
# cascade for face detection
print("[INFO] loading encodings + face detector...")
data = pickle.loads(open(encodingsP, "rb").read())
# 디버깅용
# print(data)

def cameraOn():
	# initialize the video stream and allow the camera sensor to warm up
	# Set the ser to the followng
	# src = 0 : for the build in single web cam, could be your laptop webcam
	# src = 2 : I had to set it to 2 inorder to use the USB webcam attached to my laptop
	# 카메라 장치를 찾고 킨다.
	vs = VideoStream(src=0,framerate=10).start()
	#vs = VideoStream(usePiCamera=True).start()

	time.sleep(2.0)

	# start the FPS counter
	fps = FPS().start()

	known_encodings = data["encodings"]
	# loop over frames from the video file stream
	while True:

		# 디버깅용
		# print(isFaceOn)
		# 자세인식을 안한다면 패스
		if not isFaceOn:
			continue

		# grab the frame from the threaded video stream and resize it
		# to 500px (to speedup processing)
		frame = vs.read()
		frame = imutils.resize(frame, width=500)
		# Detect the fce boxes
		# 웹캠에서 보이는 사람 각 얼굴을 찾아서
		boxes = face_recognition.face_locations(frame)
		# compute the facial embeddings for each face bounding box
		# encoding을 한다.
		camera_encodings = face_recognition.face_encodings(frame, boxes)
		names = []

		# loop over the facial embeddings
		# 웹캠에서 인식된 사람들의 얼굴을
		for encoding in camera_encodings:
			# 아는 얼굴을 각각 비교해본다.
			face_distances = face_recognition.face_distance(known_encodings, encoding)
			distance_dic = {}

			for i, face_distance in enumerate(face_distances):
				name = data["names"][i]
				distance_dic[name] = face_distance

			# 가장 높은 인식율을 가지는 사람을 넣어준다.
			# 만약 가장 인식율이 높은 사람의 distance가 0.5 수치를 넘으면 
			# 모르는 사람(Unknown)이라고 간주한다.
			name = min(distance_dic, key=distance_dic.get)
			if distance_dic[name] > 0.5:
				name = "Unknown"

			names.append(name)

		print(names)

		# loop over the recognized faces
		# 얼굴인식이 되면 사각형 박스와 함께 누구인지 택스트로 표시한다.
		for ((top, right, bottom, left), name) in zip(boxes, names):
			# draw the predicted face name on the image - color is in BGR
			cv2.rectangle(frame, (left, top), (right, bottom),
				(0, 255, 225), 2)
			y = top - 15 if top - 15 > 15 else top + 15
			cv2.putText(frame, name, (left, y), cv2.FONT_HERSHEY_SIMPLEX,
				.8, (0, 255, 255), 2)

		# display the image to our screen
		cv2.imshow("Facial Recognition is Running", frame)

		# 필요 없는 코드인줄 알았는데 없으면 위의 imshow기능이 작동하지 않는다.
		# 스택오버플로우에 따르면.. 뭔가 업데이트 하기위해서 무언가의 입출력? 업데이트?가 필요하다는 것 같은데
		# 가장 흔하게 사용되는 방법이 cv2.waitKey라고 한다.
		# https://stackoverflow.com/questions/20561430/opencv-imshow-not-rendering-image-on-screen
		key = cv2.waitKey(1) & 0xFF
		# quit when 'q' key is pressed
		if key == ord("q"):
			break

		# frame을 서버로 전송, 참고로 names는 리스트이다.
		sio.emit('face', names)

		# update the FPS counter
		fps.update()

		# 카메라를 끄는 이벤트를 받았다면 카메라를 꺼버린다.
		if not isFaceOn:
			# stop the timer and display FPS information
			fps.stop()
			print("[INFO] elasped time: {:.2f}".format(fps.elapsed()))
			print("[INFO] approx. FPS: {:.2f}".format(fps.fps()))

			# do a bit of cleanup
			cv2.destroyAllWindows()
			vs.stop()
			break
