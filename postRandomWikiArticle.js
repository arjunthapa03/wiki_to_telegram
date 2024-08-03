const axios = require('axios');
const { Telegraf } = require('telegraf');

const bot = new Telegraf('7138370312:AAENCHBilzK8TIMEcFz6PzUBWL-YgS_3ZOs');

const chatId = '6192722165';

async function getRandomWikiArticle() {
    try {
        const randomPageResponse = await axios.get('https://en.wikipedia.org/api/rest_v1/page/random/summary');
        const { title, extract, content_urls } = randomPageResponse.data;

        
        const message = `*${title}*\n\n${extract}\n\n[Read more](${content_urls.desktop.page})`;

        return message;
    } catch (error) {
        console.error('Error fetching random Wikipedia article:', error);
        return 'Failed to fetch a random Wikipedia article.';
    }
}

// Function to post the message to the Telegram group
async function postToTelegram(message) {
    try {
        await bot.telegram.sendMessage(chatId, message, { parse_mode: 'Markdown' });
        console.log('Message posted successfully');
    } catch (error) {
        console.error('Error posting message to Telegram:', error);
    }
}

// Main function to execute the script
async function main() {
    const message = await getRandomWikiArticle();
    await postToTelegram(message);
}

main();
