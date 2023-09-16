const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
/**const { client, messagemedia } = require ('baileys')*/


const flowPrimario = addKeyword(['1', 'uno', 'siguiente']).addAnswer(['📄 Cómo te podemos ayudar? 🤔'])
const flowSecundario = addKeyword(['2', 'dos']).addAnswer(['📄 Te agradecemos habernos escrito!'])
const flowTerciario = addKeyword(['9', 'Nueve', 'nueve']).addAnswer(['📄 Te regresaremos al Menú principal!', 'Por favor ingresa 9 nuevamente para ir al menú principal!'])



const flowGracias = addKeyword(['Gracias', 'gracias', 'grac']).addAnswer(
    [
        '🚀 Con gusto! estamos para servirte!',
        '',
        '\n*1* Para continuar en el chat.',
        '\n*2* Para terminar el chat.',
    ],
    null,
    null,
    [flowPrimario, flowSecundario]
)


 
const flowInfo = addKeyword(['Información', 'info', 'informacion'])
    .addAnswer('Tambien quiero comentarte que contamos con los siguientes servicios:', { delay: 4000, })
    .addAnswer('👉 *Entrenamientos Personalizados En Línea de Crossfit Casero (con equipo mínimo).*', { delay: 3000, })
    .addAnswer('👉 *Entrenamientos Personalizados En Línea de Calistenia (sin y con equipo mínimo).*', { delay: 3000, })
    .addAnswer('👉 *Renta o Venta de Inflables o Brincolin para fiestas infantiles.*', { delay: 3000, })
    .addAnswer('👉 *Consultoria en Implementaciones de Metodologías Ágiles (Scrum/SAFe/Metodo-Spotify) y Mejora Continua en Sistemas ERP y Operaciones.*', { delay: 3000, })
    .addAnswer('👉 *Cursos de introducción para la adopción (Insepción Agile) del marco de trabajo Scrum.*', { delay: 3000, })
    .addAnswer('En el momento que requieras la atención directa de Enrique, escribe *0*, o las palabras *cero* o *Personal* y le enviaremos un mensaje directo requiriendo su atención!', { delay: 3000, })
    .addAnswer(['Mientras tanto, 🫵 puedes escribir alguna de las siguientes palabras 👉*Imagen* para mostrarte un ejemplo de Imagenes que puedo emviar!',
        'La palabra 👉*Botón* para mostrarte un ejemplo de botones...', 'U 👉*Opinión*'],
        { delay: 2500, },
        null,
        [flowPrimario, flowSecundario, flowGracias]
    )



const flowno = addKeyword(['no']).addAnswer(
    ['🤪 En breve, Enrique, te escribirá el mismo', '', '\n*9* Para regresar al Menú principal','','*0* para avisar a Enrique sobre tu espera.'],
    null,
    null,
    [flowTerciario, flowGracias]
)



const flowsi = addKeyword('si') 
    .addAnswer('Los *Chatbots* 🤖 en WhatsApp pueden ayudar a mejorar la eficiencia en la atención al cliente, reducir costos y aumentar la satisfacción de tus clientes al proporcionarles respuestas rápidas y precisas las 24 horas del día, los 7 días de la semana.', { delay: 500, })
    .addAnswer(['Beneficios de integrar un *Chatbot* 🤖 para la atención de tus clientes:',
        ' - Atención rápida, oportuna, personalizada y si tú así lo necesitas 24/7.',
        ' - Respuestas rápidas a preguntas comunes (FAQ´s)de tus Productos y Servicios.',
        ' - Ahorro y aprovechamiento de recursos.',
        ' - Recopilación de datos valiosos de prospectos y clientes.'], { delay: 4000, })
    .addAnswer('Te interesaría tener mayor información sobre mi producto y servicios de *ChatBot*? 🤖 ', { delay: 4000, })
    .addAnswer(['En breve, Enrique te escribirá, *Gracias por tu paciencia!* 🤖🙏🏽',
        'Escribe *Info* si necesitas información de nuestros otros servicios. 🤝'],
        { delay: 2000, },
        null,
        [flowGracias, flowInfo]
    )   


const flowPrincipal = addKeyword(['hola', 'holaa', 'holaaa', 'holaaaa', 'días', 'dias', 'tardes', 'noches'])
    .addAnswer('👽 Hola Terricola! 🖖🏽')
    .addAnswer('🤖 🦾 *Soy el Asistente Chatbot* de Enrique 🤖 👋🏾', { delay: 2500, })
    .addAnswer(' 🫵 Bienvenida(o) 🫵,', { delay: 2500, })
    .addAnswer('En un momento Enrique te escribirá... ⚡ *Gracias por esperar!* ⚡', { delay: 5000, })
    .addAnswer('🤔 Mientras tanto... ¿Tienes un negocio? ⚡', { delay: 5000, })
    .addAnswer('🤔 ¿Conoces las ventajas que te da implementar un 🤖 *ChatBot* 🤖 en tu WhatsApp para atención a Clientes?', { delay: 1000, })
    .addAnswer(['🤔 ¿Te gustaría conocer más sobre 🤖 *ChatBot de Whatsapp* 🤖?', 'Escribe *Si* para conocer más, o *No* para la atención de Enrique'], 
    { delay: 2000, },
    null,
    [flowsi, flowno, flowGracias, flowInfo]
    )


    /**👋🏾🫵🏽👏🏽👍🏽😏🤔😎🫡🤑🙌 🤡👽🤖 🤔🫣  🖖🏽🤘🏼🫰🏼🤝🦾⚡ 🙏🏽*/



const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()