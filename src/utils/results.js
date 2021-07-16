const request = require("request");

const results = () => {
    const url = "https://postman-echo.com/get?foo1=bar1&foo2=bar2";
    return new Promise(
        (resolve, reject) => {
            request(
                {
                    url,
                    json: true
                },
                (error, response) => {
                    if (error) {
                        return reject("Unable to get response");
                    }
                    return resolve(response.body);
                }
            );
        }
    );
};

module.exports = results;