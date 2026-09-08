const token = '8613046641:AAF13N1KcJ5ovCsLjOzkHl5OyYXQSVqH-mM';
const chatId = '8271609334';

fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    chat_id: chatId,
    text: `SubmitKit bot connected!\n\nYou will now get an instant message here every time a student pre-orders a project on submitkit.in`,
    parse_mode: 'HTML',
  }),
})
  .then(r => r.json())
  .then(d => console.log('Result:', JSON.stringify(d, null, 2)))
  .catch(e => console.error('Error:', e));
