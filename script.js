// Структура меню для menu.html
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
  'Фитнес донер': 'menu1/fitness-doner.png',
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

const menuSections = [
  {
    category: 'Бургеры',
    items: [
      {title: 'SD Бургер', price: '2 190 ₸', desc: 'Хрустящая курица, помидор, соленый огурец, сыр чеддер, соус'},
      {title: 'Классический бургер', price: '2 000 ₸', desc: 'Хрустящая курица, сыр чеддер, айсберг, соус'},
      {title: 'Острый бургер', price: '2 290 ₸', desc: 'Хрустящая курица, айсберг, помидор, сыр чеддер, соус'},
      {title: 'SD Бургер Комбо', price: '3 190 ₸', desc: 'SD Бургер, картофель фри, кола 0,5 л, соус на выбор'},
      {title: 'Классический бургер Комбо', price: '3 000 ₸', desc: 'Классический бургер, картофель фри, кола 0,5 л, соус на выбор'},
      {title: 'Острый бургер Комбо', price: '3 290 ₸', desc: 'Острый бургер, картофель фри, кола 0,5 л, соус на выбор'}
    ]
  },
  {
    category: 'Донеры',
    items: [
      {title: 'Донер', price: '1 890 ₸', desc: 'Хрустящая курица, свежие овощи, соленый огурец, соус'},
      {title: 'Донер в багете', price: '2 100 ₸', desc: 'Хрустящая курица, свежие овощи, соленый огурец, соус'},
      {title: 'Донер Комбо', price: '2 890 ₸', desc: 'Донер, картофель фри, кола 0,5 л, соус на выбор'},
      {title: 'Донер в багете Комбо', price: '3 190 ₸', desc: 'Донер в багете, картофель фри, кола 0,5 л, соус на выбор'}
    ]
  },
  
  {
    category: 'Сеты',
    items: [
      {title: 'Сет Friends', price: '10 990 ₸', desc: '4 классических бургера, 12 хрустящих крыльев, фри 4 шт, 4 соуса, кола 1 л'},
      {title: 'Сет Chicken Mafia', price: '12 690 ₸', desc: '24 хрустящих крыла, 6 куриных ножек, 6 стрипсов, фри 3 шт, кола 1 л, 4 соуса'}
    ]
  },
  {
    category: 'Закуски и крылья',
    items: [
      {title: 'Крылышки острые — 6 шт', price: '2 190 ₸', desc: 'Острые крылышки с фирменным соусом'},
      {title: 'Крылышки острые — 12 шт', price: '3 990 ₸', desc: 'Острые крылышки с фирменным соусом'},
      {title: 'Крылышки острые — 20 шт', price: '5 990 ₸', desc: 'Острые крылышки с фирменным соусом'},
      {title: 'Крылышки острые — 30 шт', price: '7 990 ₸', desc: 'Острые крылышки с фирменным соусом'},
      {title: 'Крылышки острые — 40 шт', price: '9 990 ₸', desc: 'Острые крылышки с фирменным соусом'},
      {title: 'Куриные ножки острые — 3 шт', price: '2 690 ₸', desc: 'Острые куриные ножки с сильным вкусом'},
      {title: 'Куриные ножки острые — 6 шт', price: '5 090 ₸', desc: 'Острые куриные ножки с сильным вкусом'},
      {title: 'Куриные ножки острые — 9 шт', price: '7 490 ₸', desc: 'Острые куриные ножки с сильным вкусом'},
      {title: 'Наггетсы классические — 9 шт', price: '1 990 ₸', desc: 'Классические куриные наггетсы'},
      {title: 'Фри', price: '990 ₸', desc: 'Хрустящий картофель фри'},
      {title: 'Стрипсы острые — 9 шт', price: '3 390 ₸', desc: 'Острые куриные стрипсы'}
    ]
  }
  ,
  {
    category: 'Новинки',
    items: [
      {title: 'Фитнес донер', price: '2 500 ₸', desc: 'Много белка, мало жира, максимум вкуса'}
    ]
  }
];

let cart = [];
let activeVariants = {};
let currentUser = null;

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
    avatarDiv.style.background = 'var(--orange)';
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
    span.textContent = 'Войти';
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

