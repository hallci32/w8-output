// localStorageのキー
const STORAGE_KEY = "login-form-data";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signInBtn = document.getElementById("signInBtn");

// localStorageから取得
function getSavedData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return null;

  try {
    return JSON.parse(savedData);
  } catch {
    // 壊れたデータは破棄
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

// localStorageへ保存
function saveLocalStorage() {
  const data = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// localStorageから復元
function restoreForm() {
  restoreEmail();
  restorePassword();
}

function restoreEmail() {
  // すでに入力されてたら上書きしない
  if (emailInput.value) return;

  const data = getSavedData();
  if (!data?.email) return;

  emailInput.value = data.email;
}

function restorePassword() {
  // すでに入力されてたら上書きしない
  if (passwordInput.value) return;

  const data = getSavedData();
  if (!data?.password) return;

  passwordInput.value = data.password;
}

// 復元
restoreForm();

/**
 * イベント
 */
// ボタンイベント
signInBtn.addEventListener("click", () => {
    // signInボタンクリックで、LocalStorageに保存する
    saveLocalStorage();
});

// フォーカス時に復元する
emailInput.addEventListener("focus", restoreEmail);
passwordInput.addEventListener("focus", restorePassword);