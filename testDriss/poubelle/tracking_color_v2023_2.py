import cv2 as cv2
import numpy as np

fenetreControle = "Curseurs de controle et image Masque"
fluxVideo = "Flux video normal et avec le masque appliqué"

def doNothing(val) :
   pass



camera = cv2.VideoCapture(0)
cv2.namedWindow(fluxVideo, cv2.WINDOW_NORMAL)
cv2.namedWindow(fenetreControle, cv2.WINDOW_NORMAL)
cv2.resizeWindow(fluxVideo, 640, 240)
cv2.resizeWindow(fenetreControle, 320, 550)

cv2.createTrackbar("H min", fenetreControle , 0, 179, doNothing)
cv2.createTrackbar("H max", fenetreControle , 0, 179, doNothing)
cv2.createTrackbar("S min", fenetreControle , 0, 255, doNothing)
cv2.createTrackbar("S max", fenetreControle , 0, 255, doNothing)
cv2.createTrackbar("V min", fenetreControle , 0, 255, doNothing)
cv2.createTrackbar("V max", fenetreControle , 0, 255, doNothing)
cv2.createTrackbar("Erosion", fenetreControle , 0, 13, doNothing)
cv2.createTrackbar("Dilatation", fenetreControle , 0, 13, doNothing)

cv2.setTrackbarPos("H min", fenetreControle,0)
cv2.setTrackbarPos("H max", fenetreControle,179)
cv2.setTrackbarPos("S min", fenetreControle,100)
cv2.setTrackbarPos("S max", fenetreControle,255)
cv2.setTrackbarPos("V min", fenetreControle,100)
cv2.setTrackbarPos("V max", fenetreControle,255)

while not ((cv2.waitKey(1) & 0xFF == ord("q") )):
 imageBGR = camera.read()[1]
 imageHSV = cv2.cvtColor(imageBGR, cv2.COLOR_BGR2HSV)

 lo_H = cv2.getTrackbarPos("H min",fenetreControle)
 lo_S = cv2.getTrackbarPos("S min",fenetreControle)
 lo_V = cv2.getTrackbarPos("V min",fenetreControle)

 hi_H = cv2.getTrackbarPos("H max",fenetreControle)
 hi_S = cv2.getTrackbarPos("S max",fenetreControle)
 hi_V = cv2.getTrackbarPos("V max",fenetreControle)

 if(lo_H > hi_H): lo_H = hi_H-1
 if(lo_S > hi_S): lo_S = hi_S-1
 if(lo_V > hi_V): lo_V = hi_V-1

 cv2.setTrackbarPos("H min",fenetreControle, lo_H)
 cv2.setTrackbarPos("S min",fenetreControle, lo_S)
 cv2.setTrackbarPos("V min",fenetreControle, lo_V)

 imageMask = cv2.inRange(imageHSV, (lo_H, lo_S, lo_V), (hi_H, hi_S, hi_V))
 imageBGRmasked = cv2.bitwise_and(imageBGR, imageBGR, mask=imageMask)

 erosion = cv2.getTrackbarPos("Erosion",fenetreControle)
 dilatation = cv2.getTrackbarPos("Dilatation",fenetreControle)

 imageMask=cv2.erode(imageMask, None, iterations=erosion)
 imageMask=cv2.dilate(imageMask, None, iterations=dilatation)

 towImages = np.concatenate((imageBGRmasked, imageBGR), axis=1)

 cv2.imshow(fluxVideo, towImages)
 cv2.imshow(fenetreControle, imageMask)
camera.release()
cv2.destroyAllWindows()