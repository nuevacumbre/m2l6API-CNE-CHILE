🚀 Dashboard API CNE - Chile

Vista consolidada de datos energéticos nacionales

Este panel permite interactuar con los datos oficiales de la Comisión Nacional de Energía (CNE) de Chile. Proporciona una interfaz visual para la gestión de estaciones de servicio, distribuidores y precios de combustibles.

🔐 Requisito de Acceso

Para utilizar este Dashboard en http://127.0.0.1:5500/login.html, es obligatorio estar registrado previamente en la plataforma oficial de desarrolladores del Gobierno de Chile:

👉 Registro oficial: https://apidocs.cne.cl/

Flujo de Autenticación

graph LR
    A[Usuario] -->|Credenciales| B(Portal CNE)
    B -->|Genera| C{Token Bearer}
    C -->|Copia| D[Este Dashboard]
    D -->|Request + Token| E(Endpoints Protegidos)
    E -->|JSON Data| F[Visualización]
    
    style C fill:#f96,stroke:#333,stroke-width:2px
    style D fill:#bbf,stroke:#333,stroke-width:2px


✅ Sesión Activa

Estado: Conectado

Token de acceso: > ewJ0iXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLmNuZS5jbC9hcGkvbG9naW4iLCJpYXQiOjE3NjYxNTYyNTQsImV4cCI6MTc2NjE1OTg1NCwibmJmIjoxNzY2MTU2MjU0LCJqdGkiOiJFVU14RGpnVDl3alUzb3dyIiwic3ViIjoiNzc5NiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ._zYc1xPIa803ZW8CXTH8YHWK8XM1XmY83WsrXmhe3QY

Nivel de acceso: $\text{Válido para endpoints protegidos (v3, v4)}$

📊 Métricas en Tiempo Real

Procesamiento de datos mediante modelos estadísticos:

Categoría

Total Registrado

Estado

Estaciones

$\sum_{i=1}^{n} Est_i = 2017$

✅ Activo

Distribuidores

$N_{dist} = 173$

✅ Activo

Combustibles

$T_{types} = 12$

⚡ Disponible

Regiones

$R_{cl} = 16$

🗺️ Mapeado

⚡ Acciones Rápidas

⛽ Últimas Estaciones Actualizadas

Abastible S.A.: Ruta A-616, Manzana C, Lote A 0

IRACABAL OTTH HENRI EDWARD JEAN: VIVAR 402

MARGARITA BEATRIZ HERNANDEZ VERGARA: RUTA A-16 KM 32 / AVDA SANTA ROSA 0

PASTEN Y PASTEN: SITIO 54B BARRIO INDUSTRIAL

Ewald Zippel y Cía Limitada: Avda. Salvador Allende 2345

...y $+2012$ estaciones más en base de datos.

ℹ️ Información de Uso

Endpoints Disponibles

Método

Endpoint

Acceso

GET

/api/v4/estaciones

🔑 Protegido

GET

/api/v4/combustible/vehicular/distribuidores

🔑 Protegido

GET

/api/v4/combustible/vehicular/tiposcombustibles

🔑 Protegido

GET

/api/region

🌍 Público

GET

/api/comuna/{id}

🌍 Público

🎯 Próximos Pasos

Explora los ejemplos específicos en el menú lateral.

Revisa la respuesta cruda de cada endpoint para ver campos adicionales.

Prueba los filtros avanzados por Región y Comuna.

Implementa estas llamadas en tus propios microservicios.

Documentación generada para el equipo de desarrollo de la API CNE del Curso Frontend.

www.nuevacumbre.cl