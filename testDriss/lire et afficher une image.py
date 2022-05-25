

# Lire et afficher une image ********************************************
# import cv2 as cv2
# ima = cv2.imread("images/ima01.jpg")
# cv2.imshow("ddd", ima)
# cv2.waitKey(0)

# Lire et afficher une image differents formats********************************************
# import cv2 as cv2
#import cv2 as cv2


# import cv2 as cv2
# import matplotlib.pyplot as plt

# image = cv2.imread("C:/Programmation Arduino/BlockPy@Col/testDriss/images/logo_college.png")
# cv2.imshow("image originale", image)

# plt.imshow(image)
# plt.show()

# image_Gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
# cv2.imshow("image en niveau de gris", image_Gray)
# image_HSV = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
# cv2.imshow("image en HSV", image_HSV)
# image_LAB = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
# cv2.imshow("image en LAB", image_LAB)
# image_RGB = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
# cv2.imshow("image en RGB", image_RGB)
# cv2.waitKey(0)


# Lire et afficher une video ********************************************
# import cv2 as cv2


# vid_capture = cv2.VideoCapture("C:/Programmation Arduino/BlockPy@Col/testDriss/videos/dog.mp4")

# while True:
#     une_image = vid_capture.read()

#     if une_image[0] == True:
#        cv2.imshow("Vidéo Originale", une_image[1])
#     if (cv2.waitKey(1) & 0xFF == ord('q')):
#        break
# vid_capture.release()
# cv2.destroyAllWindows()



# redimensionner image dans flux video
# import cv2 as cv2

# #fonction qui redimentionne uniquement la vidéo en flux direct (Live video)
# def changeResolutionOfCaptureVideo(captureVideo, width, height) :
#    captureVideo.set(3, width)
#    captureVideo.set(4, height)



# #fonction qui redimentionne image, vidéo et live vidéo
# def rescalFrame(frame, scale=0.75) :
#    width = int(frame.shape[1] * scale)
#    height = int(frame.shape[0] * scale)
#    dimensions = (width, height)
#    return True,cv2.resize(frame, dimensions, interpolation=cv2.INTER_AREA)



# changeResolutionOfCaptureVideo(vid_capture, 0, 0)
# vid_capture = cv2.VideoCapture("C:/Programmation Arduino/BlockPy@Col/testDriss/videos/dog.mp4")
# while True:
#     une_image = vid_capture.read()

#     if une_image[0] == True:
#        cv2.imshow("Vidéo Originale", une_image[1])
#     image_redimensionnee = rescalFrame(une_image[1], 0.5)

#     if image_redimensionnee[0] == True:
#        cv2.imshow("Vidéo Redimensionnée", image_redimensionnee[1])
#     if (cv2.waitKey(1) & 0xFF == ord('d')):
#        break
# vid_capture.release()
# cv2.destroyAllWindows()

# #Dessiner sur ine image
# import cv2 as cv2

# image = cv2.imread("C:/Programmation Arduino/BlockPy@Col/testDriss/images/park.jpg")
# cv2.line(image, (0,0), (100,100), (255,0,0), thickness=2 )
# cv2.circle(image, (100,100), (50), (255,204,51), thickness=5 )
# cv2.rectangle(image, (100,100), (200,200), (102,0,0), thickness=3 )
# cv2.putText(image, "Driss SOUDANI", (150,350), cv2.FONT_HERSHEY_SIMPLEX, 2, (255,255,255), 2)
# cv2.imshow("Titre de la fenêtre", image)
# cv2.waitKey(0)


#Split - Merge
#import cv2 as cv2
# import numpy as np


# image = cv2.imread("C:/Programmation Arduino/BlockPy@Col/testDriss/images/park.jpg")
# cv2.imshow("image originale", image)
# composanteBleu = cv2.split(image)[0]
# cv2.imshow("Composante Bleu", composanteBleu)
# composanteRouge = cv2.split(image)[2]
# cv2.imshow("Composante Rouge", composanteRouge)
# composanteVert = cv2.split(image)[1]
# cv2.imshow("Composante Vert", composanteVert)
# imageReconstituee = cv2.merge([composanteBleu,composanteVert,composanteRouge])
# cv2.imshow("Image reconstituée par fusion des composantes B, V et R", imageReconstituee)

