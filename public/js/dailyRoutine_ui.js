//MORNING ROUTINE
const morningRoutine = document.querySelector(".morningRoutine");

 //Add New item
 const forms = document.querySelector(".side-form-morning");
 M.Sidenav.init(forms, {edge: "left" });

//render item from db in my item page
const renderMorningItem = (data, id) => {
    const html = `
    <div class="card-panel morningitem white row" data-id="${id}">
        <div class="item-detail">
            <div class="morningitem">${data.morningitem}</div>
            <div class="morningRoutine item-delete">
            <i class="material-icons" data-id="${id}">delete_outline</i>
            </div>
        </div>
    </div>
` ;

 morningRoutine.innerHTML += html;
};

//remove item
function removeMorningItem(id) {
    const morningitem = document.querySelector(`.morningitem[data-id= "${id}"]`);
    morningitem.remove();
}

// EVEnING ROUTINE

const eveningRoutine = document.querySelector(".eveningRoutine");

//  Add New item
 const eveningform = document.querySelector(".side-form-evening");
 M.Sidenav.init(eveningform, {edge: "left" });

//render item from db in my item page
const renderEveningItem = (data, id) => {
    const html = `
    <div class="card-panel eveningitem white row" data-id="${id}">
        <div class="item-detail">
            <div class="eveningitem">${data.eveningitem}</div>
            <div class="eveningitem item-delete">
            <i class="material-icons" data-id="${id}">delete_outline</i>
            </div>
        </div>
    </div>
` ;

 eveningRoutine.innerHTML += html;
};

//remove item
function removeEveningItem(id) {
    const eveningitem = document.querySelector(`.eveningitem[data-id= "${id}"]`);
    eveningitem.remove();
}