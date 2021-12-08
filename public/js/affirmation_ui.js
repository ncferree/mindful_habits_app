const affirmations = document.querySelector(".affirmations");

 //Add New Affirmation
 const forms = document.querySelector(".side-form");
 M.Sidenav.init(forms, {edge: "left" });

//render affirmation from db in my affirmation page
const renderAffirmation = (data, id) => {
    const html = `
    <div class="card-panel affirmation white row" data-id="${id}">
        <div class="affirmation-detail">
            <div class="affirmation">${data.affirmation}</div>
            <div class="item-delete">
            <i class="material-icons" data-id="${id}">delete_outline</i>
            </div>
        </div>
    </div>
` ;

 affirmations.innerHTML += html;
};

//remove affirmation
function removeAffirmation(id) {
    const affirmation = document.querySelector(`.affirmation[data-id= "${id}"]`);
    affirmation.remove();
}