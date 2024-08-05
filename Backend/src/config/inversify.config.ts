import { Container } from 'inversify';
import { TYPES } from '../utils/type';
import { UserService } from '../services';
import { UserController } from '../controllers';
import { ErrorHandler } from '../handlers/errorHandler';
import { Auth } from '../middlewares/verifyLogin';

const container = new Container()
container.bind<Auth>(Auth).toSelf();
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserController>(TYPES.UserController).to(UserController)

export default container;