# cv2.waitKey(0)



#Lissage d'image
# import cv2 as cv2


# image = cv2.imread("C:/Programmation Arduino/BlockPy@Col/testDriss/images/park.jpg")
# cv2.imshow("image originale", image)
# FlouGaussien = cv2.GaussianBlur(image, (3,3), cv2.BORDER_DEFAULT)

# cv2.imshow("Flou Gaussien", FlouGaussien)
# FlouMedian = cv2.medianBlur(image, 3)
# cv2.imshow("Flou Median", FlouMedian)
# FlouBilateral = cv2.bilateralFilter(image, 3, 25, 35)
# cv2.imshow("Flou Bilatéral", FlouBilateral)
# cv2.waitKey(0)


#New Image  +  Bitwise
# import cv2 as cv2
# import numpy as np


# image_1 = np.ones((190,305), dtype="uint8")*0
# cv2.rectangle(image_1, (10,20), (210,170), (255,255,255), thickness=-1 )
# cv2.imshow("Blank 1", image_1)
# image_2 = np.ones((190,305), dtype="uint8")*0
# cv2.circle(image_2, (220,95), (75), (255,255,255), thickness=-1 )
# cv2.imshow("Blank 2", image_2)
# bitwise_and = cv2.bitwise_and(image_1, image_1 , mask=image_2 )
# cv2.imshow("Bitwise AND", bitwise_and)
# bitwise_or = cv2.bitwise_or(image_1, image_2 )
# cv2.imshow("Bitwise OR", bitwise_or)
# bitwise_xor = cv2.bitwise_xor(image_1, image_2 )
# cv2.imshow("Bitwise XOR", bitwise_xor)
# cv2.waitKey(0)


#Masking
# import cv2 as cv2
# import numpy as np


# image = cv2.imread("C:/Programmation Arduino/BlockPy@Col/testDriss/images/logo_college.png")
# cv2.imshow("Image originale", image)
# blank_1 = np.ones((190,400), dtype="uint8")*0
# cv2.circle(blank_1, (100,95), (80), (255,255,255), thickness=(-1) )
# cv2.imshow("Blank 1", blank_1)
# blank_2 = np.ones((190,400), dtype="uint8")*0
# cv2.circle(blank_2, (180,95), (80), (255,255,255), thickness=(-1) )
# cv2.imshow("Blank 2", blank_2)
# mask = cv2.bitwise_and(blank_1, blank_1, mask=blank_2 )
# cv2.imshow("Mask", mask)
# image_masquee = cv2.bitwise_and(image, image, mask=mask )
# cv2.imshow("Image masquée", image_masquee)
# cv2.waitKey(0)




# masque sur objet vert sur la photo  1
# import cv2 as cv2

# imageBGR = cv2.imread("C:/Programmation Arduino/BlockPy@Col/testDriss/images/bureau.jpg")
# #imageBGR = cv2.resize(imageBGR, (0,0), fx = 0.1, fy = 0.1, interpolation=cv2.INTER_AREA)

# cv2.imshow("image originale", imageBGR)
# lo_col = (140,180,140)
# hi_col = (160,200,160)
# mask_BGR = cv2.inRange(imageBGR, lo_col, hi_col)

# cv2.imshow("Masque BGR", mask_BGR)
# imageHSV = cv2.cvtColor(imageBGR, cv2.COLOR_BGR2HSV)
# lo_col = (62,59,191)
# hi_col = (66,84,217)
# mask_HSV = cv2.inRange(imageHSV, lo_col, hi_col)

# cv2.imshow("Masque HSV", mask_HSV)
# mask_hsv_flou = cv2.GaussianBlur(mask_HSV, (5,5), cv2.BORDER_DEFAULT)

