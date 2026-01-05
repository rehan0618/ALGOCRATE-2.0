// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDtzHSWrsw8XYHDVQpvys8nAdaioZn7rdI",
  authDomain: "trail-2e3cf.firebaseapp.com",
  projectId: "trail-2e3cf",
  storageBucket: "trail-2e3cf.firebasestorage.app",
  messagingSenderId: "386786330171",
  appId: "1:386786330171:web:58e3ceb2046ce441f97e1e",
  measurementId: "G-CGTP7JZCNS"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");
const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");

// Auth check
auth.onAuthStateChanged(user => {
  if (user) {
    const displayName = user.displayName || user.email.split('@')[0] || "User";
    userName.innerText = displayName;
    
    // Store current user info in localStorage for other pages
    try {
      localStorage.setItem('algo_current_user_email', user.email);
      localStorage.setItem('algo_current_user_name', displayName);
    } catch (e) {
      console.warn('Could not write current user info to localStorage', e);
    }
  } else {
    // Remove stored user on sign-out (cleanup)
    try { 
      localStorage.removeItem('algo_current_user_email');
      localStorage.removeItem('algo_current_user_name');
    } catch(e){}
    window.location.href = "index.html";
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => {
    try { 
      localStorage.removeItem('algo_current_user_email');
      localStorage.removeItem('algo_current_user_name');
    } catch(e){}
    window.location.href = "index.html";
  });
});

// Sidebar Toggle
document.getElementById("toggleSidebar").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
});

// CAROUSEL ROTATION LOGIC
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  const items = document.querySelectorAll(".carousel-item");
  let currentAngle = 0;
  const totalItems = items.length;
  
  function updateCarousel() {
    carousel.style.transform = `translateZ(-400px) rotateY(${currentAngle}deg)`;
    items.forEach((item, index) => {
      // Calculate which item is in front
      const itemAngle = (index * 72) + currentAngle;
      const normalizedAngle = ((itemAngle % 360) + 360) % 360;
      if (normalizedAngle > 315 || normalizedAngle < 45) {
        item.style.opacity = 1;
        item.style.filter = "none";
      } else {
        item.style.opacity = 0.4;
        item.style.filter = "blur(2px)";
      }
    });
  }
  
  function rotate() {
    currentAngle -= 0.5; // Smooth continuous rotation clockwise
    updateCarousel();
    requestAnimationFrame(rotate);
  }
  
  updateCarousel(); // Set initial state
  rotate(); // Start continuous clockwise rotation
});