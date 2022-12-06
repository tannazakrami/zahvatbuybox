const sleep = s => new Promise(resolve => setTimeout(resolve, s * 1000 * 60))
module.exports = { sleep }