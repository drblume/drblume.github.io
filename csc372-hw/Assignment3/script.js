document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".dishes img");
    const descriptions = {
        'Burger': 'A delicious BBQ burger with a whole onion ring on it. $12.99',
        'Wings': 'Garlic Parmesan wings with a crispy finish. I usually prefer boneless. $10.99',
        'Wedges': 'Golden crispy potato wedges. $2.99',
        'Supremes': 'Bojangles crispy chicken supremes. $7.99',
        'Biscuit': 'A classic southern-style chicken and pimento cheese biscuit. $5.99',
        'Rice': 'Bojangles flavorful dirty rice. $3.99',
        'Sandwich': 'Chick-fil-a famous chicken sandwich. $6.99',
        'Fry': 'Crispy and classic waffle fries. $3.99',
        'Milkshake': 'A creamy and delicious strawberry milkshake. $4.99'
    };
    
    images.forEach(img => {
        img.addEventListener("click", function() {
            const dishContainer = this.closest(".dishes");
            const description = dishContainer.nextElementSibling;
            
            dishContainer.querySelectorAll("img").forEach(img => {
                img.classList.remove("selected");
                img.style.flex = "1";
            });
            
            this.classList.add("selected");
            this.style.flex = "2";
            description.innerHTML = descriptions[this.alt] || "Description not available.";
            
            dishContainer.style.display = "flex";
            dishContainer.style.justifyContent = "space-around";
            dishContainer.style.alignItems = "center";
        });
    });
    
    // Meal Plan Functionality
    const mealPlanList = document.getElementById("selected-meals");
    const totalPriceElement = document.getElementById("total-price");
    const dishItems = document.querySelectorAll("#dish-list li");
    let totalPrice = 0;
    
    function updateTotalPrice(amount) {
        totalPrice += amount;
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }
    
    function addToMealPlan(dish, price) {
        let existingItem = document.querySelector(`li[data-dish='${dish}']`);
        
        if (existingItem) {
            let quantityElement = existingItem.querySelector(".quantity");
            let quantity = parseInt(quantityElement.textContent) + 1;
            quantityElement.textContent = quantity;
        } else {
            let listItem = document.createElement("li");
            listItem.setAttribute("data-dish", dish);
            listItem.innerHTML = `${dish} - $${price.toFixed(2)} x <span class='quantity'>1</span> 
                <button class="remove-btn">Remove</button>`;
            mealPlanList.appendChild(listItem);
            
            listItem.querySelector(".remove-btn").addEventListener("click", function() {
                removeFromMealPlan(dish, price);
            });
        }
        updateTotalPrice(price);
    }
    
    function removeFromMealPlan(dish, price) {
        let existingItem = document.querySelector(`li[data-dish='${dish}']`);
        if (existingItem) {
            let quantityElement = existingItem.querySelector(".quantity");
            let quantity = parseInt(quantityElement.textContent);
            
            if (quantity > 1) {
                quantityElement.textContent = quantity - 1;
            } else {
                existingItem.remove();
            }
            updateTotalPrice(-price);
        }
    }
    
    dishItems.forEach(item => {
        item.addEventListener("click", function() {
            const dishName = this.textContent.split(" - $")[0];
            const price = parseFloat(this.textContent.split(" - $")[1]);
            addToMealPlan(dishName, price);
        });
    });
});
