import 'dotenv/config'
import { join } from 'path'
import moduleAlias from 'module-alias'
moduleAlias.addAlias('@', join(__dirname, '.'))

import '@/adapters/http/server'
