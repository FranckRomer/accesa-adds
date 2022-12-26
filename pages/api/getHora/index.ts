// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const moment = require('moment');

type Data = {
    name: string
    hoy:string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const hoy = moment().format('MMMM Do YYYY, h:mm:ss a');
    res.status(200).json(hoy)
}