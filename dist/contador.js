import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc, 
  setDoc, 
  increment 
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencia al documento del contador
const visitasRef = doc(db, "visitas", "contador");

// Referencia al documento de detalles
const detalleRef = doc(db, "visitas", "detalles");

async function contarVisita() {
  try {
    // 1️⃣ Obtener la IP pública
    const respuesta = await fetch("https://api.ipify.org?format=json");
    const datosIP = await respuesta.json();
    const ip = datosIP.ip;

    // 2️⃣ Obtener el contador actual
    const docSnap = await getDoc(visitasRef);

    if (docSnap.exists()) {
      // 3️⃣ Incrementar el contador
      await updateDoc(visitasRef, {
        valor: increment(1),
      });

      // 4️⃣ Obtener el nuevo valor actualizado
      const nuevoDocSnap = await getDoc(visitasRef);
      const nuevoValor = nuevoDocSnap.data().valor;

      // 5️⃣ Mostrar el nuevo valor en pantalla
      document.getElementById("contador").innerText =
        `👁️ Esta página ha sido visitada ${nuevoValor} veces.`;

      // 6️⃣ Guardar IP, fecha y navegador (crear documento si no existe)
      await setDoc(detalleRef, {
        ultima_ip: ip,
        ultima_visita: new Date().toISOString(),
        navegador: navigator.userAgent,
      }, { merge: true });

    } else {
      console.error("No existe el documento 'contador'");
    }

  } catch (error) {
    console.error("Error contando la visita:", error);
  }
}

contarVisita();
