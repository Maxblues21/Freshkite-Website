<?php
define('ADMIN_SECRET', 'freshkite-admin-2026');
define('DATA_FILE', __DIR__ . '/site-data.json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Admin-Secret');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['ok'=>false,'error'=>'Method not allowed']); exit; }

$secret = $_SERVER['HTTP_X_ADMIN_SECRET'] ?? '';
if ($secret !== ADMIN_SECRET) { http_response_code(403); echo json_encode(['ok'=>false,'error'=>'Forbidden']); exit; }

$body = file_get_contents('php://input');
if (!$body) { http_response_code(400); echo json_encode(['ok'=>false,'error'=>'Empty body']); exit; }

$decoded = json_decode($body, true);
if (json_last_error() !== JSON_ERROR_NONE) { http_response_code(400); echo json_encode(['ok'=>false,'error'=>'Invalid JSON']); exit; }

$required = ['hero','capabilities','language','partners','whyUs','team','cta','footer','contact'];
foreach ($required as $k) { if (!isset($decoded[$k])) { http_response_code(400); echo json_encode(['ok'=>false,'error'=>"Missing: $k"]); exit; } }

$written = file_put_contents(DATA_FILE, json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
if ($written === false) { http_response_code(500); echo json_encode(['ok'=>false,'error'=>'Cannot write file — check chmod 664']); exit; }

echo json_encode(['ok'=>true,'bytes'=>$written]);
