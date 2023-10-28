const firebaseConfig = {
    apiKey: "AIzaSyB4dwkMAWjIw1sh9vGo9Q8ZIAZIWYioksA",
    authDomain: "datos-de-formulario-35936.firebaseapp.com",
    projectId: "datos-de-formulario-35936",
    storageBucket: "datos-de-formulario-35936.appspot.com",
    messagingSenderId: "1086796482052",
    appId: "1:1086796482052:web:3e030565c4f7c136f15751",
    measurementId: "G-25CS1EEFC8"   
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    // Validar campo nombre

    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introduci tu nombre'
        errorNombre.classList.add('error-message')
    }else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    // Validar correo electronico

    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Patron de validacion basico

    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introduci un email valido'
        emailError.classList.add('error-message')
    }else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    // Validar contraseña

    let contrasenaEntrada = document.getElementById('password') 
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;  

    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, numeros, mayusculas, minusculas y caracteres especiales'
        contrasenaError.classList.add('error-message')
    }else {
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }

    // Si todos los campos son validos enviar formulario

    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {

        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert ('El formulario se ha enviado con exito', docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error)
        });
    }
})
