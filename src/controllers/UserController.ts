import { Request, Response, response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ) {
        this.userService = userService
    }

    createUser = (request: Request, response: Response) => {

        const user = request.body

        console.log('controller com name', user.name)

        if (!user.name) {
            return response.status(400).json({ message: 'Bad request! Nome obrigatório' })
        }

        if (!user.email) {
            return response.status(400).json({ message: 'Bad request! Email é obrigatório' });
        }

        this.userService.createUser(user.name, user.email)
        return response.status(201).json({ message: 'Usuário criado' })
    }

    getAllUsers = (request: Request, response: Response) => {
        const users = this.userService.getAllUsers()
        return response.status(200).json(users)
    }



    deleteUser = (request: Request, response: Response) => {
        const { email } = request.body;
    
        if (!email) {
            return response.status(400).json({ message: 'Email é necessário para deletar o usuário.' });
        }
    
        const wasDeleted = this.userService.deleteUser(email);
    
        if (wasDeleted) {
            return response.status(200).json({ message: 'Usuário deletado com sucesso!' });
        } else {
            return response.status(404).json({ message: 'Usuário não encontrado.' });
        }
    };

}

