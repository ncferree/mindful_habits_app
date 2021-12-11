
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
  import { getFirestore, collection, query, orderBy, startAfter, limit, getDocs, onSnapshot, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
  import { getAuth,  onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
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
  const auth = getAuth(app);

enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          console.log('Persistence Failed');
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          console.log('Persistence is not valid');
      }
  });
  async function getDailyAffirmations(db) {
    const dailyAffirmationsCol = collection(db, "dailyAffirmations");
    const dailyAffirmationSnapshot = await getDocs(dailyAffirmationsCol);
    const dailyAffirmationList = dailyAffirmationSnapshot.docs.map((doc) => doc);
    return dailyAffirmationList;
  }
  //listen for auth status change
onAuthStateChanged(auth, (user) => {
  if(user){
      console.log("User logged in: ", user.email);
      setUpUI(user);  
  } else {
      console.log("User logged out");
      setUpUI();
  }
})

  // const unsubtwo = onSnapshot(collection(db, "dailyAffirmations"),(doc) => {
  //   setupDailyAffirmation(change.doc.data(), change.doc.id);
  // });
  
//   // Query the first page of docs
// const first = query(collection(db, "dailyAffirmations"), orderBy("id"), limit(1));
// const documentSnapshots = await getDocs(first);

// // Get the last visible document
// const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
// console.log("last", lastVisible);

// // Construct a new query starting at this document,
// const next = query(collection(db, "dailyAffirmations"),
//     orderBy("id"),
//     startAfter(lastVisible),
//     limit(1));

  
  
    //  //add new dailyAffirmation to My Affirmation page
    //  const addAffirmations = document.querySelector(".add-to-my-affirmations");
    //  addAffirmations.addEventListener("submit", (event) => {
    //    event.preventDefault();
     
    //  addDoc(collection(db, "dailyAffirmations"), {
    //    dailyAffirmation: addAffirmations.dailyAffirmation.value,
    //  }).catch((error) => console.log(error));
    //  addAffirmations.dailyAffirmation.value = "";
    //  });



