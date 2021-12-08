import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
//access to db
const db = getFirestore(app);


async function getIntentions(db) {
    const intentionsCol = collection(db, "intentions");
    const intentionSnapshot = await getDocs(intentionsCol);
    const intentionList = intentionSnapshot.docs.map((doc) => doc);
      return intentionList;
}

const unsub = onSnapshot(collection(db, "intentions"),(doc) => {
    // console.log(doc.docChanges());
    doc.docChanges().forEach((change) => {
        // console.log(change, change.doc.data(), change.doc.id);
        if(change.type === "added" ) {
            //Call rendder function in ui
            renderIntention(change.doc.data(), change.doc.id);
        }if (change.type === "removed") {
            removeIntention(change.doc.id);
        }
    });
    });
    
    //add new affirmation
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    
    addDoc(collection(db, "intentions"), {
      intention: form.intention.value,
    }).catch((error) => console.log(error));
    form.intention.value = "";
    });
    
    
    //delete affirmation
    const intentionsContainer = document.querySelector(".intentions");
    intentionsContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "I") {
      const id = event.target.getAttribute("data-id");
        deleteDoc(doc(db, "intentions", id));
    }
    });