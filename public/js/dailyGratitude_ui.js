const dailyGratitude = document.querySelector(".dailyGratitude");

 //Add New gratitude
 const forms = document.querySelector(".side-form");
 M.Sidenav.init(forms, {edge: "left" });

//render gratitude from db in my gratitude page
const renderGratitude = (data, id) => {
    const html = `
    <div class="card-panel gratitude white row" data-id="${id}">
        <div class="gratitude-detail">
            <div class="gratitude">${data.gratitude}</div>
            <div class="item-delete">
            <i class="material-icons" data-id="${id}">delete_outline</i>
            </div>
        </div>
    </div>
` ;

 dailyGratitude.innerHTML += html;
};

//remove gratitude
function removeGratitude(id) {
    const gratitude = document.querySelector(`.gratitude[data-id= "${id}"]`);
    gratitude.remove();
}