function saveOrderToUserHistory(order) {
  if (!currentUser) return;
  if (!currentUser.orders) currentUser.orders = [];
  currentUser.orders.push(order);
  
  // Update active session
  localStorage.setItem('sd_active_user', JSON.stringify(currentUser));
  
  // Update users list
  try {
    const usersRaw = localStorage.getItem('sd_users');
    let users = usersRaw ? JSON.parse(usersRaw) : [];
    const idx = users.findIndex(u => u.email === currentUser.email);
    if (idx !== -1) {
      users[idx].orders = currentUser.orders;
      localStorage.setItem('sd_users', JSON.stringify(users));
    }
  } catch (e) {
    console.error('Failed to sync user order history:', e);
  }
  
  renderProfileView();
}

function renderProfileView(viewState = 'profile') {
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
      renderProfileView('login');
      // Re-render checkout to clear prefilled details
      renderCart();
    });
    infoCard.appendChild(logoutBtn);
    container.appendChild(infoCard);

    // Order History
    const historySection = document.createElement('div');
    historySection.className = 'order-history-section';
    const historyHeader = document.createElement('h3');
    historyHeader.className = 'order-history-header';
    historyHeader.textContent = 'История заказов';
    historySection.appendChild(historyHeader);

    const historyList = document.createElement('div');
    historyList.className = 'order-history-list';

    const orders = currentUser.orders || [];
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
    historySection.appendChild(historyList);
    container.appendChild(historySection);

    body.appendChild(container);
  } else if (viewState === 'login') {
    // Login form
    const container = document.createElement('div');
    container.className = 'auth-container';
    const title = document.createElement('h3');
    title.className = 'auth-title';
    title.textContent = 'Вход в аккаунт';
    container.appendChild(title);

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

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const loginVal = emailInput.value.trim();
      const passwordVal = passInput.value.trim();

      try {
        const usersRaw = localStorage.getItem('sd_users');
        const users = usersRaw ? JSON.parse(usersRaw) : [];
        const user = users.find(u => (u.email === loginVal || u.phone === loginVal) && u.password === passwordVal);
        if (user) {
          currentUser = user;
          localStorage.setItem('sd_active_user', JSON.stringify(user));
          updateProfileHeaderBtn();
          renderProfileView();
          renderCart();
        } else {
          errorDiv.textContent = 'Неверная почта/телефон или пароль.';
          errorDiv.classList.remove('hidden');
        }
      } catch (err) {
        errorDiv.textContent = 'Ошибка при входе.';
        errorDiv.classList.remove('hidden');
      }
    });

    container.appendChild(form);

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'auth-toggle-btn';
    toggleBtn.textContent = 'Нет аккаунта? Зарегистрироваться';
    toggleBtn.addEventListener('click', () => {
      renderProfileView('register');
    });
    container.appendChild(toggleBtn);

    body.appendChild(container);
  } else if (viewState === 'register') {
    // Registration form
    const container = document.createElement('div');
    container.className = 'auth-container';
    const title = document.createElement('h3');
    title.className = 'auth-title';
    title.textContent = 'Регистрация';
    container.appendChild(title);

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

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameVal = nameInput.value.trim();
      const phoneVal = phoneInput.value.trim();
      const emailVal = emailInput.value.trim();
      const passwordVal = passInput.value.trim();

      try {
        const usersRaw = localStorage.getItem('sd_users');
        let users = usersRaw ? JSON.parse(usersRaw) : [];

        const exists = users.some(u => u.email === emailVal || u.phone === phoneVal);
        if (exists) {
          errorDiv.textContent = 'Пользователь с такой почтой или телефоном уже существует.';
          errorDiv.classList.remove('hidden');
          return;
        }

        const newUser = {
          name: nameVal,
          phone: phoneVal,
          email: emailVal,
          password: passwordVal,
          orders: []
        };
        users.push(newUser);
        localStorage.setItem('sd_users', JSON.stringify(users));

        currentUser = newUser;
        localStorage.setItem('sd_active_user', JSON.stringify(newUser));

        updateProfileHeaderBtn();
        renderProfileView();
        renderCart();
      } catch (err) {
        errorDiv.textContent = 'Ошибка при регистрации.';
        errorDiv.classList.remove('hidden');
      }
    });

    container.appendChild(form);

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'auth-toggle-btn';
    toggleBtn.textContent = 'Уже есть аккаунт? Войти';
    toggleBtn.addEventListener('click', () => {
      renderProfileView('login');
    });
    container.appendChild(toggleBtn);

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
  payment: 'cash',
  useBonus: false
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

