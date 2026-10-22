<?php
/**
 * Contactformulier voor sponsmedia.com
 *
 * De site is een statische export, dus het formulier post naar dit script.
 * Hostinger voert PHP uit en verstuurt de mail met mail().
 * Antwoord is altijd JSON: { "ok": true } of { "ok": false, "code": "..." }.
 */

// ---- Instellingen -----------------------------------------------------------
const MAIL_TO   = 'contact@sponsmedia.com';
const MAIL_FROM = 'SponsMedia website <no-reply@sponsmedia.com>'; // moet een adres op je eigen domein zijn
const MIN_SECONDS = 5;          // sneller invullen dan dit = waarschijnlijk een bot
const MAX_PER_HOUR = 5;         // max aantal berichten per IP-adres per uur
const ALLOWED_ORIGINS = ['https://sponsmedia.com', 'https://www.sponsmedia.com'];
// -----------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(bool $ok, string $code = '', int $status = 200): void {
    http_response_code($status);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'code' => $code]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'bad_request', 405);
}

// Alleen verzoeken vanaf je eigen site accepteren
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ALLOWED_ORIGINS, true)) {
    respond(false, 'bad_request', 403);
}

$field = fn(string $k, int $max) => mb_substr(trim((string)($_POST[$k] ?? '')), 0, $max);

// Honeypot: dit veld is onzichtbaar voor mensen
if ($field('company_website', 200) !== '') {
    respond(false, 'spam');
}

// Te snel ingevuld?
$startedAt = (int)($_POST['startedAt'] ?? 0); // milliseconden
if ($startedAt > 0 && (microtime(true) * 1000 - $startedAt) < MIN_SECONDS * 1000) {
    respond(false, 'too_fast');
}

$name        = $field('name', 120);
$email       = $field('email', 200);
$company     = $field('company', 160);
$projectType = $field('projectType', 120);
$timeline    = $field('timeline', 120);
$message     = $field('message', 5000);

if (
    $name === '' ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    $projectType === '' ||
    $timeline === '' ||
    mb_strlen($message) < 20
) {
    respond(false, 'bad_request', 422);
}

// Header-injectie voorkomen
foreach ([$name, $email] as $v) {
    if (preg_match('/[\r\n]/', $v)) respond(false, 'bad_request', 422);
}

// Eenvoudige limiet per IP-adres (bestandje in de tijdelijke map van de server)
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/sm_contact_' . md5($ip);
$now = time();
$hits = [];
if (is_file($rateFile)) {
    $hits = array_filter(
        array_map('intval', explode(',', (string)file_get_contents($rateFile))),
        fn($t) => $t > $now - 3600
    );
}
if (count($hits) >= MAX_PER_HOUR) {
    respond(false, 'too_fast', 429);
}
$hits[] = $now;
@file_put_contents($rateFile, implode(',', $hits));

// Mail opbouwen
$subject = 'Nieuw contact: ' . $name . ' (' . $projectType . ')';
$body = implode("\n", [
    "Naam: $name",
    "E-mail: $email",
    'Bedrijf: ' . ($company !== '' ? $company : '-'),
    "Projecttype: $projectType",
    "Tijdslijn: $timeline",
    '',
    'Bericht:',
    $message,
    '',
    'Verstuurd op: ' . date('c'),
    "IP: $ip",
]);

$headers = implode("\r\n", [
    'From: ' . MAIL_FROM,
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$sent = mail(
    MAIL_TO,
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $body,
    $headers
);

if (!$sent) {
    respond(false, 'mail_error', 500);
}

respond(true);
