import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDZBx0Zvwtk6ZT4luCQEtD-mVYAnYCw8gA",
    authDomain: "mindful-habits-eeded.firebaseapp.com",
    projectId: "mindful-habits-eeded",
    storageBucket: "mindful-habits-eeded.appspot.com",
    messagingSenderId: "538749158884",
    appId: "1:538749158884:web:0224b819c9d9b5a5e0f3f1",
    measurementId: "G-R1DJQSTRWD"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

//listen for auth status change
onAuthStateChanged(auth, (user) => {
    if(user){
        console.log("User logged in: ", user.email);
        getAffirmations(db).then((snapshot) => {
            setupAffirmations(snapshot);
        });
        setUpUI(user);
        const form = document.querySelector("form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = document.querySelector("form");
            form.addEventListener("submit", (event) => {
            event.preventDefault();

            addDoc(collection(db, "affirmations"), {
            affirmation: form.affirmation.value,
            }).catch((error) => console.log(error));
            form.affirmation.value = "";
            });

        })
    } else {
        console.log("User logged out");
        setUpUI();
        setupAffirmations([]);
    }
})

//signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //get user info
    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
    //signed in
    const user = userCredentials.user;
    console.log(user);
    const modal = document.querySelector("#modal-signup");
    Map.Modal.getInstance(modal).close();
    signupForm.reset();
}) .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
});
});

//logout
    const logout = document.querySelector("#logout");
    logout.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
        console.log("User logged out");
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    });

    //login
    const loginForm = document.querySelector("#login-form");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;
    signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
        const modal = document.querySelector("#modal-signup");
        Map.Modal.getInstance(modal).close();
        signupForm.reset();
    }) .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    });
    