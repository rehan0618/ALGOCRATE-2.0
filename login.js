// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

document.getElementById("loginBtn").addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      // Save user info in sessionStorage to pass to home page
      sessionStorage.setItem('userName', user.displayName);
      sessionStorage.setItem('userEmail', user.email);
      // Redirect to home page
      window.location.href = "home.html";
    })
    .catch(error => {
      console.error("Login failed:", error.message);
    });
});
