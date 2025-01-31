import pg from 'pg';
const{Client} = pg;

const config = {
    user: 'db_proyectomovie_tz67_user',
    host: 'dpg-cudtuslsvqrc73ce1r50-a.oregon-postgres.render.com',
    database: 'db_proyectomovie_tz67',
    password: 'sguZUwNXgXf1AubDMlfKGv61klfnvTWc',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
}

export async function Conectar(params) {
    const cliente = new Client(config);
    try {
        await cliente.connect();
        console.log('Conectado a la base de datos');
        
    }catch (error) {
        
        console.error(error);
    }
    
}

export async function ConsultarPeliculas() {
    const cliente = new Client(config);
    try {
        await cliente.connect();
        const res = await cliente.query('SELECT * FROM peliculas');
        return res.rows;     
    }catch (error) {
        console.error(error);
    }
}