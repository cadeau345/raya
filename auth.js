const firebaseConfig = {
    apiKey: "AIzaSyD0IAstH4zer5RkzJuQhPALX0UVnPotPDA",
    authDomain: "raya-ahmed.firebaseapp.com",
    projectId: "raya-ahmed",
    storageBucket: "raya-ahmed.appspot.com",
    messagingSenderId: "408257613174",
    appId: "1:408257613174:web:57a6e4631b9866416cfe57",
    measurementId: "G-D5YG680EKX"
};

firebase.initializeApp(firebaseConfig);


// 3. حدث إنشاء حساب
const signupForm = document.getElementById("signup-form");

if (signupForm) {
    signupForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // ✅ نجاح التسجيل
                alert("✅ تم إنشاء الحساب بنجاح!");
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                // ❌ فشل التسجيل
                alert("حدث خطأ: " + error.message);
            });
    });
}
firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        // إرسال إيميل التفعيل
        user.sendEmailVerification()
            .then(() => {
                // تم إرسال الإيميل بنجاح، نحوله للصفحة التالية
                window.location.href = "verify-email.html";
            })
            .catch((error) => {
                alert("❌ لم يتم إرسال رابط التفعيل: " + error.message);
            });

    })
    .catch((error) => {
        alert("❌ حدث خطأ أثناء إنشاء الحساب: " + error.message);
    });

function resendVerification() {
    const email = localStorage.getItem("registeredEmail");
    const password = localStorage.getItem("registeredPassword");

    if (!email || !password) {
        alert("❌ البريد الإلكتروني أو كلمة المرور غير موجودين. حاول إنشاء الحساب مجددًا.");
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;

            if (user.emailVerified) {
                alert("✅ البريد مفعل بالفعل. يمكنك تسجيل الدخول.");
            } else {
                user.sendEmailVerification()
                    .then(() => {
                        alert("📨 تم إرسال رابط تفعيل جديد إلى بريدك.");
                    })
                    .catch(error => {
                        alert("❌ خطأ في إرسال التفعيل: " + error.message);
                    });
            }
        })
        .catch(error => {
            alert("❌ خطأ في تسجيل الدخول المؤقت: " + error.message);
        });
}