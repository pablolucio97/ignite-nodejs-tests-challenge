import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let inMemoryUsersRepository : InMemoryUsersRepository;
let createUserUseCase : CreateUserUseCase;
let showUserProfileUseCase : ShowUserProfileUseCase;


describe('Users', () => {

  beforeAll( async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository)

  })

  it('should be able to show a user', async () => {

    const user = {
      name: "user teste",
      email: "userteste@mail.com",
      password: "123"
    }

    const userCreated = await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password
    });
    
    const userShow = await showUserProfileUseCase.execute(userCreated.id as string)

    expect(userShow).toHaveProperty("id")

  })
})
