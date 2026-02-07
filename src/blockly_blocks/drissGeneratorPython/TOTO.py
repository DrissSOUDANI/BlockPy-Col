import cv2 as cv2
import numpy as np

VideoCapture_1 = None


couleurMinDisque = np.array([72, 123, 100])
couleurMaxDisque = np.array([116, 255, 255])
couleurMinCutter = np.array([0, 132, 155])
couleurMaxCutter = np.array([37, 255, 255])
VideoCapture_1 = cv2.VideoCapture(0)
#Vérifier si la caméra s'est ouverte avec succès
if not VideoCapture_1.isOpened():
    print("Erreur lors de l'ouverture du flux vidéo")
    exit()
while True:
    #Capturer une image du flux et la placer dans la variable
    ret, imageBGR = VideoCapture_1.read()
    imageHSV = cv2.cvtColor(imageBGR, cv2.COLOR_BGR2HSV)
    #Masquer les couleurs situées en dehors des 2 couleurs limites
    imageMaskDisque = cv2.inRange(imageHSV, couleurMinDisque, couleurMaxDisque)
    #Masquer les couleurs situées en dehors des 2 couleurs limites
    imageMaskCouvercle = cv2.inRange(imageHSV, couleurMinCutter, couleurMaxCutter)
    imageMaskTotal = cv2.bitwise_or(imageMaskDisque, imageMaskCouvercle )
    imageMaskTotal = cv2.erode(imageMaskTotal, (1,1), iterations=1)

    imageMaskTotal = cv2.dilate(imageMaskTotal, (1,1), iterations=1)

    contourDisque = cv2.findContours(imageMaskDisque, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[-2]
    #Marquer le contour
    if len(contourDisque) > 0:
       c=max(contourDisque, key=cv2.contourArea)
       ((x, y), rayon)=cv2.minEnclosingCircle(c)
       if rayon>30:
           cv2.circle(imageBGR, (int(x), int(y)), int(rayon), (0, 153, 255), 2)
           cv2.circle(imageBGR, (int(x), int(y)), 5, (0, 153, 255), 10)
           cv2.putText(imageBGR, "Disque dur", (int(x)+10, int(y) -10), cv2.FONT_HERSHEY_DUPLEX, 1, (0, 153, 255), 1, cv2.LINE_AA)
    contourCouvercle = cv2.findContours(imageMaskCouvercle, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[-2]
    #Marquer le contour
    if len(contourCouvercle) > 0:
       c=max(contourCouvercle, key=cv2.contourArea)
       ((x, y), rayon)=cv2.minEnclosingCircle(c)
       if rayon>30:
           cv2.circle(imageBGR, (int(x), int(y)), int(rayon), (0, 153, 255), 2)
           cv2.circle(imageBGR, (int(x), int(y)), 5, (0, 153, 255), 10)
           cv2.putText(imageBGR, "Couvercle", (int(x)+10, int(y) -10), cv2.FONT_HERSHEY_DUPLEX, 1, (0, 153, 255), 1, cv2.LINE_AA)
    cv2.imshow("Image Mask - Disque dur ou couvercle -", imageMaskDisque)
    cv2.imshow("Image BGR- Disque dur et/ou Couvercle", imageBGR)
    if (cv2.waitKey(1) & 0xFF == ord('q')):
       break
VideoCapture_1.release()
cv2.destroyAllWindows()