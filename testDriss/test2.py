import cv2 as cv2
import numpy as np


imageBGR = cv2.imread("C:/Programmation Arduino/BlockPy@Col/testDriss/images/couleurs2.jpg")
composanteBleu = cv2.split(imageBGR)[0]
composanteRouge = cv2.split(imageBGR)[2]
composanteVert = cv2.split(imageBGR)[1]
imageHSV = cv2.cvtColor(imageBGR, cv2.COLOR_BGR2HSV)
H = cv2.split(imageHSV)[0]
S = cv2.split(imageHSV)[1]
V = cv2.split(imageHSV)[2]
cv2.imshow("image BGR originale", imageBGR)
cv2.imshow("Composante Rouge", composanteRouge)
cv2.imshow("Composante Vert", composanteVert)
cv2.imshow("Composante Bleu", composanteBleu)
cv2.imshow("image HSV", imageHSV)
cv2.imshow("H", H)
cv2.imshow("S", S)
cv2.imshow("V", V)
cv2.waitKey(0)