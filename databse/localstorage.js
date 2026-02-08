// localStorageのキー
const STORAGE_KEY = "login-form-data";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signInBtn = document.getElementById("signInBtn");

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
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return;
  
    try {
      const { email, password } = JSON.parse(savedData);
      if (email) emailInput.value = email;
      if (password) passwordInput.value = password;
    } catch {
      // 壊れたデータは破棄
      localStorage.removeItem(STORAGE_KEY);
    }
  }

// 復元
restoreForm();

/**
 * イベント
 */
// ボタンイベント
signInBtn.addEventListener("click", () => {
    saveLocalStorage();
});