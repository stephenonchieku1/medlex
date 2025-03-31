export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    if (!body.brand_name) {
      return new Response(
        JSON.stringify({
          message: "Error: Medicine name is required in request body"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const FDA_API_URL = `https://api.fda.gov/drug/label.json?search=brand_name=${encodeURIComponent(
      body.brand_name
    )}&limit=1`;
    const response = await fetch(FDA_API_URL);
    const data = await response.json();
    return new Response(
      JSON.stringify({
        message: "Success",
        data
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error processing request",
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
