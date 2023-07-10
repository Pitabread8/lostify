const axios = require('axios');
const qs = require('qs');
// require('dotenv').config();

const client_id = process.env.SPOTIFY_API_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

// const getAuth = async () => {
//     try {
//         const token_url = 'https://accounts.spotify.com/api/token';
//         const data = qs.stringify({ 'grant_type': 'client_credentials' });

//         const response = await axios.post(token_url, data, {
//             headers: {
//                 'Authorization': `Basic ${auth_token}`,
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         })
//         return response.data.access_token;
//     } catch (error) {
//         console.log(error);
//     }
// }

// const getData = async (api_url) => {
//     const access_token = await getAuth();
//     try {
//         const response = await axios.get(api_url, {
//             headers: {
//                 'Authorization': `Bearer ${access_token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.log(error);
//     }
// };

// let source;

// let d = getData("https://api.spotify.com/v1/search?q=tag:hipster&type=album&limit=1&offset=0");
// d.then(function (result) {
//     for (let i of result["albums"]["items"]) {
//         if (i["album_type"] === "single") {
//             let id = i["external_urls"]["spotify"].substring(31);
//             getData(`https://api.spotify.com/v1/albums/${id}/tracks`).then(function (r) {
//                 source = r["items"][0]["external_urls"]["spotify"].substring(31);
//                 console.log(source)
//                 // getData(`https://open.spotify.com/oembed?url=${r["items"][0]["external_urls"]["spotify"]}`).then(function (q) {
//                 //     console.log(q)
//                 // })
//             })
//         }
//     }
// })

// // const a = "b"
// // module.exports = {a};
