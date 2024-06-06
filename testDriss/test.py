# import cv2

# face_cascade=cv2.CascadeClassifier(cv2.data.haarcascades +"haarcascade_frontalface_alt2.xml")
# cap=cv2.VideoCapture(0)

# while True:
#     ret, frame=cap.read()
#     tickmark=cv2.getTickCount()
#     gray=cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     face=face_cascade.detectMultiScale(gray, scaleFactor=1.2, minNeighbors=3)
    
#     for x, y, w, h in face:
#         cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
#         print(face)
#         print(face[0][0])
#     #cv2.rectangle(frame, (face[0],face[1]), (face[0]+face[2], face[1]+face[3]), (255, 0, 0), 2)
#     if cv2.waitKey(1)&0xFF==ord('q'):
#         break
#     fps=cv2.getTickFrequency()/(cv2.getTickCount()-tickmark)
#     cv2.putText(frame, "FPS: {:05.2f}".format(fps), (10, 30), cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)
#     cv2.imshow('video', frame)
#     if (cv2.waitKey(1) & 0xFF == ord('q')):
#            break
# cap.release()
# cv2.destroyAllWindows()

import cv2 as cv2
import numpy as np

VideoCapture_1 = None


face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades +"haarcascade_frontalface_alt2.xml")

profil_cascade = cv2.CascadeClassifier(cv2.data.haarcascades +"haarcascade_profileface.xml")

VideoCapture_1 = cv2.VideoCapture(1)
#Vérifier si la caméra s'est ouverte avec succès
if not VideoCapture_1.isOpened():
    print("Erreur lors de l'ouverture du flux vidéo")
    exit()
while True:
    #Capturer une image du flux et la placer dans la variable
    ret, imageDuFluxVideo = VideoCapture_1.read()
    imageNiveauxGris = cv2.cvtColor(imageDuFluxVideo, cv2.COLOR_BGR2GRAY)
    face = face_cascade.detectMultiScale(imageNiveauxGris, scaleFactor=1.2, minNeighbors=3)

    for x, y, w, h in face:
       cv2.rectangle(imageDuFluxVideo, (x, y), (x+w, y+h), (0,102,255), 2)
    profile_1 = profil_cascade.detectMultiScale(imageNiveauxGris, scaleFactor=1.2, minNeighbors=3)

    for x, y, w, h in profile_1:
       cv2.rectangle(imageDuFluxVideo, (x, y), (x+w, y+h), (0,102,255), 2)
    flipImageNiveauGris = cv2.flip(imageNiveauxGris, 1)

    profile_2 = profil_cascade.detectMultiScale(imageNiveauxGris, scaleFactor=1.2, minNeighbors=3)

    for x, y, w, h in profile_2:
       cv2.rectangle(imageDuFluxVideo, (x, y), (x+w, y+h), (0,102,255), 2)
    cv2.imshow("Detection de visage", imageDuFluxVideo)
    if (cv2.waitKey(1) & 0xFF == ord('q')):
       break
VideoCapture_1.release()
cv2.destroyAllWindows()