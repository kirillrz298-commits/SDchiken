// Image mapping fallback for backward compatibility
const menuImageMap = {
  'SD Бургер': 'menu1/sd-burger.png',
  'Классический бургер': 'menu1/classic-burger.png',
  'Острый бургер': 'menu1/spicy-burger.png',
  'SD Бургер Комбо': 'menu1/sd-burger-combo.png',
  'Классический бургер Комбо': 'menu1/classic-burger-combo.png',
  'Острый бургер Комбо': 'menu1/spicy-burger-combo.png',
  'Донер': 'menu1/doner.png',
  'Донер в багете': 'menu1/doner-baguette.png',
  'Донер Комбо': 'menu1/doner-combo.png',
  'Донер в багете Комбо': 'menu1/doner-baguette-combo.png',
  'Happy Hour': 'menu1/Happy Hour.jpg',
  'FAMILY BOX': 'menu1/Family Box.jpg',
  'Сет Friends': 'menu1/set-friends.png',
  'Сет Chicken Mafia': 'menu1/set-chicken-mafia.png',
  'Крылышки острые — 6 шт': 'menu1/wings.png',
  'Крылышки острые — 12 шт': 'menu1/wings.png',
  'Крылышки острые — 20 шт': 'menu1/wings.png',
  'Крылышки острые — 30 шт': 'menu1/wings.png',
  'Крылышки острые — 40 шт': 'menu1/wings.png',
  'Куриные ножки острые — 3 шт': 'menu1/chicken-legs.png',
  'Куриные ножки острые — 6 шт': 'menu1/chicken-legs.png',
  'Куриные ножки острые — 9 шт': 'menu1/chicken-legs.png',
  'Наггетсы классические — 9 шт': 'menu1/nuggets.png',
  'Фри': 'menu1/french-fries.png',
  'Стрипсы острые — 9 шт': 'menu1/strips.png'
};

let menuSections = [];
let cart = [];
let activeVariants = {};
let currentUser = null;
let isHistoryOpen = false;

async function fetchProductsFromDB() {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    const products = await res.json();
    
    // Group products by category
    const categoriesMap = {};
    products.forEach(p => {
      if (p.title === 'Happy Hour') return;
      if (!categoriesMap[p.category]) {
        categoriesMap[p.category] = [];
      }
      categoriesMap[p.category].push({
        title: p.title,
        price: p.price,
        desc: p.description,
        image: p.image_path
      });
    });
    
    menuSections = Object.keys(categoriesMap).map(categoryName => ({
      category: categoryName,
      items: categoriesMap[categoryName]
    }));
  } catch (err) {
    console.error('Error loading products from SQLite:', err);
  }
}

function loadUserSession() {
  try {
    const raw = localStorage.getItem('sd_active_user');
    currentUser = raw ? JSON.parse(raw) : null;
  } catch {
    currentUser = null;
  }
}

function updateProfileHeaderBtn() {
  const btn = document.getElementById('profileBtn');
  if (!btn) return;
  btn.innerHTML = '';
  if (currentUser) {
    const initial = currentUser.name ? currentUser.name.trim().charAt(0) : 'U';
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'profile-avatar-initial';
    avatarDiv.style.width = '100%';
    avatarDiv.style.height = '100%';
    avatarDiv.style.borderRadius = '50%';
    avatarDiv.style.background = 'var(--primary-red)';
    avatarDiv.style.color = '#fff';
    avatarDiv.style.display = 'flex';
    avatarDiv.style.alignItems = 'center';
    avatarDiv.style.justifyContent = 'center';
    avatarDiv.style.fontWeight = '800';
    avatarDiv.style.fontSize = '16px';
    avatarDiv.textContent = initial.toUpperCase();
    btn.appendChild(avatarDiv);
  } else {
    const span = document.createElement('span');
    span.textContent = 'Рег';
    btn.appendChild(span);
  }
}

