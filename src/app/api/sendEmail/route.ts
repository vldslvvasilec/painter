import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
    }

    await sgMail.send({
      to: process.env.FROM_EMAIL!,
      from: process.env.FROM_EMAIL!,
      subject: "Новое сообщение с формы контактов",
      text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`,
      html: `<p><strong>Имя:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Сообщение:</strong> ${message}</p>`,
    });

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка отправки email" }, { status: 500 });
  }
}
