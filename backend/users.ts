export class User{
    constructor(public email:string, public name: string, private password:string){

    }

    matches(another: User): boolean{
        return another !== undefined && 
        another.email === this.email && 
        another.password === this.password
    }
}

export const users: {[key:string]: User} = {
    "gustavo@gmail.com": new User('gustavo@gmail.com','Gustavo','gustavo93'),
    "edmilson@gmail.com": new User('edmilson@gmail.com','Edmilson','edmilson69')
}