import mysql from 'mysql2'

import Config from '@Server/Config'

const pool = mysql.createPool(Config.mysql)

export const Connection = pool.promise()