function openProfileModal() {
  const modal = document.getElementById('profileModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.classList.add('no-scroll');
  renderProfileView();
}

function closeProfileModal() {
  const modal = document.getElementById('profileModal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.classList.remove('no-scroll');
}

async function loadUserOrders() {
  if (!currentUser) return [];
  try {
    const res = await fetch(`/api/user/orders?userId=${currentUser.id}`);
    if (!res.ok) throw new Error('Failed to load orders');
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch orders:', err);
    return currentUser.orders || [];
  }
}

async function renderProfileView(viewState = 'login') {
  const body = document.getElementById('profileModalBody');
  if (!body) return;
  body.innerHTML = '';

  if (currentUser) {
    // Render profile details and history
    const container = document.createElement('div');
    container.className = 'auth-container';

    const infoCard = document.createElement('div');
    infoCard.className = 'profile-info-card';

    const avatarLarge = document.createElement('div');
    avatarLarge.className = 'profile-avatar-large';
    avatarLarge.textContent = (currentUser.name ? currentUser.name.trim().charAt(0) : 'U').toUpperCase();
    infoCard.appendChild(avatarLarge);

    const addRow = (label, val) => {
      const row = document.createElement('div');
      row.className = 'profile-detail-row';
      const lbl = document.createElement('span');
      lbl.className = 'profile-detail-label';
      lbl.textContent = label;
      const v = document.createElement('span');
      v.className = 'profile-detail-value';
      v.textContent = val;
      row.appendChild(lbl);
      row.appendChild(v);
      infoCard.appendChild(row);
    };

    addRow('Имя', currentUser.name);
    addRow('Телефон', currentUser.phone);
    addRow('Почта', currentUser.email);

    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'btn-logout';
    logoutBtn.textContent = 'Выйти из аккаунта';
    logoutBtn.addEventListener('click', () => {
      currentUser = null;
      localStorage.removeItem('sd_active_user');
      updateProfileHeaderBtn();
      isHistoryOpen = false;
      renderProfileView('login');
      renderCart();
    });
    infoCard.appendChild(logoutBtn);

    if (currentUser.role === 'admin') {
      const adminBtn = document.createElement('button');
      adminBtn.className = 'btn-history-toggle';
      adminBtn.style.marginTop = '10px';
      adminBtn.style.background = 'linear-gradient(135deg, var(--primary-red) 0%, var(--primary-red-dark) 100%)';
      adminBtn.style.color = '#fff';
      adminBtn.textContent = 'Панель администратора';
      adminBtn.addEventListener('click', () => {
        renderAdminView();
      });
      infoCard.appendChild(adminBtn);
    }

    container.appendChild(infoCard);

    // Order History Toggle Button
    const historyToggleBtn = document.createElement('button');
    historyToggleBtn.className = 'btn-history-toggle';
    historyToggleBtn.textContent = isHistoryOpen ? 'Скрыть историю заказов' : 'История заказов';
    container.appendChild(historyToggleBtn);

    const historySection = document.createElement('div');
    historySection.className = 'order-history-section' + (isHistoryOpen ? '' : ' hidden');
    
    const historyList = document.createElement('div');
    historyList.className = 'order-history-list';
    historySection.appendChild(historyList);
    container.appendChild(historySection);

    // Handler for toggle button
    historyToggleBtn.addEventListener('click', async () => {
      isHistoryOpen = !isHistoryOpen;
      historyToggleBtn.textContent = isHistoryOpen ? 'Скрыть историю заказов' : 'История заказов';
      if (isHistoryOpen) {
        historySection.classList.remove('hidden');
        historyList.innerHTML = '<div class="order-history-empty">Загрузка заказов...</div>';
        
        const orders = await loadUserOrders();
        historyList.innerHTML = '';
        if (orders.length === 0) {
          const empty = document.createElement('div');
          empty.className = 'order-history-empty';
          empty.textContent = 'У вас пока нет заказов.';
          historyList.appendChild(empty);
        } else {
          [...orders].reverse().forEach(order => {
            const card = document.createElement('div');
            card.className = 'order-history-card';

            const header = document.createElement('div');
            header.className = 'order-history-card-header';
            const dateSpan = document.createElement('span');
            dateSpan.textContent = order.date;
            header.appendChild(dateSpan);
            card.appendChild(header);

            const itemsDiv = document.createElement('div');
            itemsDiv.className = 'order-history-card-items';
            order.items.forEach(item => {
              const itemRow = document.createElement('div');
              itemRow.className = 'order-history-card-item';
              const titleSpan = document.createElement('span');
              titleSpan.textContent = `${item.title} x${item.qty}`;
              const priceSpan = document.createElement('span');
              priceSpan.textContent = item.price;
              itemRow.appendChild(titleSpan);
              itemRow.appendChild(priceSpan);
              itemsDiv.appendChild(itemRow);
            });
            card.appendChild(itemsDiv);

            const totalDiv = document.createElement('div');
            totalDiv.className = 'order-history-card-total';
            const totLabel = document.createElement('span');
            totLabel.textContent = 'Итого:';
            const totVal = document.createElement('span');
            totVal.textContent = `${order.total.toLocaleString('ru-RU')} ₸`;
            totalDiv.appendChild(totLabel);
            totalDiv.appendChild(totVal);
            card.appendChild(totalDiv);

            historyList.appendChild(card);
          });
        }
      } else {
        historySection.classList.add('hidden');
      }
    });

    body.appendChild(container);
  } else {
    // Not logged in -> Show Tabs
    const container = document.createElement('div');
    container.className = 'auth-container';

    // Tabs container
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'auth-tabs';

    const loginTabBtn = document.createElement('button');
    loginTabBtn.className = 'auth-tab-btn' + (viewState === 'login' ? ' active' : '');
    loginTabBtn.textContent = 'Авторизация';

    const registerTabBtn = document.createElement('button');
    registerTabBtn.className = 'auth-tab-btn' + (viewState === 'register' ? ' active' : '');
    registerTabBtn.textContent = 'Регистрация';

    tabsContainer.appendChild(loginTabBtn);
    tabsContainer.appendChild(registerTabBtn);
    container.appendChild(tabsContainer);

    const formContainer = document.createElement('div');
    container.appendChild(formContainer);

    // Switch tabs handler
    loginTabBtn.addEventListener('click', () => {
      renderProfileView('login');
    });
    registerTabBtn.addEventListener('click', () => {
      renderProfileView('register');
    });

    if (viewState === 'login') {
      // Login Form
      const title = document.createElement('h3');
      title.className = 'auth-title';
      title.textContent = 'Вход в аккаунт';
      formContainer.appendChild(title);

      const form = document.createElement('form');
      form.className = 'auth-form';

      const emailField = document.createElement('div');
      emailField.className = 'auth-field';
      const emailLabel = document.createElement('label');
      emailLabel.textContent = 'Почта или Номер телефона';
      const emailInput = document.createElement('input');
      emailInput.type = 'text';
      emailInput.className = 'auth-input';
      emailInput.required = true;
      emailInput.placeholder = 'email@example.com или +7...';
      emailField.appendChild(emailLabel);
      emailField.appendChild(emailInput);
      form.appendChild(emailField);

      const passField = document.createElement('div');
      passField.className = 'auth-field';
      const passLabel = document.createElement('label');
      passLabel.textContent = 'Пароль';
      const passInput = document.createElement('input');
      passInput.type = 'password';
      passInput.className = 'auth-input';
      passInput.required = true;
      passInput.placeholder = 'Введите ваш пароль';
      passField.appendChild(passLabel);
      passField.appendChild(passInput);
      form.appendChild(passField);

      const errorDiv = document.createElement('div');
      errorDiv.className = 'auth-error hidden';
      form.appendChild(errorDiv);

      const submitBtn = document.createElement('button');
      submitBtn.type = 'submit';
      submitBtn.className = 'btn-auth';
      submitBtn.textContent = 'Войти';
      form.appendChild(submitBtn);

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const loginVal = emailInput.value.trim();
        const passwordVal = passInput.value.trim();

        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ loginVal, password: passwordVal })
          });
          const data = await res.json();
          if (res.ok && data.success) {
            currentUser = data.user;
            localStorage.setItem('sd_active_user', JSON.stringify(currentUser));
            updateProfileHeaderBtn();
            renderProfileView();
            renderCart();
          } else {
            errorDiv.textContent = data.error || 'Неверная почта/телефон или пароль.';
            errorDiv.classList.remove('hidden');
          }
        } catch (err) {
          errorDiv.textContent = 'Ошибка при входе в систему.';
          errorDiv.classList.remove('hidden');
        }
      });

      formContainer.appendChild(form);
    } else {
      // Register Form
      const title = document.createElement('h3');
      title.className = 'auth-title';
      title.textContent = 'Создать аккаунт';
      formContainer.appendChild(title);

      const form = document.createElement('form');
      form.className = 'auth-form';

      const nameField = document.createElement('div');
      nameField.className = 'auth-field';
      const nameLabel = document.createElement('label');
      nameLabel.textContent = 'Имя';
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.className = 'auth-input';
      nameInput.required = true;
      nameInput.placeholder = 'Кирилл';
      nameField.appendChild(nameLabel);
      nameField.appendChild(nameInput);
      form.appendChild(nameField);

      const phoneField = document.createElement('div');
      phoneField.className = 'auth-field';
      const phoneLabel = document.createElement('label');
      phoneLabel.textContent = 'Номер телефона';
      const phoneInput = document.createElement('input');
      phoneInput.type = 'tel';
      phoneInput.className = 'auth-input';
      phoneInput.required = true;
      phoneInput.placeholder = '+7 708 378 2484';
      phoneField.appendChild(phoneLabel);
      phoneField.appendChild(phoneInput);
      form.appendChild(phoneField);

      const emailField = document.createElement('div');
      emailField.className = 'auth-field';
      const emailLabel = document.createElement('label');
      emailLabel.textContent = 'Почта (Email)';
      const emailInput = document.createElement('input');
      emailInput.type = 'email';
      emailInput.className = 'auth-input';
      emailInput.required = true;
      emailInput.placeholder = 'email@example.com';
      emailField.appendChild(emailLabel);
      emailField.appendChild(emailInput);
      form.appendChild(emailField);

      const passField = document.createElement('div');
      passField.className = 'auth-field';
      const passLabel = document.createElement('label');
      passLabel.textContent = 'Пароль';
      const passInput = document.createElement('input');
      passInput.type = 'password';
      passInput.className = 'auth-input';
      passInput.required = true;
      passInput.placeholder = 'Создайте пароль';
      passField.appendChild(passLabel);
      passField.appendChild(passInput);
      form.appendChild(passField);

      const errorDiv = document.createElement('div');
      errorDiv.className = 'auth-error hidden';
      form.appendChild(errorDiv);

      const submitBtn = document.createElement('button');
      submitBtn.type = 'submit';
      submitBtn.className = 'btn-auth';
      submitBtn.textContent = 'Зарегистрироваться';
      form.appendChild(submitBtn);

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nameVal = nameInput.value.trim();
        const phoneVal = phoneInput.value.trim();
        const emailVal = emailInput.value.trim();
        const passwordVal = passInput.value.trim();

        try {
          const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nameVal, phone: phoneVal, email: emailVal, password: passwordVal })
          });
          const data = await res.json();
          if (res.ok && data.success) {
            currentUser = data.user;
            localStorage.setItem('sd_active_user', JSON.stringify(currentUser));
            updateProfileHeaderBtn();
            renderProfileView();
            renderCart();
          } else {
            errorDiv.textContent = data.error || 'Ошибка при регистрации.';
            errorDiv.classList.remove('hidden');
          }
        } catch (err) {
          errorDiv.textContent = 'Ошибка сети при регистрации.';
          errorDiv.classList.remove('hidden');
        }
      });

      formContainer.appendChild(form);
    }

    body.appendChild(container);
  }
}

