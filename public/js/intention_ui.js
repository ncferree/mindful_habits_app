const intentions = document.querySelector(".intentions");

 //Add New intention
 const forms = document.querySelector(".side-form");
 M.Sidenav.init(forms, {edge: "left" });

//render intention from db in my intention page
const renderIntention = (data, id) => {
    const html = `
    <div class="card-panel intention white row" data-id="${id}">
        <div class="intention-detail">
            <div class="intention">${data.intention}</div>
            <div class="item-delete">
            <i class="material-icons" data-id="${id}">delete_outline</i>
            </div>
        </div>
    </div>
` ;

 intentions.innerHTML += html;
};

//remove intention
function removeIntention(id) {
    const intention = document.querySelector(`.intention[data-id= "${id}"]`);
    intention.remove();
}