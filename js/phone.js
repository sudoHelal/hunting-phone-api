const loadPhone = async (searchText) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  const phone = data.data;
  displayPhone(phone);
};
const displayPhone = (phone) => {
  console.log(phone);
  const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerText = '';
  phone.forEach((phone) => {
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
                      <div class="card-actions justify-end">
                        <button class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
                    
                    `;
                    phoneContainer.appendChild(phoneCard);
  });
};
const handleSearch = () =>{
    const searchInput = document.getElementById("searchInput");
    const searchText = searchInput.value;
    loadPhone(searchText);
}
