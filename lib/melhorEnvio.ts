const MELHOR_ENVIO_URL = process.env.MELHOR_ENVIO_URL || "https://www.melhorenvio.com.br";
const MELHOR_ENVIO_TOKEN = process.env.MELHOR_ENVIO_TOKEN || "";
const CEP_ORIGEM = process.env.MELHOR_ENVIO_POSTAL_CODE_FROM || "35900001";

export interface ShippingOption {
  id: number;
  name: string;
  price: string;
  custom_price: string;
  discount: string;
  currency: string;
  delivery_time: number;
  custom_delivery_time: number;
  error?: string;
  company: {
    id: number;
    name: string;
    picture: string;
  };
  highlight?: string;
}

export async function calculateShipping(
  destinationCep: string,
  subtotal: number,
  quantity: number = 1
): Promise<ShippingOption[]> {
  try {
    if (!MELHOR_ENVIO_TOKEN) {
      console.warn("Melhor Envio token not configured.");
      return [];
    }

    // Default dimensions for a badge package (cm/kg)
    const payload = {
      from: {
        postal_code: CEP_ORIGEM,
      },
      to: {
        postal_code: destinationCep.replace(/\D/g, ""),
      },
      products: [
        {
          id: "cracha",
          width: 11,
          height: 5,
          length: 16,
          weight: 0.3,
          insurance_value: subtotal > 0 ? subtotal : 10,
          quantity: quantity,
        },
      ],
      options: {
        receipt: false,
        own_hand: false,
      }
    };

    const response = await fetch(`${MELHOR_ENVIO_URL}/api/v2/me/shipment/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${MELHOR_ENVIO_TOKEN}`,
        "User-Agent": "NexPrint", 
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error calling Melhor Envio API:", response.status, errorText);
      return [];
    }

    const data = await response.json();
    
    // Melhor Envio can return an array of objects.
    // We should filter out options that have an 'error' or negative/empty price.
    // Ensure we only return valid options.
    const validOptions = (data as ShippingOption[]).filter((option) => {
      if (option.error) return false;
      const price = parseFloat(option.custom_price || option.price);
      return !isNaN(price) && price > 0;
    });

    if (validOptions.length === 0) return [];

    // Sort by price (cheaper first)
    validOptions.sort((a, b) => {
      const priceA = parseFloat(a.custom_price || a.price);
      const priceB = parseFloat(b.custom_price || b.price);
      return priceA - priceB;
    });

    const cheapest = { ...validOptions[0], highlight: "Mais Econômico" };

    let fastest = validOptions[0];
    let minDays = fastest.custom_delivery_time || fastest.delivery_time;

    for (const opt of validOptions) {
      const days = opt.custom_delivery_time || opt.delivery_time;
      if (days < minDays) {
        minDays = days;
        fastest = opt;
      }
    }

    if (cheapest.id === fastest.id) {
       return [cheapest];
    }

    const fastestWithHighlight = { ...fastest, highlight: "Mais Rápido" };

    return [cheapest, fastestWithHighlight];
  } catch (error) {
    console.error("Exception calculating shipping:", error);
    return [];
  }
}
