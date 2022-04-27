import { BootstrapConsole } from 'nestjs-console';
import { AppModule } from '../../app.module';

const bootstrap = new BootstrapConsole({
  module: AppModule,
  useDecorators: true,
});

bootstrap.init().then(async (app) => {
  try {
    console.log('damn sonny');

    await app.init();
    await bootstrap.boot();
    await app.close();
    console.log('closing');
  } catch (e) {
    console.error(e);
    await app.close();
    process.exit(1);
  }
});
