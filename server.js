const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const { query } = require('./database');
const { hashPassword, verifyPassword } = require('./auth');

// Load environment variables from .env file if it exists
if (fs.existsSync('.env')) {
  fs.readFileSync('.env', 'utf8').split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      if (key && !key.startsWith('#')) {
        process.env[key] = val;
      }
    }
  });
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Fallback to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// GET /api/products - Get all products from SQLite DB
app.get('/api/products', async (req, res) => {
  try {
    const products = await query.all("SELECT * FROM products ORDER BY category, id");
    res.json(products);
  } catch (err) {
    console.error('Failed to get products:', err.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST /api/auth/register - Register new user
app.post('/api/auth/register', async (req, res) => {
  const { name, phone, email, password } = req.body;
  if (!name || !phone || !email || !password) {
    return res.status(400).json({ error: 'Все поля обязательны к заполнению' });
  }

  try {
    // Check if phone or email already exists
    const existing = await query.get(
      "SELECT id FROM users WHERE phone = ? OR email = ?",
      [phone, email]
    );
    if (existing) {
      return res.status(400).json({ error: 'Пользователь с такой почтой или номером телефона уже зарегистрирован' });
    }

    // Hash the password securely using PBKDF2
    const passHash = hashPassword(password);

    // Insert user into DB
    const result = await query.run(
      "INSERT INTO users (name, phone, email, password_hash) VALUES (?, ?, ?, ?)",
      [name, phone, email, passHash]
    );

    const newUser = {
      id: result.id,
      name,
      phone,
      email,
      role: 'user',
      orders: []
    };

    res.status(201).json({ success: true, user: newUser });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ error: 'Ошибка при регистрации' });
  }
});

// POST /api/auth/login - Login user
app.post('/api/auth/login', async (req, res) => {
  const { loginVal, password } = req.body;
  if (!loginVal || !password) {
    return res.status(400).json({ error: 'Заполните все поля' });
  }

  try {
    // Find user by phone or email
    const user = await query.get(
      "SELECT * FROM users WHERE email = ? OR phone = ?",
      [loginVal, loginVal]
    );
    if (!user) {
      return res.status(400).json({ error: 'Неверная почта/телефон или пароль' });
    }

    // Verify hashed password
    const isMatch = verifyPassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Неверная почта/телефон или пароль' });
    }

    // Get order history for this user
    const orders = await query.all(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC",
      [user.id]
    );
    
    // Attach order items for each order
    for (const order of orders) {
      order.items = await query.all(
        "SELECT product_title AS title, qty, price, variant FROM order_items WHERE order_id = ?",
        [order.id]
      );
    }

    const userData = {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      orders: orders
    };

    res.json({ success: true, user: userData });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Ошибка при входе в систему' });
  }
});

// GET /api/user/orders - Get orders history for user
app.get('/api/user/orders', async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: 'userId parameter is required' });
  }

  try {
    const orders = await query.all(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC",
      [userId]
    );

    for (const order of orders) {
      order.items = await query.all(
        "SELECT product_title AS title, qty, price, variant FROM order_items WHERE order_id = ?",
        [order.id]
      );
    }

    res.json(orders);
  } catch (err) {
    console.error('Failed to get orders history:', err.message);
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
});

