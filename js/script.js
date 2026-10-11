
/* =========================================
   1. TYPING EFFECT
   ========================================= */

const typedText = document.getElementById("typed-text");

if (typedText) {
  const words = ["creativity", "technology", "innovation", "teamwork"];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (deleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typedText.textContent = currentWord.substring(0, charIndex);

    let delay = deleting ? 60 : 120;

    if (!deleting && charIndex === currentWord.length) {
      deleting = true;
      delay = 1000;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 300;
    }

    setTimeout(typeEffect, delay);
  }

  typeEffect();
}


/* =========================================
   2. DARK MODE TOGGLE
   ========================================= */

const themeButton = document.querySelector(".theme-toggle");

if (themeButton) {
  // Restore the saved theme, if available
  const savedTheme = localStorage.getItem("teamPortfolioTheme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");

    localStorage.setItem(
      "teamPortfolioTheme",
      isDarkMode ? "dark" : "light"
    );

    themeButton.setAttribute(
      "aria-label",
      isDarkMode ? "Switch to light mode" : "Switch to dark mode"
    );
  });
}


/* =========================================
   3. MOBILE NAVIGATION MENU
   ========================================= */

const navContainer = document.querySelector(".nav-container");
const navLinks = document.querySelector(".nav-links");

if (navContainer && navLinks) {
  // Create a menu button because the HTML has no hamburger button
  const menuButton = document.createElement("button");

  menuButton.type = "button";
  menuButton.className = "mobile-menu-toggle";
  menuButton.textContent = "☰";
  menuButton.setAttribute("aria-label", "Open navigation menu");
  menuButton.setAttribute("aria-expanded", "false");

  navContainer.insertBefore(menuButton, navLinks);

  // Add styles for the mobile menu
  const mobileStyles = document.createElement("style");

  mobileStyles.textContent = `
    .mobile-menu-toggle {
      display: none;
      background: transparent;
      color: inherit;
      border: 1px solid currentColor;
      border-radius: 5px;
      padding: 5px 10px;
      font-size: 22px;
      cursor: pointer;
    }

    @media (max-width: 600px) {
      .nav-container {
        position: relative;
      }

      .mobile-menu-toggle {
        display: block;
      }

      .nav-links {
        display: none;
        position: absolute;
        top: 45px;
        right: 0;
        flex-direction: column;
        gap: 0;
        min-width: 150px;
        padding: 10px;
        background: #4a148c;
        border-radius: 6px;
        z-index: 1000;
      }

      .nav-links.mobile-open {
        display: flex;
      }

      .nav-links a {
        display: block;
        padding: 10px;
      }
    }
  `;

  document.head.appendChild(mobileStyles);

  menuButton.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("mobile-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
  });
}


/* =========================================
   4. NAVIGATION LINKS AND ACTIVE HIGHLIGHT
   ========================================= */

const navigationLinks = document.querySelectorAll(".nav-links a");

const sectionIds = {
  Home: "home",
  About: "about",
  Team: "team",
  Contact: "contact"
};

// Connect the existing links to the correct sections
navigationLinks.forEach(function (link) {
  const linkText = link.textContent.trim();
  const sectionId = sectionIds[linkText];

  if (sectionId) {
    link.href = "#" + sectionId;
  }

  link.addEventListener("click", function () {
    navigationLinks.forEach(function (item) {
      item.classList.remove("active");
    });

    link.classList.add("active");

    // Close the mobile menu after selecting a link
    if (navLinks) {
      navLinks.classList.remove("mobile-open");
    }

    const menuButton = document.querySelector(".mobile-menu-toggle");

    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      menuButton.textContent = "☰";
    }
  });
});


/* =========================================
   5. CONTACT FORM VALIDATION
   ========================================= */

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    // Stop the form from submitting before validation
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");
    const successMessage = document.getElementById("form-success");

    // Clear previous error messages
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    successMessage.hidden = true;

    let isValid = true;

    // Validate name
    if (nameInput.value.trim() === "") {
      nameError.textContent = "Please enter your name.";
      isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput.value.trim() === "") {
      emailError.textContent = "Please enter your email address.";
      isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    // Validate message
    if (messageInput.value.trim() === "") {
      messageError.textContent = "Please enter a message.";
      isValid = false;
    }

    // Show the result
    if (isValid) {
      successMessage.hidden = false;
      contactForm.reset();
    }
  });
}


/* =========================================
   6. BACK-TO-TOP LINK
   ========================================= */

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
  backToTop.href = "#home";

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
