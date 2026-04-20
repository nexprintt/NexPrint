import "dotenv/config";

const MELHOR_ENVIO_URL = process.env.MELHOR_ENVIO_URL || "https://www.melhorenvio.com.br";
const MELHOR_ENVIO_TOKEN = process.env.MELHOR_ENVIO_TOKEN || "";
const CEP_ORIGEM = process.env.MELHOR_ENVIO_POSTAL_CODE_FROM || "35900001";

async function testShipping() {
  console.log("Using Token:", MELHOR_ENVIO_TOKEN.substring(0, 20) + "...");
  console.log("URL:", MELHOR_ENVIO_URL);
  
  const payload = {
    from: { postal_code: CEP_ORIGEM },
    to: { postal_code: "01001000" }, // Exemplo: Praça da Sé, SP
    products: [
      {
        id: "cracha",
        width: 11,
        height: 5,
        length: 16,
        weight: 0.3,
        insurance_value: 30,
        quantity: 1,
      },
    ],
  };

  try {
    const response = await fetch(`${MELHOR_ENVIO_URL}/api/v2/me/shipment/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${MELHOR_ENVIO_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    console.log("Status:", response.status);
    const data = await response.json();
    console.log("Data:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Fetch Error:", err);
  }
}

testShipping();
