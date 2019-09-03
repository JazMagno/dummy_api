var express = require('express');
var router = express.Router();
var cors = require('cors');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectId;

// Connection URL
const DB_USER = process.env.DB_USER || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '27017';
const DB_NAME = process.env.DB_NAME || 'datagen';

let url = 'mongodb://' + DB_HOST + ':' + DB_PORT + '/' + DB_NAME;

if (DB_USER !== '' && DB_PASSWORD !== '') {
    url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

// Database Name
const dbName = process.env.DB_NAME;

// console.log (url);
console.log(require("path").basename(__filename), url);

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json({
        version_api: '1.0',
        sistema: {
            id:1,
            nombre: 'Declaraciones'
        }});
});


const profiles = {
    profile_1: {
        "informacion_personal.informacion_general": 1,
        "informacion_personal.datos_curriculares": 1

    },
    profile_2:{
        "informacion_personal.informacion_general" : 1
    },
    //perfil público
    profile_3: {
        "informacion_personal.informacion_general.curp": 0,
        "informacion_personal.informacion_general.rfc": 0,
        "informacion_personal.informacion_general.fecha_nacimiento": 0,
        "informacion_personal.informacion_general.numero_identificacion_oficial": 0,
        "informacion_personal.informacion_general.correo_electronico.personal": 0,
        "informacion_personal.informacion_general.telefono": 0,
        "informacion_personal.informacion_general.domicilio": 0,
        "informacion_personal.datos_dependientes_economicos.nombres": 0,
        "informacion_personal.datos_dependientes_economicos.primer_apellido": 0,
        "informacion_personal.datos_dependientes_economicos.segundo_apellido": 0,
        "informacion_personal.datos_dependientes_economicos.nacionalidades": 0,
        "informacion_personal.datos_dependientes_economicos.curp": 0,
        "informacion_personal.datos_dependientes_economicos.rfc": 0,
        "informacion_personal.datos_dependientes_economicos.fecha_nacimiento": 0,
        "informacion_personal.datos_dependientes_economicos.numero_identificacion_oficial": 0,
        "informacion_personal.datos_dependientes_economicos.habita_domicilio_declarante": 0,
        "informacion_personal.datos_dependientes_economicos.domicilio": 0,
        "informacion_personal.datos_dependientes_economicos.medio_contacto": 0,
        "informacion_personal.datos_dependientes_economicos.ingresos_propios": 0,
        "informacion_personal.datos_dependientes_economicos.ocupacion_profesion": 0,

        "intereses.representacion_activa.nombre_parte_representada":0,
        "intereses.representacion_activa.curp_parte":0,
        "intereses.representacion_activa.rfc_parte":0,
        "intereses.representacion_activa.fecha_nacimiento_parte":0,
        "intereses.representacion_activa.ocupacion_profesion_parte":0,

        "intereses.representacion_pasiva.nacionalidades_representante":0,
        "intereses.representacion_pasiva.curp_representante":0,
        "intereses.representacion_pasiva.rfc_representante":0,
        "intereses.representacion_pasiva.fecha_nacimiento_representante":0,

        "intereses.socios_comerciales.nombre_socio":0,
        "intereses.socios_comerciales.curp_socio":0,
        "intereses.socios_comerciales.rfc_socio":0,
        "intereses.socios_comerciales.lugar_nacimiento_socio":0,
        "intereses.socios_comerciales.fecha_nacimiento_socio":0,
        "intereses.socios_comerciales.porcentaje_participacion":0,

        "intereses.clientes_principales.dueno_encargado": 0,
        "intereses.clientes_principales.nombre_cliente": 0,
        "intereses.clientes_principales.rfc_cliente": 0,
        "intereses.clientes_principales.domicilio_cliente": 0,
        "intereses.clientes_principales.porcentaje_facturacion": 0,

        "intereses.otras_partes.nombre_denominacion_parte": 0,
        "intereses.otras_partes.nacionalidades": 0,
        "intereses.otras_partes.curp": 0,
        "intereses.otras_partes.rfc": 0,
        "intereses.otras_partes.fecha_nacimiento": 0,

        "intereses.beneficios_gratuitos.origen_beneficio":0,

        "ingresos.sueldos_salarios_otros_empleos.nombre_denominacion_razon_social": 0,
        "ingresos.sueldos_salarios_otros_empleos.rfc": 0,
        "ingresos.sueldos_salarios_otros_empleos.curp": 0,
        "ingresos.sueldos_salarios_otros_empleos.domicilio_persona_recibe_ingreso": 0,

        "ingresos.actividad_profesional.nombre_denominacion_razon_social": 0,
        "ingresos.actividad_profesional.rfc": 0,
        "ingresos.actividad_profesional.curp": 0,
        "ingresos.actividad_profesional.domicilio_persona_recibe_ingreso": 0,

        "ingresos.actividad_empresarial.nombre_denominacion_razon_social": 0,
        "ingresos.actividad_empresarial.rfc": 0,
        "ingresos.actividad_empresarial.curp": 0,
        "ingresos.actividad_empresarial.domicilio_actividad_empresarial": 0,

        "ingresos.actividad_economica_menor.nombre_denominacion_razon_social": 0,
        "ingresos.actividad_economica_menor.rfc": 0,
        "ingresos.actividad_economica_menor.curp": 0,
        "ingresos.actividad_economica_menor.domicilio_actividad": 0,

        "ingresos.arrendamiento.nombre_denominacion_razon_social": 0,
        "ingresos.arrendamiento.rfc": 0,
        "ingresos.arrendamiento.curp": 0,
        "ingresos.arrendamiento.domicilio_actividad": 0,

        "ingresos.intereses.nombre_denominacion_razon_social": 0,
        "ingresos.intereses.rfc": 0,
        "ingresos.intereses.curp": 0,
        "ingresos.intereses.domicilio": 0,

        "ingresos.premios.nombre_denominacion": 0,
        "ingresos.premios.rfc": 0,
        "ingresos.premios.curp": 0,
        "ingresos.premios.domicilio": 0,

        "ingresos.enajenacion_bienes.nombre_denominacion": 0,
        "ingresos.enajenacion_bienes.rfc": 0,
        "ingresos.enajenacion_bienes.curp": 0,
        "ingresos.enajenacion_bienes.domicilio_bien_enajenado": 0,

        "ingresos.otros_ingresos.nombre_denominacion": 0,
        "ingresos.otros_ingresos.rfc": 0,
        "ingresos.otros_ingresos.curp": 0,
        "ingresos.otros_ingresos.domicilio_actividad": 0,

        "activos.bienes_inmuebles.nombre_copropietario": 0,
        "activos.bienes_inmuebles.identificacion_bien": 0,
        "activos.bienes_inmuebles.domicilio_bien": 0,
        "activos.bienes_inmuebles.nombre_denominacion_quien_adquirio": 0,
        "activos.bienes_inmuebles.rfc_quien_adquirio": 0,
        "activos.bienes_inmuebles.curp_quien_adquirio": 0,

        "activos.bienes_muebles_registrables.numero_serie": 0,
        "activos.bienes_muebles_registrables.lugar_registro": 0,
        "activos.bienes_muebles_registrables.nombres_copropietarios": 0,
        "activos.bienes_muebles_registrables.numero_registro_vehicular": 0,
        "activos.bienes_muebles_registrables.nombre_denominacion_adquirio": 0,
        "activos.bienes_muebles_registrables.rfc_quien_adquirio": 0,

        "activos.bienes_muebles_no_registrables.nombre_denominacion_adquirio": 0,
        "activos.bienes_muebles_no_registrables.porcentaje_propiedad": 0,
        "activos.nombres_copropietarios": 0,

        "activos.inversiones_cuentas_valores.numero_cuenta": 0,
        "activos.inversiones_cuentas_valores.rfc_institucion": 0,
        "activos.inversiones_cuentas_valores.domicilio_institucion": 0,
        "activos.inversiones_cuentas_valores.fecha_inicio": 0,
        "activos.inversiones_cuentas_valores.monto_original": 0,
        "activos.inversiones_cuentas_valores.saldo_anual": 0,
        "activos.inversiones_cuentas_valores.plazo": 0,
        "activos.inversiones_cuentas_valores.unidad_medida_plazo": 0,

        "activos.efectivo_metales.monto": 0,

        "activos.fideicomisos.numero_registro":0,
        "activos.fideicomisos.nombre_fideicomitente":0,
        "activos.fideicomisos.rfc_fideicomitente":0,
        "activos.fideicomisos.curp_fideicomitente":0,
        "activos.fideicomisos.domicilio_fideicomitente":0,
        "activos.fideicomisos.fecha_nacimiento_constitucion_fideicomitente":0,
        "activos.fideicomisos.nombre_fideicomisario":0,
        "activos.fideicomisos.rfc_fideicomisario":0,
        "activos.fideicomisos.curp_fideicomisario":0,
        "activos.fideicomisos.fecha_nacimiento_constitucion_fideicomisario":0,
        "activos.fideicomisos.domicilio_fideicomisario":0,
        "activos.fideicomisos.nombre_fiduciario":0,
        "activos.fideicomisos.rfc_fiduciario":0,
        "activos.fideicomisos.curp_fiduciario":0,
        "activos.fideicomisos.domicilio_fiduciario":0,
        "activos.fideicomisos.fecha_nacimiento_constitucion_fiduciario":0,
        "activos.fideicomisos.valor":0,

        "activos.bienes_instangibles.propietario_registrado": 0,
        "activos.bienes_intangibles.nombre_copropietario": 0,
        "activos.bienes_intangibles.porcentaje_propiedad_copropietario":0,

        "activos.cuentas_por_cobrar.nombre_prestatario":0,
        "activos.cuentas_por_cobrar.domicilio_prestatarios":0,
        "activos.cuentas_por_cobrar.monto_original_prestamo":0,
        "activos.cuentas_por_cobrar.saldo_pendiente":0,
        "activos.cuentas_por_cobrar.nombre_copropietario":0,

        "activos.uso_especie_propiedad_tercero.nombre_tercero_propietario": 0,
        "activos.uso_especie_propiedad_tercero.rfc_tercero_propietario": 0,
        "activos.uso_especie_propiedad_tercero.curp_tercero_propietario": 0,
        "activos.uso_especie_propiedad_tercero.domicilio_persona": 0,

        "pasivos.deudas.identificador_deuda": 0,
        "pasivos.deudas.nombre_acreedor": 0,
        "pasivos.deudas.rfc_acreedor": 0,
        "pasivos.deudas.domicilio_acreedor": 0,
        "pasivos.deudas.nombre_garante": 0,

        "pasivos.otras_obligaciones.identificador_obligacion":0,
        "pasivos.otras_obligaciones.nombre_acreedor": 0,
        "pasivos.otras_obligaciones.rfc_acreedor": 0,
        "pasivos.otras_obligaciones.domicilio_acreedor": 0

    },
    profile_4:{
        //perfil con todos los permisos
    }
};

