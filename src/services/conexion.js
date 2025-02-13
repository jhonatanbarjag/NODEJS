import pg from 'pg';
const{Client} = pg;

//para encriptar la contraseña
import bcrypt from 'bcrypt';

//conexion a la base de datos
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
//validar conexion a la base de datos
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

export async function RegistrarCliente(username, password, email) {
    const cliente = new Client(config);
    try {
        await cliente.connect();

        //validar si el usuario ya existe
        const verificarQuery = 'SELECT * FROM cliente WHERE username = $1 OR email = $2'; 
        const verificarValores = [username, email];
        const verificarResultado = await cliente.query(verificarQuery, verificarValores);

        if(verificarResultado.rows.length > 0) {
            return {success: false, message: 'El usuario ya existe'};
        }
        //encriptar la contraseña
        const salRounds = 10;
        const hashedPassword = await bcrypt.hash(password, salRounds);

        //insertar nuevo usuario
        const insertarQuery=`
            INSERT INTO cliente(username, password, email)
            VALUES($1, $2, $3) RETURNING id, username, email;
        `;
        const insertarValores = [username, hashedPassword, email];
        const insertarResultado = await cliente.query(insertarQuery, insertarValores);

        return{
            success: true,
            message: 'Usuario registrado',
            data: insertarResultado.rows[0]
        };       
    }catch (error) {
        console.error('Error al registrar usuario', error);
        return {success: false, message: 'Error al registrar usuario'};
    }finally    {
        await cliente.end();
    }  
}



export async function IniciarSesionCliente(username, password) {
    const cliente = new Client(config);
    try {
        await cliente.connect();

        // Verificar si el usuario existe
        const verificarQuery = 'SELECT * FROM cliente WHERE username = $1';
        const verificarValores = [username];
        const verificarResultado = await cliente.query(verificarQuery, verificarValores);

        if (verificarResultado.rows.length === 0) {
            return { success: false, message: 'Usuario no encontrado' };
        }

        const user = verificarResultado.rows[0];

        // Comparar la contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { success: false, message: 'Contraseña incorrecta' };
        }

        return {
            success: true,
            message: 'Inicio de sesión exitoso',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        };
    } catch (error) {
        console.error('Error en la función IniciarSesionCliente:', error);
        return { success: false, message: 'Error en el servidor' };
    } finally {
        await cliente.end();
    }
}


        