<template>
  <div>
    <!-- -------------- -->
    <!-- Desktop Navbar -->
    <!-- -------------- -->
    <v-app-bar
      v-if="!isNotDesktop"
      app
      :elevation="navbarStyle.shadow"
      :color="navbarStyle.bg"
      class="desktop-navbar d-flex justify-center align-center"
      width="100%"
      height="100px"
    >
      <div class="navbar__container d-flex justify-space-between align-center">
        <router-link
          to="/"
          class="d-flex align-center"
          @click.native="scrollToTop"
        >
          <img
            class="navbar-logo"
            :src="require('@/assets/images/smw-logo.png')"
          />
        </router-link>

        <div class="navbar__button-list">
          <div v-for="nav in navList" :key="nav.key">
            <router-link
              v-if="nav.isRouterLink"
              :to="nav.link"
              :class="navButtonClass(nav.key, !!nav.isLast)"
              @click.native="scrollToTop"
            >
              {{ nav.name }}
            </router-link>
            <button
              v-else-if="nav.isLogoutButton"
              type="button"
              :class="navButtonClass(nav.key, !!nav.isLast)"
              @click="logout"
            >
              {{ nav.name }}
            </button>
            <a
              v-else
              :href="nav.link"
              target="_blank"
              :class="navButtonClass(nav.key)"
            >
              {{ nav.name }}
            </a>
          </div>
        </div>
      </div>
    </v-app-bar>

    <!-- ------------- -->
    <!-- Mobile Navbar -->
    <!-- ------------- -->
    <v-card
      v-if="isNotDesktop"
      absolute
      class="mobile-navbar__container mx-auto overflow-hidden"
      :class="{ 'is-active': isShowMobileNavbar }"
    >
      <v-app-bar class="mobile-navbar black" dark app>
        <router-link
          to="/"
          class="d-flex align-center"
          @click.native="scrollToTop"
        >
          <img
            class="navbar-logo"
            :src="require('@/assets/images/smw-logo.png')"
          />
        </router-link>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon
          class="ma-0"
          @click="isShowMobileNavbar = true"
        ></v-app-bar-nav-icon>
      </v-app-bar>

      <v-navigation-drawer
        v-model="isShowMobileNavbar"
        absolute
        temporary
        right
        class="mobile-sidebar black"
      >
        <div class="sidebar__button-list pa-8">
          <div v-for="nav in navList" :key="nav.key">
            <router-link
              v-if="nav.isRouterLink"
              :to="nav.link"
              :class="sidebarButtonClass(nav.key)"
              @click.native="scrollToTop"
            >
              {{ nav.name }}
            </router-link>
            <a
              v-else
              :href="nav.link"
              target="_blank"
              :class="sidebarButtonClass(nav.key, !!nav.isLast)"
            >
              {{ nav.name }}
            </a>
          </div>
        </div>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import globalMixins from "@/mixins/global-mixins.js";

