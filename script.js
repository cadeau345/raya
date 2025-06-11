document.getElementById("signup-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (name && email && password) {
        document.getElementById("message").textContent = "تم إنشاء الحساب بنجاح!";
    } else {
        document.getElementById("message").textContent = "يرجى ملء جميع الحقول.";
        document.getElementById("message").style.color = "red";
    }
}); < script >
    function logout() {
        firebase.auth().signOut()
            .then(() => {
                window.location.href = "login.html"; // غيرها لو عندك صفحة تسجيل دخول باسم مختلف
            })
            .catch((error) => {
                alert("حدث خطأ أثناء تسجيل الخروج: " + error.message);
            }); <
        /script>
    }

function resetPassword() {
    const email = document.getElementById("email").value.trim();

    if (!email) {
        alert("📧 من فضلك أدخل بريدك الإلكتروني أولاً.");
        return;
    }

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("📬 تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.");
        })
        .catch((error) => {
                console.error("خطأ في إعادة تعيين كلمة المرور:", error);
                if (error.code === 'auth/user-not-found') {
                    alert("❌ لم يتم العثور على مستخدم بهذا البريد.");
                } else {
                    alert("❌ " + error.message);
                }
            );
        }