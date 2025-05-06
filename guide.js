document.addEventListener("DOMContentLoaded", function () {
    // Hamburger Menu for Mobile Navigation
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("nav-active");
    });
    
    // Sidebar Toggle: Using single sidebar element for desktop and mobile overlay.
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const sidebar = document.getElementById("sidebar");
    sidebarToggle.addEventListener("click", function () {
      // Check current display; for mobile, aside is overlay
      if (window.innerWidth <= 768) {
        if (sidebar.style.display === "block") {
          sidebar.style.display = "none";
          sidebarToggle.innerHTML = "List &#8592;"; // left arrow
          sidebarToggle.classList.remove("rotated");
        } else {
          sidebar.style.display = "block";
          sidebarToggle.innerHTML = "List &#8595;"; // down arrow
          sidebarToggle.classList.add("rotated");
        }
      }
    });
    
    // Function to scroll to a section with an offset (so that nothing is hidden behind the fixed header)
    function scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        const offset = 120; // adjust as needed (header + sub-header height)
        const y = section.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
    
    // Sidebar list item click: scroll to section and hide sidebar in mobile view
    document.querySelectorAll(".video-nav li").forEach(item => {
      item.addEventListener("click", function () {
        const targetId = this.getAttribute("data-target");
        scrollToSection(targetId);
        // Hide sidebar overlay in mobile view after selection
        if (window.innerWidth <= 768) {
          sidebar.style.display = "none";
          sidebarToggle.innerHTML = "List &#8592;";
          sidebarToggle.classList.remove("rotated");
        }
      });
    });
    
    /* Sidebar Search with Suggestions */
    const sidebarSearch = document.getElementById("sidebar-search");
    const sidebarSuggestions = document.getElementById("sidebar-suggestions");
    // Build video data array from video-heading data attributes in main content
    const videoData = Array.from(document.querySelectorAll(".video-heading")).map(heading => {
      return {
        id: heading.parentElement.id,
        english: heading.dataset.english,
        hausa: heading.dataset.hausa
      };
    });
    
    sidebarSearch.addEventListener("input", function () {
      const query = this.value.trim().toLowerCase();
      sidebarSuggestions.innerHTML = "";
      if (!query) {
        sidebarSuggestions.style.display = "none";
        return;
      }
      const isHausa = document.getElementById("language-switch").checked;
      const matches = videoData.filter(item => {
        const text = isHausa ? item.hausa.toLowerCase() : item.english.toLowerCase();
        return text.indexOf(query) !== -1;
      });
      if (matches.length) {
        matches.forEach(match => {
          const li = document.createElement("li");
          li.textContent = isHausa ? match.hausa : match.english;
          li.addEventListener("click", function () {
            scrollToSection(match.id);
            sidebarSuggestions.style.display = "none";
            sidebarSearch.value = "";
            if (window.innerWidth <= 768) {
              sidebar.style.display = "none";
              sidebarToggle.innerHTML = "List &#8592;";
              sidebarToggle.classList.remove("rotated");
            }
          });
          sidebarSuggestions.appendChild(li);
        });
        sidebarSuggestions.style.display = "block";
      } else {
        sidebarSuggestions.style.display = "none";
      }
    });
    
    /* Execute search on Enter key in sidebar search */
    sidebarSearch.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        performSidebarSearch();
      }
    });
    
    function performSidebarSearch() {
      const query = sidebarSearch.value.trim().toLowerCase();
      if (!query) return;
      const isHausa = document.getElementById("language-switch").checked;
      const matches = videoData.filter(item => {
        const text = isHausa ? item.hausa.toLowerCase() : item.english.toLowerCase();
        return text.indexOf(query) !== -1;
      });
      if (matches.length) {
        scrollToSection(matches[0].id);
      } else {
        alert("Not available");
        window.location.href = "https://www.google.com/search?q=" + encodeURIComponent("first aid " + query);
      }
    }
    
    /* Language Toggle Using Data Attributes */
    const languageSwitch = document.getElementById("language-switch");
    const languageLabel = document.getElementById("language-label");
    const videoHeadings = document.querySelectorAll(".video-heading");
    const videoGuides = document.querySelectorAll(".video-guide");
    const hausaAudios = document.querySelectorAll(".hausa-audio");
    
    languageSwitch.addEventListener("change", function () {
      const isHausa = languageSwitch.checked;
      languageLabel.textContent = isHausa ? "Hausa" : "English";
      videoHeadings.forEach(el => {
        el.innerText = isHausa ? el.dataset.hausa : el.dataset.english;
      });
      videoGuides.forEach(el => {
        el.innerText = isHausa ? el.dataset.hausa : el.dataset.english;
      });
      // Mute/unmute videos and play/pause corresponding Hausa audio for each video
      document.querySelectorAll("video").forEach(video => video.muted = isHausa);
      hausaAudios.forEach(audio => {
        if (isHausa) {
          audio.currentTime = 0;
          audio.play();
        } else {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    });
  });