export default {
  name: "Navbar",
  mixins: [globalMixins],
  data() {
    return {
      isScrolled: false,
      isShowMobileNavbar: false,
      group: null,

      desktopNavList: [
        {
          link: "/",
          key: "home",
          name: "Home",
          isRouterLink: true,
        },
        {
          link: "/profil",
          key: "profile",
          name: "Profil",
          isRouterLink: true,
        },
        {
          link: "/kotak-saran",
          key: "feedback-box",
          name: "Kotak Saran",
          isRouterLink: true,
        },
        {
          link: "/hubungi-kami",
          key: "contact",
          name: "Kontak",
          isRouterLink: true,
        },
        {
          link: "http://elibrary.uvers.ac.id/elibrary/",
          key: "e-library",
          name: "E-Library",
        },
        {
          link: "https://gln.kemdikbud.go.id/glnsite/gerakan-indonesia-membaca/",
          key: "ebook",
          name: "Ebook SMW",
          isLast: this.isNotDesktop,
        },
        {
          link: "/admin/login",
          key: "admin",
          name: "Admin",
          isRouterLink: true,
          isLast: true,
        },
      ],
      desktopAdminNavList: [
        {
          link: "/",
          key: "home",
          name: "Home",
          isRouterLink: true,
        },
        {
          link: "/admin/facilities",
          key: "admin-facilities",
          name: "Facilities",
          isRouterLink: true,
        },
        {
          link: "/admin/programs",
          key: "admin-programs",
          name: "Programs",
          isRouterLink: true,
        },
        {
          link: "/admin/book-collections",
          key: "admin-book-collections",
          name: "Book Collections",
          isRouterLink: true,
        },
        {
          link: "/admin/partners",
          key: "admin-partners",
          name: "Partners",
          isRouterLink: true,
        },
        {
          link: "/admin/library-details",
          key: "admin-library-details",
          name: "Library Details",
          isRouterLink: true,
        },
        {
          name: "Logout",
          isLogoutButton: true,
          isLast: true,
        },
      ],
    };
  },
  computed: {
    isHomeRoute() {
      return this.$route.path === "/";
    },
    navbarStyle() {
      return {
        shadow: this.isScrolled ? 10 : 0,
        bg: this.isScrolled || !this.isHomeRoute ? "black" : "transparent",
      };
    },
    navList() {
      let converted = this.desktopNavList;
      if (this.isNotDesktop)
        converted = this.desktopNavList.filter((nav) => {
          return nav.key !== "admin";
        });

      return this.isOnAdminSite && !this.isNotDesktop
        ? this.desktopAdminNavList
        : converted;
    },
    activeNavType() {
      const path = this.$route.path;

      if (path === "/") return "home";
      else if (path === "/profil") return "profile";
      else if (path === "/kotak-saran") return "feedback-box";
      else if (path === "/hubungi-kami") return "contact";
      else if (path === "/admin/facilities") return "admin-facilities";
      else if (path === "/admin/programs") return "admin-programs";
      else if (path === "/admin/book-collections")
        return "admin-book-collections";
      else if (path === "/admin/partners") return "admin-partners";
      else if (path === "/admin/library-details")
        return "admin-library-details";
      else if (path.includes("admin")) return "admin";

      return "";
    },
  },
  created() {
    this.setupNavbar();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    ...mapActions("facilities", ["fetchFacility"]),
    ...mapActions("programs", ["fetchProgram"]),
    ...mapActions("bookCollections", ["fetchBookCollection"]),
    ...mapActions("partners", ["fetchPartner"]),
    ...mapActions("libraryDetails", ["fetchLibraryDetail"]),
    ...mapMutations(["doLogout"]),
    setupNavbar() {
      window.addEventListener("scroll", this.handleScroll);

      this.fetchFacility();
      this.fetchProgram();
      this.fetchBookCollection();
      this.fetchPartner();
      this.fetchLibraryDetail();
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    handleScroll() {
      const position = document.documentElement;
      this.isScrolled = position.scrollTop > 65;
    },
    logout() {
      this.doLogout();
      this.$router.push("/admin/login");
      this.$toast.success("Successfully logged out.");
    },
    navButtonClass(type, isLast) {
      const cssClass = ["nav-button pa-lg-3 pa-2"];

      if (type === this.activeNavType)
        cssClass.push("yellow--text text--accent-4", "nav-button--active");
      if (type !== this.activeNavType) cssClass.push("white--text");
      if (!isLast) cssClass.push("mr-lg-3 mr-2");

      return cssClass.join(" ");
    },
    sidebarButtonClass(type, isLast) {
      const cssClass = ["sidebar-button pa-2"];

      if (type === this.activeNavType)
        cssClass.push("yellow--text", "text--accent-4");
      if (type !== this.activeNavType) cssClass.push("white--text");
      if (!isLast) cssClass.push("mb-2");

      return cssClass.join(" ");
    },
  },
};
</script>

<style lang="scss">
.desktop-navbar {
  .navbar__container {
    width: 100%;
    padding: 0 50px;
  }

  .navbar-logo {
    width: 300px;
  }

  .v-toolbar__content {
    width: 100%;
    padding: 0;
  }

  .navbar__button-list {
    display: flex;

    .nav-button {
      font-size: 0.8125rem;
      text-transform: uppercase;
      font-weight: 500;
      text-decoration: none;
      display: block;

      &:hover {
        color: #ffd600 !important;
        transition: all 0.3s ease-in-out;
      }

      &.nav-button--active {
        border-bottom: 1px solid #ffd600;
        pointer-events: none;
      }
    }
  }

  @include tablet() {
    .navbar__container {
      padding: 0 30px;
    }

    .navbar-logo {
      width: 250px;
    }

    .navbar__button-list {
      .nav-button {
        font-size: 0.6875rem;
      }
    }
  }
}

.mobile-navbar__container {
  position: fixed !important;
  width: 100vw;
  z-index: 99999;
  background-color: transparent !important;
  box-shadow: none !important;

  &.is-active {
    height: 100vh;
  }

  .mobile-navbar {
    height: 80px !important;

    .v-toolbar__content {
      height: 80px !important;
    }
  }

  .mobile-sidebar {
    width: 40vw !important;
    min-width: 250px;

    .sidebar-button {
      font-size: 0.9375rem;
      text-transform: uppercase;
      font-weight: 500;
      text-decoration: none;
      display: flex;
      align-items: center;

      &:hover {
        color: #ffd600 !important;
        transition: all 0.3s ease-in-out;
      }

      @include mobile {
        font-size: 0.875rem;
      }

      @include small-mobile {
        font-size: 0.8125rem;
      }
    }
  }

  .navbar-logo {
    width: 250px;
  }
}
</style>
