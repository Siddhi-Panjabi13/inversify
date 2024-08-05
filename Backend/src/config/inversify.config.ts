import { Container } from 'inversify';
import { TYPES } from '../utils/type';
import { UserService } from '../services';
import { UserController } from '../controllers';
import { ErrorHandlerClass } from '../handlers/errorResponse';

const container = new Container()
container.bind<ErrorHandlerClass>(ErrorHandlerClass).to(ErrorHandlerClass);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserController>(TYPES.UserController).to(UserController)

export default container;