function getCartStorageKey(){
  return 'sd_cart_v1';
}

function loadCart(){
  try {
    const raw = localStorage.getItem(getCartStorageKey());
    cart = raw ? JSON.parse(raw) : [];
  } catch {
    cart = [];
  }
}

function saveCart(){
  localStorage.setItem(getCartStorageKey(), JSON.stringify(cart));
}

let checkout = {
  payment: 'cash'
};

function updateCartCount(){
  const badge = document.getElementById('cartCount');
  const btn = document.getElementById('cartIconBtn');
  if (!badge || !btn) return;
  if (cart.length > 0){
    badge.textContent = String(cart.length);
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function openCartModal(){
  setCartOpen(true);
}

function closeCartModal(){
  setCartOpen(false);
}

function setCartOpen(isOpen){
  const modal = document.getElementById('cartModal');
  if (!modal) return;
  if (isOpen){
    modal.classList.remove('hidden');
    document.body.classList.add('no-scroll');
  } else {
    modal.classList.add('hidden');
    document.body.classList.remove('no-scroll');
  }
}



function createCheckoutInput({labelText, id, placeholder, type = 'text'}){
  const field = document.createElement('div');
  field.className = 'checkout-field';
  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.textContent = labelText;
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.name = id;
  input.placeholder = placeholder;
  input.className = 'checkout-input';
  field.appendChild(label);
  field.appendChild(input);
  return field;
}

function renderCheckout(total){
  const checkoutEl = document.getElementById('cartCheckout');
  if (!checkoutEl) return;
  checkoutEl.innerHTML = '';
  if (!cart.length){
    checkoutEl.classList.add('hidden');
    return;
  }
  checkoutEl.classList.remove('hidden');

  const title = document.createElement('h3');
  title.className = 'checkout-title';
  title.textContent = 'Оформление заказа';
  checkoutEl.appendChild(title);

  const contactGroup = document.createElement('div');
  contactGroup.className = 'checkout-group';

  // Prefill name & phone if logged in
  const nameField = createCheckoutInput({labelText: 'Ваше имя', id: 'checkoutName', placeholder: 'Иван Петров'});
  const nameInput = nameField.querySelector('input');
  if (nameInput && currentUser) nameInput.value = currentUser.name;

  const phoneField = createCheckoutInput({labelText: 'Номер телефона', id: 'checkoutPhone', placeholder: '+7 708 378 2484', type: 'tel'});
  const phoneInput = phoneField.querySelector('input');
  if (phoneInput && currentUser) phoneInput.value = currentUser.phone;

  contactGroup.appendChild(nameField);
  contactGroup.appendChild(phoneField);
  checkoutEl.appendChild(contactGroup);

  const addressGroup = document.createElement('div');
  addressGroup.className = 'checkout-group';
  addressGroup.appendChild(createCheckoutInput({labelText: 'Адрес — улица', id: 'checkoutStreet', placeholder: 'ул. Ленина'}));
  addressGroup.appendChild(createCheckoutInput({labelText: 'Дом', id: 'checkoutHouse', placeholder: '12'}));
  addressGroup.appendChild(createCheckoutInput({labelText: 'Этаж', id: 'checkoutFloor', placeholder: '3'}));
  addressGroup.appendChild(createCheckoutInput({labelText: 'Квартира', id: 'checkoutApartment', placeholder: '45'}));
  checkoutEl.appendChild(addressGroup);

  const infoBox = document.createElement('div');
  infoBox.className = 'checkout-info-box';
  infoBox.textContent = 'При нажатии оформления вы перейдете в ват сап и вы должны отправить сообщения асистенту.';
  checkoutEl.appendChild(infoBox);

  const commentField = document.createElement('div');
  commentField.className = 'checkout-field';
  const commentLabel = document.createElement('label');
  commentLabel.setAttribute('for', 'checkoutComment');
  commentLabel.textContent = 'Комментарий к заказу (опционально)';

  const commentTextarea = document.createElement('textarea');
  commentTextarea.id = 'checkoutComment';
  commentTextarea.placeholder = 'Например: без майонеза, острое побольше...';
  commentTextarea.className = 'checkout-textarea';
  commentField.appendChild(commentLabel);
  commentField.appendChild(commentTextarea);
  checkoutEl.appendChild(commentField);



  const orderButton = document.createElement('button');
  orderButton.type = 'button';
  orderButton.className = 'btn btn-order';
  orderButton.textContent = 'Оформить заказ';
  orderButton.addEventListener('click', () => {
    const notice = document.getElementById('checkoutNotice');
    if (!notice) return;
    const nameInput = document.getElementById('checkoutName');
    const phoneInput = document.getElementById('checkoutPhone');
    const streetInput = document.getElementById('checkoutStreet');
    const houseInput = document.getElementById('checkoutHouse');
    const floorInput = document.getElementById('checkoutFloor');
    const apartmentInput = document.getElementById('checkoutApartment');
    const commentInput = document.getElementById('checkoutComment');

    const name = (nameInput instanceof HTMLInputElement) ? nameInput.value.trim() : '';
    const phone = (phoneInput instanceof HTMLInputElement) ? phoneInput.value.trim() : '';
    const street = (streetInput instanceof HTMLInputElement) ? streetInput.value.trim() : '';
    const house = (houseInput instanceof HTMLInputElement) ? houseInput.value.trim() : '';
    const floor = (floorInput instanceof HTMLInputElement) ? floorInput.value.trim() : '';
    const apartment = (apartmentInput instanceof HTMLInputElement) ? apartmentInput.value.trim() : '';
    const comment = (commentInput instanceof HTMLTextAreaElement || commentInput instanceof HTMLInputElement) ? commentInput.value.trim() : '';

    if (!name || !phone) {
      notice.style.color = '#ff3300';
      notice.textContent = 'Пожалуйста, заполните имя и номер телефона для оформления заказа.';
      return;
    }

    // Format the items details for the message
    let itemsText = '';
    let totalQty = 0;
    const itemsData = cart.map(item => {
      const hasSpicy = /крылышки|ножки|стрипсы/i.test(item.title);
      let itemTitle = item.title;
      let variantLabel = '';
      if (hasSpicy && item.variant && item.variant !== 'default') {
        itemTitle = item.title.replace(/острые?\s*/i, '').trim();
        variantLabel = ` (${item.variant === 'spicy' ? 'Острые' : 'Обычные'})`;
      } else if (item.variant && item.variant !== 'default') {
        variantLabel = ` (${item.variant === 'spicy' ? 'Острые' : 'Обычные'})`;
      }
      return {
        title: itemTitle + variantLabel,
        qty: item.qty,
        price: item.price,
        variant: item.variant || 'default'
      };
    });

    itemsData.forEach((item, index) => {
      itemsText += `${index + 1}. ${item.title} x${item.qty} = ${item.price}\n`;
      totalQty += item.qty;
    });

    const now = new Date();
    const dateTimeStr = now.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const orderMsg = `🍗 *Новый заказ в SD Chicken* 🍗\n\n` +
      `1️⃣ *Дата и время:* ${dateTimeStr}\n` +
      `2️⃣ *Номер телефона:* ${phone}\n` +
      `👤 *Имя:* ${name}\n` +
      `3️⃣ *Адрес:* ул. ${street}, д. ${house}${floor ? ', эт. ' + floor : ''}${apartment ? ', кв. ' + apartment : ''}\n\n` +
      `4️⃣ *Что именно заказали:* \n${itemsText}\n` +
      `🔢 *Количество блюд:* ${totalQty} шт.\n` +
      `💰 *Сумма заказа:* ${total.toLocaleString('ru-RU')} ₸\n` +
      (comment ? `💬 *Комментарий:* ${comment}` : '');

    // 1. Redirection to WhatsApp for sending the order
    const targetPhone = '77776984098';
    const waUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(orderMsg)}`;
    window.open(waUrl, '_blank');

    // 2. Save order to history if user is logged in & silent POST request to the local server
    const addressString = `ул. ${street}, д. ${house}${floor ? ', эт. ' + floor : ''}${apartment ? ', кв. ' + apartment : ''}`;
    const orderPayload = {
      name,
      phone,
      address: addressString,
      items: itemsData,
      total,
      comment,
      userId: currentUser ? currentUser.id : null
    };

    fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderPayload)
    })
    .then(async res => {
      const result = await res.json();
      if (res.ok && currentUser) {
        const updatedOrders = await loadUserOrders();
        currentUser.orders = updatedOrders;
        localStorage.setItem('sd_active_user', JSON.stringify(currentUser));
      }
    })
    .catch(err => console.error('Silent order sync failed:', err));

    notice.style.color = 'var(--yellow)';
    notice.innerHTML = `🎉 <strong>Спасибо, ${escapeHtml(name)}!</strong> Ваш заказ на сумму ${total.toLocaleString('ru-RU')} ₸ успешно оформлен.<br>Вы перенаправлены в WhatsApp для отправки сообщения ассистенту.`;

    setTimeout(() => {
      cart = [];
      saveCart();
      updateCartCount();
      renderCart();
      renderMenuSections();
    }, 4000);
  });
  checkoutEl.appendChild(orderButton);

  const totalRow = document.createElement('div');
  totalRow.className = 'checkout-total-row';
  totalRow.textContent = `Итоговая сумма заказа: ${total.toLocaleString('ru-RU')} ₸`;
  checkoutEl.appendChild(totalRow);

  const notice = document.createElement('div');
  notice.id = 'checkoutNotice';
  notice.className = 'checkout-note';
  checkoutEl.appendChild(notice);
}

function getPriceValue(price){
  const digits = String(price).replace(/[^0-9]/g, '');
  return parseInt(digits || '0', 10);
}

function addToCart(item){
  const variant = item.variant || 'default';
  const exists = cart.find(cartItem => cartItem.title === item.title && (cartItem.variant || 'default') === variant);
  if (exists){
    exists.qty += 1;
  } else {
    cart.push({
      title: item.title,
      desc: item.desc,
      price: item.price,
      image: item.image,
      qty: 1,
      variant
    });
  }
  saveCart();
  updateCartCount();
  renderCart();
  renderMenuSections();
}

function changeCartQty(title, delta, variant = 'default'){
  const item = cart.find(cartItem => cartItem.title === title && (cartItem.variant || 'default') === variant);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0){
    cart = cart.filter(cartItem => !(cartItem.title === title && (cartItem.variant || 'default') === variant));
  }
  saveCart();
  updateCartCount();
  renderCart();
  renderMenuSections();
}

function renderCart(){
  const cartContent = document.getElementById('cartContent');
  if (!cartContent) return;
  if (!cart.length){
    cartContent.innerHTML = '';
    return;
  }
  cartContent.innerHTML = '';
  const list = document.createElement('div');
  list.className = 'cart-list';
  let total = 0;
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    const left = document.createElement('div');
    left.className = 'cart-item-info';
    const title = document.createElement('div');
    title.className = 'cart-item-title';
    const hasSpicyOpt = /крылышки|ножки|стрипсы/i.test(item.title);
    let displayTitle = item.title;
    let variantLabel = '';
    if (hasSpicyOpt && item.variant && item.variant !== 'default') {
      displayTitle = item.title.replace(/острые?\s*/i, '').trim();
      variantLabel = ` (${item.variant === 'spicy' ? 'Острые' : 'Обычные'})`;
    } else if (item.variant && item.variant !== 'default') {
      variantLabel = ` (${item.variant === 'spicy' ? 'Острые' : 'Обычные'})`;
    }
    title.textContent = displayTitle + variantLabel;
    const desc = document.createElement('div');
    desc.className = 'cart-item-desc';
    desc.textContent = item.desc;
    left.appendChild(title);
    left.appendChild(desc);
    const qty = document.createElement('div');
    qty.className = 'cart-item-qty';
    const btnMinus = document.createElement('button');
    btnMinus.className = 'btn btn-qty';
    btnMinus.textContent = '-';
    btnMinus.addEventListener('click', () => changeCartQty(item.title, -1, item.variant || 'default'));
    const count = document.createElement('span');
    count.className = 'cart-item-count';
    count.textContent = item.qty;
    const btnPlus = document.createElement('button');
    btnPlus.className = 'btn btn-qty';
    btnPlus.textContent = '+';
    btnPlus.addEventListener('click', () => changeCartQty(item.title, 1, item.variant || 'default'));
    qty.appendChild(btnMinus);
    qty.appendChild(count);
    qty.appendChild(btnPlus);
    const price = document.createElement('div');
    price.className = 'cart-item-price';
    price.textContent = item.price;
    cartItem.appendChild(left);
    cartItem.appendChild(qty);
    cartItem.appendChild(price);
    list.appendChild(cartItem);
    total += getPriceValue(item.price) * item.qty;
  });
  const footer = document.createElement('div');
  footer.className = 'cart-footer';
  const totalLabel = document.createElement('div');
  totalLabel.textContent = 'Итого:';
  const totalValue = document.createElement('div');
  totalValue.className = 'cart-total';
  totalValue.textContent = `${total.toLocaleString('ru-RU')} ₸`;
  footer.appendChild(totalLabel);
  footer.appendChild(totalValue);
  cartContent.appendChild(list);
  cartContent.appendChild(footer);
  updateCartCount();
  renderCheckout(total);
}

function getSelectedVariant(itemTitle, hasSpicyOption) {
  if (!hasSpicyOption) return 'default';
  if (activeVariants[itemTitle]) return activeVariants[itemTitle];
  
  const hasSpicyInCart = cart.some(c => c.title === itemTitle && c.variant === 'spicy');
  const hasNormalInCart = cart.some(c => c.title === itemTitle && c.variant === 'normal');
  if (hasNormalInCart && !hasSpicyInCart) {
    return 'normal';
  }
  return 'spicy';
}

function createCardDOM(item) {
  const hasSpicyOption = /крылышки|ножки|стрипсы/i.test(item.title);
  const card = document.createElement('div');
  card.className = 'menu-card';
  
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'menu-card-image';
  const img = document.createElement('img');
  const imagePath = item.image || menuImageMap[item.title] || '';
  img.src = encodeURI(imagePath);
  img.alt = item.title;
  
  const badge = document.createElement('div');
  badge.className = 'menu-card-badge';
  badge.textContent = item.price;
  
  imageWrapper.appendChild(img);
  imageWrapper.appendChild(badge);
  
  const content = document.createElement('div');
  content.className = 'menu-card-content';
  
  const title = document.createElement('h3');
  title.className = 'menu-card-title';
  let displayTitle = item.title;
  if (hasSpicyOption) {
    displayTitle = item.title.replace(/острые?\s*/i, '').trim() + ' — Острые/Не острые';
  }
  title.textContent = displayTitle;
  
  const desc = document.createElement('p');
  desc.className = 'menu-card-desc';
  desc.textContent = item.desc;
  
  const price = document.createElement('div');
  price.className = 'menu-card-price';
  price.textContent = item.price;
  
  const actionArea = document.createElement('div');
  actionArea.className = 'menu-card-action';
  
  let selectedVariant = getSelectedVariant(item.title, hasSpicyOption);
  activeVariants[item.title] = selectedVariant;
  
  const variantSelector = document.createElement('div');
  variantSelector.className = 'variant-selector';
  
  function renderVariantButtons() {
    variantSelector.innerHTML = '';
    const spicyBtn = document.createElement('button');
    spicyBtn.className = 'btn-variant';
    spicyBtn.textContent = 'Острые';
    const normalBtn = document.createElement('button');
    normalBtn.className = 'btn-variant';
    normalBtn.textContent = 'Обычные';
    
    function updateActive() {
      spicyBtn.classList.toggle('active', selectedVariant === 'spicy');
      normalBtn.classList.toggle('active', selectedVariant === 'normal');
    }
    
    spicyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectedVariant = 'spicy';
      activeVariants[item.title] = 'spicy';
      updateActive();
      renderActionByVariant();
    });
    
    normalBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectedVariant = 'normal';
      activeVariants[item.title] = 'normal';
      updateActive();
      renderActionByVariant();
    });
    
    variantSelector.appendChild(spicyBtn);
    variantSelector.appendChild(normalBtn);
    updateActive();
  }
  
  function createQtyControls(currentQty) {
    actionArea.innerHTML = '';
    
    const controlsWrapper = document.createElement('div');
    controlsWrapper.className = 'qty-controls-wrapper';
    
    const minus = document.createElement('button');
    minus.className = 'btn btn-qty';
    minus.textContent = '-';
    const count = document.createElement('span');
    count.className = 'menu-card-count';
    count.textContent = currentQty;
    const plus = document.createElement('button');
    plus.className = 'btn btn-qty';
    plus.textContent = '+';
    
    minus.addEventListener('click', (e) => {
      e.stopPropagation();
      changeCartQty(item.title, -1, selectedVariant);
    });
    plus.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart({title: item.title, desc: item.desc, price: item.price, image: imagePath, variant: selectedVariant});
    });
    
    controlsWrapper.appendChild(minus);
    controlsWrapper.appendChild(count);
    controlsWrapper.appendChild(plus);
    
    if (hasSpicyOption) actionArea.appendChild(variantSelector);
    actionArea.appendChild(controlsWrapper);
  }
  
  function createChooseButton() {
    actionArea.innerHTML = '';
    const action = document.createElement('button');
    action.type = 'button';
    action.className = 'btn btn-select';
    action.textContent = 'Выбрать';
    action.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart({title: item.title, desc: item.desc, price: item.price, image: imagePath, variant: selectedVariant});
    });
    if (hasSpicyOption) actionArea.appendChild(variantSelector);
    actionArea.appendChild(action);
  }
  
  function renderActionByVariant() {
    if (!hasSpicyOption) {
      const existing = cart.find(c => c.title === item.title);
      if (existing && existing.qty > 0) createQtyControls(existing.qty);
      else createChooseButton();
      return;
    }
    const existing = cart.find(c => c.title === item.title && (c.variant || 'default') === selectedVariant);
    if (existing && existing.qty > 0) createQtyControls(existing.qty);
    else createChooseButton();
  }
  
  if (hasSpicyOption) renderVariantButtons();
  if (item.title === 'Happy Hour') {
    actionArea.style.display = 'none';
  } else {
    renderActionByVariant();
  }
  
  content.appendChild(title);
  content.appendChild(desc);
  content.appendChild(price);
  content.appendChild(actionArea);
  
  card.appendChild(imageWrapper);
  card.appendChild(content);
  
  return card;
}

function renderPopularDishes() {
  const container = document.getElementById('popularDishesContainer');
  if (!container) return;
  container.innerHTML = '';
  
  const popularTitles = [
    'SD Бургер',
    'Донер',
    'Крылышки острые — 6 шт',
    'Сет Friends'
  ];
  
  const itemsToRender = [];
  popularTitles.forEach(title => {
    let foundItem = null;
    for (const section of menuSections) {
      const match = section.items.find(it => it.title === title);
      if (match) {
        foundItem = match;
        break;
      }
    }
    if (foundItem) {
      itemsToRender.push(foundItem);
    }
  });
  
  itemsToRender.forEach(item => {
    const card = createCardDOM(item);
    container.appendChild(card);
  });
}

function renderMenuSections(){
  renderPopularDishes();

  const container = document.getElementById('menuContainer');
  if (!container || !menuSections) return;
  container.innerHTML = '';
  menuSections.forEach(section => {
    const sectionEl = document.createElement('div');
    sectionEl.className = 'menu-category';
    if (section.category === 'Новинки') sectionEl.classList.add('menu-category--new');
    const heading = document.createElement('h2');
    heading.textContent = section.category;
    sectionEl.appendChild(heading);
    const grid = document.createElement('div');
    grid.className = 'menu-grid';
    section.items.forEach(item => {
      const card = createCardDOM(item);
      grid.appendChild(card);
    });
    sectionEl.appendChild(grid);
    container.appendChild(sectionEl);
  });
}

async function loadReviews() {
  const list = document.getElementById('reviewsList');
  if (!list) return;
  list.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: rgba(255,255,255,0.6)">Загрузка отзывов...</div>';
  try {
    const res = await fetch('/api/reviews');
    if (!res.ok) throw new Error('Reviews fetch failed');
    const reviews = await res.json();
    list.innerHTML = '';
    reviews.forEach(r => {
      const div = document.createElement('div');
      div.className = 'review';
      div.innerHTML = `<strong>${escapeHtml(r.name)}</strong><p>${escapeHtml(r.text)}</p>`;
      list.appendChild(div);
    });
  } catch (err) {
    console.error('Failed to load reviews from DB:', err);
    list.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #ff5533;">Ошибка загрузки отзывов</div>';
  }
}

async function saveReview(review) {
  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    if (res.ok) {
      loadReviews();
    }
  } catch (err) {
    console.error('Failed to save review to DB:', err);
  }
}

function escapeHtml(s){return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]);}

function initFAQ(){
  const faqItems = document.querySelectorAll('.faq-question');
  faqItems.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      item.classList.toggle('open');
      answer.classList.toggle('hidden');
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  document.body.classList.remove('no-scroll');
  
  loadCart();
  loadUserSession();
  updateCartCount();
  updateProfileHeaderBtn();

  // Load products dynamically from SQLite DB
  await fetchProductsFromDB();

  if (document.getElementById('menuContainer')) {
    renderMenuSections();
    renderCart();
  } else if (document.getElementById('popularDishesContainer')) {
    renderPopularDishes();
    renderCart();
  }

  // Reviews handling on index.html
  const form = document.getElementById('reviewForm');
  if (form){
    loadReviews();
    form.addEventListener('submit', e => {
      e.preventDefault();
      const nameInput = document.getElementById('reviewName');
      const textInput = document.getElementById('reviewText');
      const name = (nameInput instanceof HTMLInputElement || nameInput instanceof HTMLTextAreaElement) ? nameInput.value.trim() : '';
      const text = (textInput instanceof HTMLInputElement || textInput instanceof HTMLTextAreaElement) ? textInput.value.trim() : '';
      if (!name || !text) return;
      saveReview({name, text});
      if (nameInput instanceof HTMLInputElement || nameInput instanceof HTMLTextAreaElement) nameInput.value = '';
      if (textInput instanceof HTMLInputElement || textInput instanceof HTMLTextAreaElement) textInput.value = '';
    });
  }

  // Initialize FAQ on index.html
  if (document.querySelector('.faq')){
    initFAQ();
  }

  // Cart modal controls
  const cartIconBtn = document.getElementById('cartIconBtn');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartModalOverlay = document.getElementById('cartModalOverlay');
  const cartBackBtn = document.getElementById('cartBackBtn');
  if (cartIconBtn) cartIconBtn.addEventListener('click', openCartModal);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartModal);
  if (cartModalOverlay) cartModalOverlay.addEventListener('click', closeCartModal);
  if (cartBackBtn) cartBackBtn.addEventListener('click', closeCartModal);

  // Profile modal controls
  const profileBtn = document.getElementById('profileBtn');
  const profileCloseBtn = document.getElementById('profileCloseBtn');
  const profileModalOverlay = document.getElementById('profileModalOverlay');
  if (profileBtn) profileBtn.addEventListener('click', openProfileModal);
  if (profileCloseBtn) profileCloseBtn.addEventListener('click', closeProfileModal);
  if (profileModalOverlay) profileModalOverlay.addEventListener('click', closeProfileModal);

  // Close modals on Escape and ensure no-scroll cleared
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setCartOpen(false);
      closeProfileModal();
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    if (a instanceof HTMLAnchorElement) {
      a.addEventListener('click', e => {
        e.preventDefault();
        const href = a.getAttribute('href');
        const id = href ? href.slice(1) : '';
        const el = id ? document.getElementById(id) : null;
        if (el) el.scrollIntoView({behavior:'smooth'});
        else window.location.href = a.href;
      });
    }
  });
  initAIChat();
});

async function renderAdminView() {
  const body = document.getElementById('profileModalBody');
  if (!body) return;
  body.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'auth-container';

  const headerRow = document.createElement('div');
  headerRow.style.display = 'flex';
  headerRow.style.justifyContent = 'space-between';
  headerRow.style.alignItems = 'center';
  headerRow.style.marginBottom = '20px';

  const title = document.createElement('h3');
  title.className = 'auth-title';
  title.textContent = 'Панель администратора';
  headerRow.appendChild(title);

  const backBtn = document.createElement('button');
  backBtn.className = 'btn btn-phone';
  backBtn.textContent = 'Назад';
  backBtn.addEventListener('click', () => {
    renderProfileView();
  });
  headerRow.appendChild(backBtn);
  container.appendChild(headerRow);

  // Admin Navigation (Tabs)
  const adminNav = document.createElement('div');
  adminNav.className = 'admin-nav';

  const tabOrders = document.createElement('button');
  tabOrders.className = 'admin-nav-btn active';
  tabOrders.textContent = 'Заказы';

  const tabProducts = document.createElement('button');
  tabProducts.className = 'admin-nav-btn';
  tabProducts.textContent = 'Товары';

  const tabUsers = document.createElement('button');
  tabUsers.className = 'admin-nav-btn';
  tabUsers.textContent = 'Пользователи';

  adminNav.appendChild(tabOrders);
  adminNav.appendChild(tabProducts);
  adminNav.appendChild(tabUsers);
  container.appendChild(adminNav);

  // Content section
  const adminContent = document.createElement('div');
  adminContent.className = 'admin-section';
  container.appendChild(adminContent);
  body.appendChild(container);

  // Active tab state
  let activeTab = 'orders';

  function switchTab(tab) {
    activeTab = tab;
    tabOrders.classList.toggle('active', tab === 'orders');
    tabProducts.classList.toggle('active', tab === 'products');
    tabUsers.classList.toggle('active', tab === 'users');
    renderTabContent();
  }

  tabOrders.addEventListener('click', () => switchTab('orders'));
  tabProducts.addEventListener('click', () => switchTab('products'));
  tabUsers.addEventListener('click', () => switchTab('users'));

  async function renderTabContent() {
    adminContent.innerHTML = '<div class="order-history-empty">Загрузка...</div>';
    if (!currentUser) return;

    const headers = {
      'Content-Type': 'application/json',
      'x-user-id': currentUser.id
    };

    try {
      if (activeTab === 'orders') {
        const res = await fetch('/api/admin/orders', { headers });
        if (!res.ok) throw new Error('Ошибка загрузки заказов');
        const orders = await res.json();
        adminContent.innerHTML = '';

        if (orders.length === 0) {
          adminContent.innerHTML = '<div class="order-history-empty">Заказов нет</div>';
          return;
        }

        orders.forEach(order => {
          const card = document.createElement('div');
          card.className = 'admin-item-card';

          const header = document.createElement('div');
          header.className = 'admin-item-header';
          header.innerHTML = `<span>Заказ #${order.id} - ${order.date}</span>`;
          card.appendChild(header);

          const info = document.createElement('div');
          info.className = 'admin-item-body';
          info.innerHTML = `
            <strong>Клиент:</strong> ${escapeHtml(order.name)} (${escapeHtml(order.phone)})<br>
            <strong>Адрес:</strong> ${escapeHtml(order.address)}<br>
            ${order.comment ? `<strong>Комментарий:</strong> ${escapeHtml(order.comment)}<br>` : ''}
            <strong>Сумма:</strong> ${order.total.toLocaleString('ru-RU')} ₸<br>
            <strong>Содержимое:</strong><br>
            ${order.items.map(it => `• ${it.title} x${it.qty} (${it.price})`).join('<br>')}
          `;
          card.appendChild(info);

          // Status control row
          const statusRow = document.createElement('div');
          statusRow.style.display = 'flex';
          statusRow.style.alignItems = 'center';
          statusRow.style.gap = '10px';
          statusRow.style.marginTop = '10px';

          const statusLabel = document.createElement('span');
          statusLabel.textContent = 'Статус: ';
          statusLabel.style.fontWeight = '700';

          const select = document.createElement('select');
          select.className = 'admin-order-status-select';
          const statuses = ['Принят', 'Готовится', 'В пути', 'Доставлен', 'Отменен'];
          statuses.forEach(st => {
            const opt = document.createElement('option');
            opt.value = st;
            opt.textContent = st;
            opt.selected = (order.status === st);
            select.appendChild(opt);
          });

          select.addEventListener('change', async () => {
            const newStatus = select.value;
            try {
              const statusRes = await fetch(`/api/admin/orders/${order.id}/status`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ status: newStatus })
              });
              if (!statusRes.ok) throw new Error('Не удалось обновить статус');
            } catch (err) {
              alert(err.message);
              select.value = order.status; // Revert
            }
          });

          statusRow.appendChild(statusLabel);
          statusRow.appendChild(select);
          card.appendChild(statusRow);
          adminContent.appendChild(card);
        });

      } else if (activeTab === 'users') {
        const res = await fetch('/api/admin/users', { headers });
        if (!res.ok) throw new Error('Ошибка загрузки пользователей');
        const users = await res.json();
        adminContent.innerHTML = '';

        users.forEach(user => {
          const card = document.createElement('div');
          card.className = 'admin-item-card';

          const header = document.createElement('div');
          header.className = 'admin-item-header';
          header.innerHTML = `<span>${escapeHtml(user.name)} (${user.role === 'admin' ? 'Админ' : 'Пользователь'})</span>`;
          card.appendChild(header);

          const info = document.createElement('div');
          info.className = 'admin-item-body';
          info.innerHTML = `
            <strong>Телефон:</strong> ${escapeHtml(user.phone)}<br>
            <strong>Email:</strong> ${escapeHtml(user.email)}
          `;
          card.appendChild(info);

          if (user.role !== 'admin') {
            const actions = document.createElement('div');
            actions.className = 'admin-item-actions';

            const delBtn = document.createElement('button');
            delBtn.className = 'admin-btn admin-btn-delete';
            delBtn.textContent = 'Удалить';
            delBtn.addEventListener('click', async () => {
              if (!confirm(`Вы действительно хотите удалить пользователя ${user.name}?`)) return;
              try {
                const delRes = await fetch(`/api/admin/users/${user.id}`, {
                  method: 'DELETE',
                  headers
                });
                if (!delRes.ok) throw new Error('Не удалось удалить пользователя');
                renderTabContent();
              } catch (err) {
                alert(err.message);
              }
            });
            actions.appendChild(delBtn);
            card.appendChild(actions);
          }

          adminContent.appendChild(card);
        });

      } else if (activeTab === 'products') {
        adminContent.innerHTML = '';

        const addProdBtn = document.createElement('button');
        addProdBtn.className = 'admin-btn-add';
        addProdBtn.textContent = '+ Добавить новый товар';
        addProdBtn.addEventListener('click', () => {
          renderProductForm();
        });
        adminContent.appendChild(addProdBtn);

        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Ошибка загрузки товаров');
        const products = await res.json();

        products.forEach(prod => {
          const card = document.createElement('div');
          card.className = 'admin-item-card';

          const header = document.createElement('div');
          header.className = 'admin-item-header';
          header.innerHTML = `<span>${escapeHtml(prod.title)}</span> <span style="color:var(--primary-red)">${escapeHtml(prod.price)}</span>`;
          card.appendChild(header);

          const info = document.createElement('div');
          info.className = 'admin-item-body';
          info.innerHTML = `
            <strong>Категория:</strong> ${escapeHtml(prod.category)}<br>
            <strong>Описание:</strong> ${escapeHtml(prod.description || 'Нет описания')}<br>
            <strong>Путь к фото:</strong> ${escapeHtml(prod.image_path || 'Нет фото')}
          `;
          card.appendChild(info);

          const actions = document.createElement('div');
          actions.className = 'admin-item-actions';

          const editBtn = document.createElement('button');
          editBtn.className = 'admin-btn admin-btn-edit';
          editBtn.textContent = 'Изменить';
          editBtn.addEventListener('click', () => {
            renderProductForm(prod);
          });

          const delBtn = document.createElement('button');
          delBtn.className = 'admin-btn admin-btn-delete';
          delBtn.textContent = 'Удалить';
          delBtn.addEventListener('click', async () => {
            if (!confirm(`Удалить товар ${prod.title}?`)) return;
            try {
              const delRes = await fetch(`/api/admin/products/${prod.id}`, {
                method: 'DELETE',
                headers
              });
              if (!delRes.ok) throw new Error('Не удалось удалить товар');
              await fetchProductsFromDB();
              renderMenuSections();
              renderTabContent();
            } catch (err) {
              alert(err.message);
            }
          });

          actions.appendChild(editBtn);
          actions.appendChild(delBtn);
          card.appendChild(actions);

          adminContent.appendChild(card);
        });
      }
    } catch (err) {
      adminContent.innerHTML = `<div class="order-history-empty" style="color:red">${err.message}</div>`;
    }
  }

  function renderProductForm(product = null) {
    adminContent.innerHTML = '';

    const form = document.createElement('form');
    form.className = 'admin-form';
    form.innerHTML = `
      <h3>${product ? 'Редактировать товар' : 'Добавить товар'}</h3>
      <div class="admin-form-group">
        <label for="prodTitle">Название товара</label>
        <input type="text" id="prodTitle" required value="${product ? escapeHtml(product.title) : ''}">
      </div>
      <div class="admin-form-group">
        <label for="prodCategory">Категория</label>
        <select id="prodCategory" required>
          <option value="Бургеры" ${product && product.category === 'Бургеры' ? 'selected' : ''}>Бургеры</option>
          <option value="Донеры" ${product && product.category === 'Донеры' ? 'selected' : ''}>Донеры</option>
          <option value="Сеты" ${product && product.category === 'Сеты' ? 'selected' : ''}>Сеты</option>
          <option value="Закуски и крылья" ${product && product.category === 'Закуски и крылья' ? 'selected' : ''}>Закуски и крылья</option>
          <option value="Новинки" ${product && product.category === 'Новинки' ? 'selected' : ''}>Новинки</option>
        </select>
      </div>
      <div class="admin-form-group">
        <label for="prodPrice">Цена (например, 2 190 ₸)</label>
        <input type="text" id="prodPrice" required value="${product ? escapeHtml(product.price) : ''}">
      </div>
      <div class="admin-form-group">
        <label for="prodDesc">Описание</label>
        <textarea id="prodDesc" rows="3">${product && product.description ? escapeHtml(product.description) : ''}</textarea>
      </div>
      <div class="admin-form-group">
        <label for="prodImage">Путь к изображению (например, menu1/wings.png)</label>
        <input type="text" id="prodImage" value="${product && product.image_path ? escapeHtml(product.image_path) : ''}">
      </div>
      <div class="admin-form-actions">
        <button type="submit" class="admin-btn admin-btn-edit" style="background:var(--primary-red);color:#fff">${product ? 'Сохранить' : 'Создать'}</button>
        <button type="button" id="cancelProdForm" class="admin-btn admin-btn-delete">Отмена</button>
      </div>
    `;

    form.querySelector('#cancelProdForm').addEventListener('click', () => {
      renderTabContent();
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = form.querySelector('#prodTitle').value.trim();
      const category = form.querySelector('#prodCategory').value;
      const price = form.querySelector('#prodPrice').value.trim();
      const description = form.querySelector('#prodDesc').value.trim();
      const image_path = form.querySelector('#prodImage').value.trim();

      const bodyData = { title, category, price, description, image_path };
      const url = product ? `/api/admin/products/${product.id}` : '/api/admin/products';
      const method = product ? 'PUT' : 'POST';

      try {
        const saveRes = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': currentUser.id
          },
          body: JSON.stringify(bodyData)
        });
        if (!saveRes.ok) {
          const errorData = await saveRes.json();
          throw new Error(errorData.error || 'Не удалось сохранить товар');
        }
        await fetchProductsFromDB();
        renderMenuSections();
        renderTabContent();
      } catch (err) {
        alert(err.message);
      }
    });

    adminContent.appendChild(form);
  }

  renderTabContent();
}

