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
    badge.textContent = cart.length;
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
  const checkout = document.getElementById('cartCheckout');
  if (!checkout) return;
  checkout.innerHTML = '';
  if (!cart.length){
    checkout.classList.add('hidden');
    return;
  }
  checkout.classList.remove('hidden');

  const title = document.createElement('h3');
  title.className = 'checkout-title';
  title.textContent = 'Оформление заказа';
  checkout.appendChild(title);

  const contactGroup = document.createElement('div');
  contactGroup.className = 'checkout-group';
  contactGroup.appendChild(createCheckoutInput({labelText: 'Ваше имя', id: 'checkoutName', placeholder: 'Иван Петров'}));
  contactGroup.appendChild(createCheckoutInput({labelText: 'Номер телефона', id: 'checkoutPhone', placeholder: '+7 708 378 2484', type: 'tel'}));
  checkout.appendChild(contactGroup);

  const addressGroup = document.createElement('div');
  addressGroup.className = 'checkout-group';
  addressGroup.appendChild(createCheckoutInput({labelText: 'Адрес — улица', id: 'checkoutStreet', placeholder: 'ул. Ленина'}));
  addressGroup.appendChild(createCheckoutInput({labelText: 'Дом', id: 'checkoutHouse', placeholder: '12'}));
  addressGroup.appendChild(createCheckoutInput({labelText: 'Этаж', id: 'checkoutFloor', placeholder: '3'}));
  addressGroup.appendChild(createCheckoutInput({labelText: 'Квартира', id: 'checkoutApartment', placeholder: '45'}));
  checkout.appendChild(addressGroup);

  const paymentGroup = document.createElement('div');
  paymentGroup.className = 'checkout-group';
  const paymentLabel = document.createElement('div');
  paymentLabel.className = 'checkout-label';
  paymentLabel.textContent = 'Способ оплаты';
  paymentGroup.appendChild(paymentLabel);

  ['cash', 'card'].forEach(value => {
    const option = document.createElement('label');
    option.className = 'checkout-radio-label';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'checkoutPayment';
    radio.value = value;
    radio.checked = checkout.payment === value;
    radio.addEventListener('change', () => {
      checkout.payment = value;
      renderCheckout(total);
    });
    option.appendChild(radio);
    option.appendChild(document.createTextNode(value === 'cash' ? 'Наличными' : 'Картой'));
    paymentGroup.appendChild(option);
  });
  checkout.appendChild(paymentGroup);

  const cardFields = document.createElement('div');
  cardFields.className = checkout.payment === 'card' ? 'checkout-card-fields' : 'checkout-card-fields hidden';
  cardFields.appendChild(createCheckoutInput({labelText: 'Номер карты', id: 'checkoutCardNumber', placeholder: '0000 0000 0000 0000'}));
  cardFields.appendChild(createCheckoutInput({labelText: 'Срок действия', id: 'checkoutCardExpiry', placeholder: 'MM/YY'}));
  cardFields.appendChild(createCheckoutInput({labelText: 'CVC/CVV', id: 'checkoutCardCvc', placeholder: '000'}));
  checkout.appendChild(cardFields);

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
  checkout.appendChild(commentField);

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
  checkout.appendChild(bonusRow);

  const orderButton = document.createElement('button');
  orderButton.type = 'button';
  orderButton.className = 'btn btn-order';
  orderButton.textContent = 'Оформить заказ';
  orderButton.addEventListener('click', () => {
    const notice = document.getElementById('checkoutNotice');
    if (!notice) return;
    const nameInput = document.getElementById('checkoutName');
    const phoneInput = document.getElementById('checkoutPhone');
    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    if (!name || !phone) {
      notice.style.color = '#ff3300';
      notice.textContent = 'Пожалуйста, заполните имя и номер телефона для оформления заказа.';
      return;
    }
    notice.style.color = 'var(--yellow)';
    notice.innerHTML = `🎉 <strong>Спасибо, ${escapeHtml(name)}!</strong> Ваш заказ на сумму ${total.toLocaleString('ru-RU')} ₸ успешно оформлен.<br>Наш оператор свяжется с вами по телефону <strong>${escapeHtml(phone)}</strong> в течение 5 минут.`;
    setTimeout(() => {
      cart = [];
      saveCart();
      updateCartCount();
      renderCart();
      renderMenuSections();
    }, 4000);
  });
  checkout.appendChild(orderButton);

  const totalRow = document.createElement('div');
  totalRow.className = 'checkout-total-row';
  totalRow.textContent = `Итоговая сумма заказа: ${total.toLocaleString('ru-RU')} ₸`;
  checkout.appendChild(totalRow);

  const notice = document.createElement('div');
  notice.id = 'checkoutNotice';
  notice.className = 'checkout-note';
  checkout.appendChild(notice);
}

function getPriceValue(price){
  const digits = String(price).replace(/[^0-9]/g, '');
  return parseInt(digits || '0', 10);
}

