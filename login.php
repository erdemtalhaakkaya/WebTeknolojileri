<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$email = trim($_POST['email'] ?? '');
$password = trim($_POST['password'] ?? '');
$student_number = '';
$is_valid = false;
$error_message = '';

// Form boş mu kontrol et
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (empty($email) || empty($password)) {
        $error_message = "E‑posta ve şifre boş bırakılamaz!";
    } elseif (!preg_match('/^b[0-9]{9}@ogr\.sakarya\.edu\.tr$/', $email)) {
        $error_message = "Geçerli bir okul e‑posta adresi giriniz!";
    } else {
        $student_number = explode('@', $email)[0];
        if ($password === $student_number) {
            $is_valid = true;
        } else {
            $error_message = "Şifre hatalı!";
        }
    }
} else {
    header("Location: login.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>Giriş Sonucu</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="style.css" rel="stylesheet">
  <?php if ($is_valid): ?>
    <meta http-equiv="refresh" content="3;url=index.html">
  <?php endif; ?>
</head>
<body class="login-body d-flex vh-100">
  <div class="login-card text-center">
    <?php if ($is_valid): ?>
      <h2>Hoşgeldiniz<br><strong><?= htmlspecialchars($student_number) ?></strong></h2>
      <p class="mt-3">Siteye yönlendiriliyorsunuz...</p>
    <?php else: ?>
      <h3 class="text-danger"><?= $error_message ?></h3>
      <a href="login.html" class="btn btn-warning mt-4">Geri Dön</a>
    <?php endif; ?>
  </div>
</body>
</html>
