import { LoggerService } from '../logger';

export class BaseService {
  constructor(protected readonly loogerService: LoggerService) {}
}
