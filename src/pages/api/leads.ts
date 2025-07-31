export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API);

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return new Response(JSON.stringify({ error: "Invalid content type" }), { status: 400 });
    }

    const body = await request.json();

    const { name, company, industry, employees, email, message } = body;

    const { error } = await resend.emails.send({
      from: "leads@officetwo.com",
      to: "info@officetwo.com, trinidad@officetwo.com",
      subject: "New OfficeTwo Lead",
      html: `
        <h2>New Lead from the Contact Us form:</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Team Size:</strong> ${employees}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>

        <h2>Please contact him as soon as posible</h2>
      `,
    });

    await fetch(import.meta.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: `📥 New Lead from the Contact Us form!\n\n*Name:* ${name}\n*Email:* ${email}\n*Company:* ${company}\n*Industry:* ${industry}\n*Employees:* ${employees}\n*Message:* ${message}`
      }),
    });    

    if (error) {
      return new Response(JSON.stringify({ success: false, error }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
