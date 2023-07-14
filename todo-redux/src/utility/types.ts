export interface ITodo {
    id: number;
    todo: string;
    isDone: boolean;
    detail: [{
        created: string,
        createdTime: string,
        updated: string | null,
        updatedTime: string | null,
    }]
}

export interface TodoState {
    todos: ITodo[];
}


export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
};

export interface UserState {
    users: IUser[],
    isLoading: boolean
}