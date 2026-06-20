// Admin Password (Simple JS validation as requested - "not more complicated")
const ADMIN_PASSWORD = "admin123";

document.addEventListener('DOMContentLoaded', () => {
  const loginSection = document.getElementById('login-section');
  const dashboard = document.getElementById('admin-dashboard');
  const btnLogin = document.getElementById('btn-login');
  const passInput = document.getElementById('admin-password');
  const errorMsg = document.getElementById('login-error');

  // Check if already logged in this session
  if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    showDashboard();
  }

  btnLogin.addEventListener('click', () => {
    if (passInput.value === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminLoggedIn', 'true');
      showDashboard();
    } else {
      errorMsg.style.display = 'block';
    }
  });

  passInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btnLogin.click();
  });

  function showDashboard() {
    loginSection.style.display = 'none';
    dashboard.style.display = 'block';
    renderAdminMenu();
  }

  // Tabs logic
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(btn.dataset.target).classList.add('active');
    });
  });

  // Add Item Logic
  const addForm = document.getElementById('add-item-form');
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newDish = {
      id: 'item-' + Date.now(),
      category: document.getElementById('item-category').value,
      name: document.getElementById('item-name').value,
      price: document.getElementById('item-price').value,
      description: document.getElementById('item-desc').value,
      image: document.getElementById('item-image').value,
      badge: document.getElementById('item-badge').value
    };

    const currentMenu = getMenuData();
    currentMenu.push(newDish);
    localStorage.setItem('restaurantMenuData', JSON.stringify(currentMenu));
    
    alert('Dish added successfully!');
    addForm.reset();
    renderAdminMenu();
    document.querySelector('.tab-btn[data-target="manage-items-tab"]').click();
  });
});

// Render the list of items to delete
function renderAdminMenu() {
  const adminList = document.getElementById('admin-menu-list');
  const menuData = getMenuData();
  
  if (menuData.length === 0) {
    adminList.innerHTML = '<p>No dishes found.</p>';
    return;
  }

  adminList.innerHTML = '';
  menuData.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'menu-item-row';
    row.innerHTML = `
      <div class="menu-item-info">
        <strong>${item.name}</strong>
        <span>Category: ${item.category} | ${item.price}</span>
      </div>
      <button class="btn-delete" onclick="deleteItem(${index})"><i class="fas fa-trash"></i> Delete</button>
    `;
    adminList.appendChild(row);
  });
}

function deleteItem(index) {
  if (confirm('Are you sure you want to delete this dish?')) {
    const menuData = getMenuData();
    menuData.splice(index, 1);
    localStorage.setItem('restaurantMenuData', JSON.stringify(menuData));
    renderAdminMenu();
  }
}
