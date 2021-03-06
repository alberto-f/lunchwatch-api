import schedule from 'node-schedule';
import format from 'date-fns/format';
import logger from './logger';
import * as importService from '../services/importService';
import * as menuService from '../services/menuService';
import { importer } from './importer';

const scheduler = {
  scheduleImporters: (queue, cron) => schedule.scheduleJob(cron, () => {
    importService
      .getEnabledImports()
      .then((imports) => {
        imports.forEach((imp) => {
          queue.add(() => importer(imp.get('importer'), imp.get('identifier'), imp.get('restaurantId'), imp.get('language'))
            .then(() => importService
              .updateImport(imp.id, Object.assign(imp, { lastImportAt: format(Date()) }))));
        });
      })
      .catch(err => logger.log('error', err));
  }),
  scheduleDatabaseCleaner: (queue, cron) => schedule.scheduleJob(cron, () => {
    menuService
      .deleteOldMenus()
      .then(() => logger.log('info', 'Deleted old menus.'))
      .catch(err => logger.log('error', err));
  }),
};

export default scheduler;