function getBonusAmount(total){
  return Math.ceil(total * 0.05);
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

  const bonusRow = document.createElement('div');
  bonusRow.className = 'checkout-bonus-row';
  const bonusInfo = document.createElement('div');
  bonusInfo.textContent = `Бонусы начисляются после заказа: ${getBonusAmount(total)} бонусов`;
  const bonusOption = document.createElement('label');
  bonusOption.className = 'checkout-bonus-label';
  const bonusCheckbox = document.createElement('input');
  bonusCheckbox.type = 'checkbox';
  bonusCheckbox.checked = checkout.useBonus;
  bonusCheckbox.addEventListener('change', () => {
    checkout.useBonus = bonusCheckbox.checked;
    bonusStatus.textContent = bonusCheckbox.checked ? 'Бонусы будут списаны' : 'Бонусы не списываются';
  });
  const bonusStatus = document.createElement('span');
  bonusStatus.className = 'checkout-bonus-status';
  bonusStatus.textContent = checkout.useBonus ? 'Бонусы будут списаны' : 'Бонусы не списываются';
  bonusOption.appendChild(bonusCheckbox);
  bonusOption.appendChild(document.createTextNode(' Списать бонусы'));
  bonusRow.appendChild(bonusInfo);
  bonusRow.appendChild(bonusOption);
  bonusRow.appendChild(bonusStatus);
  checkoutEl.appendChild(bonusRow);

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
        price: item.price
      };
    });

    itemsData.forEach((item, index) => {
      itemsText += `${index + 1}. ${item.title} x${item.qty} = ${item.price}\n`;
      totalQty += item.qty;
    });

    const orderMsg = `🍗 *Новый заказ в SD Chicken* 🍗\n\n` +
      `📞 *Номер заказчика:* ${phone}\n` +
      `👤 *Имя:* ${name}\n` +
      `📍 *Адрес:* ул. ${street}, д. ${house}${floor ? ', эт. ' + floor : ''}${apartment ? ', кв. ' + apartment : ''}\n\n` +
      `📦 *Заказ:* \n${itemsText}\n` +
      `🔢 *Количество блюд:* ${totalQty} шт.\n` +
      `💰 *Сумма заказа:* ${total.toLocaleString('ru-RU')} ₸\n` +
      (comment ? `💬 *Комментарий:* ${comment}` : '');

    // 1. Redirection to WhatsApp for sending the order
    const targetPhone = '77776984098';
    const waUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(orderMsg)}`;
    window.open(waUrl, '_blank');

    // 2. Silent POST request to the local Express server
    const addressString = `ул. ${street}, д. ${house}${floor ? ', эт. ' + floor : ''}${apartment ? ', кв. ' + apartment : ''}`;
    fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        phone,
        address: addressString,
        items: itemsData,
        total,
        comment
      })
    }).catch(err => console.error('Silent order sync failed:', err));

    // 3. Save order to history if user is logged in
    if (currentUser) {
      const historyOrder = {
        date: new Date().toLocaleDateString('ru-RU') + ' ' + new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'}),
        items: itemsData,
        total,
        address: addressString
      };
      saveOrderToUserHistory(historyOrder);
    }

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
  
  if (item.title === 'Фитнес донер') {
    img.style.opacity = '1';
    img.style.filter = 'none';
  }
  
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
  renderActionByVariant();
  
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

function loadReviews(){
  const key = 'sd_reviews_v1';
  let reviews = [];
  try {
    const raw = localStorage.getItem(key);
    reviews = raw ? JSON.parse(raw) : [];
  } catch {
    reviews = [];
  }
  const list = document.getElementById('reviewsList');
  if (!list) return;
  list.innerHTML = '';
  reviews.forEach(r => {
    const div = document.createElement('div');
    div.className = 'review';
    div.innerHTML = `<strong>${escapeHtml(r.name)}</strong><p>${escapeHtml(r.text)}</p>`;
    list.appendChild(div);
  });
}

function saveReview(review){
  const key = 'sd_reviews_v1';
  let reviews = [];
  try {
    const raw = localStorage.getItem(key);
    reviews = raw ? JSON.parse(raw) : [];
  } catch {
    reviews = [];
  }
  reviews.unshift(review);
  try {
    localStorage.setItem(key, JSON.stringify(reviews));
  } catch (e) {
    console.error('Failed to save review', e);
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

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('no-scroll');
  
  loadCart();
  loadUserSession();
  updateCartCount();
  updateProfileHeaderBtn();

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
      loadReviews();
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
});

