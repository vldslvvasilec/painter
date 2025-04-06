import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaFacebookMessenger, FaMobileAlt, FaTelegram, FaViber, FaWhatsapp } from "react-icons/fa";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { ClipLoader } from "react-spinners";

export default function Contacts() {
  const { t } = useTranslation();

  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const viberNumber = process.env.NEXT_PUBLIC_VIBER_NUMBER;
  const telegramUsername = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME;
  const messengerUsername = process.env.NEXT_PUBLIC_MESSENGER_USERNAME;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"loading" | "success" | "error" | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      name.trim() !== "" &&
      email.trim() !== "" &&
      message.trim() !== "" &&
      !emailError && !nameError && !messageError
    );
  }, [name, email, message, emailError, nameError, messageError]);

  const validateEmail = async () => {
    if (!email) {
      setEmailError(t("contacts.invalid_email"));
      return;
    }
    try {
      const response = await fetch(`/api/validateEmail?email=${encodeURIComponent(email)}`);
      const result = await response.json();
      setEmailError(result.valid ? null : t("contacts.invalid_email"));
    } catch {
      setEmailError(t("contacts.invalid_email"));
    }
  };

  const validateName = () => {
    setNameError(name.trim() ? null : t("contacts.enter_name"));
  };

  const validateMessage = () => {
    setMessageError(message.trim() ? null : t("contacts.enter_message"));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus("success");
        setTimeout(() => {
          setStatus(null);
          setName("");
          setEmail("");
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus(null), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="contacts" className="contacts">
      <h1 className="contacts-title">{t("contacts.title")}</h1>
      <section className="contacts-icons">
        {phoneNumber && (
          <Link href={`tel:${phoneNumber}`} className="contacts-link telefon">
            <FaMobileAlt />
          </Link>
        )}
        {whatsappNumber && (
          <Link href={`https://wa.me/${whatsappNumber}`} className="contacts-link whatsapp">
            <FaWhatsapp />
          </Link>
        )}
        {viberNumber && (
          <Link href={`viber://chat?number=${encodeURIComponent(viberNumber)}`} className="contacts-link viber">
            <FaViber />
          </Link>
        )}
        {telegramUsername && (
          <Link href={`https://t.me/${telegramUsername}`} className="contacts-link telegram">
            <FaTelegram />
          </Link>
        )}
        {messengerUsername && (
          <Link href={`https://m.me/${messengerUsername}`} className="contacts-link messenger">
            <FaFacebookMessenger />
          </Link>
        )}
      </section>

      {status === "loading" ? (
        <div className="loading-container">
          <ClipLoader className="loading-icon spin" />
        </div>
      ) : status === "success" ? (
        <div className="status-message success">
          <AiOutlineCheckCircle className="status-icon" />
          <p>{t("contacts.sent")}</p>
        </div>
      ) : status === "error" ? (
        <div className="status-message error">
          <AiOutlineCloseCircle className="status-icon" />
          <p>{t("contacts.error")}</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <section className="contact-form-text-name">
            <label htmlFor="name">{t("contacts.name")}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={validateName}
              className={nameError ? "input-error" : ""}
              required
            />
            <p className="error-message">{nameError || " "}</p>
          </section>

          <section className="contact-form-text-email">
            <label htmlFor="email">{t("contacts.email")}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              className={emailError ? "input-error" : ""}
              required
            />
            <p className="error-message">{emailError || " "}</p>
          </section>

          <section className="contact-form-mes contact-form-text-mess">
            <label htmlFor="message">{t("contacts.message")}</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={validateMessage}
              className={messageError ? "input-error" : ""}
              required
            ></textarea>
            <p className="error-message">{messageError || " "}</p>
          </section>

          <button type="submit" disabled={!isFormValid}>
            {t("contacts.send")}
          </button>
        </form>
      )}
    </section>
  );
}
