<?php
require_once __DIR__ . '/env.php';
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

function send_contact_emails(string $name, string $email, string $message): array {
    $smtpUser = required_env('GMAIL_SMTP_USER');
    $appPassword = required_env('GMAIL_APP_PASSWORD');
    $recipient = required_env('CONTACT_EMAIL');
    $smtpHost = required_env('GMAIL_SMTP_HOST');
    $smtpPort = (int)required_env('GMAIL_SMTP_PORT');

    $appPassword = str_replace(' ', '', $appPassword);
    $mailer = new PHPMailer(true);
    $mailer->isSMTP();
    $mailer->Host = $smtpHost;
    $mailer->SMTPAuth = true;
    $mailer->Username = $smtpUser;
    $mailer->Password = $appPassword;
    $mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mailer->Port = $smtpPort;
    $mailer->CharSet = 'UTF-8';
    $mailer->setFrom($smtpUser, 'LightningRoot');

    $safeName = preg_replace('/[\r\n]+/', ' ', $name);
    $mailer->addAddress($recipient);
    $mailer->addReplyTo($email, $safeName);
    $mailer->Subject = 'LightningRoot contact message from ' . $safeName;
    $mailer->Body = "Name: $name\nEmail: $email\n\n$message";
    $mailer->send();

    $autoReplySent = false;
    try {
        $mailer->clearAddresses();
        $mailer->clearReplyTos();
        $mailer->addAddress($email, $safeName);
        $mailer->Subject = 'We received your message - LightningRoot';
        $mailer->Body = "Hi $safeName,\n\nThanks for contacting LightningRoot. We received your message and will get back to you soon.\n\nYour message:\n$message\n\nRegards,\nThe LightningRoot team";
        $mailer->send();
        $autoReplySent = true;
    } catch (Exception $e) {
        app_log('error', 'Contact auto-reply could not be sent', ['email' => $email, 'error' => $e->getMessage()]);
    }

    return ['recipient' => $recipient, 'auto_reply' => $autoReplySent];
}
