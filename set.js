const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUM2VTU3ZEFXRUw5WmRmblFTMUpWVmtJQ1AwVU5GNEtFZ01BTWtoUlFtUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaEdLYVdyU0dJa2NnYWQ3NklNemJNSzNoRlpyNzNPWjhPeTJMMURrNHZHRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVSnJNeHd4cC9MR0l4NVlieEdmNmRCSWxrb1VLSDVOd0R2U053anNvREVZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDRThzemNQZms2V3lVQ2Q5TEoxUjgrSCtrY2xqdm41YjQ3bWVWdmpSMENnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1ESFErVmZyTnN1TXNUTHhUWHdYK0J0S2VFSGp5a203Um9IYjJBbklMSFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVPbW5pbTU0djhiNEJhaStzUGs4d3N2ZGdKZEtTNHF2UExXa2dBMnFxaTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEM3SVFwaFZYc1JLZHpRek5oMzVnVURSSzVPVURyOThsWHRFK1VzU0RHQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieGJaaExlZ2NNRXRZRXJncTZEczMxWnYrNFZyUkhVN3VHQ3dicHJpSTFoZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpzRUQ4UWs1T0xZQXRObVRhYnlBcXFYY0RteTNzYlRPTG5VVkNyQ3g2TU9pMFBWLzBUdTNEMnZRVHNGOHdNQjBtbmo4RUpEOWFFQkNHdEFKWWcreENBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEyLCJhZHZTZWNyZXRLZXkiOiJnM054NU4zVkN2N0krZVRsOG1xWFJ5LzJWRUZuTkgwbHlXZnU4M1pLQUVNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ4aXg1OTdYV1NKZTJQdUgxYjE1bmNBIiwicGhvbmVJZCI6IjE4ZWMyN2NlLWYxZWUtNGQxOC05ZTJiLThkZmVmOGEyMjVhMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiQjBwVm9rcFYxUTBrcDZ3TmFHaGptM1BuOTg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1Jxa2NML1VDd2QyUHllZWtJRVRsUlZGMkhnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRNWVFDQVBGIiwibWUiOnsiaWQiOiIyNDE2MDMyNDc5NzoyOEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJib3QifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ056SzdxUUVFSXVudzdVR0dBb2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkppZE11bkwwZlVTVk9sMDg1aDNPNWxoQSs5QTRPaDV0aFh2L1BrenJPV0U9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlZBZ1JRZm00b1oxOHV5SUhLaXVHUlBhYkE5WTczTkhtZDQrRDkxWnpOb3dydHUyT3p1bGZ6dUNEVlptaTdXK0VFNjhkVUNtSThMQ2FJMVJaSEl6R0F3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJrYjZHRTR5Yk9ybEg2UGFaWVRUVzBLdnNFbzY5czNrbGdlQTgvVmlDQms2V2ZhbWQyVk9kZW5Tb1A3aTRRUzNkQXNrZzQ1K05sTXNJVkVIQ1JqVEFEUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI0MTYwMzI0Nzk3OjI4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNZblRMcHk5SDFFbFRwZFBPWWR6dVpZUVB2UU9Eb2ViWVY3L3o1TTZ6bGgifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjI4NjQ1Mzd9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "kïñg khalid",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348023898600",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'KHALID MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/1774326c63cc0b0e87680.jpg,https://telegra.ph/file/2e5cb1ec0619781c9fa41.jpg,https://telegra.ph/file/91e4fd1e8ce0fe6bb2253.jpg,https://telegra.ph/file/19df783b5751341a78780.jpg,https://telegra.ph/file/56dfb94e0f8b32fab33a7.jpg,https://telegra.ph/file/fe8a25fb17af3926e6048.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
