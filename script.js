// Sample drug data
let drugData = [
    { name: "Paracetamol", price: 500, category: "Analgesic", stock: 50 },
    { name: "Amoxicillin", price: 1200, category: "Antibiotic", stock: 30 },
    { name: "Ibuprofen", price: 600, category: "Analgesic", stock: 45 },
    { name: "Cetirizine", price: 400, category: "Antihistamine", stock: 25 },
    { name: "Metronidazole", price: 900, category: "Antibiotic", stock: 35 },
    { name: "Diclofenac", price: 550, category: "Analgesic", stock: 60 },
    { name: "Co-trimoxazole", price: 700, category: "Antibiotic", stock: 40 },
    { name: "Artemether/Lumefantrine", price: 1500, category: "Antimalarial", stock: 25 },
    { name: "ORS Sachets", price: 150, category: "Electrolyte", stock: 100 },
    { name: "Zinc Sulfate Tablets", price: 300, category: "Supplement", stock: 50 },
    { name: "Ferrous Sulfate", price: 500, category: "Supplement", stock: 55 },
    { name: "Nifedipine", price: 1100, category: "Antihypertensive", stock: 30 },
    { name: "Losartan", price: 1400, category: "Antihypertensive", stock: 20 },
    { name: "Salbutamol Inhaler", price: 2500, category: "Bronchodilator", stock: 15 },
    { name: "Insulin (NPH)", price: 3000, category: "Antidiabetic", stock: 10 },
    { name: "Glibenclamide", price: 700, category: "Antidiabetic", stock: 20 },
    { name: "Omeprazole", price: 900, category: "Antacid", stock: 30 },
    { name: "Magnesium Trisilicate", price: 350, category: "Antacid", stock: 40 },
    { name: "Surgical Gloves", price: 150, category: "Consumable", stock: 100 },
    { name: "Examination Gloves", price: 1000, category: "Consumable", stock: 80 },
    { name: "Syringes 5ml", price: 80, category: "Consumable", stock: 200 },
    { name: "Syringes 10ml", price: 100, category: "Consumable", stock: 180 },
    { name: "Normal Saline 500ml", price: 700, category: "IV Fluid", stock: 40 },
    { name: "Ringer's Lactate 500ml", price: 750, category: "IV Fluid", stock: 30 },
    { name: "Gauze Rolls", price: 250, category: "Consumable", stock: 75 },
    { name: "Cotton Wool 500g", price: 300, category: "Consumable", stock: 60 },
    { name: "Face Masks (Box)", price: 50, category: "Consumable", stock: 300 },
    { name: "IV Cannula", price: 200, category: "Consumable", stock: 100 },
    { name: "Alcohol Swabs", price: 150, category: "Consumable", stock: 120 }
];

// Dispensing system variables
let dispensingCart = [];
let currentSearchResults = [];

// Initialize the app
window.onload = function() {
    loadDrugData();
    setupEventListeners();
};

function loadDrugData() {
    displayDrugs(drugData);
    setupAutocomplete();
    currentSearchResults = drugData;
}

// Enhanced display function with cart system
function displayDrugs(drugs) {
    const tableBody = document.getElementById('resultsBody');
    tableBody.innerHTML = '';
    currentSearchResults = drugs;

    if (drugs.length === 0) {
        document.getElementById('status').textContent = "No drugs found";
        return;
    }

    drugs.forEach(drug => {
        const row = document.createElement('tr');
        
        const qtyInput = document.createElement('input');
        qtyInput.type = 'number';
        qtyInput.className = 'dispense-qty';
        qtyInput.min = '1';
        qtyInput.max = drug.stock;
        qtyInput.value = '1';
        
        const addBtn = document.createElement('button');
        addBtn.textContent = 'Add to Cart';
        addBtn.className = 'dispense-btn';
        addBtn.addEventListener('click', () => addToDispensingCart(drug, qtyInput));
        
        row.innerHTML = `
            <td>${drug.name}</td>
            <td>ZMW ${drug.price.toLocaleString()}</td>
            <td>${drug.category}</td>
            <td>${drug.stock}</td>
            <td></td>
            <td></td>
        `;
        
        row.cells[4].appendChild(qtyInput);
        row.cells[5].appendChild(addBtn);
        
        tableBody.appendChild(row);
    });

    document.getElementById('status').textContent = `Showing ${drugs.length} drugs`;
}