# cv2.imshow("Masque HSV + flou", mask_hsv_flou)
# mask_HSV_errosion = cv2.erode(mask_hsv_flou, (3,3), iterations=9)

# cv2.imshow("Masque HSV + flou + érosion", mask_HSV_errosion)
# masque_final = cv2.dilate(mask_HSV_errosion, (4,4), iterations=3)

# cv2.imshow("Masque HSV + flou + érosion + dilatation", masque_final)
# cv2.waitKey(0)





# # masque sur objet vert sur la photo  2
# import cv2 as cv2

# imageBGR = cv2.imread("C:/Programmation Arduino/BlockPy@Col/testDriss/images/bureau.jpg")
# imageBGR = cv2.resize(imageBGR, (0,0), fx = 0.1, fy = 0.1, interpolation=cv2.INTER_AREA)

# cv2.imshow("image originale", imageBGR)
# lo_col = (120,160,114)
# hi_col = (130,180,150)
# mask_BGR = cv2.inRange(imageBGR, lo_col, hi_col)

# cv2.imshow("Masque BGR", mask_BGR)
# imageHSV = cv2.cvtColor(imageBGR, cv2.COLOR_BGR2HSV)
# lo_col = (40,40,70)
# hi_col = (50,255,255)
# mask_HSV = cv2.inRange(imageHSV, lo_col, hi_col)

# cv2.imshow("Masque HSV", mask_HSV)
# mask_hsv_flou = cv2.GaussianBlur(mask_HSV, (3,3), cv2.BORDER_DEFAULT)

# cv2.imshow("Masque HSV + flou", mask_hsv_flou)
# image_finale = cv2.bitwise_and(imageBGR, imageBGR, mask=mask_hsv_flou )
# cv2.imshow("Image finale", image_finale)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

# import cv2 as cv2
# import numpy as np

# VideoCapture_1 = None


# VideoCapture_1 = cv2.VideoCapture(1)
# #Vérifier si la caméra s'est ouverte avec succès
# if not VideoCapture_1.isOpened():
#     print("Erreur lors de l'ouverture du flux vidéo")
#     exit()

# while True:
#     #Capturer une image du flux et la placer dans la variable
#     ret, imageBGR = VideoCapture_1.read()
#     imageHSV = cv2.cvtColor(imageBGR, cv2.COLOR_BGR2HSV)
#     couleur_1 = (20,38,143)
#     couleur_2 = (25,255,254)
#     imageMask = cv2.inRange(imageHSV, couleur_1, couleur_2)

#     cv2.imshow("Image Mask - Cutter -", imageMask)
#     cv2.imshow("Image Finale- Cutter -", imageBGR)
#     if (cv2.waitKey(1) & 0xFF == ord('q')):
#        break
# VideoCapture_1.release()
# cv2.destroyAllWindows()




# #Reconnaissance Disque dur
# import cv2 as cv2
# import numpy as np

# VideoCapture_1 = None


# VideoCapture_1 = cv2.VideoCapture(1)
# #Vérifier si la caméra s'est ouverte avec succès
# if not VideoCapture_1.isOpened():
#     print("Erreur lors de l'ouverture du flux vidéo")
#     exit()
# while True:
#     #Capturer une image du flux et la placer dans la variable
#     ret, imageBGR = VideoCapture_1.read()
#     imageHSV = cv2.cvtColor(imageBGR, cv2.COLOR_BGR2HSV)
#     couleur_1 = (72,123,75)
#     couleur_2 = (116,255,255)
#     imageMask = cv2.inRange(imageHSV, couleur_1, couleur_2)

#     imageMask = cv2.erode(imageMask, (1,1), iterations=1)

#     imageMask = cv2.dilate(imageMask, (1,1), iterations=1)