// POST /api/order - Order notification & SQLite saving
app.post('/api/order', async (req, res) => {
  const { name, phone, address, items, total, comment, userId } = req.body;
  
  console.log('\n========================================');
  console.log(`🍗 НОВЫЙ ЗАКАЗ В SD CHICKEN 🍗`);
  console.log(`👤 Клиент: ${name}`);
  console.log(`📞 Телефон: ${phone}`);
  console.log(`📍 Адрес: ${address}`);
  console.log(`📦 Содержимое заказа:`);
  let totalItemsCount = 0;
  if (Array.isArray(items)) {
    items.forEach((item, idx) => {
      console.log(`   ${idx + 1}. ${item.title} x${item.qty} (${item.price})`);
      totalItemsCount += item.qty;
    });
  }
  console.log(`🔢 Общее количество: ${totalItemsCount} шт.`);
  console.log(`💰 Сумма: ${total ? total.toLocaleString('ru-RU') : '0'} ₸`);
  if (comment) {
    console.log(`💬 Комментарий: ${comment}`);
  }
  if (userId) {
    console.log(`👤 ID Пользователя: ${userId}`);
  }
  console.log('========================================\n');

  try {
    // 1. Insert order to SQLite DB
    const dateStr = new Date().toLocaleDateString('ru-RU') + ' ' + new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'});
    const orderResult = await query.run(
      "INSERT INTO orders (user_id, date, total, address, comment) VALUES (?, ?, ?, ?, ?)",
      [userId || null, dateStr, total, address, comment]
    );

    const orderId = orderResult.id;

    // 2. Insert items
    if (Array.isArray(items)) {
      for (const item of items) {
        // Parse variant from string or item parameter
        const variant = item.variant || 'default';
        await query.run(
          "INSERT INTO order_items (order_id, product_title, qty, price, variant) VALUES (?, ?, ?, ?, ?)",
          [orderId, item.title, item.qty, item.price, variant]
        );
      }
    }

    // 3. Format Telegram notification if configured
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;
    if (tgToken && tgChatId) {
      let tgItemsText = '';
      if (Array.isArray(items)) {
        items.forEach((item, idx) => {
          tgItemsText += `${idx + 1}. ${item.title} x${item.qty} = ${item.price}\n`;
        });
      }
      const message = `🍗 *Новый заказ в SD Chicken* 🍗\n\n` +
        `📞 *Телефон:* ${phone}\n` +
        `👤 *Имя:* ${name}\n` +
        `📍 *Адрес:* ${address}\n\n` +
        `📦 *Заказ:* \n${tgItemsText}\n` +
        `🔢 *Количество:* ${totalItemsCount} шт.\n` +
        `💰 *Сумма:* ${total ? total.toLocaleString('ru-RU') : '0'} ₸` +
        (comment ? `\n💬 *Комментарий:* ${comment}` : '');

      const data = JSON.stringify({
        chat_id: tgChatId,
        text: message,
        parse_mode: 'Markdown'
      });

      const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: `/bot${tgToken}/sendMessage`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
        }
      };

      const request = https.request(options, (response) => {
        response.on('data', () => {});
      });

      request.on('error', (e) => {
        console.error('Telegram message failed to send:', e);
      });

      request.write(data);
      request.end();
    }

    res.status(200).json({ success: true, message: 'Order received and saved to DB', orderId });
  } catch (err) {
    console.error('Failed to save order to DB:', err.message);
    res.status(500).json({ error: 'Order notification failed on server side' });
  }
});