// Cart management functions
function addToDispensingCart(drug, qtyInput) {
    const qty = parseInt(qtyInput.value);
    
    if (isNaN(qty) || qty <= 0) {
        alert('Please enter a valid quantity');
        return;
    }
    
    if (qty > drug.stock) {
        alert(`Cannot dispense more than available stock (${drug.stock})`);
        return;
    }
    
    // Check if already in cart
    const existingItem = dispensingCart.find(item => item.name === drug.name);
    if (existingItem) {
        existingItem.qty += qty;
    } else {
        dispensingCart.push({
            ...drug,
            qty: qty
        });
    }
    
    updateCartSummary();
    showModal();
    qtyInput.value = '1'; // Reset quantity input
}

function updateCartSummary() {
    const summaryContent = document.getElementById('summaryContent');
    let html = '<table class="cart-table">';
    html += `
        <tr>
            <th>Drug</th>
            <th>Unit Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Action</th>
        </tr>
    `;
    
    let grandTotal = 0;
    
    dispensingCart.forEach((item, index) => {
        const total = item.price * item.qty;
        grandTotal += total;
        
        html += `
            <tr>
                <td>${item.name}</td>
                <td>ZMW ${item.price.toLocaleString()}</td>
                <td>${item.qty}</td>
                <td>ZMW ${total.toLocaleString()}</td>
                <td>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </td>
            </tr>
        `;
    });
    
    html += `</table>`;
    html += `<div class="cart-total"><strong>Grand Total: ZMW ${grandTotal.toLocaleString()}</strong></div>`;
    
    summaryContent.innerHTML = html;
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            dispensingCart.splice(index, 1);
            updateCartSummary();
        });
    });
}

// Modal control functions
function showModal() {
    document.getElementById('dispenseSummary').style.display = 'block';
    document.getElementById('modalOverlay').style.display = 'block';
}

function hideModal() {
    document.getElementById('dispenseSummary').style.display = 'none';
    document.getElementById('modalOverlay').style.display = 'none';
}

function confirmDispense() {
    // Update stock levels
    dispensingCart.forEach(item => {
        const drug = drugData.find(d => d.name === item.name);
        if (drug) {
            drug.stock -= item.qty;
        }
    });
    
    // Refresh display
    if (document.getElementById('searchInput').value) {
        searchDrugs(); // Refresh search results if active
    } else {
        displayDrugs(drugData);
    }
    
    // Clear cart and hide modal
    dispensingCart = [];
    hideModal();
    
    document.getElementById('status').textContent = 'Dispensing completed successfully';
}

// Search and autocomplete functions
function searchDrugs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchTerm) {
        displayDrugs(drugData);
        return;
    }

    const filteredDrugs = drugData.filter(drug => 
        drug.name.toLowerCase().includes(searchTerm) || 
        drug.category.toLowerCase().includes(searchTerm)
    );

    displayDrugs(filteredDrugs);
}

function setupAutocomplete() {
    const searchInput = document.getElementById('searchInput');
    const drugNames = drugData.map(drug => drug.name);
    const drugCategories = [...new Set(drugData.map(drug => drug.category))];
    const allSuggestions = [...drugNames, ...drugCategories];
    
    searchInput.addEventListener('input', function() {
        const input = this.value.toLowerCase();
        const suggestions = allSuggestions.filter(item => 
            item.toLowerCase().includes(input)
        );
        
        showAutocomplete(suggestions);
    });
    
    document.addEventListener('click', function(e) {
        if (e.target !== searchInput) {
            removeAutocomplete();
        }
    });
}

function showAutocomplete(items) {
    removeAutocomplete();
    
    if (items.length === 0) return;
    
    const searchInput = document.getElementById('searchInput');
    const list = document.createElement('ul');
    list.id = 'autocomplete-list';
    list.style.position = 'absolute';
    list.style.zIndex = '1000';
    list.style.backgroundColor = '#fff';
    list.style.border = '1px solid #ddd';
    list.style.width = searchInput.offsetWidth + 'px';
    list.style.maxHeight = '200px';
    list.style.overflowY = 'auto';
    
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listItem.style.padding = '8px 12px';
        listItem.style.cursor = 'pointer';
        
        listItem.addEventListener('click', function() {
            searchInput.value = item;
            searchDrugs();
            removeAutocomplete();
        });
        
        listItem.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#f0f0f0';
        });
        
        listItem.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#fff';
        });
        
        list.appendChild(listItem);
    });
    
    searchInput.parentNode.appendChild(list);
}

function removeAutocomplete() {
    const existingList = document.getElementById('autocomplete-list');
    if (existingList) existingList.remove();
}

// Event listeners setup
function setupEventListeners() {
    document.getElementById('searchBtn').addEventListener('click', searchDrugs);
    document.getElementById('searchInput').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') searchDrugs();
    });
    
    document.getElementById('confirmDispense').addEventListener('click', confirmDispense);
    document.getElementById('cancelDispense').addEventListener('click', hideModal);
    document.getElementById('modalOverlay').addEventListener('click', hideModal);
}