#     contour = cv2.findContours(imageMask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[-2]
#     #Marquer le contour
#     if len(contour) > 0:
#        c=max(contour, key=cv2.contourArea)
#        ((x, y), rayon)=cv2.minEnclosingCircle(c)
#        if rayon>30:
#            cv2.circle(imageBGR, (int(x), int(y)), int(rayon), (0, 153, 255), 2)
#            cv2.circle(imageBGR, (int(x), int(y)), 5, (0, 153, 255), 10)
#            cv2.putText(imageBGR, "Disque dur", (int(x)+10, int(y) -10), cv2.FONT_HERSHEY_DUPLEX, 1, (0, 153, 255), 1, cv2.LINE_AA)
#     cv2.imshow("Image Mask - Disque dur-", imageMask)
#     cv2.imshow("Image BGR- Disque dur-", imageBGR)
#     if (cv2.waitKey(1) & 0xFF == ord('q')):
#        break
# VideoCapture_1.release()
# cv2.destroyAllWindows()

#detection disque dur et couvercle sur la meme image
# import cv2 as cv2
# import numpy as np

# VideoCapture_1 = None


# couleurMinDisque = np.array([72, 123, 100])
# couleurMaxDisque = np.array([116, 255, 255])
# couleurMinCutter = np.array([0, 132, 155])
# couleurMaxCutter = np.array([37, 255, 255])
# VideoCapture_1 = cv2.VideoCapture(0)
# #Vérifier si la caméra s'est ouverte avec succès
# if not VideoCapture_1.isOpened():
#     print("Erreur lors de l'ouverture du flux vidéo")
#     exit()
# while True:
#     #Capturer une image du flux et la placer dans la variable
#     ret, imageBGR = VideoCapture_1.read()
#     imageHSV = cv2.cvtColor(imageBGR, cv2.COLOR_BGR2HSV)
#     #Masquer les couleurs situées en dehors des 2 couleurs limites
#     imageMaskDisque = cv2.inRange(imageHSV, couleurMinDisque, couleurMaxDisque)
#     #Masquer les couleurs situées en dehors des 2 couleurs limites
#     imageMaskCouvercle = cv2.inRange(imageHSV, couleurMinCutter, couleurMaxCutter)
#     imageMaskTotal = cv2.bitwise_or(imageMaskDisque, imageMaskCouvercle )
#     imageMaskTotal = cv2.erode(imageMaskTotal, (1,1), iterations=1)

#     imageMaskTotal = cv2.dilate(imageMaskTotal, (1,1), iterations=1)

#     contourDisque = cv2.findContours(imageMaskDisque, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[-2]
#     #Marquer le contour
#     if len(contourDisque) > 0:
#        c=max(contourDisque, key=cv2.contourArea)
#        ((x, y), rayon)=cv2.minEnclosingCircle(c)
#        if rayon>30:
#            cv2.circle(imageBGR, (int(x), int(y)), int(rayon), (0, 153, 255), 2)
#            cv2.circle(imageBGR, (int(x), int(y)), 5, (0, 153, 255), 10)
#            cv2.putText(imageBGR, "Disque dur", (int(x)+10, int(y) -10), cv2.FONT_HERSHEY_DUPLEX, 1, (0, 153, 255), 1, cv2.LINE_AA)
#     contourCouvercle = cv2.findContours(imageMaskCouvercle, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[-2]
#     #Marquer le contour
#     if len(contourCouvercle) > 0:
#        c=max(contourCouvercle, key=cv2.contourArea)
#        ((x, y), rayon)=cv2.minEnclosingCircle(c)
#        if rayon>30:
#            cv2.circle(imageBGR, (int(x), int(y)), int(rayon), (0, 153, 255), 2)
#            cv2.circle(imageBGR, (int(x), int(y)), 5, (0, 153, 255), 10)
#            cv2.putText(imageBGR, "Couvercle", (int(x)+10, int(y) -10), cv2.FONT_HERSHEY_DUPLEX, 1, (0, 153, 255), 1, cv2.LINE_AA)
#     cv2.imshow("Image Mask - Disque dur ou couvercle -", imageMaskDisque)
#     cv2.imshow("Image BGR- Disque dur et/ou Couvercle", imageBGR)
#     if (cv2.waitKey(1) & 0xFF == ord('q')):
#        break
# VideoCapture_1.release()
# cv2.destroyAllWindows()




