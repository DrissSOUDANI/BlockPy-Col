import cv2 as cv2
from cv2 import WINDOW_AUTOSIZE
from cv2 import WINDOW_NORMAL
import numpy as np


lo_H = 50
lo_S = 51
lo_V = 179
hi_H = 80
hi_S = 82
hi_V = 250

Erode = 0
Dilate = 0


fenetreControle = "Curseurs de controle de H, S et V"
fenetreMasque = "Image Mask"
fenetreFluxVideo = "Image du flux vidéo"


def on_Lo_H_cursorSlide(val):
    global lo_H
    global hi_H
    lo_H = val
    lo_H = min(hi_H - 1, lo_H)
    cv2.setTrackbarPos("H min ", fenetreControle, lo_H)

def on_Hi_H_cursorSlide(val):
    global lo_H
    global hi_H
    hi_H = val
    hi_H = max(hi_H, lo_H+1)
    cv2.setTrackbarPos("H max ", fenetreControle, hi_H)    
   

def on_Lo_S_cursorSlide(val):
    global lo_S
    global hi_S
    lo_S = val
    lo_S = min(hi_S - 1, lo_S)
    cv2.setTrackbarPos("S min ", fenetreControle, lo_S)

def on_Hi_S_cursorSlide(val):
    global lo_S
    global hi_S
    hi_S = val
    hi_S = max(hi_S, lo_S+1)
    cv2.setTrackbarPos("S max ", fenetreControle, hi_S)  
    
def on_Lo_V_cursorSlide(val):
    global lo_V
    global hi_V
    lo_V = val
    lo_V = min(hi_V - 1, lo_V)
    cv2.setTrackbarPos("V min ", fenetreControle, lo_V)

def on_Hi_V_cursorSlide(val):
    global lo_V
    global hi_V
    hi_V = val
    hi_V = max(hi_V, lo_V+1)
    cv2.setTrackbarPos("V max ", fenetreControle, hi_V) 
     
def on_Erode_cursorSlide(val):
    global Erode
    Erode = val
    cv2.setTrackbarPos("Erosion", fenetreControle, Erode)

def on_Dilate_cursorSlide(val):
    global Dilate
    Dilate = val
    cv2.setTrackbarPos("Dilatation", fenetreControle, Dilate)
    


cv2.namedWindow(fenetreMasque)
cv2.namedWindow(fenetreFluxVideo)
cv2.namedWindow(fenetreControle)


cv2.createTrackbar("H min ", fenetreControle , lo_H, 179, on_Lo_H_cursorSlide)
cv2.createTrackbar("H max ", fenetreControle , hi_H, 179, on_Hi_H_cursorSlide)

cv2.createTrackbar("S min ", fenetreControle , lo_S, 255, on_Lo_S_cursorSlide)
cv2.createTrackbar("S max ", fenetreControle , hi_S, 255, on_Hi_S_cursorSlide)

cv2.createTrackbar("V min ", fenetreControle , lo_V, 255, on_Lo_V_cursorSlide)
cv2.createTrackbar("V max ", fenetreControle , hi_V, 255, on_Hi_V_cursorSlide)


cv2.createTrackbar("Erosion", fenetreControle , Erode, 13, on_Erode_cursorSlide)
cv2.createTrackbar("Dilatation", fenetreControle , Dilate, 13, on_Dilate_cursorSlide)



    
   
imageBGR = cv2.imread("C:/Programmation Arduino/BlockPy@Col/testDriss/images/couleurs.jpg")
imageHSV = cv2.cvtColor(imageBGR, cv2.COLOR_BGR2HSV)
while True :
    
   
    imageMask = cv2.inRange(imageHSV, (lo_H, lo_S, lo_V), (hi_H, hi_S, hi_V))
    
    imageMask=cv2.erode(imageMask, None, iterations=Erode)
    imageMask=cv2.dilate(imageMask, None, iterations=Dilate)
    
    
    cv2.imshow(fenetreFluxVideo, imageBGR)
    cv2.imshow(fenetreMasque, imageMask)
    
    if (cv2.waitKey(1) & 0xFF == ord('q')):
       break
   