// Your Firebase config (replace with your actual config)
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

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userInfo = document.getElementById("userInfo");

// Login with Google
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        userInfo.innerText = `Welcome, ${user.displayName}!`;
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";

        // Redirect to dashboard after login
        window.location.href = "dashboard.html";
      })
      .catch(error => {
        console.error("Login failed:", error.message);
      });
  });
}

// Logout user
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => {
      userInfo.innerText = "";
      loginBtn.style.display = "inline-block";
      logoutBtn.style.display = "none";
    });
  });
}

// Check auth state on page load
auth.onAuthStateChanged(user => {
  if (user) {
    userInfo.innerText = `Welcome, ${user.displayName}!`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    userInfo.innerText = "";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
});
