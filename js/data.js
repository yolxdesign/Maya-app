/* Maya · Entreno — contenido del programa (ejercicios, tipos, rutina y vocabulario).
   Solo datos: aquí no hay lógica. «{dog}» se sustituye por el nombre de la perra. */
"use strict";
window.MAYA_DATA = {
  "types": {
    "vinculo": {
      "name": "Vínculo y juego",
      "accent": "#D2457F",
      "ink": "#A8285F",
      "tint": "#FFE3EF",
      "icon": "link"
    },
    "comun": {
      "name": "Atención y comunicación",
      "accent": "#E5573F",
      "ink": "#B23A27",
      "tint": "#FFE6E1",
      "icon": "target"
    },
    "llamada": {
      "name": "Llamada",
      "accent": "#2C8FE0",
      "ink": "#1C6DB0",
      "tint": "#DFF0FF",
      "icon": "recall"
    },
    "auto": {
      "name": "Autocontrol",
      "accent": "#5B4BE8",
      "ink": "#4A3BD6",
      "tint": "#ECE9FF",
      "icon": "hourglass"
    },
    "pos": {
      "name": "Posiciones y permanencia",
      "accent": "#8A5CE0",
      "ink": "#6A3DC0",
      "tint": "#F1E8FF",
      "icon": "bed"
    },
    "paseo": {
      "name": "Paseo",
      "accent": "#18A97F",
      "ink": "#0D7A5C",
      "tint": "#DDF6EE",
      "icon": "leash"
    },
    "trucos": {
      "name": "Trucos",
      "accent": "#E39A00",
      "ink": "#8A5B00",
      "tint": "#FFF1CC",
      "icon": "sparkle"
    },
    "manejo": {
      "name": "Manejo y cuidados",
      "accent": "#6B7A90",
      "ink": "#4B586B",
      "tint": "#E9EDF3",
      "icon": "heart"
    }
  },
  "exercises": [
    {
      "id": "vinc",
      "type": "vinculo",
      "program": true,
      "name": "Vinculación",
      "difficulty": 1,
      "minutes": 5,
      "material": "Nada: ni comida ni juguete",
      "steps": [
        "Solo vosotras dos: sin pelota, sin premios, sin nada más.",
        "Di «{dog}» y a continuación palabras y gestos amigables.",
        "Cuando se interese por ti: caricias de voz y táctiles a su gusto. «Muuuy bien» si aumenta la atención o se acerca.",
        "No la fuerces a acercarse ni la retengas.",
        "Para evaluar: aléjate y ofrécele una nueva posibilidad de acercarse."
      ],
      "tip": "Palabras prohibidas en este ejercicio: ven, toma, mira, aquí o similares. Solo su nombre y palabras amables.",
      "mistake": "Usar comida o juguete: aquí buscamos que le interese el vínculo social en sí mismo.",
      "mastered": "Al alejarte, vuelve a acercarse y ofrece señales afiliativas. Si deambula sin acercarse, te ve como un «sillón de masaje»; si se aleja o se apacigua, no estaba cómoda.",
      "video": "https://vimeo.com/399117868/4318d9ee2f",
      "levels": [
        {
          "goal": "Se acerca y busca contacto en 3 min en casa"
        },
        {
          "goal": "Vuelve a ti al ofrecérselo de nuevo, 5 min en un sitio tranquilo de fuera"
        },
        {
          "goal": "Busca tu contacto 5 min en la calle, con distracciones lejos"
        }
      ]
    },
    {
      "id": "noinf",
      "type": "comun",
      "program": true,
      "name": "No informativo",
      "difficulty": 2,
      "minutes": 3,
      "material": "Situaciones del día a día",
      "steps": [
        "Cuando {dog} inicie una acción incorrecta, di «no» con tono tranquilo y positivo.",
        "El «no» es una ayuda, no un enfado: le informa de que eso no es lo que le pides.",
        "En cuanto abandone ese rumbo de acción: «muy bien».",
        "Empieza con situaciones de baja intensidad emocional, que pueda dejar con facilidad."
      ],
      "tip": "Bien montado, el «no» le ayuda a tener éxito y a coordinarse contigo sin conflicto.",
      "mistake": "Usarlo con enfado o subiendo el tono: deja de ser informativo.",
      "mastered": "Al oír «no», abandona voluntariamente lo que había empezado (si la emoción no le supera).",
      "video": "https://vimeo.com/399457920/f9f3a20fdf",
      "levels": [
        {
          "goal": "Deja la acción con el «no» ante cosas de poco valor, en casa"
        },
        {
          "goal": "Deja en menos de 3 s cosas de valor medio",
          "time": {
            "sec": 3,
            "kind": "under"
          }
        },
        {
          "goal": "Deja a la primera en la calle (restos, olores)"
        }
      ]
    },
    {
      "id": "juego",
      "type": "vinculo",
      "program": true,
      "name": "Espacio de juego",
      "difficulty": 2,
      "minutes": 8,
      "material": "Juguete de tira o pelota",
      "steps": [
        "Activa a {dog} poco a poco con «Ach», como un acelerador.",
        "Juega con el juguete coordinándote con ella: «trae» para que te lo traiga.",
        "Pide «suelta» y, al soltar, «muy bien» y sigue el juego.",
        "Si tiene que buscar el juguete, usa «busca».",
        "Termina siempre con «Nada más» para que se desconecte del juego."
      ],
      "tip": "El juego le enseña a moldear su instinto de caza y a coordinarse contigo en estados de máxima activación. 5–10 min cada vez.",
      "mistake": "Acabar sin «Nada más»: le cuesta desconectar y aparece la sobreexcitación.",
      "mastered": "Trae, suelta y se desactiva con «Nada más» sin quedarse revolucionada.",
      "video": "https://vimeo.com/400399013/b5a13a02de",
      "levels": [
        {
          "goal": "Trae y suelta 3 veces y desconecta con «Nada más» en menos de 1 min",
          "time": {
            "sec": 60,
            "kind": "under"
          }
        },
        {
          "goal": "5 min de juego y desconecta en menos de 30 s",
          "time": {
            "sec": 30,
            "kind": "under"
          }
        },
        {
          "goal": "10 min con alta activación y desconecta en menos de 15 s",
          "time": {
            "sec": 15,
            "kind": "under"
          }
        }
      ]
    },
    {
      "id": "llamada",
      "type": "llamada",
      "program": true,
      "name": "La llamada",
      "difficulty": 1,
      "minutes": 5,
      "material": "2 personas · arnés o collar · comida",
      "steps": [
        "Una persona sujeta a {dog} por el arnés (cogido en la espalda) o por el collar.",
        "La otra le enseña comida y se aleja.",
        "Quien se ha alejado se coloca en posición de llamada y dice «{dog}, ven».",
        "{dog} viene, pero la conducta no está completa hasta que se sienta delante.",
        "Cuando se siente: «muy bien», cuenta 1001, 1002, premia, y cuenta de nuevo 1001, 1002.",
        "«¡Ale!»: libérala y dale vinculación social."
      ],
      "tip": "En casa: 2 llamadas de frente, 2 de espaldas y 2 con obstáculos (cámbialos), con presión pasiva.",
      "mistake": "Premiar antes de que se siente: la llamada termina sentada delante de ti.",
      "mastered": "Llega y se sienta delante sin que tengas que pedírselo, 4 de cada 5 veces.",
      "video": "https://vimeo.com/400398492/82469e9f59",
      "levels": [
        {
          "goal": "Viene y se sienta delante desde 3 m"
        },
        {
          "goal": "Desde 6 m"
        },
        {
          "goal": "Desde 10 m o desde otra habitación"
        }
      ]
    },
    {
      "id": "llamadaprob",
      "type": "llamada",
      "program": true,
      "name": "Llamada · solución de problemas 1",
      "difficulty": 2,
      "minutes": 5,
      "material": "Comida · una pared",
      "steps": [
        "Empieza con un par de llamadas sencillas con presión pasiva.",
        "Llámala estando tú de espaldas.",
        "Llámala hacia un lado, y luego hacia el otro.",
        "Llámala de cara a la pared: tendrá que sentarse a tu lado, lo más cerca posible.",
        "Acierto: «muy bien» y premio. Error: «no» informativo y le das otra oportunidad."
      ],
      "tip": "Equivocarse es normal y hasta conveniente: es como comprueba que entiende la conducta.",
      "mistake": "Darle la solución tú: la comprensión exige que ella se esfuerce.",
      "mastered": "80 % de aciertos (4 de cada 5) para subir de nivel.",
      "video": "https://vimeo.com/399485351/5b601c40c6",
      "pyramid": [
        {
          "label": "R1",
          "level": "Fácil",
          "detail": "Llamada directa con presión pasiva (alguien la sujeta), a corta distancia"
        },
        {
          "label": "R2",
          "level": "Difícil",
          "detail": "Llamada de espaldas, hacia un lado o de cara a la pared"
        },
        {
          "label": "R3",
          "level": "Fácil",
          "detail": "Vuelve a una llamada directa y sencilla para cerrar con éxito"
        }
      ],
      "levels": [
        {
          "goal": "80 % con llamadas de espaldas y hacia los lados"
        },
        {
          "goal": "80 % de cara a la pared y con obstáculos"
        },
        {
          "goal": "80 % combinando posiciones, fuera de casa"
        }
      ]
    },
    {
      "id": "esperatuyo",
      "type": "auto",
      "program": true,
      "name": "Aguanta y gana (espera y tuyo)",
      "difficulty": 2,
      "minutes": 4,
      "material": "Comida en mano, cuenco o mesa",
      "steps": [
        "Pon comida en tu mano o en una superficie (mesa, cuenco, suelo).",
        "Cuando intente cogerla, di «espera» y cierra un poco la mano.",
        "Si hace falta, sujétala suavemente con la mano en el pecho.",
        "Debe esperar en posición neutra, a cuatro patas.",
        "Di «tuyo» con tono normal, sin excitarla. Al principio, no tardes mucho en decirlo.",
        "Si se desconecta de la comida, mueve un poco la mano para conectarla."
      ],
      "tip": "Practícalo cada vez que le vayas a dar un trozo de comida.",
      "mistake": "Decirle «no»: no es «deja de hacer», es «aguántate las ganas».",
      "mastered": "Aguanta 2 minutos ante la comida con un solo «espera» hasta el «tuyo».",
      "video": "https://vimeo.com/504723872/1f5976d498",
      "levels": [
        {
          "goal": "Aguanta 30 s con un solo «espera»",
          "time": {
            "sec": 30,
            "kind": "hold"
          }
        },
        {
          "goal": "Aguanta 1 min",
          "time": {
            "sec": 60,
            "kind": "hold"
          }
        },
        {
          "goal": "Aguanta 2 min (criterio de la educadora)",
          "time": {
            "sec": 120,
            "kind": "hold"
          }
        }
      ]
    },
    {
      "id": "sentadoneutra",
      "type": "pos",
      "program": true,
      "name": "Luring y sentado en guía neutra",
      "difficulty": 1,
      "minutes": 3,
      "material": "Comida",
      "steps": [
        "Haz 2 repeticiones de sentado guiándola con comida (luring).",
        "Después, colócate en posición de guía neutra, sin señuelo.",
        "Pide sentado 5 veces.",
        "Cada acierto: «muy bien» y premio. Libera con «ale»."
      ],
      "tip": "Repeticiones cortas y limpias: 2 con señuelo + 5 en neutra.",
      "mistake": "Seguir usando la comida como señuelo en las 5 repeticiones neutras.",
      "mastered": "Se sienta en guía neutra 4 de cada 5 veces.",
      "levels": [
        {
          "goal": "4 de 5 sentados en guía neutra, en casa"
        },
        {
          "goal": "4 de 5 en el portal o el patio"
        },
        {
          "goal": "4 de 5 en la calle"
        }
      ]
    },
    {
      "id": "puertabusca",
      "type": "auto",
      "program": true,
      "name": "Espera en la puerta + busca",
      "difficulty": 1,
      "minutes": 2,
      "material": "Comida para el busca",
      "steps": [
        "Antes de salir, pide «espera».",
        "Debe esperar a que abras la puerta y salgas tú primero.",
        "Si se mantiene estable: «ale» para liberarla.",
        "Nada más salir, tírale un «busca» (comida al suelo para olfatear)."
      ],
      "tip": "Hazlo en cada salida: convierte un momento de excitación en autocontrol.",
      "mistake": "Salir a la vez que ella si se ha movido: vuelve a empezar con calma.",
      "mastered": "Espera estable hasta que sales tú y oye «ale».",
      "levels": [
        {
          "goal": "Espera estable hasta que sales tú, en la puerta de casa"
        },
        {
          "goal": "Espera 5 s después de que salgas",
          "time": {
            "sec": 5,
            "kind": "hold"
          }
        },
        {
          "goal": "Espera en el portal y en puertas de la calle"
        }
      ]
    },
    {
      "id": "permanencia",
      "type": "pos",
      "program": true,
      "name": "Permanencia formal en sentado",
      "difficulty": 2,
      "minutes": 5,
      "material": "Comida",
      "steps": [
        "Pide sentado y la señal de permanencia que te enseñó la educadora.",
        "Trabaja distancia (pasos) y tiempo por separado: sube solo una cosa a la vez.",
        "Vuelve siempre tú junto a {dog} para confirmar con «muy bien» y premiar en posición.",
        "Libera con «ale».",
        "Sigue la pirámide: una repetición fácil, una difícil y otra fácil."
      ],
      "tip": "El objetivo es que gestione la inquietud de verte alejarte. Si se levanta, la repetición difícil era demasiado difícil.",
      "mistake": "Subir distancia y tiempo a la vez.",
      "mastered": "80 % de aciertos en el nivel antes de subir distancia o tiempo.",
      "missingInfo": "La palabra exacta de permanencia y el criterio para pasar de nivel.",
      "pyramid": [
        {
          "label": "E1 · R1",
          "level": "Fácil",
          "detail": "1 paso · 5 s"
        },
        {
          "label": "E1 · R2",
          "level": "Difícil",
          "detail": "1 paso · 10 s"
        },
        {
          "label": "E1 · R3",
          "level": "Fácil",
          "detail": "1 paso · 5 s"
        },
        {
          "label": "E2 · R1",
          "level": "Fácil",
          "detail": "1 paso · 10 s"
        },
        {
          "label": "E2 · R2",
          "level": "Difícil",
          "detail": "2 pasos · 10 s"
        },
        {
          "label": "E2 · R3",
          "level": "Fácil",
          "detail": "1 paso · 5 s"
        }
      ],
      "levels": [
        {
          "goal": "1 paso · 10 s",
          "time": {
            "sec": 10,
            "kind": "hold"
          }
        },
        {
          "goal": "2 pasos · 20 s",
          "time": {
            "sec": 20,
            "kind": "hold"
          }
        },
        {
          "goal": "4 pasos · 30 s",
          "time": {
            "sec": 30,
            "kind": "hold"
          }
        }
      ]
    },
    {
      "id": "vamos",
      "type": "auto",
      "program": true,
      "name": "Vamos {dog}, juega conmigo",
      "difficulty": 2,
      "minutes": 5,
      "material": "Su comedero lleno",
      "steps": [
        "Camina con el comedero lleno en la mano.",
        "{dog} tiene que ir a tu lado de forma estable y homogénea.",
        "Si se adelanta o salta al comedero, no avances hasta que se recoloque.",
        "Cuando haya caminado estable a tu lado: «tuyo» y deja el comedero."
      ],
      "tip": "Trabaja la impulsividad: la comida llega por caminar contigo, no por lanzarse.",
      "mistake": "Darle el «tuyo» con ella acelerada o saltando.",
      "mastered": "Camina estable a tu lado todo el recorrido hasta el «tuyo».",
      "missingInfo": "Distancia o tiempo de recorrido y qué hacer si se lanza al comedero.",
      "levels": [
        {
          "goal": "Estable a tu lado durante 5 m"
        },
        {
          "goal": "10 m con un giro"
        },
        {
          "goal": "20 m con giros y cambios de ritmo"
        }
      ]
    },
    {
      "id": "eh",
      "type": "comun",
      "program": true,
      "name": "Concentración «¡Eh!»",
      "difficulty": 2,
      "minutes": 3,
      "material": "Comida para luring",
      "steps": [
        "Cuando {dog} se distraiga, da un toque de atención suave: «¡Eh!».",
        "Justo después, guíala con comida (luring) hacia el rumbo adecuado.",
        "Cuando retome el rumbo: «muy bien».",
        "Observa su lenguaje corporal: si se aparta, se lame o gira la cabeza, baja la intensidad."
      ],
      "tip": "Es una exigencia suave para captar la atención, nunca un susto.",
      "mistake": "Decirlo tan fuerte que provoque apaciguamiento: tiene que sumar atención, no miedo.",
      "mastered": "Al oír «¡Eh!» vuelve contigo sin mostrar señales de apaciguamiento.",
      "missingInfo": "Cómo y cuándo retirar el luring tras el «¡Eh!».",
      "levels": [
        {
          "goal": "Vuelve contigo con «¡Eh!» + luring ante una distracción leve"
        },
        {
          "goal": "Vuelve con «¡Eh!» sin luring"
        },
        {
          "goal": "Vuelve con «¡Eh!» en la calle"
        }
      ]
    },
    {
      "id": "pulsa",
      "type": "comun",
      "program": true,
      "name": "Pulsa si sabes",
      "difficulty": 3,
      "minutes": 4,
      "material": "Comida",
      "steps": [
        "Di palabras que conoce («sienta») mezcladas con otras que no («gazpacho»).",
        "{dog} solo debe actuar ante las palabras que conoce.",
        "Si responde a la conocida: «muy bien» y premio.",
        "Si actúa ante una desconocida: «no» informativo, sin enfado.",
        "Usa el mismo tono para todas las palabras: tiene que escuchar, no adivinar."
      ],
      "tip": "Discriminación cognitiva: comprueba que entiende la palabra y no solo tu gesto o tu tono.",
      "mistake": "Acompañar la palabra conocida con un gesto: así no sabes si discrimina el sonido.",
      "mastered": "80 % de aciertos mezclando conocidas y desconocidas.",
      "missingInfo": "Cuántas palabras por serie y en qué proporción.",
      "levels": [
        {
          "goal": "80 % con 1 palabra desconocida por cada 2 conocidas"
        },
        {
          "goal": "80 % con mitad y mitad"
        },
        {
          "goal": "80 % mezclando 2 conocidas distintas"
        }
      ]
    },
    {
      "id": "contar10",
      "type": "auto",
      "program": true,
      "name": "Contar hasta 10",
      "difficulty": 3,
      "minutes": 3,
      "material": "Plato · 10 trozos de comida",
      "steps": [
        "Pide «espera» con el plato delante.",
        "Deja caer los trozos de comida en el plato de uno en uno, contando hasta 10.",
        "Si se lanza antes de tiempo, retira el plato y vuelve a empezar.",
        "Al llegar a 10 y si sigue esperando: «tuyo»."
      ],
      "tip": "Tolerancia a la frustración: ve cómo aumenta su «sueldo» gota a gota.",
      "mistake": "Ir demasiado rápido o demasiado lento al principio: busca que gane.",
      "mastered": "Espera los 10 trozos sin lanzarse.",
      "missingInfo": "Si se reinicia la cuenta desde cero o desde donde se lanzó.",
      "levels": [
        {
          "goal": "Espera mientras caen 5 trozos"
        },
        {
          "goal": "Espera los 10 trozos"
        },
        {
          "goal": "10 trozos despacio, uno cada 3 s"
        }
      ]
    },
    {
      "id": "llamadadist",
      "type": "llamada",
      "program": true,
      "name": "Llamada con distracciones",
      "difficulty": 3,
      "minutes": 5,
      "material": "2 personas · comida · juguetes",
      "steps": [
        "Calienta con un par de llamadas sencillas sin distracciones.",
        "Llámala mientras está distraída, o mientras otra persona intenta jugar con ella.",
        "Prueba también escondiéndote, o con alguien ofreciéndole comida o juguetes.",
        "Si va hacia la distracción: «no» informativo. Si viene y se sienta: «muy bien» y premio.",
        "Cierra con una llamada sencilla."
      ],
      "tip": "La persona que distrae debe hacerlo de forma controlada: la dificultad la marcas tú.",
      "mistake": "Empezar directamente con la distracción más fuerte.",
      "mastered": "Viene y se sienta con alguien distrayéndola, 4 de cada 5 veces.",
      "pyramid": [
        {
          "label": "R1",
          "level": "Fácil",
          "detail": "Un par de llamadas de calentamiento sin distracciones"
        },
        {
          "label": "R2",
          "level": "Difícil",
          "detail": "Escondida, o alguien ofreciendo comida o juguetes (usa el «no» si hace falta)"
        },
        {
          "label": "R3",
          "level": "Fácil",
          "detail": "Una última llamada sencilla para cerrar con éxito"
        }
      ],
      "levels": [
        {
          "goal": "Viene con alguien quieto a 3 m como distracción"
        },
        {
          "goal": "Viene con alguien ofreciéndole comida"
        },
        {
          "goal": "Viene con alguien jugando con ella, o estando tú escondida"
        }
      ]
    },
    {
      "id": "sitio",
      "type": "pos",
      "program": true,
      "name": "A tu sitio",
      "difficulty": 2,
      "minutes": 6,
      "material": "Su cama · comida",
      "steps": [
        "Envía a {dog} a su cama lanzando comida sobre ella.",
        "Cuando esté en la cama, premia la permanencia con refuerzos espaciados.",
        "Sigue los tiempos de la pirámide.",
        "Libera con «ale» solo después de haberla premiado en la cama."
      ],
      "tip": "Busca que se aleje de estímulos interesantes para ir a su sitio por sí misma.",
      "mistake": "Liberarla justo cuando se levanta: le enseñas que levantarse termina el ejercicio.",
      "mastered": "Aguanta la duración del nivel con los refuerzos espaciados.",
      "missingInfo": "Qué palabra usar para enviarla («a tu sitio») y cuándo dejar de lanzar comida.",
      "pyramid": [
        {
          "label": "R1",
          "level": "Fácil",
          "detail": "1 min en total · refuerzo cada 15 s"
        },
        {
          "label": "R2",
          "level": "Difícil",
          "detail": "2 min en total · refuerzo cada 30 s"
        },
        {
          "label": "R3",
          "level": "Fácil",
          "detail": "3 min · refuerzo cada minuto si tiene fondo; si no, vuelve a una duración menor"
        }
      ],
      "levels": [
        {
          "goal": "1 min en la cama · refuerzo cada 15 s",
          "time": {
            "sec": 60,
            "kind": "hold"
          }
        },
        {
          "goal": "2 min · refuerzo cada 30 s",
          "time": {
            "sec": 120,
            "kind": "hold"
          }
        },
        {
          "goal": "3 min · refuerzo cada minuto",
          "time": {
            "sec": 180,
            "kind": "hold"
          }
        }
      ]
    },
    {
      "id": "noesyies",
      "type": "auto",
      "program": true,
      "name": "Noes y síes",
      "difficulty": 2,
      "minutes": 3,
      "material": "Cuenco con comida",
      "steps": [
        "Pon un cuenco con comida a su alcance.",
        "Si se acerca sin permiso: «no» para que se aparte.",
        "Cuando se aparte: «muy bien».",
        "Alterna: a veces «tuyo» para que acceda al cuenco."
      ],
      "tip": "Combina el «no» y el «tuyo»: le enseña que el permiso depende de ti.",
      "mistake": "Usar siempre el mismo orden: si lo puede predecir, no está escuchando.",
      "mastered": "Se aparta con el «no» y solo accede con el «tuyo».",
      "missingInfo": "Cuántas repeticiones de «no» antes de un «tuyo».",
      "levels": [
        {
          "goal": "Se aparta con el «no» 4 de 5 veces"
        },
        {
          "goal": "Se aparta y espera 10 s hasta el «tuyo»",
          "time": {
            "sec": 10,
            "kind": "hold"
          }
        },
        {
          "goal": "Espera 30 s con el cuenco a su alcance",
          "time": {
            "sec": 30,
            "kind": "hold"
          }
        }
      ]
    },
    {
      "id": "renuncias",
      "type": "auto",
      "program": true,
      "name": "Pequeñas renuncias",
      "difficulty": 2,
      "minutes": 5,
      "material": "Comida o juguetes fuera de su alcance",
      "steps": [
        "Deja comida o juguetes a la vista, fuera del alcance de {dog}.",
        "Ignóralos tú también: no los mires ni intervengas.",
        "Espera hasta que {dog} deje de prestarles atención por sí misma.",
        "Cuando renuncie: «muy bien» con calma."
      ],
      "tip": "Renuncia autónoma: el objetivo es no tener que intervenir de forma constante.",
      "mistake": "Decirle «no» todo el rato: entonces no renuncia ella, la frenas tú.",
      "mastered": "Deja de interesarse por el objeto sin que intervengas.",
      "missingInfo": "Cuánto tiempo esperar y si hay que premiar la renuncia o no.",
      "levels": [
        {
          "goal": "Deja de mirar el objeto en menos de 2 min",
          "time": {
            "sec": 120,
            "kind": "under"
          }
        },
        {
          "goal": "En menos de 1 min",
          "time": {
            "sec": 60,
            "kind": "under"
          }
        },
        {
          "goal": "En menos de 30 s, con objetos de mucho valor",
          "time": {
            "sec": 30,
            "kind": "under"
          }
        }
      ]
    },
    {
      "id": "dirigido",
      "type": "paseo",
      "program": true,
      "name": "Paseo dirigido",
      "difficulty": 2,
      "minutes": 10,
      "material": "Correa",
      "steps": [
        "Camina con {dog} a tu lado.",
        "Si se adelanta, da un paso atrás en 45° para recolocarla.",
        "Nada de tirones secos: la recolocación es suave.",
        "Cuando vuelva a tu lado: «muy bien» y seguid."
      ],
      "tip": "Es el paseo por necesidad: aceras con gente, cruces, tramos estrechos.",
      "mistake": "Recolocar con tirones de correa.",
      "mastered": "Va a tu lado en tramos cortos sin tener que recolocarla.",
      "levels": [
        {
          "goal": "1 min a tu lado en una calle tranquila",
          "time": {
            "sec": 60,
            "kind": "hold"
          }
        },
        {
          "goal": "3 min",
          "time": {
            "sec": 180,
            "kind": "hold"
          }
        },
        {
          "goal": "5 min con gente y cruces",
          "time": {
            "sec": 300,
            "kind": "hold"
          }
        }
      ]
    },
    {
      "id": "tranquilo",
      "type": "paseo",
      "program": true,
      "name": "Paseo tranquilo",
      "difficulty": 1,
      "minutes": 15,
      "material": "Correa larga",
      "steps": [
        "Dile «libre»: {dog} elige el rumbo, pero no el ritmo.",
        "Déjala explorar y olfatear con libertad.",
        "Si tensa la correa: media vuelta.",
        "Modela su rumbo con suavidad, sin bloqueos bruscos."
      ],
      "tip": "Es el paseo de exploración: debe ser la mayor parte del tiempo de calle.",
      "mistake": "Dejar que marque el ritmo tirando.",
      "mastered": "Explora con la correa floja casi todo el paseo.",
      "levels": [
        {
          "goal": "5 min con la correa floja",
          "time": {
            "sec": 300,
            "kind": "hold"
          }
        },
        {
          "goal": "10 min",
          "time": {
            "sec": 600,
            "kind": "hold"
          }
        },
        {
          "goal": "20 min",
          "time": {
            "sec": 1200,
            "kind": "hold"
          }
        }
      ]
    },
    {
      "id": "sintonizado",
      "type": "paseo",
      "program": true,
      "name": "Paseo sintonizado",
      "difficulty": 3,
      "minutes": 10,
      "material": "Correa",
      "steps": [
        "Ante algo que le dé miedo, reduce la correa para darle seguridad.",
        "Haz arcos de disipación: rodea el estímulo en curva en lugar de ir de frente.",
        "Llévala hasta una «plaza segura» donde se tranquilice.",
        "Cuando se recupere, seguid el paseo con calma."
      ],
      "tip": "Le das seguridad en las situaciones de miedo: eres su apoyo, no quien la expone.",
      "mistake": "Acercarla al estímulo para que se acostumbre.",
      "mastered": "Busca tu apoyo y se recupera rápido en la plaza segura.",
      "missingInfo": "Qué cuenta como «plaza segura» y la forma exacta de los arcos de disipación.",
      "levels": [
        {
          "goal": "Se recupera en la plaza segura en menos de 2 min",
          "time": {
            "sec": 120,
            "kind": "under"
          }
        },
        {
          "goal": "En menos de 1 min",
          "time": {
            "sec": 60,
            "kind": "under"
          }
        },
        {
          "goal": "Pasa a distancia media sin necesitar la plaza segura"
        }
      ]
    },
    {
      "id": "extensible",
      "type": "paseo",
      "program": true,
      "name": "Correa extensible",
      "difficulty": 2,
      "minutes": 10,
      "material": "Correa extensible",
      "steps": [
        "Guía con modelado suave e informativo, no con bloqueos.",
        "Usa pulsaciones cortas del freno para orientarla.",
        "Evita bloquear la correa de forma constante.",
        "Cuando se oriente bien: «muy bien»."
      ],
      "tip": "La extensible informa con pulsaciones, no frena todo el rato.",
      "mistake": "Dejarla siempre bloqueada: se acostumbra a la tensión.",
      "mastered": "Responde a las pulsaciones sin necesitar bloqueos.",
      "missingInfo": "Cómo son las pulsaciones (frecuencia e intensidad).",
      "levels": [
        {
          "goal": "Responde a la pulsación 4 de 5 veces en una calle tranquila"
        },
        {
          "goal": "En el parque"
        },
        {
          "goal": "Con distracciones"
        }
      ]
    },
    {
      "id": "extincion",
      "type": "vinculo",
      "program": true,
      "name": "Extinción de premios",
      "difficulty": 3,
      "minutes": 4,
      "material": "Comida (cada vez menos)",
      "steps": [
        "Pide una conducta conocida y premia con comida.",
        "Pide la conducta sin enseñar comida y refuerza solo con caricias o juego social.",
        "Termina con una conducta muy sencilla y afecto o juego.",
        "Poco a poco, la recompensa pasa a ser vuestra relación."
      ],
      "tip": "El objetivo es que haga las cosas por satisfacción social, no solo por comida.",
      "mistake": "Quitar la comida de golpe en conductas que aún no están firmes.",
      "mastered": "Hace las conductas conocidas sin comida a la vista, con el mismo entusiasmo.",
      "pyramid": [
        {
          "label": "P1",
          "level": "Fácil",
          "detail": "Pide «sienta» y premia con comida"
        },
        {
          "label": "P2",
          "level": "Difícil",
          "detail": "Pide la conducta sin enseñar comida; al final, solo caricias o juego"
        },
        {
          "label": "P3",
          "level": "Fácil",
          "detail": "Pide algo muy sencillo y premia con afecto o juego"
        }
      ],
      "levels": [
        {
          "goal": "Sentado sin comida a la vista, 4 de 5 en casa"
        },
        {
          "goal": "3 conductas sin comida, en casa"
        },
        {
          "goal": "3 conductas sin comida, en la calle"
        }
      ]
    },
    {
      "id": "nombre",
      "type": "comun",
      "program": false,
      "name": "Atención al nombre",
      "difficulty": 1,
      "minutes": 3,
      "material": "Premios pequeños",
      "steps": [
        "En un sitio tranquilo, di «{dog}» una sola vez con tono alegre.",
        "En cuanto te mire: «muy bien» y premio.",
        "Repite 5–8 veces. Si no te mira en 2 s, haz un ruidito suave, pero no repitas el nombre.",
        "Sube la dificultad: dilo cuando esté olfateando o mirando a otro lado."
      ],
      "tip": "Su nombre debe anunciar cosas buenas. No lo uses nunca para regañar.",
      "mistake": "Repetir el nombre varias veces: le enseñas a ignorar las primeras.",
      "mastered": "Te mira a la primera 8 de cada 10 veces, con pequeñas distracciones.",
      "levels": [
        {
          "goal": "Te mira 8 de 10 veces en casa"
        },
        {
          "goal": "8 de 10 en el patio o portal"
        },
        {
          "goal": "8 de 10 en la calle"
        }
      ]
    },
    {
      "id": "mirame",
      "type": "comun",
      "program": false,
      "name": "Mírame (contacto visual)",
      "difficulty": 1,
      "minutes": 3,
      "material": "Premios",
      "steps": [
        "Sujeta un premio en la mano cerrada, con el brazo estirado hacia un lado.",
        "{dog} mirará la mano. Espera en silencio, sin moverte.",
        "En el instante en que desvíe la mirada a tus ojos: clic y premio.",
        "Cuando lo haga rápido, añade la palabra «mírame» justo antes.",
        "Pide 2–3 segundos de mirada antes del clic."
      ],
      "tip": "Es la base de la atención en el paseo: practícalo en sitios distintos.",
      "mistake": "Decirle «mírame» mientras mira la mano: la palabra aún no significa nada.",
      "mastered": "Mantiene 3 s de contacto visual con la palabra, en casa y en la calle.",
      "levels": [
        {
          "goal": "1 s de contacto visual",
          "time": {
            "sec": 1,
            "kind": "hold"
          }
        },
        {
          "goal": "3 s",
          "time": {
            "sec": 3,
            "kind": "hold"
          }
        },
        {
          "goal": "5 s en la calle",
          "time": {
            "sec": 5,
            "kind": "hold"
          }
        }
      ]
    },
    {
      "id": "tumbado",
      "type": "pos",
      "program": false,
      "name": "Tumbado",
      "difficulty": 2,
      "minutes": 5,
      "material": "Premios · alfombra",
      "steps": [
        "Pide sentado y pon un premio en su nariz.",
        "Baja el premio en vertical hasta el suelo, entre sus patas, y aléjalo un poco hacia ti.",
        "Cuando los codos toquen el suelo: clic y premio en el suelo.",
        "Si se levanta, premia aproximaciones: cabeza abajo, hombros abajo…",
        "Retira el señuelo y añade la palabra «tumba»."
      ],
      "tip": "Empieza en una superficie cómoda: en suelo frío cuesta más.",
      "mistake": "Ir demasiado rápido. Si falla 2 veces seguidas, vuelve al paso anterior.",
      "mastered": "Se tumba con la palabra, sin señuelo, 8 de cada 10 veces.",
      "levels": [
        {
          "goal": "4 de 5 con señuelo"
        },
        {
          "goal": "4 de 5 sin señuelo"
        },
        {
          "goal": "Solo con la palabra, en la calle"
        }
      ]
    },
    {
      "id": "target",
      "type": "llamada",
      "program": false,
      "name": "Toque de mano (target)",
      "difficulty": 1,
      "minutes": 3,
      "material": "Premios",
      "steps": [
        "Presenta la palma abierta a 5 cm de su nariz.",
        "Cuando la toque con el hocico: clic y premio.",
        "Retira la mano y vuelve a presentarla, a distintos lados y alturas.",
        "Añade «toca». Aleja la mano para que tenga que caminar hacia ella."
      ],
      "tip": "Útil para recolocarla, para llamadas cortas y para subir a la báscula.",
      "mistake": "Acercar la mano a su nariz: es ella quien debe ir a la mano.",
      "mastered": "Toca la mano con la palabra desde 2 m.",
      "levels": [
        {
          "goal": "Toca la mano a 10 cm"
        },
        {
          "goal": "A 1 m"
        },
        {
          "goal": "A 3 m"
        }
      ]
    },
    {
      "id": "choca",
      "type": "trucos",
      "program": false,
      "name": "Choca la pata",
      "difficulty": 1,
      "minutes": 3,
      "material": "Premios",
      "steps": [
        "Pide sentado. Pon un premio en tu mano cerrada a la altura de su pecho.",
        "Muchos perros dan con la pata: en cuanto la levante, clic y premio.",
        "Presenta después la mano abierta en vertical; clic cuando la toque.",
        "Añade la palabra «choca»."
      ],
      "tip": "Prueba con las dos patas, con palabras distintas.",
      "mistake": "Cogerle la pata: tiene que ofrecerla ella.",
      "mastered": "Choca con la palabra y la mano abierta.",
      "levels": [
        {
          "goal": "Con el premio en la mano cerrada"
        },
        {
          "goal": "Con la mano abierta"
        },
        {
          "goal": "Solo con la palabra"
        }
      ]
    },
    {
      "id": "gira",
      "type": "trucos",
      "program": false,
      "name": "Gira",
      "difficulty": 1,
      "minutes": 3,
      "material": "Premios",
      "steps": [
        "Con un premio en su nariz, dibuja un círculo amplio a la altura de su cabeza.",
        "Al completar la vuelta: clic y premio.",
        "Reduce el gesto hasta un pequeño giro de muñeca.",
        "Añade «gira» y enséñalo hacia el otro lado con otra palabra («vuelta»)."
      ],
      "tip": "Calentamiento ideal antes de ejercicios más difíciles.",
      "mistake": "Un círculo muy cerrado: se pierde y se frustra.",
      "mastered": "Gira hacia los dos lados solo con la palabra.",
      "levels": [
        {
          "goal": "Siguiendo el señuelo"
        },
        {
          "goal": "Con un gesto pequeño"
        },
        {
          "goal": "Solo con la palabra, hacia los dos lados"
        }
      ]
    },
    {
      "id": "reverencia",
      "type": "trucos",
      "program": false,
      "name": "Reverencia",
      "difficulty": 2,
      "minutes": 4,
      "material": "Premios",
      "steps": [
        "Con {dog} de pie, lleva el premio de su nariz hacia el suelo, entre sus patas delanteras.",
        "Clic en cuanto bajen los codos con el trasero aún arriba (antes de que se tumbe).",
        "Al principio puedes poner el brazo bajo su tripa para ayudar.",
        "Añade la palabra «reverencia»."
      ],
      "tip": "Captura también las reverencias espontáneas al estirarse.",
      "mistake": "Clic tarde: si se tumba entera, estarás premiando el tumbado.",
      "mastered": "Hace la reverencia con la palabra 3 veces seguidas.",
      "levels": [
        {
          "goal": "Baja los codos 1 s",
          "time": {
            "sec": 1,
            "kind": "hold"
          }
        },
        {
          "goal": "Aguanta 3 s",
          "time": {
            "sec": 3,
            "kind": "hold"
          }
        },
        {
          "goal": "Con la palabra, 3 seguidas"
        }
      ]
    },
    {
      "id": "manejo",
      "type": "manejo",
      "program": false,
      "name": "Manejo de patas y orejas",
      "difficulty": 1,
      "minutes": 2,
      "material": "Premios",
      "steps": [
        "Toca brevemente un hombro: clic y premio.",
        "Desliza la mano hacia una pata y tócala 1 segundo: clic y premio.",
        "Progresa: sujetar la pata 1 s → 3 s → tocar uñas.",
        "Igual con orejas, boca y cola.",
        "Si se aparta, respétalo y vuelve a un paso más fácil."
      ],
      "tip": "Sesiones de 1–2 minutos. Prepara visitas al veterinario y el corte de uñas.",
      "mistake": "Sujetarla a la fuerza: rompe la confianza que estás construyendo.",
      "mastered": "Deja tocar las 4 patas y las orejas relajada.",
      "levels": [
        {
          "goal": "Tocar las patas 1 s",
          "time": {
            "sec": 1,
            "kind": "hold"
          }
        },
        {
          "goal": "Sujetar cada pata 3 s",
          "time": {
            "sec": 3,
            "kind": "hold"
          }
        },
        {
          "goal": "Tocar uñas, orejas y boca 5 s",
          "time": {
            "sec": 5,
            "kind": "hold"
          }
        }
      ]
    },
    {
      "id": "cepillo",
      "type": "manejo",
      "program": false,
      "name": "Cepillado positivo",
      "difficulty": 1,
      "minutes": 3,
      "material": "Cepillo · premios",
      "steps": [
        "Enseña el cepillo: clic y premio. Repite hasta que lo mire con interés.",
        "Toca su lomo con el dorso del cepillo: clic y premio.",
        "Una pasada suave → premio. Luego 2–3 pasadas por premio.",
        "Para antes de que se canse o se mueva."
      ],
      "tip": "Empieza por zonas que le gusten (lomo) y deja las sensibles para más adelante.",
      "mistake": "Hacer sesiones largas porque está quieta: termina siempre en positivo.",
      "mastered": "Acepta 1 min de cepillado con premios espaciados.",
      "levels": [
        {
          "goal": "1 pasada por premio"
        },
        {
          "goal": "30 s de cepillado",
          "time": {
            "sec": 30,
            "kind": "hold"
          }
        },
        {
          "goal": "1 min de cepillado",
          "time": {
            "sec": 60,
            "kind": "hold"
          }
        }
      ]
    },
    {
      "id": "miraeso",
      "type": "manejo",
      "program": false,
      "name": "Mira eso (estímulos)",
      "difficulty": 3,
      "minutes": 5,
      "material": "Premios top · distancia",
      "steps": [
        "Busca una distancia en la que {dog} vea el estímulo (perro, bici) y siga tranquila.",
        "En el momento en que lo mire: clic y premio.",
        "Pronto mirará el estímulo y luego a ti, esperando el clic: eso es lo que buscas.",
        "Si ladra, tira o se queda fija: aléjate. Estás demasiado cerca.",
        "Reduce la distancia muy poco a poco, en días distintos."
      ],
      "tip": "La distancia es tu mejor herramienta. Mejor lejos y con éxito que cerca y con tensión.",
      "mistake": "Acercarte demasiado rápido: un mal encuentro retrasa semanas.",
      "mastered": "Mira a un perro a 10 m y vuelve a mirarte tranquila.",
      "levels": [
        {
          "goal": "Tranquila a 20 m del estímulo"
        },
        {
          "goal": "A 15 m"
        },
        {
          "goal": "A 10 m"
        }
      ]
    },
    {
      "id": "rodar",
      "type": "trucos",
      "program": false,
      "name": "Rodar",
      "difficulty": 2,
      "minutes": 4,
      "material": "Premios · alfombra",
      "steps": [
        "Pide tumbado.",
        "Lleva el premio desde su nariz hacia su hombro, para que se tumbe de lado.",
        "Sigue el movimiento por encima del lomo para que gire sobre la espalda.",
        "Cuando complete la vuelta: «muy bien» y premio.",
        "Reduce el gesto a un giro de mano y añade «rueda»."
      ],
      "tip": "Hazlo en superficie blanda y siempre hacia el mismo lado al principio.",
      "mistake": "Empujarla para que gire: tiene que seguir el premio ella.",
      "mastered": "Rueda completa con la palabra y un gesto pequeño.",
      "levels": [
        {
          "goal": "Rueda siguiendo el premio"
        },
        {
          "goal": "Con un gesto pequeño"
        },
        {
          "goal": "Solo con la palabra"
        }
      ]
    },
    {
      "id": "bang",
      "type": "trucos",
      "program": false,
      "name": "¡Bang! (hacerse la muerta)",
      "difficulty": 3,
      "minutes": 4,
      "material": "Premios · alfombra",
      "steps": [
        "Empieza desde tumbado de lado (la mitad de «rodar»).",
        "Premia cuando se quede tumbada de lado, quieta, 1 s.",
        "Alarga a 3–5 s antes de premiar.",
        "Añade la señal: «¡bang!» con la mano en forma de pistola.",
        "Libera con «ale»."
      ],
      "tip": "Enséñalo después de «rodar»: comparten el primer paso.",
      "mistake": "Premiar mientras se levanta: el premio va en el suelo, tumbada.",
      "mastered": "Se tumba de lado con «¡bang!» y aguanta 5 s.",
      "levels": [
        {
          "goal": "Tumbada de lado 1 s",
          "time": {
            "sec": 1,
            "kind": "hold"
          }
        },
        {
          "goal": "3 s",
          "time": {
            "sec": 3,
            "kind": "hold"
          }
        },
        {
          "goal": "5 s con «¡bang!» y el gesto",
          "time": {
            "sec": 5,
            "kind": "hold"
          }
        }
      ]
    },
    {
      "id": "ochos",
      "type": "trucos",
      "program": false,
      "name": "Ochos entre piernas",
      "difficulty": 2,
      "minutes": 4,
      "material": "Premios",
      "steps": [
        "De pie con las piernas abiertas, guía a {dog} con un premio para que pase entre ellas.",
        "Llévala alrededor de una pierna y de vuelta por el centro.",
        "Repite por la otra pierna para dibujar un 8.",
        "Reduce el señuelo a un gesto con la mano y añade «ochos»."
      ],
      "tip": "Coordina vuestro movimiento: muy bueno para el vínculo y el paseo dirigido.",
      "mistake": "Ir muy rápido al principio: primero medio ocho, luego uno entero.",
      "mastered": "Hace 2 ochos seguidos con un gesto de mano.",
      "levels": [
        {
          "goal": "Medio ocho con señuelo"
        },
        {
          "goal": "Un ocho entero con gesto"
        },
        {
          "goal": "2 ochos seguidos solo con gesto"
        }
      ]
    },
    {
      "id": "atras",
      "type": "trucos",
      "program": false,
      "name": "Marcha atrás",
      "difficulty": 2,
      "minutes": 3,
      "material": "Premios · un pasillo",
      "steps": [
        "En un pasillo estrecho, colócate frente a ella.",
        "Da un paso pequeño hacia ella; si recula un paso: «muy bien» y premio.",
        "Pide 2 o 3 pasos antes de premiar.",
        "Añade la palabra «atrás»."
      ],
      "tip": "Le da conciencia de las patas traseras: base para muchos trucos.",
      "mistake": "Echarte encima: el paso tiene que ser suave.",
      "mastered": "Recula 3 pasos con la palabra, sin pasillo.",
      "levels": [
        {
          "goal": "1 paso atrás en el pasillo"
        },
        {
          "goal": "3 pasos en el pasillo"
        },
        {
          "goal": "3 pasos sin pasillo"
        }
      ]
    },
    {
      "id": "patas",
      "type": "trucos",
      "program": false,
      "name": "Patas arriba (en un objeto)",
      "difficulty": 1,
      "minutes": 3,
      "material": "Caja o escalón estable",
      "steps": [
        "Pon un escalón o caja estable delante de ella.",
        "Guíala con el premio para que suba las patas delanteras.",
        "Con las dos patas arriba: «muy bien» y premio.",
        "Añade «arriba» y prueba con otros objetos seguros."
      ],
      "tip": "El objeto tiene que ser firme: si se mueve, le cogerá miedo.",
      "mistake": "Objetos inestables o resbaladizos.",
      "mastered": "Sube las patas a 3 objetos distintos con la palabra.",
      "levels": [
        {
          "goal": "Sube a un escalón con señuelo"
        },
        {
          "goal": "Con la palabra"
        },
        {
          "goal": "A 3 objetos distintos"
        }
      ]
    },
    {
      "id": "verguenza",
      "type": "trucos",
      "program": false,
      "name": "Vergüenza (pata al hocico)",
      "difficulty": 3,
      "minutes": 4,
      "material": "Pegatina o cinta suave",
      "steps": [
        "Pega un trocito de cinta suave en su hocico.",
        "Cuando levante la pata para quitársela: «muy bien» y premio.",
        "Repite y retira la cinta cuando ya levante la pata hacia el hocico.",
        "Añade «¿vergüenza?»."
      ],
      "tip": "Truco muy vistoso; tiene que ser un juego, nunca una molestia.",
      "mistake": "Cinta que tire del pelo: usa algo muy suave o un post-it.",
      "mastered": "Se tapa el hocico con la pata con la palabra.",
      "levels": [
        {
          "goal": "Levanta la pata hacia la cinta"
        },
        {
          "goal": "Sin cinta, con señuelo"
        },
        {
          "goal": "Solo con la palabra"
        }
      ]
    },
    {
      "id": "nombres",
      "type": "trucos",
      "program": false,
      "name": "Trae por nombre",
      "difficulty": 3,
      "minutes": 5,
      "material": "2–3 juguetes distintos",
      "steps": [
        "Nombra un juguete mientras juegas con él («pelota»).",
        "Ponlo en el suelo y pide «trae la pelota»: «muy bien» y juego al traerlo.",
        "Añade un segundo juguete al lado y pide solo la pelota.",
        "Si trae el otro: «no» informativo y vuelve a pedir.",
        "Cuando acierte, enseña el nombre del segundo juguete."
      ],
      "tip": "Discriminación: combina con «Pulsa si sabes».",
      "mistake": "Cambiar de sitio los juguetes siempre igual: así aprende posiciones, no nombres.",
      "mastered": "Trae el juguete correcto entre 2, 4 de cada 5 veces.",
      "levels": [
        {
          "goal": "Trae un juguete por su nombre"
        },
        {
          "goal": "Elige entre 2 juguetes"
        },
        {
          "goal": "Elige entre 3 juguetes"
        }
      ]
    },
    {
      "id": "saludo",
      "type": "auto",
      "program": false,
      "name": "Saludo sin saltar",
      "difficulty": 2,
      "minutes": 5,
      "material": "Una persona ayudante · premios",
      "steps": [
        "Con correa, que una persona se acerque despacio a {dog}.",
        "Si se mantiene con las cuatro patas en el suelo, la persona sigue acercándose.",
        "Si salta: «no» informativo y la persona se gira y se aleja un paso.",
        "Cuando esté a su lado con las cuatro patas en el suelo: «muy bien», premio y la persona la saluda con calma.",
        "Libera con «ale» y repite con otras personas."
      ],
      "tip": "El saludo es el premio: solo llega con las cuatro patas en el suelo.",
      "mistake": "Saludarla o tocarla mientras salta, aunque sea para apartarla: también es atención.",
      "mastered": "Recibe a una persona sin saltar, 4 de cada 5 veces.",
      "levels": [
        {
          "goal": "Sin saltar con una persona conocida"
        },
        {
          "goal": "Con visitas en casa"
        },
        {
          "goal": "Con desconocidos en la calle"
        }
      ]
    },
    {
      "id": "bordillo",
      "type": "paseo",
      "program": false,
      "name": "Sentarse en el bordillo",
      "difficulty": 1,
      "minutes": 5,
      "material": "Correa · premios",
      "steps": [
        "Al llegar a un bordillo, para antes del borde.",
        "Pide sentado.",
        "Cuando se siente: «muy bien» y premio.",
        "Espera 2–3 s, mira a los lados y cruzad con «ale».",
        "Repítelo en cada cruce del paseo."
      ],
      "tip": "Con práctica se sentará sola al llegar al bordillo: premia mucho esas veces.",
      "mistake": "Cruzar sin que se haya sentado «porque hay prisa»: el criterio se rompe enseguida.",
      "mastered": "Se sienta en el bordillo sin que se lo pidas.",
      "levels": [
        {
          "goal": "Se sienta cuando se lo pides"
        },
        {
          "goal": "Se sienta y espera 3 s",
          "time": {
            "sec": 3,
            "kind": "hold"
          }
        },
        {
          "goal": "Se sienta sola al llegar al bordillo"
        }
      ]
    },
    {
      "id": "emergencia",
      "type": "llamada",
      "program": false,
      "name": "Llamada de emergencia",
      "difficulty": 2,
      "minutes": 3,
      "material": "Premio especial (jamón, queso, salchicha)",
      "steps": [
        "Elige una palabra o silbato que no uses nunca para nada más.",
        "Dila una vez y dale inmediatamente un premio especial y abundante («jackpot»), aunque no haya hecho nada.",
        "Repite 5 veces al día durante una semana, en casa.",
        "Empieza a decirla cuando esté a 1–2 m y celébralo a lo grande al llegar.",
        "Úsala de verdad solo en emergencias, y repásala cada semana para que no pierda valor."
      ],
      "tip": "Esta llamada siempre paga con lo mejor que tengas: es tu seguro de vida.",
      "mistake": "Usarla para algo desagradable, o gastarla en llamadas del día a día.",
      "mastered": "Corre hacia ti al instante desde cualquier situación, en casa y en zona segura.",
      "levels": [
        {
          "goal": "Viene corriendo desde 2 m en casa"
        },
        {
          "goal": "Desde otra habitación"
        },
        {
          "goal": "En zona segura con distracciones"
        }
      ]
    },
    {
      "id": "campana",
      "type": "trucos",
      "program": false,
      "name": "Toca la campana",
      "difficulty": 1,
      "minutes": 3,
      "material": "Timbre de mesa o campana · premios",
      "steps": [
        "Empieza con el toque de mano (target).",
        "Pon la mano detrás del timbre: al tocar la mano, tocará el timbre. «Muy bien» en cuanto suene.",
        "Retira la mano poco a poco: premia cuando toque el timbre solo.",
        "Añade «campana»."
      ],
      "tip": "Base del target: si «toca» ya le sale, esto es rapidísimo.",
      "mistake": "Un timbre que suene muy fuerte al principio: puede asustarla.",
      "mastered": "Toca el timbre con la palabra, desde 1 m.",
      "levels": [
        {
          "goal": "Toca el timbre con tu mano detrás"
        },
        {
          "goal": "Toca el timbre sin tu mano"
        },
        {
          "goal": "Desde 1 m con la palabra"
        }
      ]
    },
    {
      "id": "otra",
      "type": "trucos",
      "program": false,
      "name": "Dame la otra",
      "difficulty": 1,
      "minutes": 3,
      "material": "Premios",
      "steps": [
        "Pide «choca» con la pata de siempre.",
        "Presenta tu mano hacia el lado contrario y espera a que levante la otra pata.",
        "Al levantarla: «muy bien» y premio.",
        "Ponle su propia palabra («la otra») y alterna las dos."
      ],
      "tip": "Discriminación: cada pata tiene su palabra.",
      "mistake": "Premiar si da la pata equivocada: «no» informativo y vuelve a pedir.",
      "mastered": "Da la pata correcta según la palabra, 4 de cada 5.",
      "levels": [
        {
          "goal": "Levanta la otra pata con tu mano en ese lado"
        },
        {
          "goal": "Con la palabra"
        },
        {
          "goal": "Alterna las dos patas sin fallar"
        }
      ]
    },
    {
      "id": "besito",
      "type": "trucos",
      "program": false,
      "name": "Besito",
      "difficulty": 1,
      "minutes": 2,
      "material": "Premios · un poco de crema o queso en la mano",
      "steps": [
        "Pon un poco de algo rico en el dorso de tu mano.",
        "Cuando la toque con el hocico: «muy bien» y premio de la otra mano.",
        "Repite sin nada en la mano.",
        "Acerca la mano a tu mejilla y añade «besito»."
      ],
      "tip": "Si es muy lamedora, premia el toque con el hocico, no el lametón.",
      "mistake": "Acercar tu cara a su cara de golpe: tiene que venir ella.",
      "mastered": "Te da un toque en la mejilla con la palabra.",
      "levels": [
        {
          "goal": "Toca tu mano con el hocico"
        },
        {
          "goal": "Tu mejilla, con la cara cerca"
        },
        {
          "goal": "Con la palabra, a la primera"
        }
      ]
    },
    {
      "id": "barbilla",
      "type": "trucos",
      "program": false,
      "name": "Cabeza abajo (barbilla)",
      "difficulty": 1,
      "minutes": 3,
      "material": "Premios · una toalla doblada",
      "steps": [
        "Pon la palma de tu mano abierta bajo su barbilla, sin tocarla.",
        "Cuando apoye la barbilla aunque sea un instante: «muy bien» y premio.",
        "Alarga el tiempo de apoyo: 1 s, 3 s, 5 s.",
        "Cambia la mano por una toalla o el suelo y añade «barbilla»."
      ],
      "tip": "Muy útil en el veterinario: mantiene la cabeza quieta por voluntad propia.",
      "mistake": "Sujetarle la cabeza: el apoyo tiene que ofrecerlo ella.",
      "mastered": "Apoya la barbilla 10 s en tu mano o en una toalla.",
      "levels": [
        {
          "goal": "Apoya la barbilla 1 s",
          "time": {
            "sec": 1,
            "kind": "hold"
          }
        },
        {
          "goal": "5 s",
          "time": {
            "sec": 5,
            "kind": "hold"
          }
        },
        {
          "goal": "10 s, en tu mano o en una toalla",
          "time": {
            "sec": 10,
            "kind": "hold"
          }
        }
      ]
    },
    {
      "id": "aro",
      "type": "trucos",
      "program": false,
      "name": "Saltar el aro",
      "difficulty": 2,
      "minutes": 4,
      "material": "Aro de hula hoop · premios",
      "steps": [
        "Sujeta el aro tocando el suelo y lanza un premio al otro lado: que pase a través.",
        "Cuando lo cruce: «muy bien».",
        "Sube el aro unos centímetros cada vez.",
        "Añade «hop» y termina con «Nada más» para que se calme."
      ],
      "tip": "Saltos bajos y en suelo que no resbale. Si es joven, consulta la altura con tu veterinario.",
      "mistake": "Subir la altura demasiado rápido.",
      "mastered": "Salta el aro a la altura de sus codos con la palabra.",
      "levels": [
        {
          "goal": "Cruza el aro en el suelo"
        },
        {
          "goal": "Salta el aro a 10 cm"
        },
        {
          "goal": "A la altura de sus codos, con la palabra"
        }
      ]
    },
    {
      "id": "gatear",
      "type": "trucos",
      "program": false,
      "name": "Gatear",
      "difficulty": 2,
      "minutes": 4,
      "material": "Premios · alfombra",
      "steps": [
        "Pide tumbado.",
        "Lleva el premio pegado al suelo, despacio, hacia delante.",
        "Si avanza sin levantarse: «muy bien» y premio. Si se levanta, vuelve a empezar.",
        "Alarga la distancia y añade «gatea»."
      ],
      "tip": "Ponerte de rodillas y hacer un túnel con tus piernas ayuda al principio.",
      "mistake": "Mover el premio demasiado rápido: se levantará para seguirlo.",
      "mastered": "Gatea 1 m sin levantarse.",
      "levels": [
        {
          "goal": "Gatea 20 cm"
        },
        {
          "goal": "50 cm"
        },
        {
          "goal": "1 m"
        }
      ]
    },
    {
      "id": "recoger",
      "type": "trucos",
      "program": false,
      "name": "Recoger juguetes",
      "difficulty": 2,
      "minutes": 5,
      "material": "Caja baja · 3 juguetes",
      "steps": [
        "Pide «trae» con un juguete, sujetando la caja debajo de su boca.",
        "Pide «suelta»: el juguete cae en la caja. «Muy bien» y premio.",
        "Aleja poco a poco la caja de tu mano y ponla en el suelo.",
        "Añade «recoge» y suma más juguetes."
      ],
      "tip": "Encadena trae, suelta y target: practica antes cada parte.",
      "mistake": "Premiar si suelta fuera de la caja.",
      "mastered": "Mete 3 juguetes en la caja con una sola palabra.",
      "levels": [
        {
          "goal": "Suelta 1 juguete en la caja que sujetas"
        },
        {
          "goal": "1 juguete en la caja en el suelo"
        },
        {
          "goal": "3 juguetes con una sola palabra"
        }
      ]
    },
    {
      "id": "slalom",
      "type": "trucos",
      "program": false,
      "name": "Slalom",
      "difficulty": 2,
      "minutes": 4,
      "material": "Conos o botellas · premios",
      "steps": [
        "Coloca 3 conos en línea, separados un metro.",
        "Guíala con el premio en zigzag entre los conos.",
        "«Muy bien» al terminar la fila.",
        "Reduce el señuelo a un gesto y añade «slalom». Prueba también entre tus piernas mientras andas."
      ],
      "tip": "Ritmo tranquilo primero: la velocidad llega sola.",
      "mistake": "Conos demasiado juntos al principio.",
      "mastered": "Hace un slalom de 5 conos solo con el gesto.",
      "levels": [
        {
          "goal": "3 conos con señuelo"
        },
        {
          "goal": "5 conos con gesto"
        },
        {
          "goal": "Entre tus piernas mientras andas"
        }
      ]
    },
    {
      "id": "esconder",
      "type": "trucos",
      "program": false,
      "name": "Esconder la cabeza",
      "difficulty": 2,
      "minutes": 4,
      "material": "Manta o tus brazos · premios",
      "steps": [
        "Sujeta una manta formando un hueco, o haz un aro con tus brazos.",
        "Pon un premio dentro: cuando meta la cabeza, «muy bien».",
        "Pide que la mantenga dentro 1–2 s antes de premiar.",
        "Retira el premio del hueco y añade «escóndete»."
      ],
      "tip": "Truco muy vistoso y tranquilo: va bien para terminar una sesión.",
      "mistake": "Taparle la cabeza tú: tiene que meterla ella.",
      "mastered": "Esconde la cabeza 3 s con la palabra.",
      "levels": [
        {
          "goal": "Mete la cabeza con premio dentro"
        },
        {
          "goal": "Sin premio dentro, 1 s",
          "time": {
            "sec": 1,
            "kind": "hold"
          }
        },
        {
          "goal": "3 s con la palabra",
          "time": {
            "sec": 3,
            "kind": "hold"
          }
        }
      ]
    },
    {
      "id": "cajon",
      "type": "trucos",
      "program": false,
      "name": "Abrir y cerrar (cajón o puerta)",
      "difficulty": 3,
      "minutes": 6,
      "material": "Cuerda o trapo atado al tirador · premios",
      "steps": [
        "Para abrir: ata un trapo al tirador y pide «tira» con un juego de tira y afloja.",
        "Cuando tire y abra un poco: «muy bien» y premio.",
        "Para cerrar: usa el target con la mano sobre el cajón; premia cuando lo empuje con la pata o el hocico.",
        "Pon una palabra a cada acción («abre», «cierra»)."
      ],
      "tip": "Usa un cajón ligero y sin cosas que se puedan caer.",
      "mistake": "Dejar que juegue con la cuerda cuando no estáis entrenando: dejará de ser una señal.",
      "mastered": "Abre y cierra un cajón con dos palabras distintas.",
      "levels": [
        {
          "goal": "Tira del trapo y abre un poco"
        },
        {
          "goal": "Abre del todo con «abre»"
        },
        {
          "goal": "Abre y cierra con dos palabras"
        }
      ]
    },
    {
      "id": "pide",
      "type": "trucos",
      "program": false,
      "name": "Pide (sentada sobre las patas traseras)",
      "difficulty": 3,
      "minutes": 3,
      "material": "Premios · una pared detrás al principio",
      "steps": [
        "Solo si es adulta y no tiene problemas de espalda o caderas.",
        "Desde sentado, sube el premio despacio por encima de su cabeza para que levante las patas delanteras.",
        "Premia cuando se equilibre 1 s, aunque sea con ayuda de tu mano.",
        "Sesiones de 3–4 repeticiones como máximo. Añade «pide»."
      ],
      "tip": "Fortalece el core: hazlo poco y bien, nunca seguido.",
      "mistake": "Hacerlo con una perra joven o con molestias: pregunta antes a tu veterinario.",
      "mastered": "Se equilibra 3 s sin apoyo.",
      "levels": [
        {
          "goal": "Se equilibra 1 s con ayuda",
          "time": {
            "sec": 1,
            "kind": "hold"
          }
        },
        {
          "goal": "1 s sin ayuda",
          "time": {
            "sec": 1,
            "kind": "hold"
          }
        },
        {
          "goal": "3 s sin apoyo",
          "time": {
            "sec": 3,
            "kind": "hold"
          }
        }
      ]
    },
    {
      "id": "vasos",
      "type": "trucos",
      "program": false,
      "name": "¿Cuál tiene el premio? (vasos)",
      "difficulty": 3,
      "minutes": 4,
      "material": "3 vasos opacos · premios con olor",
      "steps": [
        "Esconde un premio bajo un vaso, delante de ella.",
        "Cuando lo toque con la pata o el hocico: «muy bien», levantas el vaso y se lo come.",
        "Pasa a 2 vasos y luego a 3, moviéndolos despacio.",
        "Si señala un vaso vacío: «no» informativo y otra oportunidad."
      ],
      "tip": "Es trabajo de olfato: cuenta como una de sus sesiones de olfato del día.",
      "mistake": "Dejar que tire los vasos a golpes: solo cuenta tocarlo.",
      "mastered": "Encuentra el premio entre 3 vasos, 4 de cada 5 veces.",
      "levels": [
        {
          "goal": "Encuentra el premio bajo 1 vaso"
        },
        {
          "goal": "Entre 2 vasos"
        },
        {
          "goal": "Entre 3 vasos movidos"
        }
      ]
    }
  ],
  "routine": [
    {
      "id": "olfato",
      "name": "Trabajo de olfato",
      "hint": "5–10 min, casa o calle",
      "target": 4,
      "min": 2,
      "label": "2–4"
    },
    {
      "id": "juguete",
      "name": "Juguete interactivo",
      "hint": "2 al día",
      "target": 2,
      "min": 2,
      "label": "2"
    },
    {
      "id": "puerta",
      "name": "Espera en la puerta",
      "hint": "en cada salida",
      "target": 3,
      "min": 1,
      "label": "3"
    },
    {
      "id": "mastic",
      "name": "Masticable disponible",
      "hint": "siempre a su alcance",
      "target": 1,
      "min": 1,
      "label": "1",
      "check": true
    }
  ],
  "code": [
    {
      "word": "{dog}",
      "meaning": "Atención: me refiero a ti"
    },
    {
      "word": "Muy bien",
      "meaning": "Confirmación: vas bien, sigue"
    },
    {
      "word": "No",
      "meaning": "Informativo: eso no es lo que pido"
    },
    {
      "word": "Ale",
      "meaning": "Liberación: fin del ejercicio"
    },
    {
      "word": "Libre",
      "meaning": "Liberación para andar sola y explorar"
    },
    {
      "word": "Espera / Tuyo",
      "meaning": "Aguántate las ganas / es tuyo"
    },
    {
      "word": "Ach",
      "meaning": "Activación en el juego"
    },
    {
      "word": "Trae · Suelta · Busca",
      "meaning": "Juego con el juguete"
    },
    {
      "word": "Nada más",
      "meaning": "Fin del juego, a desconectar"
    },
    {
      "word": "¡Eh!",
      "meaning": "Exigencia suave"
    },
    {
      "word": "Mal",
      "meaning": "Norma social"
    }
  ]
};
