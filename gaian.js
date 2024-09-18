const axios = require("axios");
const fs = require('fs');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Ganti dengan token bot dan chat ID kamu
const TELEGRAM_BOT_TOKEN = 'TOKEN_DARI_BOTFATHER';
const CHAT_ID = 'ID_TELEGRAM';

const sendTelegramMessage = async (message) => {
    try {
        console.log("Sending message to Telegram:", message);
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });
    } catch (error) {
        console.error("Error sending message to Telegram: ", error);
    }
};

(async () => {

    await sendTelegramMessage("*🤖Node Gaia dimulai*");

    try {
        console.log('BOT Auto SendCHAT GAIAN By [Peking404XYogiPrt666]\n\n');
        const addressList = await fs.readFileSync('keyword.txt', 'utf-8');
        const addressListArray = addressList.split('\n');

        for (let index = 1; index < addressListArray.length; index++) {
            const Wallet = addressListArray[index];
            console.log("Content Chat: " + Wallet + "\n");

            try {
                const response = await axios.post(
                    'https://NodeIdGaiaMu.us.gaianet.network/v1/chat/completions',
                    {
                        'messages': [
                            {
                                'role': 'system',
                                'content': 'You are a helpful assistant.'
                            },
                            {
                                'role': 'user',
                                'content': `${Wallet}`
                            }
                        ]
                    },
                    {
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                );

                console.log("Response: [" + response.data.choices[0].message.content + "]\n");
                console.log("WAIT 5 DETIK \n\n");
                await delay(5000);
            } catch (postError) {
                console.error("Error during axios post: ", postError);

                if (axios.isAxiosError(postError) && postError.response && postError.response.status === 404) {
                    await sendTelegramMessage(`*🤖Node Berhenti Silahkan Restart Node Gaiamu*`);
                    break; 
                }
            }
        }
    } catch (error) {
        console.error("Error: ", error);
        await sendTelegramMessage(`Error: ${error.message}`);
    }
})();
