const Webflow = require("webflow-api");
require("dotenv").config();
let token = process.env.TOKEN;
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

exports.handler = async function (event) {
  console.log(event.queryStringParameters);

  const webflow = new Webflow({ token: token });

  // Promise <Collection>
  const item = await webflow.item({
    collectionId: process.env.COLLECTION,
    itemId: event.queryStringParameters.item,
  });
  let includesQorA = (key) => {
    if (key.includes("q") && key.length === 2) {
      return key;
    }
  };
  console.log(Object.keys(item).filter(includesQorA));
  let filteredKeys = Object.keys(item).filter(includesQorA);
  let faqArray = [];
  filteredKeys.forEach((filteredKey) => {
    faqArray.push({
      q: item[filteredKey],
      a: item[`a${parseInt(filteredKey.slice(1))}`],
    });
  });
  console.log(faqArray);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: faqArray,
    }),
  };
};
