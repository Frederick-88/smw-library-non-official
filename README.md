## sma-mw-library-profile (non-official)

Live on https://sma-mw-library.web.app/

A non-official website of https://sma-maitreyawira-library.web.app/ website which created by Chen Frederick as well. Separately created from the original website so can be modified and included as part of personal portofolio.

### Tech Used :

- Firebase
- Vue.js
- Vuetify
- Vuex
- VueFire
- SCSS
- Vue Toastification
- Cookie
- Debounce
- Vue Slick Carousel
- Firebase Deployment
- NOSQL Database
- Clonedeep

---

### Web UI Reference :

- http://library.uib.ac.id/
- https://www.maitreyawira-batam.sch.id/sma.html
- https://dribbble.com/shots/14450315-EleBrary-Library-Template-for-Elementor
- https://live.templately.com/elebrary/#
- https://asiaproperty.netlify.app/admin/listings -> admin site
- https://preview.themeforest.net/item/susis-library-book-showcase-html5-template/full_screen_preview/19531594?_ga=2.14505201.791970974.1649518423-2102198413.1628943520
- https://preview.themeforest.net/item/bookarazi-author-publisher-elementor-template-kit/full_screen_preview/37673052?_ga=2.161335613.1264836578.1653920020-2102198413.1628943520

---

### Used References :

- Vue-Firebase Setup = https://www.youtube.com/watch?v=tkvQVt2sX7Y
- Firestore - Vuex Binding = https://stackoverflow.com/questions/59722463/how-to-load-firestore-collection-to-vuex-state
- Load Firestore Collection Data = https://stackoverflow.com/questions/67890973/get-items-from-a-firebase-collection-and-use-them-as-a-list-in-vue
- Vue Toastification Vuex 'this' binding = https://github.com/Maronato/vue-toastification/issues/9
- Top Screen Sizes 2021 = https://www.browserstack.com/guide/responsive-design-breakpoints#:~:text=In%20responsive%20design%2C%20a%20breakpoint,navigation%20menu%20on%20the%20sidebar. :

1. 1920×1080
2. 1366×768
3. 360×640
4. 414×896
5. 1536×864
6. 375×667

- Inject scss variable to vue & vuetify => // did not use sass because got error with vuetify, reference => https://joshuatz.com/posts/2019/vue-mixing-sass-with-scss-with-vuetify-as-an-example/#easy-solution or can see vue.config.js

- change vue default icon / favicon = https://stackoverflow.com/questions/53216047/change-favicon-vuejs

- steps to deploy multiple firebase sites :

1. init on https://dev.to/jesusrmendez/how-to-deploy-vue-js-firebase-1iic -> this is enough for deploy single site
2. add another site in firebase console
3. https://stackoverflow.com/questions/52170023/firebase-hosting-deploy-to-other-site use the target apply first
4. dont need to change .firebaserc, only change to firebase.json following the settings we have here, then if .firebaserc doesnt change and cannot deploy, then change it and deploy.
5. it will work alr.

### Instructions :

1. Library SMA Profile Page, Management System itu link ke url -> http://elibrary.uvers.ac.id/

2. ada Admin site yang bisa diakses oleh pustakawan

3. Page Contents :

a. home page / beranda :

- first page / video pengenalan
- facilities :
- program yang berjalan :
- jam buka layanan
- jenis koleksi buku perpustakaan
- kerjasama/mitra
- map

b. profil

- profil singkat
- visi dan misi
- sejarah perpustakaan
- struktur organisasi

c. kotak saran

d. Contact Us

e. E-Library -> link ke url slim

f. Ebook SMW -> link "indonesiamembaca.com"

4. Personal Note :
   a. when done, can contact pak Syafrizal for listing to playstore
   b. responsive
   c. backend + database for Content Management System (CMS)
   d. buku panduan/video tutorial penggunaan

---

Firebase - Vue - Admin Site
Collections/Tables :

1. Facilities
2. Program yang Berjalan
3. Jenis Koleksi Buku Perpustakaan
4. Kerjasama/Mitra
5. Library Details :
   a. Struktur Organisasi ( Image )
   b. Contact us

---
