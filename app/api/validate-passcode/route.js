
export async function POST(req) {
    const { passcode } = await req.json();
    const validPasscode = process.env.NEXT_PUBLIC_PASSCODE; 
  
    if (passcode === validPasscode) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ success: false }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  