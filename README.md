
# HealthBro  
HealthBro egy modern edzéskövető alkalmazás, amelyet azok számára fejlesztünk, akik szeretnék nyomon követni az edzéseiket, fejlődésüket, és személyre szabott terveket készíteni. Az alkalmazás lehetőséget biztosít, hogy felhasználóbarát felületen rögzítsd az edzéseidet, kezelhesd az egyes gyakorlatok adatait, és valós időben elemezd a teljesítményedet.

Célunk, hogy egy olyan platformot biztosítsunk, amely:

    Egyszerűen használható: Intuitív felhasználói élmény kezdők és haladók számára is.
    Teljesítmény-orientált: Minden adatot strukturáltan tárol és elemzési eszközöket biztosít a fejlődésedhez.
    Személyre szabott: Testreszabható edzéstervek, amelyek megfelelnek az egyéni igényeidnek.
    Multiplatform támogatás: Webes felület mellett mobil alkalmazást is biztosítunk.

A HealthBro a következőket kínálja:

    Edzéskövetés: Könnyen rögzítheted az edzéseidet, gyakorlatonként beállíthatod a sorozatok, ismétlések és súlyok számát.
    Statisztikák és elemzések: Grafikonok és jelentések segítségével láthatod az erőnléted és állóképességed fejlődését.
    Közösségi élmény: Osszd meg az eredményeidet másokkal, vagy meríts inspirációt a közösség tagjaitól.
    Offline működés: Mobilalkalmazásunk offline módban is támogatja az adatrögzítést, amely szinkronizálódik, amint újra online leszel.

A HealthBro egyszerre szolgál edzésnaplóként és motivációs eszközként, segítve minden felhasználót abban, hogy elérje a kitűzött céljait.

## Funkciók  
- Testreszabható edzéstervek  
- Statisztikák és grafikonok (Folyamatban...)  
- Mobilbarát felület (Folyamatban...) 

## Technológiák  
- **Frontend:** React  
- **Backend:** ASP.NET Core Web API  
- **Adatbázis:** SQL Server
- **Mobil:** .NET MAUI

## Telepítés (IDEIGLENES)
1. Klónozd a repót: `git clone https://github.com/felhasznalo/HealthBro.git`  
2. Lépj a `backend` mappába: `cd backend`  
   - Telepítsd a csomagokat: `dotnet restore`  
   - Indítsd el az API-t: `dotnet run`  
3. Lépj a `frontend` mappába: `cd frontend`  
   - Telepítsd a csomagokat: `npm install`  
   - Indítsd el a kliens alkalmazást: `npm start`  

## Architektúra  
- A frontend React-alapú, amely az ASP.NET Core Web API-val kommunikál.  
- Az API adatbáziskapcsolatot biztosít a felhasználói adatok és edzéstervek tárolására.  

## Kapcsolat
- Email: support@healthbro.com
- Telefon: +36 20 123 4567
