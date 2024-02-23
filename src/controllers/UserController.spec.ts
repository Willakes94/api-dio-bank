import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { Request } from 'express';
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe(UserController, () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn()
    }

    beforeEach(() => {
        mockUserService.deleteUser = jest.fn().mockImplementation(() => true);
    });


    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Jose',
                email: 'jose@teste.com'
            }
        } as Request;
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })


    it('Deve chamar getAllUsers do UserService', () => {
        // Simulação de uma requisição e resposta
        const mockRequest = {} as Request;
        const mockResponse = makeMockResponse();

        // Supondo que exista um método no UserController que chama getAllUsers
        userController.getAllUsers(mockRequest, mockResponse);

        // Verificar se getAllUsers foi chamado
        expect(mockUserService.getAllUsers).toHaveBeenCalled();
    });

    it('Deve retornar um erro se o name não for informado', () => {
        const mockRequest = {
            body: {
                // name é omitido para simular o erro
                email: 'jose@teste.com'
            }
        } as Request;
        const mockResponse = makeMockResponse();

        userController.createUser(mockRequest, mockResponse);

        // Verifique se a resposta de erro é conforme esperado
        expect(mockResponse.state.status).toBe(400); // Assumindo que 400 é o status de erro esperado
        expect(mockResponse.state.json).toMatchObject({
            message: 'Bad request! Nome obrigatório' // Corrigido para a mensagem de erro real
        });
    });

    it('Deve retornar um erro se o email não for informado', () => {
        const mockRequest = {
            body: {
                name: 'Jose' // email é omitido
            }
        } as Request;
        const mockResponse = makeMockResponse();

        userController.createUser(mockRequest, mockResponse);

        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({
            message: 'Bad request! Email é obrigatório'
        });
    });



    it('Deve deletar um usuário com sucesso quando o email é fornecido', () => {
        const mockRequest = {
            body: {
                email: 'jose@teste.com'
            }
        } as Request;
        const mockResponse = makeMockResponse();

        // Configure o mock do UserService para simular a deleção bem-sucedida

        userController.deleteUser(mockRequest, mockResponse);

        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado com sucesso!' });
        expect(mockUserService.deleteUser).toHaveBeenCalledWith('jose@teste.com');
    });

    it('Deve retornar um erro se o email não for informado para deleção', () => {
        const mockRequest = {
            body: {}
        } as Request;
        const mockResponse = makeMockResponse();

        userController.deleteUser(mockRequest, mockResponse);

        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({
            message: "Email é necessário para deletar o usuário."

        });
    });
})

