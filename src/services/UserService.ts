export interface User {
    name: string
    email: string
}

const db = [
    {
        name: "Joana",
        email: "joana@teste.com",
    }
]

export class UserService {
    db: User[]

    constructor(
        database =  db
    ){
        this.db = database
    }

    

    createUser = (name: string, email: string) => {
        const user ={
            name,
            email
        }

        this.db.push(user)
        console.log('DB atualizado', this.db)
    }

    getAllUsers = () => {
        return this.db;
    }

    deleteUser = (email: string) => {
        const index = this.db.findIndex(user => user.email === email);
        if (index !== -1) {
            this.db.splice(index, 1);
            console.log(`Usuário com Email ${email} deletado.`);
            return true;
        }
        console.log(`Usuário com Email ${email} não encontrado.`);
        return false;
    };
    
}