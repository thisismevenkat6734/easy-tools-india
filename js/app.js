"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation menu
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-navigation");

  if (menuToggle && navigation) {
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navigation.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.focus();
      }
    });
  }

  // Automatically update the footer year
  document.querySelectorAll("#current-year").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  // Add a class when JavaScript is available
  document.documentElement.classList.add("js-enabled");

  // Register the Progressive Web App service worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((registration) => {
          console.info(
            "EasyTools India service worker registered:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error(
            "EasyTools India service worker registration failed:",
            error
          );
        });
    });
  }
});
