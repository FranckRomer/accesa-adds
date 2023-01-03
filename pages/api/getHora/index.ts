// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const moment = require('moment');

type Data = {
    horaCompleta:string
    minuto:string
    diesSegundos:string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const hoy = moment().format('mm:ss');
    res.status(200).json({
        horaCompleta:hoy,
        minuto: moment().format('m'),
        diesSegundos: moment().format('ss')
    })
}
