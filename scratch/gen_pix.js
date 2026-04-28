
const pixKey = "dd0ded1f-35ce-40c6-bef6-c9e33d505240";
const merchantName = "NEXPRINT";
const merchantCity = "ITABIRA";

function crc16(data) {
    let crc = 0xFFFF;
    for (let i = 0; i < data.length; i++) {
        crc ^= data.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            if (crc & 0x8000) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc <<= 1;
            }
        }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

function generatePix(amount) {
    const amountStr = amount.toFixed(2);
    
    // Merchant Account Info (Tag 26)
    const gui = "0014BR.GOV.BCB.PIX";
    const key = "01" + pixKey.length.toString().padStart(2, '0') + pixKey;
    const merchantAccountInfo = "26" + (gui.length + key.length).toString().padStart(2, '0') + gui + key;
    
    const parts = [
        "000201", // Payload Format Indicator
        merchantAccountInfo,
        "52040000", // Merchant Category Code
        "5303986",  // Currency BRL
        "54" + amountStr.length.toString().padStart(2, '0') + amountStr, // Amount
        "5802BR",   // Country
        "59" + merchantName.length.toString().padStart(2, '0') + merchantName,
        "60" + merchantCity.length.toString().padStart(2, '0') + merchantCity,
        "62070503***", // Info Adicional
        "6304"      // CRC16 Indicator
    ];
    
    const payload = parts.join("");
    const crc = crc16(payload);
    return payload + crc;
}

console.log("AMOUNT_8: " + generatePix(8.00));
console.log("AMOUNT_11: " + generatePix(11.00));
console.log("AMOUNT_GENERIC: " + generatePix(0)); // If we want to generate dynamically in JS later
