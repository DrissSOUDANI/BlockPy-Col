import cv2 as cv2
import numpy as np


camera = cv2.VideoCapture(0)
while not ((cv2.waitKey(1) & 0xFF == ord('q') )):
    imageBGR = camera.read()[1]


    ds_imageHSV_ = cv2.cvtColor(imageBGR, cv2.COLOR_BGR2HSV)
    ds_imageMaskObjet_ = cv2.inRange(ds_imageHSV_, (10, 175, 126), (17, 255, 255))
    ds_imageMaskObjet_ = cv2.erode(ds_imageMaskObjet_, None, iterations=0)
    ds_imageMaskObjet_ = cv2.dilate(ds_imageMaskObjet_, None, iterations=0)

    ds_contourObjet_ = cv2.findContours(ds_imageMaskObjet_, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[-2]

    if len(ds_contourObjet_) > 0:
        c=max(ds_contourObjet_, key=cv2.contourArea)
        ((x, y), rayon)=cv2.minEnclosingCircle(c)
        if rayon>30:
            cv2.circle(imageBGR, (int(x), int(y)), int(rayon),(255,102,0) , 2)
            cv2.circle(imageBGR, (int(x), int(y)), 3, (255,102,0), -1)
            #(text_w, text_h), baseline = cv2.getTextSize("Clementine", cv2.FONT_HERSHEY_DUPLEX, 0.5, 1)
            #cv2.rectangle(imageBGR, (int(x)+10, int(y) -20-baseline), (int(x) + text_w+10, int(y)-20-baseline + text_h+10), (249, 246, 245), -1)
            cv2.putText(imageBGR, "Clementine", (int(x)+10, int(y) -10), cv2.FONT_HERSHEY_DUPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA, False)
    cv2.imshow("Masque min =(10, 175, 126) max =(10, 175, 126)", ds_imageMaskObjet_)
    cv2.imshow("Reconnaitre une clementine", imageBGR)