#Detection de forme  : prgramme fais directement en python
# import cv2 as cv2


# cv2.namedWindow("Image original :  Les pieces du Robot")
# cv2.namedWindow("Image avec filtre Canny : TraAM")
# imageOriginale = cv2.imread("C:/Programmation Arduino/BlockPy@Col/testDriss/images/formes1_640.jpg")
# imageNiveauxGris = cv2.cvtColor(imageOriginale, cv2.COLOR_BGR2GRAY)
# imageAvecCanny = cv2.Canny(imageNiveauxGris, 255,255)

# contours = cv2.findContours(imageAvecCanny,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)[0]

# for i in contours:
#     area = cv2.contourArea(i)
#     print (area)
    
#     peri = cv2.arcLength(i, True)
    
#     approx = cv2.approxPolyDP(i,0.005*peri,True)
#     x, y, w, h = cv2.boundingRect(approx)
#     cv2.rectangle(imageOriginale,(x,y),(x+w,y+h),(0,255,0),2)
    
    
#     cv2.drawContours(imageOriginale, i, -1,(255,255,0),3)
    
#     cv2.putText(imageOriginale,str(len(approx)),
#                         (x+(w//2)-10,y+(h//2)-10),cv2.FONT_HERSHEY_SIMPLEX,0.7,
#                         (0,0,0),1)
#     cv2.putText(imageOriginale,str(area),
#                         (x+(w//2)-10,y+(h//2)-10+20),cv2.FONT_HERSHEY_SIMPLEX,0.7,
#                         (0,0,0),1)
#     cv2.putText(imageOriginale,str(round(peri,1)),
#                         (x+(w//2)-10,y+(h//2)-10+40),cv2.FONT_HERSHEY_SIMPLEX,0.7,
#                         (0,0,0),1)


# cv2.imshow("Image original :  Les pieces du Robot", imageOriginale)
# cv2.imshow("Image avec filtre Canny : TraAM", imageAvecCanny)

# cv2.waitKey(0)


#Detection de forme  : prgramme issu de BlockPy@col
# import cv2 as cv2

# cv2.namedWindow("Image original :  Les pieces du Robot")
# imageOriginale = cv2.imread("C:/Programmation Arduino/BlockPy@Col/testDriss/images/formes1_640.jpg")

# imageNiveauxGris = cv2.cvtColor(imageOriginale, cv2.COLOR_BGR2GRAY)
# imageAvecCanny = cv2.Canny(imageNiveauxGris, 255,255)

# contours = cv2.findContours(imageAvecCanny,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)[0]
# for i in contours:
#     cv2.drawContours(imageOriginale, i, -1, (51,0,51), 3)
#     approx = cv2.approxPolyDP(i,0.02*cv2.arcLength(i,True),True)
#     x, y, w, h = cv2.boundingRect(approx)
#     cv2.rectangle(imageOriginale,(x,y),(x+w,y+h),(0,51,0),1)
#     cv2.putText(imageOriginale,str(cv2.contourArea(i)), (x+(w//2)-10,y+(h//2)-10+20),cv2.FONT_HERSHEY_SIMPLEX,0.7, (0,0,0),1)
#     cv2.putText(imageOriginale,str(round(cv2.arcLength(i, True),1)), (x+(w//2)-10,y+(h//2)-10+40),cv2.FONT_HERSHEY_SIMPLEX,0.7, (0,0,0),1)
#     cv2.putText(imageOriginale,str(len(cv2.approxPolyDP(i, 0.01*cv2.arcLength(i, True), True))), (x+(w//2)-10,y+(h//2)-10),cv2.FONT_HERSHEY_SIMPLEX,0.7, (0,0,0),1)
# cv2.imshow("Image original :  Les pieces du Robot", imageOriginale)
# cv2.imshow("Image en niveau de gris + Canny :  Les pieces du Robot", imageAvecCanny)
# cv2.waitKey(0)

