import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

import { firebaseConfig } from "./firebase-config.js";

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencias principales
const visitasRef = doc(db, "visitas", "contador");
const detalleRef = doc(db, "visitas", "detalles");

async function contarVisita() {
  try {
    // 1️⃣ Obtener IP pública
    const respuesta = await fetch("https://api.ipify.org?format=json");
    const datosIP = await respuesta.json();
    const ip = datosIP.ip;

    // 2️⃣ Actualizar contador global
    const docSnap = await getDoc(visitasRef);

    if (docSnap.exists()) {
      await updateDoc(visitasRef, {
        valor: increment(1),
      });

      const nuevoDocSnap = await getDoc(visitasRef);
      const nuevoValor = nuevoDocSnap.data().valor;

      // (opcional) Mostrar el contador en pantalla si se quiere usar
      const contadorElem = document.getElementById("contador");
      if (contadorElem) {
        contadorElem.innerText = `👁️ Esta página ha sido visitada ${nuevoValor} veces.`;
      }

      // 3️⃣ Guardar última IP y navegador
      await setDoc(detalleRef, {
        ultima_ip: ip,
        ultima_visita: new Date().toISOString(),
        navegador: navigator.userAgent,
      }, { merge: true });

      // 4️⃣ Guardar/actualizar documento por IP
      const visitaIPRef = doc(db, "visitas_por_ip", ip);
      const visitaSnap = await getDoc(visitaIPRef);

      if (visitaSnap.exists()) {
        // Si ya existe, actualizamos y sumamos al contador
        await updateDoc(visitaIPRef, {
          ultima_visita: new Date().toISOString(),
          navegador: navigator.userAgent,
          contador: increment(1)
        });
      } else {
        // Si no existe, lo creamos
        await setDoc(visitaIPRef, {
          ultima_visita: new Date().toISOString(),
          navegador: navigator.userAgent,
          contador: 1
        });
      }

    } else {
      console.error("No existe el documento 'contador'");
    }

  } catch (error) {
    console.error("Error contando la visita:", error);
  }
}

contarVisita();
