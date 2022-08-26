import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let inMemoryUsersRepository : InMemoryUsersRepository;
let createUserUseCase : CreateUserUseCase;


describe('Users', () => {

  beforeAll( async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)

  })

  it('should be able to create a new user', async () => {

    const user = {
      name: "user teste",
      email: "userteste@mail.com",
      password: "123"
    }

    const userCreated = await createUserUseCase.execute(user)

    expect(userCreated).toHaveProperty('id')

  })
})