// GET /api/reviews - Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await query.all("SELECT name, text, rating FROM reviews ORDER BY id DESC");
    res.json(reviews);
  } catch (err) {
    console.error('Failed to get reviews:', err.message);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST /api/reviews - Add review
app.post('/api/reviews', async (req, res) => {
  const { name, text, rating } = req.body;
  if (!name || !text) {
    return res.status(400).json({ error: 'Имя и отзыв обязательны' });
  }

  try {
    await query.run(
      "INSERT INTO reviews (name, text, rating) VALUES (?, ?, ?)",
      [name, text, rating || 5]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Failed to save review:', err.message);
    res.status(500).json({ error: 'Failed to save review' });
  }
});

// Admin verification middleware
async function isAdmin(req, res, next) {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return res.status(401).json({ error: 'Не авторизован' });
  }
  try {
    const user = await query.get("SELECT role FROM users WHERE id = ?", [userId]);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Доступ запрещен' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}

// Admin API endpoints

// GET /api/admin/users - Get all users
app.get('/api/admin/users', isAdmin, async (req, res) => {
  try {
    const users = await query.all("SELECT id, name, phone, email, role, created_at FROM users ORDER BY id DESC");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/users/:id - Delete user
app.delete('/api/admin/users/:id', isAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    if (String(userId) === String(req.headers['x-user-id'])) {
      return res.status(400).json({ error: 'Нельзя удалить самого себя' });
    }
    await query.run("DELETE FROM users WHERE id = ?", [userId]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/orders - Get all orders
app.get('/api/admin/orders', isAdmin, async (req, res) => {
  try {
    const orders = await query.all("SELECT * FROM orders ORDER BY id DESC");
    for (const order of orders) {
      order.items = await query.all(
        "SELECT product_title AS title, qty, price, variant FROM order_items WHERE order_id = ?",
        [order.id]
      );
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/orders/:id/status - Update order status
app.post('/api/admin/orders/:id/status', isAdmin, async (req, res) => {
  const { status } = req.body;
  try {
    await query.run("UPDATE orders SET status = ? WHERE id = ?", [status, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/products - Create product
app.post('/api/admin/products', isAdmin, async (req, res) => {
  const { title, description, price, image_path, category } = req.body;
  if (!title || !price || !category) {
    return res.status(400).json({ error: 'Название, цена и категория обязательны' });
  }
  try {
    const result = await query.run(
      "INSERT INTO products (title, description, price, image_path, category) VALUES (?, ?, ?, ?, ?)",
      [title, description, price, image_path || '', category]
    );
    res.json({ success: true, productId: result.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/admin/products/:id - Update product
app.put('/api/admin/products/:id', isAdmin, async (req, res) => {
  const { title, description, price, image_path, category } = req.body;
  if (!title || !price || !category) {
    return res.status(400).json({ error: 'Название, цена и категория обязательны' });
  }
  try {
    await query.run(
      "UPDATE products SET title = ?, description = ?, price = ?, image_path = ?, category = ? WHERE id = ?",
      [title, description, price, image_path || '', category, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/products/:id - Delete product
app.delete('/api/admin/products/:id', isAdmin, async (req, res) => {
  try {
    await query.run("DELETE FROM products WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper function for https POST
function httpsPost(url, payload) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const data = JSON.stringify(payload);

    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(responseBody));
          } catch (e) {
            reject(new Error('Invalid JSON response'));
          }
        } else {
          reject(new Error(`HTTP Error ${res.statusCode}: ${responseBody}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(data);
    req.end();
  });
}

// POST /api/chat - AI assistant chat matching endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Сообщение обязательно' });
  }

  const fallbackMsg = 'извените я не могу ответить на вас вопрос напишите на номер +7 777 698 4098';

  try {
    // 1. Fetch live products from DB
    const products = await query.all("SELECT title, price, description, category FROM products");

    // 2. Prepare system instructions
    const systemInstruction = `Ты — ИИ-помощник ресторана быстрого питания "SD Chicken".
Твой единственный функционал и цель — помогать пользователям в подборе товаров из меню нашего ресторана и отвечать на вопросы, касающиеся рекомендаций блюд.
Если пользователь просит посоветовать сытный обед, перекус, комбо, бургеры или донеры, порекомендуй товары из нашего каталога.
Вот наше актуальное меню (с ценами и описанием):
${JSON.stringify(products)}

Правила общения:
1. Отвечай ТОЛЬКО на вопросы, касающиеся подбора товаров, цен, меню, рекомендаций блюд и работы ресторана SD Chicken.
2. Если пользователь задает вопрос на отвлеченную тему (не относящуюся к подбору товаров, рекомендациям еды или нашему ресторану), или если ты не знаешь ответа, ты должен строго и дословно ответить следующей фразой без каких-либо изменений или дополнений: "извените я не могу ответить на вас вопрос напишите на номер +7 777 698 4098".
3. Пиши кратко, дружелюбно, на русском языке и используй эмодзи для блюд.`;

    const API_KEY = process.env.GEMINI_API_KEY || '';
    if (!API_KEY) {
      console.error('Error: GEMINI_API_KEY is not defined in process.env or .env file');
      return res.json({ reply: fallbackMsg });
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const payload = {
      systemInstruction: {
        parts: [
          {
            text: systemInstruction
          }
        ]
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: message
            }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.2
      }
    };

    const data = await httpsPost(url, payload);
    let reply = '';
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      reply = data.candidates[0].content.parts[0].text.trim();
    }

    if (!reply) {
      reply = fallbackMsg;
    }

    res.json({ reply });
  } catch (err) {
    console.error('Chat endpoint failed:', err.message);
    res.json({ reply: fallbackMsg });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
