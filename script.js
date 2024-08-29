const firebaseConfig = {
    apiKey: "AIzaSyCznzSES7KnxIp1tSJXjIYrbaFGoCn_MfQ",
    authDomain: "validacion-a4c15.firebaseapp.com",
    projectId: "validacion-a4c15",
    storageBucket: "validacion-a4c15.appspot.com",
    messagingSenderId: "697508439020",
    appId: "1:697508439020:web:60d93ffb0aad82e17016c9",
    measurementId: "G-2VMCYGVB4T"   
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();

    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introducir tu nombre';
        errorNombre.classList.add('error-message');
    } else {
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');
    }

    // Validar correo electrónico
    let emailEntrada = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación corregido

    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introducir un email válido';
        emailError.classList.add('error-message');
    } else {
        emailError.textContent = '';
        emailError.classList.remove('error-message');
    }

    // Validar la contraseña
    let contrasenaEntrada = document.getElementById('password');
    let contrasenaError = document.getElementById('passwordError');
    let contrasenaPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas.';
        contrasenaError.classList.add('error-message');
    } else {
        contrasenaError.textContent = '';
        contrasenaError.classList.remove('error-message');
    }

    // Si todos los campos son válidos, enviar formulario
    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value,
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con éxito. ID: ' + docRef.id);
            document.getElementById('formulario').reset(); 
        })
        .catch((error) => {
            alert('Error al enviar el formulario: ' + error.message);
        });
    }
});
