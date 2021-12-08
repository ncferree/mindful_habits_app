
//setup materialize components
document.addEventListener("DOMContentLoaded", function(){
    var modals = document.querySelectorAll(".modal")
    M.Modal.init(modals);

    var items = document.querySelectorAll(".collapsible");
    M.Collapsible.init(items);

     //Nav Menu
    const menus = document.querySelector(".side-menu");
    M.Sidenav.init(menus, {edge: "right"});
});


//checklist
document.getElementById('daily-routines').onclick = function() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    (checkboxes.length);
};

const dailyAffirmations = document.querySelector(".dailyAffirmations");
//render dailyAffirmation from myAFiirtmation db 
const renderDailyAffirmation = (data, id) => {
    console.log(data, id);
     const html = `
     <div class="card-panel dailyAffirmations white row" data-id="${id}">
         <div class="dailyAffirmations-detail">
             <div class="dailyAffirmations">${data.dailyAffirmation}</div>
             <div class="dailyAffirmation item-add">
             <i class="material-icons" data-id="${id}">add</i>
             </div>
         </div>
     </div>
 ` ;
 dailyAffirmations.innerHTML += html;
};



// const loggedOutLinks = document.querySelectorAll(".logged-out");
// const loggedInLinks = document.querySelectorAll(".logged-in");

// const setUpUI = (user) => {
//     if(user) {
//         loggedOutLinks.forEach((item) => (item.style.display = "none"));
//         loggedInLinks.forEach((item) => (item.style.display = "block"));
//     }else {
//         loggedOutLinks.forEach((item) => (item.style.display = "block"));
//         loggedInLinks.forEach((item) => (item.style.display = "none"));
//     }
// }

  
    //Date Picker
    // var elems = document.querySelectorAll('.datepicker');
    // var instances = M.Datepicker.init(elems, options);
    // instance.open();
    //CAlendar


// //setup affirmations (or task list in example) upon login
// const setupAffirmations = (data) => {
//     let html ="";
//     data.forEach((doc) => {
//         const affirmation = doc.data();
//         const li = ` 
//         <div class="card-panel affirmation white row" data-id="${affirmation.id}">
//         <div class="affirmation-detail">
//             <div class="affirmation">${affirmation.affirmation}</div>
//             <div class="affirmation-delete">
//             <i class="material-icons" data-id="${affirmation.id}">delete_outline</i>
//             </div>
//         </div>
//         </div>`;
//         html += li;
//     });
//     affirmations.innerHTML += html;
// };

