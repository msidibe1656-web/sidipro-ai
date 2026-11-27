
exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Méthode non autorisée" })
    };
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({
          error: "La clé API OpenAI n'est pas configurée."
        })
      };
    }

    const data = JSON.parse(event.body || "{}");
    const message = data.message;

    if (!message || typeof message !== "string") {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Message manquant." })
      };
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Tu es SIDIPRO, un assistant spécialisé dans la configuration des smartphones Android et iPhone. Tu aides les utilisateurs avec des explications simples en français. Tu peux expliquer les fonctions des téléphones, guider l'installation d'applications et aider à résoudre les problèmes courants. Tu peux aider à traduire le bambara vers le français, mais signale les incertitudes. Ne demande jamais de mot de passe ni de code de vérification. Ne propose jamais de contourner les protections antivol ou de sécurité."
            },
            { role: "user", content: message }
          ]
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Erreur OpenAI:", result);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          error: result.error?.message || "Erreur du service IA."
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        reply: result.choices?.[0]?.message?.content || "Je n'ai pas pu préparer une réponse."
      })
    };

  } catch (error) {
    console.error("Erreur SIDIPRO:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Erreur interne de SIDIPRO." })
    };
  }
};
