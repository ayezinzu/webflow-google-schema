
const Axios = require('axios');
const Webflow = require('webflow-api')
let token = "3af01f7685f25901a74da7532f8052f0f07c2b50b9ced0d905d2689ab4847778"


exports.handler = async function (event) {
    console.log(event.queryStringParameters)
    // const http = Axios.create({
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       'accept-version': '1.0.0'
    //     },
    //   });

    //   const info = await http.get('https://api.webflow.com/sites/60f5180acd59a3f6e16540ab/collections/618ee908fbfef2849ad16c4c');
    //   console.log(info.data);
    
    const webflow = new Webflow({ token: token });

    // Promise <Collection>
    const item = await webflow.item({ collectionId: event.body.collection, itemId: event.body.item });
    let includesQorA = (key) => {
        if(key.includes("q") && key.length === 2){
            return key
        }
    }
    console.log(Object.keys(item).filter(includesQorA))
    let filteredKeys = Object.keys(item).filter(includesQorA)
    let faqArray = []
    filteredKeys.forEach((filteredKey) => {
        faqArray.push({
            q: item[filteredKey],
            a: item[`a${parseInt(filteredKey.slice(1))}`]
        })
    })
    console.log(faqArray)





    return {
        statusCode: 200,
        body: JSON.stringify({
            message: faqArray
        })
    }
}