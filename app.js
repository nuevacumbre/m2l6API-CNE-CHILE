// Variable global para almacenar el Token Bearer
let API_TOKEN = null;

$(function() {
    // Verificar si hay un token almacenado en localStorage
    const storedToken = localStorage.getItem('cne_api_token');
    if (storedToken) {
        API_TOKEN = storedToken;
        actualizarEstadoAutenticacion();
    }
});

// ==========================================================
// FUNCIÓN CENTRAL PARA LLAMADAS A LA API
// ==========================================================
function makeCNE_API_Call(url, method = 'GET', data = null) {
    const settings = {
        "url": url,
        "method": method,
        "timeout": 0,
        "headers": {},
        "data": data 
    };

    // Si la URL requiere token (v4, v3), lo añadimos
    if (API_TOKEN && (url.includes('/v4/') || url.includes('/v3/'))) {
        settings.headers["Authorization"] = "Bearer " + API_TOKEN;
    }

    return $.ajax(settings);
}

// ==========================================================
// FUNCIONES DE EJEMPLO
// ==========================================================

// Ejemplo 1: Cargar Regiones (API Pública)
function cargarRegiones() {
    const $contenido = $('#contenido-regiones');
    const $ejemplo = $('#ejemplo-regiones');
    
    $contenido.html('<div class="text-center"><div class="spinner-border text-success" role="status"></div><p class="mt-2">Cargando regiones...</p></div>');
    $ejemplo.removeClass('d-none');

    makeCNE_API_Call("https://api.cne.cl/api/region")
        .done(function(response) {
            let html = '<div class="row">';
            
            if (Array.isArray(response) && response.length > 0) {
                $.each(response, function(i, region) {
                    html += `
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${region.nombre}</h5>
                                    <p class="card-text">ID: ${region.id}</p>
                                    <button class="btn btn-sm btn-outline-primary" onclick="cargarComunas(${region.id}, '${region.nombre}')">
                                        Ver Comunas
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                });
            } else {
                html = '<div class="alert alert-warning">No se encontraron regiones.</div>';
            }
            
            html += '</div>';
            $contenido.html(html);
        })
        .fail(function(jqXHR) {
            $contenido.html(`
                <div class="alert alert-danger">
                    <h6>Error al cargar regiones</h6>
                    <p>Estado: ${jqXHR.status} - ${jqXHR.statusText}</p>
                    <small>Este endpoint es público y no requiere autenticación.</small>
                </div>
            `);
        });
}

// Ejemplo 2: Cargar Comunas de una Región
function cargarComunas(regionId, regionNombre) {
    const $contenido = $('#contenido-regiones');
    
    $contenido.html(`<div class="text-center"><div class="spinner-border text-primary" role="status"></div><p class="mt-2">Cargando comunas de ${regionNombre}...</p></div>`);

    makeCNE_API_Call(`https://api.cne.cl/api/comuna/${regionId}`)
        .done(function(response) {
            let html = `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5>Comunas de ${regionNombre}</h5>
                    <button class="btn btn-sm btn-secondary" onclick="cargarRegiones()">← Volver a Regiones</button>
                </div>
                <div class="row">
            `;
            
            if (Array.isArray(response) && response.length > 0) {
                $.each(response, function(i, comuna) {
                    html += `
                        <div class="col-md-3 mb-2">
                            <div class="card bg-light">
                                <div class="card-body py-2">
                                    <p class="card-text mb-0">${comuna.nombre}</p>
                                </div>
                            </div>
                        </div>
                    `;
                });
            } else {
                html += '<div class="col-12"><div class="alert alert-warning">No se encontraron comunas para esta región.</div></div>';
            }
            
            html += '</div>';
            $contenido.html(html);
        })
        .fail(function(jqXHR) {
            $contenido.html(`
                <div class="alert alert-danger">
                    <h6>Error al cargar comunas</h6>
                    <p>Estado: ${jqXHR.status} - ${jqXHR.statusText}</p>
                    <button class="btn btn-sm btn-secondary mt-2" onclick="cargarRegiones()">← Volver a Regiones</button>
                </div>
            `);
        });
}

// ==========================================================
// FUNCIONES DE AUTENTICACIÓN
// ==========================================================

function realizarLogin(email, password, $btn, $resultado) {
    $resultado.removeClass("alert-success alert-danger").addClass("d-none").empty();
    
    if (!email || !password) {
        mostrarError($resultado, "⚠️ Por favor, ingresa tu email y contraseña.");
        return;
    }

    $btn.attr("disabled", true).html('<span class="spinner-border spinner-border-sm" role="status"></span> Autenticando...');

    makeCNE_API_Call("https://api.cne.cl/api/login", "POST", { email: email, password: password })
        .done(function (response) {
            if (response && response.token) {
                API_TOKEN = response.token;
                localStorage.setItem('cne_api_token', API_TOKEN);
                
                mostrarExito($resultado, "✅ Token obtenido correctamente. Redirigiendo...");
                actualizarEstadoAutenticacion();
                
                // Redirigir después de un breve delay
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                mostrarError($resultado, "Error de login: Token no encontrado en la respuesta.");
            }
        })
        .fail(function (jqXHR) {
            let msg = jqXHR.status === 401 ? "❌ Credenciales inválidas." : `❌ Error ${jqXHR.status}.`;
            mostrarError($resultado, msg);
        })
        .always(function() {
            $btn.attr("disabled", false).html("🔒 Iniciar Sesión");
        });
}

function cerrarSesion() {
    API_TOKEN = null;
    localStorage.removeItem('cne_api_token');
    actualizarEstadoAutenticacion();
    window.location.href = 'index.html';
}

function actualizarEstadoAutenticacion() {
    // Actualizar la UI según el estado de autenticación
    if (API_TOKEN) {
        $('.estado-autenticacion').html(`
            <div class="alert alert-success d-flex justify-content-between align-items-center">
                <span>✅ Sesión activa</span>
                <button class="btn btn-sm btn-outline-danger" onclick="cerrarSesion()">Cerrar Sesión</button>
            </div>
        `);
    } else {
        $('.estado-autenticacion').html(`
            <div class="alert alert-warning">
                🔐 No autenticado - <a href="login.html" class="alert-link">Iniciar sesión</a>
            </div>
        `);
    }
}

// ==========================================================
// FUNCIONES DE UTILIDAD
// ==========================================================

function mostrarExito($elemento, mensaje) {
    $elemento.removeClass("d-none alert-danger").addClass("alert-success").html(mensaje);
}

function mostrarError($elemento, mensaje) {
    $elemento.removeClass("d-none alert-success").addClass("alert-danger").html(mensaje);
}

function formatearJSON(obj) {
    return JSON.stringify(obj, null, 2);
}