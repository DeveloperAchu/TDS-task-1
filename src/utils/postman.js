const request = require("request");

/*
    This function returns a promise after invoking the endpoint. If there is an error,
    the promise rejects with an error message. If the request is successful, the promise
    resolve with the response body
*/
const postman = () => {
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
    ).catch((e) => {
        return e;
    });
};

// Export the function to use in other files
module.exports = postman;