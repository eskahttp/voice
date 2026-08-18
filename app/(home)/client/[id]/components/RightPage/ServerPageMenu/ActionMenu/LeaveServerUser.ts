'use server';


import { cookies } from 'next/headers';
import { pool } from '@/app/lib/db';
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";


export async function LeaveServerUser(referal: string){
    const cookieStore = await cookies();
    const token = cookieStore.get('sessionToken')?.value;

    if (!token) redirect('/login');

    const result = await pool.query('SELECT login_id FROM session WHERE cookie = $1',[token]);

    if (result.rows.length === 0) redirect('/login');

    const CheckServerId = await pool.query('SELECT id FROM servers WHERE referal = $1',[referal]);

    const serverId = CheckServerId.rows[0].id;

    const CheckAdminServer = await pool.query('SELECT id FROM servers WHERE id = $1 ' +
        ' AND creator_id= $2 ',[serverId,result.rows[0].login_id]);

    if (CheckAdminServer.rows.length > 0){
        await pool.query('DELETE FROM servers WHERE id = $1',[CheckAdminServer.rows[0].id]);
        await pool.query('DELETE FROM server_users WHERE server_id = $1',[CheckAdminServer.rows[0].id]);
        await pool.query('DELETE FROM message_user_server WHERE server_id = $1',[CheckAdminServer.rows[0].id]);
        revalidatePath('/client');
        redirect('/client');
    }

    await pool.query('DELETE FROM server_users WHERE server_id = $1 AND user_id = $2',[serverId,result.rows[0].login_id]);

    revalidatePath('/client');
    redirect('/client');

}