//definición de permisos
const getPermissions = profile => {
    switch(profile){
        case "profile_1":
            return profiles.profile_1;
        case "profile_2":
            return profiles.profile_2;
        case "profile_3":
            return profiles.profile_3;
        case "profile_4":
            return profiles.profile_4;
        default:
            return profiles.profile_3;
    }
};

// buscar declaraciones por nombre/apellidos y por id
router.get('/declaraciones',cors(), (req, res) => {
    //console.log(url);
    MongoClient.connect(url, { useNewUrlParser: true }).then( client => {

        let db = client.db(dbName);
        let collection = db.collection('s1');

        console.log(require('path').basename(__filename),req.query);


        const {id, skip, limit, profile, nombres, primer_apellido, segundo_apellido} = req.query;

        if (typeof id !== 'undefined'){

            const permissions = getPermissions(profile);
            console.log(permissions);

            collection.findOne({_id: ObjectId(id)}, {projection: permissions}).then(data => {
                res.json(data);
            })

        } else {
            let query ={};

            if (typeof nombres!== 'undefined') {
                query = {
                    "informacion_personal.informacion_general.nombres": {
                        "$regex": nombres, "$options": "i"
                    }
                };
            }

            if (typeof primer_apellido !== 'undefined'){
                query = {
                    "informacion_personal.informacion_general.primer_apellido": {
                        "$regex": primer_apellido, "$options": "i"
                    }
                };
            }

            if (typeof segundo_apellido !== 'undefined'){
                query = {
                    "informacion_personal.informacion_general.segundo_apellido": {
                        "$regex": segundo_apellido, "$options": "i"
                    }
                };
            }


            let pagination = {
                limit: 10,
                skip: 0
            };

            if (typeof skip !== 'undefined' ){
                pagination.skip = isNaN(skip)?0:Math.abs(skip)
            }

            if (typeof limit !== 'undefined'){
                pagination.limit = isNaN(limit)?10:Math.abs(limit)
            }

            console.log(pagination);

            const projection = {
                id: 1,
                "informacion_personal.informacion_general": 1
            };

            let curr = collection.find(query, pagination).project(projection);

            curr.count().then(count => {
                curr.toArray((err, data) =>{
                    res.json({
                        total: count,
                        pagination: pagination,
                        results: data
                    });
                    client.close();
                });
            });

        }

    }).catch(error => {
        res.status(500).json(error);
        console.log(error);
    });

});

module.exports = router;
