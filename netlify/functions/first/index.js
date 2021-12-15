const axios = require("axios")
exports.handler = async function () {
    const instance = axios.create({
        baseURL: 'https://webflow-serverless.netlify.app/.netlify/functions/'
      });
      const data = await instance.get("first")
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: data.data
        })
    }
}