function addToCart(item){
  // support variant (e.g., 'spicy' or 'normal') to distinguish items like wings
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
  // keep menu UI in sync with cart (update per-card controls)
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
  // update menu cards to reflect cart changes
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
    const variantLabel = (item.variant && item.variant !== 'default') ? ` (${item.variant === 'spicy' ? 'Острые' : 'Обычные'})` : '';
    title.textContent = item.title + variantLabel;
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

function renderMenuSections(){
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
      const card = document.createElement('div');
      card.className = 'menu-card';
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'menu-card-image';
      const img = document.createElement('img');
      const imagePath = item.image || menuImageMap[item.title] || section.image || '';
      img.src = encodeURI(imagePath);
      img.alt = item.title;
      // Ensure images in Новинки and the Фитнес донер are not dimmed
      if (section.category === 'Новинки' || item.title === 'Фитнес донер'){
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
      // For wings, display both options in title
      let displayTitle = item.title;
      const isWings = /крылышки/i.test(item.title);
      if (isWings){
        displayTitle = item.title.replace(/острые?\s*/i,'').trim() + ' — Острые/Не острые';
      }
      title.textContent = displayTitle;
      const desc = document.createElement('p');
      desc.className = 'menu-card-desc';
      desc.textContent = item.desc;
      const price = document.createElement('div');
      price.className = 'menu-card-price';
      price.textContent = item.price;
      // Create action area: either 'Выбрать' button or quantity controls
      const actionArea = document.createElement('div');
      actionArea.className = 'menu-card-action';

      // Variant selector for wings
      let selectedVariant = isWings ? 'spicy' : 'default';
      const variantSelector = document.createElement('div');
      variantSelector.className = 'variant-selector';
      function renderVariantButtons(){
        variantSelector.innerHTML = '';
        const spicyBtn = document.createElement('button');
        spicyBtn.className = 'btn-variant';
        spicyBtn.textContent = 'Острые';
        const normalBtn = document.createElement('button');
        normalBtn.className = 'btn-variant';
        normalBtn.textContent = 'Обычные';
        function updateActive(){
          spicyBtn.classList.toggle('active', selectedVariant === 'spicy');
          normalBtn.classList.toggle('active', selectedVariant === 'normal');
        }
        spicyBtn.addEventListener('click', () => { selectedVariant = 'spicy'; updateActive(); renderActionByVariant(); });
        normalBtn.addEventListener('click', () => { selectedVariant = 'normal'; updateActive(); renderActionByVariant(); });
        variantSelector.appendChild(spicyBtn);
        variantSelector.appendChild(normalBtn);
        updateActive();
      }

      function createQtyControls(currentQty){
        actionArea.innerHTML = '';
        const minus = document.createElement('button');
        minus.className = 'btn btn-qty';
        minus.textContent = '-';
        const count = document.createElement('span');
        count.className = 'menu-card-count';
        count.textContent = currentQty;
        const plus = document.createElement('button');
        plus.className = 'btn btn-qty';
        plus.textContent = '+';

        minus.addEventListener('click', () => {
          changeCartQty(item.title, -1, selectedVariant);
          const it = cart.find(c => c.title === item.title && (c.variant || 'default') === selectedVariant);
          if (it) createQtyControls(it.qty);
          else renderActionByVariant();
        });
        plus.addEventListener('click', () => {
          addToCart({title: item.title, desc: item.desc, price: item.price, image: imagePath, variant: selectedVariant});
          const it = cart.find(c => c.title === item.title && (c.variant || 'default') === selectedVariant) || {qty:1};
          createQtyControls(it.qty);
        });

        if (isWings) actionArea.appendChild(variantSelector);
        actionArea.appendChild(minus);
        actionArea.appendChild(count);
        actionArea.appendChild(plus);
      }

      function createChooseButton(){
        actionArea.innerHTML = '';
        const action = document.createElement('button');
        action.type = 'button';
        action.className = 'btn btn-select';
        action.textContent = 'Выбрать';
        action.addEventListener('click', () => {
          addToCart({title: item.title, desc: item.desc, price: item.price, image: imagePath, variant: selectedVariant});
          const it = cart.find(c => c.title === item.title && (c.variant || 'default') === selectedVariant) || {qty:1};
          createQtyControls(it.qty);
        });
        if (isWings) actionArea.appendChild(variantSelector);
        actionArea.appendChild(action);
      }

      function renderActionByVariant(){
        if (!isWings){
          const existing = cart.find(c => c.title === item.title);
          if (existing && existing.qty > 0) createQtyControls(existing.qty);
          else createChooseButton();
          return;
        }
        const existing = cart.find(c => c.title === item.title && (c.variant || 'default') === selectedVariant);
        if (existing && existing.qty > 0) createQtyControls(existing.qty);
        else createChooseButton();
      }

      if (isWings) renderVariantButtons();
      renderActionByVariant();

      content.appendChild(title);
      content.appendChild(desc);
      content.appendChild(price);
      content.appendChild(actionArea);
      card.appendChild(imageWrapper);
      card.appendChild(content);
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
  // ensure no leftover scroll-blocker remains
  document.body.classList.remove('no-scroll');
  // Reviews handling on index.html
  const form = document.getElementById('reviewForm');
  if (form){
    loadReviews();
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('reviewName').value.trim();
      const text = document.getElementById('reviewText').value.trim();
      if (!name || !text) return;
      saveReview({name, text});
      document.getElementById('reviewName').value = '';
      document.getElementById('reviewText').value = '';
      loadReviews();
    });
  }

  // Initialize FAQ on index.html
  if (document.querySelector('.faq')){
    initFAQ();
  }

  // Render menu on menu.html
  if (document.getElementById('menuContainer')) {
    loadCart();
    renderMenuSections();
    renderCart();
    updateCartCount();

    // Cart modal controls
    const cartIconBtn = document.getElementById('cartIconBtn');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    const cartModalOverlay = document.getElementById('cartModalOverlay');
    const cartBackBtn = document.getElementById('cartBackBtn');
    if (cartIconBtn) cartIconBtn.addEventListener('click', openCartModal);
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartModal);
    if (cartModalOverlay) cartModalOverlay.addEventListener('click', closeCartModal);
    if (cartBackBtn) cartBackBtn.addEventListener('click', closeCartModal);
    // close cart on Escape and ensure no-scroll cleared
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setCartOpen(false);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({behavior:'smooth'});
      else window.location.href = a.href;
    });
  });
});
