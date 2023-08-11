var https = require('https');

const API_URL = "https://uselessfacts.jsph.pl/api/v2/facts/random"

exports.handler = async (event, context) => {
  return await new Promise((resolve, reject) => {
    https.get(API_URL, (resp) => {
      let data = ''
      let value = ''
      resp.on('data', chunk => {
        data += chunk
      });
      resp.on('end', () => {
        value = JSON.parse(data).value
        resolve(
          {
            "response_type": "in_channel",
            "blocks": [
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": "You found the *Fun Facts* Shortcut! Congrats 🥳"
                }
              },
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": `This slash's fun fact is, drumb roll please!!! \n\n ${JSON.parse(data).text}`
                }
              }
            ]
          }
        )

      });
    }).on('error', reject);
  })
};
