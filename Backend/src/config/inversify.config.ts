import { Container } from 'inversify';
import { TYPES } from '../utils/type';
import { StationService, UserService } from '../services';
import { UserController,StationController } from '../controllers';
import { Auth } from '../middlewares/verifyLogin';
import { VerifyRole } from '../middlewares/verifyRole';


const container = new Container()

container.bind<Auth>(Auth).to(Auth);
container.bind<VerifyRole>(VerifyRole).to(VerifyRole);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserController>(TYPES.UserController).to(UserController)
container.bind<StationService>(TYPES.StationService).to(StationService)
container.bind<StationController>(TYPES.StationController).to(StationController)
export default container;