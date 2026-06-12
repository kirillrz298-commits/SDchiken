const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'database.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
  }
});

// Promisified database helpers
const query = {
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  },
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};

// Database Initialization
async function initDB() {
  // 1. Create Users table
  await query.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Try to add role column to users table if it's an existing database
  try {
    await query.run("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'");
  } catch (err) {
    // Column might already exist, ignore error
  }

  // 2. Create Products table
  await query.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT UNIQUE NOT NULL,
      description TEXT,
      price TEXT NOT NULL,
      image_path TEXT,
      category TEXT NOT NULL
    )
  `);

  // 3. Create Orders table
  await query.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      date TEXT NOT NULL,
      total INTEGER NOT NULL,
      address TEXT NOT NULL,
      comment TEXT,
      status TEXT DEFAULT 'Принят',
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);

  // 4. Create Order Items table
  await query.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_title TEXT NOT NULL,
      qty INTEGER NOT NULL,
      price TEXT NOT NULL,
      variant TEXT DEFAULT 'default',
      FOREIGN KEY(order_id) REFERENCES orders(id)
    )
  `);

  // 5. Create Reviews table
  await query.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      text TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Очистим таблицу товаров для полного пересоздания структуры и данных
  console.log('Очистка и полное обновление каталога товаров в БД...');
  await query.run("DELETE FROM products");

  const defaultProducts = [
    // Бургеры
    {title: 'SD Бургер', price: '2 190 ₸', desc: 'Хрустящая курица, помидор, соленый огурец, сыр чеддер, соус', img: 'menu1/sd-burger.png', cat: 'Бургеры'},
    {title: 'Классический бургер', price: '2 000 ₸', desc: 'Хрустящая курица, сыр чеддер, айсберг, соус', img: 'menu1/classic-burger.png', cat: 'Бургеры'},
    {title: 'Острый бургер', price: '2 290 ₸', desc: 'Хрустящая курица, айсберг, помидор, сыр чеддер, соус', img: 'menu1/spicy-burger.png', cat: 'Бургеры'},
    {title: 'SD Бургер Комбо', price: '3 190 ₸', desc: 'SD Бургер, картофель фри, кола 0,5 л, соус на выбор', img: 'menu1/sd-burger-combo.png', cat: 'Бургеры'},
    {title: 'Классический бургер Комбо', price: '3 000 ₸', desc: 'Классический бургер, картофель фри, кола 0,5 л, соус на выбор', img: 'menu1/classic-burger-combo.png', cat: 'Бургеры'},
    {title: 'Острый бургер Комбо', price: '3 290 ₸', desc: 'Острый бургер, картофель фри, кола 0,5 л, соус на выбор', img: 'menu1/spicy-burger-combo.png', cat: 'Бургеры'},
    
    // Донеры
    {title: 'Донер', price: '1 890 ₸', desc: 'Хрустящая курица, свежие овощи, соленый огурец, соус', img: 'menu1/doner.png', cat: 'Донеры'},
    {title: 'Донер в багете', price: '2 100 ₸', desc: 'Хрустящая курица, свежие овощи, соленый огурец, соус', img: 'menu1/doner-baguette.png', cat: 'Донеры'},
    {title: 'Донер Комбо', price: '2 890 ₸', desc: 'Донер, картофель фри, кола 0,5 л, соус на выбор', img: 'menu1/doner-combo.png', cat: 'Донеры'},
    {title: 'Донер в багете Комбо', price: '3 190 ₸', desc: 'Донер в багете, картофель фри, кола 0,5 л, соус на выбор', img: 'menu1/doner-baguette-combo.png', cat: 'Донеры'},

    // Сеты
    {title: 'Сет Friends', price: '10 990 ₸', desc: '4 классических бургера, 12 хрустящих крыльев, фри 4 шт, 4 соуса, кола 1 л', img: 'menu1/set-friends.png', cat: 'Сеты'},
    {title: 'Сет Chicken Mafia', price: '12 690 ₸', desc: '24 хрустящих крыла, 6 куриных ножек, 6 стрипсов, фри 3 шт, кола 1 л, 4 соуса', img: 'menu1/set-chicken-mafia.png', cat: 'Сеты'},
    {title: 'FAMILY BOX', price: '14 990 ₸', desc: '💣 самый прибыльный: 4 бургера, 20 крыльев, 9 стрипсов, 4 фри, 4 соуса, cola 1.5л', img: 'menu1/Family Box.jpg', cat: 'Сеты'},

    // Закуски и крылья
    {title: 'Крылышки острые — 6 шт', price: '2 190 ₸', desc: 'Острые крылышки с фирменным соусом', img: 'menu1/wings.png', cat: 'Закуски и крылья'},
    {title: 'Крылышки острые — 12 шт', price: '3 990 ₸', desc: 'Острые крылышки с фирменным соусом', img: 'menu1/wings.png', cat: 'Закуски и крылья'},
    {title: 'Крылышки острые — 20 шт', price: '5 990 ₸', desc: 'Острые крылышки с фирменным соусом', img: 'menu1/wings.png', cat: 'Закуски и крылья'},
    {title: 'Крылышки острые — 30 шт', price: '7 990 ₸', desc: 'Острые крылышки с фирменным соусом', img: 'menu1/wings.png', cat: 'Закуски и крылья'},
    {title: 'Крылышки острые — 40 шт', price: '9 990 ₸', desc: 'Острые крылышки с фирменным соусом', img: 'menu1/wings.png', cat: 'Закуски и крылья'},
    {title: 'Куриные ножки острые — 3 шт', price: '2 690 ₸', desc: 'Острые куриные ножки с сильным вкусом', img: 'menu1/chicken-legs.png', cat: 'Закуски и крылья'},
    {title: 'Куриные ножки острые — 6 шт', price: '5 090 ₸', desc: 'Острые куриные ножки с сильным вкусом', img: 'menu1/chicken-legs.png', cat: 'Закуски и крылья'},
    {title: 'Куриные ножки острые — 9 шт', price: '7 490 ₸', desc: 'Острые куриные ножки с сильным вкусом', img: 'menu1/chicken-legs.png', cat: 'Закуски и крылья'},
    {title: 'Наггетсы классические — 9 шт', price: '1 990 ₸', desc: 'Классические куриные наггетсы', img: 'menu1/nuggets.png', cat: 'Закуски и крылья'},
    {title: 'Фри', price: '990 ₸', desc: 'Хрустящий картофель фри', img: 'menu1/french-fries.png', cat: 'Закуски и крылья'},
    {title: 'Стрипсы острые — 9 шт', price: '3 390 ₸', desc: 'Острые куриные стрипсы', img: 'menu1/strips.png', cat: 'Закуски и крылья'},
  ];

  for (const prod of defaultProducts) {
    await query.run(
      "INSERT OR IGNORE INTO products (title, price, description, image_path, category) VALUES (?, ?, ?, ?, ?)",
      [prod.title, prod.price, prod.desc, prod.img, prod.cat]
    );
  }
  console.log('Синхронизация каталога товаров завершена.');

  // Create admin user if it doesn't exist
  const adminEmail = 'admin@sdchicken.kz';
  const adminPhone = '+77000000000';
  const adminName = 'Администратор';
  const adminPassword = 'admin'; // Plain password "admin"

  const adminExists = await query.get("SELECT id FROM users WHERE email = ?", [adminEmail]);
  if (!adminExists) {
    const { hashPassword } = require('./auth');
    const adminPassHash = hashPassword(adminPassword);
    await query.run(
      "INSERT INTO users (name, phone, email, password_hash, role) VALUES (?, ?, ?, ?, ?)",
      [adminName, adminPhone, adminEmail, adminPassHash, 'admin']
    );
    console.log('Seeded Admin account successfully.');
  }
}

// Automatically initialize database
initDB().catch(err => console.error('Database initialization failed:', err));

module.exports = {
  query,
  db
};
