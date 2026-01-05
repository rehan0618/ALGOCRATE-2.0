// Firebase config and initialization
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

window.onload = () => {
  const userName = sessionStorage.getItem('userName');
  if (!userName) {
    // No user logged in, redirect to login page
    window.location.href = 'index.html';
    return;
  }
  document.getElementById('userName').innerText = userName;

  document.getElementById('logoutBtn').addEventListener('click', () => {
    auth.signOut().then(() => {
      sessionStorage.clear();
      window.location.href = 'index.html';
    });
  });

  // ✅ SIDEBAR TOGGLE FUNCTIONALITY
  const toggleSidebarBtn = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');

  toggleSidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
};
