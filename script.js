import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "datos-de-formulario-78472.firebaseapp.com",
  projectId: "datos-de-formulario-78472",
  storageBucket: "datos-de-formulario-78472.appspot.com",
  messagingSenderId: "610909887329",
  appId: "1:610909887329:web:7aae826f3055eea6298320",
  measurementId: "G-03VHNNB097"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();

    // Validar nombre
    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introducí tu nombre';
        errorNombre.classList.add('error-message');
    } else {
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');
    }

    // Validar correo
    let emailEntrada = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introducí un mail válido';
        emailError.classList.add('error-message');
    } else {
        emailError.textContent = '';
        emailError.classList.remove('error-message');
    }

    // Validar contraseña
    let contrasenaEntrada = document.getElementById('password');
    let contrasenaError = document.getElementById('passwordError');
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayusculas y minusculas, y caracteres especiales';
        contrasenaError.classList.add('error-message');
    } else {
        contrasenaError.textContent = '';
        contrasenaError.classList.remove('error-message');
    }

    // Si todos los campos son válidos, enviar
    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
        addDoc(collection(db, "users"), {
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert('El formulario se ha enviado con éxito');
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
});
