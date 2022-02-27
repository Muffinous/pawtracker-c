import { Observable } from "rxjs"

export class UserModel {
    User = {
        name: "",
        surname: "",
        username: "",
        email: ""
        // password: string;
        // email: string
        // phone: number
    }


    setUsername(username) {
        this.User.username = username
    }

    setSurname(surname) {
        this.User.surname = surname
    }

    setName(name) {
        this.User.name = name
    }

    setEmail(email) {
        this.User.email = email
    }

    getUsername() {
        return this.User.username
    }

    getUser() {
        return this.User
    }
}


// function userExists(username: string): Observable<User> {
//     const document = doc(this.db), 'users/${username }');
//     return docSnapshots(document)
//     .pipe(
//       map(doc => {
//         const id = doc.id;
//         const data = doc.data();
//         return { id, ...data  } as User;
//        })
//     );
//    }