#Detection de forme dans video
import cv2 as cv2
import numpy as np

VideoCapture_1 = None

def on_Seuil1Change(val) :
   global seuil_1
   seuil_1 = val
   cv2.setTrackbarPos('Seuil1', 'controle', seuil_1)

def on_Seuil2Change(val) :
   global seuil_2
   seuil_2 = val
   cv2.setTrackbarPos('Seuil2', 'controle', seuil_2)

def on_ErodeChange(val) :
   global erode
   erode = val
   cv2.setTrackbarPos('Erode', 'controle', erode)

def on_DilateChange(val) :
   global dilate
   dilate = val
   cv2.setTrackbarPos('Dilate', 'controle', dilate)

def on_SminiChange(val) :
   global surface_mini
   surface_mini = val
   cv2.setTrackbarPos('Smini', 'controle', surface_mini)


cv2.namedWindow("Les pieces du Robot")
cv2.namedWindow("controle")
VideoCapture_1 = cv2.VideoCapture(1)
#Vérifier si la caméra s'est ouverte avec succès
if not VideoCapture_1.isOpened():
    print("Erreur lors de l'ouverture du flux vidéo")
    exit()
seuil_1 = 0
seuil_2 = 0
erode = 0
dilate = 1
surface_mini = 1000
cv2.createTrackbar("Seuil1", "controle" , seuil_1, 255, on_Seuil1Change)
cv2.createTrackbar("Seuil2", "controle" , seuil_2, 255, on_Seuil2Change)
cv2.createTrackbar("Erode", "controle" , erode, 10, on_ErodeChange)
cv2.createTrackbar("Dilate", "controle" , dilate, 10, on_DilateChange)
#cv2.createTrackbar("Smini", "controle" , surface_mini, 50000, on_SminiChange)
while True:
    #Capturer une image du flux et la placer dans la variable
    ret, imageDuFluxVideo = VideoCapture_1.read()
    imageNiveauxGris = cv2.cvtColor(imageDuFluxVideo, cv2.COLOR_BGR2GRAY)
    imageAvecCanny = cv2.Canny(imageNiveauxGris, seuil_1,seuil_2)

    #Erroder l'image
    imageAvecCanny = cv2.erode(imageAvecCanny, None, iterations=erode)
    #Dilater l'image
    imageAvecCanny = cv2.dilate(imageAvecCanny, None, iterations=dilate)
    contours = cv2.findContours(imageAvecCanny,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)[0]
    for i in contours:
        if (cv2.contourArea(i)) > surface_mini:
            cv2.drawContours(imageDuFluxVideo, i, -1, (51,0,51), 3)
            approx = cv2.approxPolyDP(i,0.02*cv2.arcLength(i,True),True)
            x, y, w, h = cv2.boundingRect(approx)
            cv2.rectangle(imageDuFluxVideo,(x,y),(x+w,y+h),(0,51,0),1)
            cv2.putText(imageDuFluxVideo,str(cv2.contourArea(i)), (x+(w//2)-10,y+(h//2)-10+20),cv2.FONT_HERSHEY_SIMPLEX,0.7, (0,0,0),1)
            cv2.putText(imageDuFluxVideo,str(round(cv2.arcLength(i, True),1)), (x+(w//2)-10,y+(h//2)-10+40),cv2.FONT_HERSHEY_SIMPLEX,0.7, (0,0,0),1)
            cv2.putText(imageDuFluxVideo,str(len(cv2.approxPolyDP(i, 0.01*cv2.arcLength(i, True), True))), (x+(w//2)-10,y+(h//2)-10),cv2.FONT_HERSHEY_SIMPLEX,0.7, (0,0,0),1)
    cv2.imshow("Les pieces du Robot", imageDuFluxVideo)
    cv2.imshow("controle", imageAvecCanny)
    if (cv2.waitKey(1) & 0xFF == ord('q')):
       break
VideoCapture_1.release()
cv2.destroyAllWindows()