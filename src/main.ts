import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import chalk from 'chalk'
import { PORT } from '@environments'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(PORT, () => {
    console.log(
      chalk.white.bgRedBright.bold(
        `🚀 Apollo Studio: http://localhost:${PORT}/graphql`,
      ),
    )
  })
}
bootstrap()
