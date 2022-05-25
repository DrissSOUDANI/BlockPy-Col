import cv2 as cv2
from cv2 import WINDOW_AUTOSIZE
from cv2 import WINDOW_NORMAL
import numpy as np


lo_B = 0
lo_G = 0
lo_R = 0
hi_B = 255
hi_G = 255
hi_R = 255

lo_H = 0
lo_S = 0
lo_V = 0
hi_H = 180
hi_S = 255
hi_V = 255


Erode = 0
Dilate = 0


fenetreControleBGR = "Curseurs de controle de B, G et R"
fenetreMasqueBGR = "Image Mask BGR"
fenetreFluxVideo = "Image du flux vidéo"

fenetreControleHSV = "Curseurs de controle de H, S et V"
fenetreMasqueHSV = "Image Mask HSV"



def on_Lo_B_cursorSlide(val):
    global lo_B
    global hi_B
    lo_B = val
    lo_B = min(hi_B - 1, lo_B)
    cv2.setTrackbarPos("B min ", fenetreMasqueBGR, lo_B)

def on_Hi_B_cursorSlide(val):
    global lo_B
    global hi_B
    hi_B = val
    hi_B = max(hi_B, lo_B+1)
    cv2.setTrackbarPos("B max ", fenetreMasqueBGR, hi_B)    
   

def on_Lo_G_cursorSlide(val):
    global lo_G
    global hi_G
    lo_G = val
    lo_G = min(hi_G - 1, lo_G)
    cv2.setTrackbarPos("G min ", fenetreMasqueBGR, lo_G)

def on_Hi_G_cursorSlide(val):
    global lo_G
    global hi_G
    hi_G = val
    hi_G = max(hi_G, lo_G+1)
    cv2.setTrackbarPos("G max ", fenetreMasqueBGR, hi_G)  
    
def on_Lo_R_cursorSlide(val):
    global lo_R
    global hi_R
    lo_R = val
    lo_R = min(hi_R - 1, lo_R)
    cv2.setTrackbarPos("R min ", fenetreMasqueBGR, lo_R)

def on_Hi_R_cursorSlide(val):
    global lo_R
    global hi_R
    hi_R = val
    hi_R = max(hi_R, lo_R+1)
    cv2.setTrackbarPos("R max ", fenetreMasqueBGR, hi_R) 
    
    
    
def on_Lo_H_cursorSlide(val):
    global lo_H
    global hi_H
    lo_H = val
    lo_H = min(hi_H - 1, lo_H)
    cv2.setTrackbarPos("H min ", fenetreMasqueHSV, lo_H)

def on_Hi_H_cursorSlide(val):
    global lo_H
    global hi_H
    hi_H = val
    hi_H = max(hi_H, lo_H+1)
    cv2.setTrackbarPos("H max ", fenetreMasqueHSV, hi_H)    
   

def on_Lo_S_cursorSlide(val):
    global lo_S
    global hi_S
    lo_S = val
    lo_S = min(hi_S - 1, lo_S)
    cv2.setTrackbarPos("S min ", fenetreMasqueHSV, lo_S)

def on_Hi_S_cursorSlide(val):
    global lo_S
    global hi_S
    hi_S = val
    hi_S = max(hi_S, lo_S+1)
    cv2.setTrackbarPos("S max ", fenetreMasqueHSV, hi_S)  
    
def on_Lo_V_cursorSlide(val):
    global lo_V
    global hi_V
    lo_V = val
    lo_V = min(hi_V - 1, lo_V)
    cv2.setTrackbarPos("V min ", fenetreMasqueHSV, lo_V)

def on_Hi_V_cursorSlide(val):
    global lo_V
    global hi_V
    hi_V = val
    hi_V = max(hi_V, lo_V+1)
    cv2.setTrackbarPos("V max ", fenetreMasqueHSV, hi_V) 
     
# def on_Erode_cursorSlide(val):
#     global Erode
#     Erode = val
#     cv2.setTrackbarPos("Erosion", fenetreControle, Erode)

# def on_Dilate_cursorSlide(val):
#     global Dilate
#     Dilate = val
#     cv2.setTrackbarPos("Dilatation", fenetreControle, Dilate)
    


cv2.namedWindow(fenetreMasqueBGR)
cv2.namedWindow(fenetreMasqueHSV)
cv2.namedWindow(fenetreFluxVideo)
cv2.namedWindow(fenetreControleBGR, WINDOW_AUTOSIZE)
cv2.namedWindow(fenetreControleHSV, WINDOW_AUTOSIZE)

  
imageBGR = cv2.imread("C:/Programmation Arduino/BlockPy@Col/testDriss/images/bureau.jpg")
imageHSV = cv2.cvtColor(imageBGR, cv2.COLOR_BGR2HSV)
imageMaskHSV = cv2.inRange(imageHSV, (0, 0, 0), (179, 255, 255))


cv2.createTrackbar("B min ", fenetreControleBGR , lo_B, 255, on_Lo_B_cursorSlide)
cv2.createTrackbar("B max ", fenetreControleBGR , hi_B, 255, on_Hi_B_cursorSlide)

cv2.createTrackbar("G min ", fenetreControleBGR , lo_G, 255, on_Lo_G_cursorSlide)
cv2.createTrackbar("G max ", fenetreControleBGR , hi_G, 255, on_Hi_G_cursorSlide)

cv2.createTrackbar("R min ", fenetreControleBGR , lo_R, 255, on_Lo_R_cursorSlide)
cv2.createTrackbar("R max ", fenetreControleBGR , hi_R, 255, on_Hi_R_cursorSlide)


cv2.createTrackbar("H min ", fenetreMasqueHSV , lo_H, 179, on_Lo_H_cursorSlide)
cv2.createTrackbar("H max ", fenetreMasqueHSV , hi_H, 179, on_Hi_H_cursorSlide)

cv2.createTrackbar("S min ", fenetreMasqueHSV , lo_S, 255, on_Lo_S_cursorSlide)
cv2.createTrackbar("S max ", fenetreMasqueHSV , hi_S, 255, on_Hi_S_cursorSlide)

cv2.createTrackbar("V min ", fenetreMasqueHSV , lo_S, 255, on_Lo_V_cursorSlide)
cv2.createTrackbar("V max ", fenetreMasqueHSV , hi_S, 255, on_Hi_V_cursorSlide)


# cv2.createTrackbar("Erosion", fenetreMasqueBGR , Erode, 13, on_Erode_cursorSlide)
# cv2.createTrackbar("Dilatation", fenetreMasqueBGR , Dilate, 13, on_Dilate_cursorSlide)



    
 
while True :
    
   
    imageMaskBGR = cv2.inRange(imageBGR, (lo_B, lo_G, lo_R), (hi_B, hi_G, hi_R))
    imageMaskHSV = cv2.inRange(imageHSV, (lo_H, lo_S, lo_V), (hi_H, hi_S, hi_V))
    
    # imageMask=cv2.erode(imageMask, None, iterations=Erode)
    # imageMask=cv2.dilate(imageMask, None, iterations=Dilate)
    
    
    cv2.imshow(fenetreFluxVideo, imageBGR)
    cv2.imshow(fenetreMasqueBGR, imageMaskBGR)
    
    cv2.imshow(fenetreMasqueHSV, imageMaskHSV)
    
    if (cv2.waitKey(1) & 0xFF == ord('q')):
       break
   