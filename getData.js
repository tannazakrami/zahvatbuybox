const {google} = require('googleapis');
const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
})

module.exports = async function getData(){
    const client = await auth.getClient();
    const googleSheets = google.sheets({version: "v4", auth: client});
    const spreadsheetId = "1cxR0CXu-3GuWtSYcs2XFKpwTaj-WglBEQB0zswZ1_Dc";
    let data = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "A2:D2"
    })
    return data.data.values || undefined;
}