function initAIChat() {
  // 1. Create floating chat button
  const chatBtn = document.createElement('button');
  chatBtn.className = 'ai-chat-btn';
  chatBtn.id = 'aiChatBtn';
  chatBtn.title = 'ИИ-Помощник';
  chatBtn.innerHTML = `
    <svg viewBox="0 0 24 24">
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
    </svg>
  `;
  document.body.appendChild(chatBtn);

  // 2. Create chat window
  const chatWindow = document.createElement('div');
  chatWindow.className = 'ai-chat-window hidden';
  chatWindow.id = 'aiChatWindow';
  chatWindow.innerHTML = `
    <div class="ai-chat-header">
      <div class="ai-chat-header-info">
        <div class="ai-chat-title">ИИ-Помощник SD Chicken</div>
        <div class="ai-chat-status">В сети</div>
      </div>
      <button class="ai-chat-close" id="aiChatClose">✕</button>
    </div>
    <div class="ai-chat-messages" id="aiChatMessages">
      <div class="ai-chat-msg bot">Привет! 🍗 Я ваш умный ИИ-помощник ресторана *SD Chicken*.\n\nЯ помогу вам с подбором блюд и рекомендациями из нашего меню! Спросите меня, например:\n«Что лучше взять на сытный обед?» или «Посоветуй острый бургер».</div>
    </div>
    <div class="ai-chat-input-area">
      <input type="text" class="ai-chat-input" id="aiChatInput" placeholder="Спросите у ИИ о меню...">
      <button class="ai-chat-send" id="aiChatSend">
        <svg viewBox="0 0 24 24">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
      </button>
    </div>
  `;
  document.body.appendChild(chatWindow);

  const messagesContainer = chatWindow.querySelector('#aiChatMessages');
  const chatInput = chatWindow.querySelector('#aiChatInput');
  const chatSend = chatWindow.querySelector('#aiChatSend');
  const chatClose = chatWindow.querySelector('#aiChatClose');

  // Open/Close toggle
  chatBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
    if (!chatWindow.classList.contains('hidden')) {
      chatInput.focus();
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });

  chatClose.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
  });

  // Esc closes chat too
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      chatWindow.classList.add('hidden');
    }
  });

  // Sending message function
  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = '';

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-chat-msg user';
    userMsg.textContent = text;
    messagesContainer.appendChild(userMsg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Append typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'ai-chat-typing';
    typingIndicator.innerHTML = '<span>ИИ думает</span><span class="blinking-dots">...</span>';
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Call backend API
    let replyText = 'извените я не могу ответить на вас вопрос напишите на номер +7 708 378 2484';
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
      });
      if (res.ok) {
        const data = await res.json();
        replyText = data.reply || replyText;
      }
    } catch (err) {
      console.error('AI chat failed:', err);
    }

    // Remove typing indicator and append bot reply
    messagesContainer.removeChild(typingIndicator);

    const botMsg = document.createElement('div');
    botMsg.className = 'ai-chat-msg bot';
    botMsg.innerHTML = replyText.replace(/\*(.*?)\*/g, '<strong>$1</strong>'); // Simple bold markdown support
    messagesContainer.appendChild(botMsg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
}
