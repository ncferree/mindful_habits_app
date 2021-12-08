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


async function getMorningRoutine(db) {
    const morningRoutineCol = collection(db, "morningRoutine");
    const itemSnapshot = await getDocs(morningRoutineCol);
    const itemList = itemSnapshot.docs.map((doc) => doc);
      return itemList;
}
async function getEveningRoutine(db) {
    const eveningRoutineCol = collection(db, "eveningRoutine");
    const itemSnapshot = await getDocs(eveningRoutineCol);
    const itemList = itemSnapshot.docs.map((doc) => doc);
      return itemList;
}

const unsubMorning = onSnapshot(collection(db, "morningRoutine"),(doc) => {
    // console.log(doc.docChanges());
    doc.docChanges().forEach((change) => {
        // console.log(change, change.doc.data(), change.doc.id);
        if(change.type === "added" ) {
            //Call rendder function in ui
            renderMorningItem(change.doc.data(), change.doc.id);
        }if (change.type === "removed") {
            removeMorningItem(change.doc.id);
        }
    });
    });

    const unsubEvening = onSnapshot(collection(db, "eveningRoutine"),(doc) => {
        // console.log(doc.docChanges());
        doc.docChanges().forEach((change) => {
            // console.log(change, change.doc.data(), change.doc.id);
            if(change.type === "added" ) {
                //Call rendder function in ui
                renderEveningItem(change.doc.data(), change.doc.id);
            }if (change.type === "removed") {
                removeEveningItem(change.doc.id);
            }
        });
        });
    
    //add new morning item
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    
    addDoc(collection(db, "morningRoutine"), {
      morningitem: form.morningitem.value,
    }).catch((error) => console.log(error));
    form.morningitem.value = "";
    });

    //add new evening item

    const eveningform = document.querySelector(".eveningRoutineForm");
    eveningform.addEventListener("submit", (event) => {
      event.preventDefault();

    addDoc(collection(db, "eveningRoutine"), {
        eveningitem: eveningform.eveningitem.value,
      }).catch((error) => console.log(error));
      eveningform.eveningitem.value = "";
    });
    
    //delete morning item
    const morningRoutineContainer = document.querySelector(".morningRoutine");
    morningRoutineContainer.addEventListener("click", (event) => {
        console.log(event);
    if (event.target.tagName === "I") {
      const id = event.target.getAttribute("data-id");
        deleteDoc(doc(db, "morningRoutine", id));
    }
    });

     //delete evening item
     const eveningRoutineContainer = document.querySelector(".eveningRoutine");
     eveningRoutineContainer.addEventListener("click", (event) => {
        console.log(event);
     if (event.target.tagName === "I") {
       const id = event.target.getAttribute("data-id");
         deleteDoc(doc(db, "eveningRoutine", id));
     }
     });