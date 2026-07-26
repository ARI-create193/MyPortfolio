import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

declare const process: any;
declare const fetch: any;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      {
        name: "configure-server",
        configureServer(server) {
          server.middlewares.use((req: any, res: any, next: any) => {
            if (req.url === "/api/contact" && req.method === "POST") {
              let body = "";
              req.on("data", (chunk: any) => {
                body += chunk;
              });
              req.on("end", async () => {
                try {
                  const { name, email, message } = JSON.parse(body);
                  const resendApiKey = env.RESEND_API_KEY;

                  if (!resendApiKey) {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ success: false, error: "Resend API key is not configured" }));
                    return;
                  }

                  const response = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${resendApiKey}`,
                    },
                    body: JSON.stringify({
                      from: "Portfolio Contact <onboarding@resend.dev>",
                      to: ["aryankaminwar@gmail.com"],
                      reply_to: email,
                      subject: `New Portfolio Message from ${name}`,
                      html: `
                        <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
                          <h2 style="color: #6a1b9a; border-bottom: 1px solid #ddd; padding-bottom: 8px;">New Contact Form Submission</h2>
                          <p><strong>Name:</strong> ${name}</p>
                          <p><strong>Email:</strong> ${email}</p>
                          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #6a1b9a; border-radius: 4px;">
                            <strong>Message:</strong><br/>
                            ${message.replace(/\n/g, "<br/>")}
                          </div>
                        </div>
                      `,
                    }),
                  });

                  const data = await response.json();

                  if (response.ok) {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ success: true, data }));
                  } else {
                    res.writeHead(response.status, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ success: false, error: data }));
                  }
                } catch (err: any) {
                  res.writeHead(500, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ success: false, error: err.message || "Internal Server Error" }));
                }
              });
            } else {
              next();
            }
          });
        },
      },
    ],
  };
});
