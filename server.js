const express = require('express');
const path = require('path');
const https = require('https');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Fallback to index.html for single-page style navigation if needed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// POST endpoint for order notifications
app.post('/api/order', (req, res) => {
  const { name, phone, address, items, total, comment } = req.body;
  
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
  console.log('========================================\n');

  // Format Telegram notification if configured
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

  res.status(200).json({ success: true, message: 'Order received successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
