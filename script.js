function smoothScroll(target) {
    const duration = 1000; 
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
    const startTime = performance.now();
  
    function scrollAnimation(currentTime) {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, startPosition + (targetPosition - startPosition) * easeProgress);
      if (timeElapsed < duration) {
        requestAnimationFrame(scrollAnimation);
      }
    }
    requestAnimationFrame(scrollAnimation);
  }
  
  function closeNav() {
    const sideNav = document.getElementById("mySidenav");
    const closeBtn = document.getElementById("closeBtn");
    const openBtn = document.getElementById("openBtn");
    sideNav.style.width = "0";
    closeBtn.style.display = "none";
    const links = sideNav.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
      links[i].style.transition = "opacity 0.1s ease"; 
      links[i].style.opacity = "0";
    }
    openBtn.classList.remove("hidden");
  }

  function openNav() {
    const sideNav = document.getElementById("mySidenav");
    const closeBtn = document.getElementById("closeBtn");
    const openBtn = document.getElementById("openBtn");
    sideNav.style.width = "200px";
    closeBtn.style.display = "block";
    const links = sideNav.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
      links[i].style.opacity = "0";
    }

    const fadeIn = (element, interval) => {
      let opacity = 0;
      const timer = setInterval(() => {
        opacity += 0.1;
        element.style.opacity = opacity.toString();
        if (opacity >= 1) {
          clearInterval(timer);
        }
      }, interval);
    };

    const fadeInInterval = 30; 
    for (let i = 0; i < links.length; i++) {
      fadeIn(links[i], i * fadeInInterval);
    }

    openBtn.classList.add("hidden");
  }
  

  function goToTop() {
    const duration = 800; 
    const startPosition = window.pageYOffset;
    const startTime = performance.now();
  
    function scrollAnimation(currentTime) {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); 
      window.scrollTo(0, startPosition * (1 - easeProgress));
      if (timeElapsed < duration) {
        requestAnimationFrame(scrollAnimation);
      }
    }
    requestAnimationFrame(scrollAnimation);
  }
  
  function showGoTopButton() {
    const goTopBtn = document.getElementById("goTopBtn");
    if (window.pageYOffset > 300) {
      goTopBtn.style.display = "block";
    } else {
      goTopBtn.style.display = "none";
    }
  }
  
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  function fadeInOnScroll() {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add("visible");
      }
    });
  }
  
  window.addEventListener("scroll", fadeInOnScroll);

  window.addEventListener("scroll", showGoTopButton);
  
  const sidebarLinks = document.querySelectorAll(".sidenav a");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      smoothScroll(link.getAttribute("href"));
      closeNav(); 
    });
  });
  
  function hideLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "none";
  }
  window.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "flex";
  });
  window.addEventListener("load", function () {
    setTimeout(hideLoadingScreen, 2000);
  });
  document.addEventListener("click", function (event) {
    const sideNav = document.getElementById("mySidenav");
    const openBtn = document.getElementById("openBtn");
    if (!sideNav.contains(event.target) && !openBtn.contains(event.target)) {
      closeNav();
    }
  });
  
  