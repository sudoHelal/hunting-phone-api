const loadPhone = async (searchText='13', isShowAll) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  const phone = data.data;
  displayPhone(phone,isShowAll);
};
const displayPhone = (phones, isShowAll) => {
  console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
//   clear phone container before adding new phone cards
    phoneContainer.innerText = '';
    // display show all button if there are more than 12 phones
    const showAllButton = document.getElementById("show-all-button");
    if(phones.length > 12 && !isShowAll){
        showAllButton.classList.remove("hidden");
    }else{
        showAllButton.classList.add("hidden");
    }
    // display only first 12 phones
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }
  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
        <figure>
                      <img
                        src="${phone.image}"
                        alt="Shoes" />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
                    
                    `;
                    phoneContainer.appendChild(phoneCard);
  });
//   hide spinner or loading
toggleLoadSpinner(false);
};
const handleShowDetails = async(id) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    const phoneDetails = data.data;
    displayPhoneDetails(phoneDetails);
}
const displayPhoneDetails = (phoneDetails) =>{
    console.log(phoneDetails);
    const phoneDetailsName = document.getElementById('phone-details-name');
    phoneDetailsName.innerText = phoneDetails.name;
    const phoneDetailsContainer = document.getElementById('phone-details-container');
    phoneDetailsContainer.innerHTML = `
    <img src="${phoneDetails.image}" alt="" />
    <h3><span class="text-xl font-bold">${phoneDetails.name}</span>
    <p><span>Brand: </span>${phoneDetails.brand}</p>
    <p><span>Memory: </span>${phoneDetails?.mainFeatures?.memory}</p>
    <p><span>Bluetooth: </span>${phoneDetails?.others?.Bluetooth || "Bluetootjh unavailable"}</p>
    <p><span>Sensors: </span>${phoneDetails?.mainFeatures?.sensors || "Sensor unavailable"}</p>
    `
    // show the modal
    my_modal_1.showModal();
}
const handleSearch = (isShowAll) =>{
    toggleLoadSpinner(true);
    const searchInput = document.getElementById("searchInput");
    const searchText = searchInput.value;
    loadPhone(searchText, isShowAll);
}
const toggleLoadSpinner = (handleSearchClick) =>{
    const loadingSpinner = document.getElementById("loading-spinner");
    if(handleSearchClick){
        loadingSpinner.classList.remove("hidden");
    }
    else{
        loadingSpinner.classList.add("hidden");
    }
}
const handleShowAll = () =>{
    handleSearch(true);
}
loadPhone();