import cv2
import numpy as np

#Convertir une couleur RGB en HSV
def rgb_to_hsv(r, g, b):
   r, g, b = r/255.0, g/255.0, b/255.0
   mx = max(r, g, b)
   mn = min(r, g, b)
   df = mx-mn
   if mx == mn:
       h = 0
   elif mx == r:
       h = (60 * ((g-b)/df) + 360) % 360
   elif mx == g:
       h = (60 * ((b-r)/df) + 120) % 360
   elif mx == b:
       h = (60 * ((r-g)/df) + 240) % 360
   if mx == 0:
       s = 0
   else:
       s = (df/mx)*100
   v = mx*100
   return h, s, v

#Retournes les valeurs HEX d'une couleur #RRGGBB
def getHEX(colorRGB):
   colorRGB = colorRGB.lstrip('#')
   return tuple(int(colorRGB[i:i+2], 16) for i in (0, 2, 4))


nuace_basse = np.array( rgb_to_hsv(getHEX('#33ccff')[0], getHEX('#33ccff')[1], getHEX('#33ccff')[2]) )
nuance_haute = np.array( rgb_to_hsv(getHEX('#000099')[0], getHEX('#000099')[1], getHEX('#000099')[2]) )
captureVideo = cv2.VideoCapture(0)

while True:
    ret,imageRGB = captureVideo.read()
    #print(ret)
    imageHSV = cv2.cvtColor(imageRGB, cv2.COLOR_BGR2HSV)
    
    #Appliquer un léger flou sur l'image HSV pour gommer les pixels parasites
    imageHSV = cv2.blur(imageHSV, (7, 7))
    #Masquer les couleurs situées en dehors des 2 couleurs limites
    mask = cv2.inRange(imageHSV, nuace_basse, np.array( rgb_to_hsv(getHEX('#000099')[0], getHEX('#000099')[1], getHEX('#000099')[2]) ))
    #Erroder l'image
    imageHSV = cv2.erode(imageHSV, None, 30)
    #Dilater l'image
    imageHSV = cv2.dilate(imageHSV, None, 11)
    imageFinale = cv2.bitwise_and(imageRGB, imageRGB, mask=mask)
    contour = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[-2]
    #Marquer le contour
    if len(contour) > 0:
       c=max(contour, key=cv2.contourArea)
       ((x, y), rayon)=cv2.minEnclosingCircle(c)
       if rayon>30:
           cv2.circle(imageRGB, (int(x), int(y)), 5, (255,255,0), 10)
           cv2.line(imageRGB, (int(x), int(y)), (int(x)+150, int(y)), (255,255,0), 2)
           cv2.putText(imageRGB, " sss ", (int(x)+10, int(y) -10), cv2.FONT_HERSHEY_DUPLEX, 1, (255,255,0), 1, cv2.LINE_AA)
    cv2.imshow('Camera', imageRGB)
    cv2.imshow('imageFinale', imageFinale)
    cv2.imshow('Mask', mask)
    if cv2.waitKey(1)&0xFF==ord("q"):
        break