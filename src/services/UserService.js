import firebase from "firebase";

export default class UserService {
    /**
     * Create new user
     *
     * @param userDetails
     */
    createUser(userDetails){
        return new Promise((resolve, reject) => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(userDetails.email, userDetails.password)
                .then(data => {
                    data.user
                        .updateProfile({
                            displayName: userDetails.name,
                        })
                        .then(() => {
                            firebase.database().ref('users/' + data.user.uid).set({
                                phoneNumber: userDetails.phoneNumber,
                            });
                        });
                    resolve(data.user);
                })
                .catch(error => reject(error));
        }).then(result => result).catch(err => err);
    }

    /**
     * Create new user
     *
     * @param userDetails
     */
    loginUser(userDetails){
        return new Promise((resolve, reject) => {
            firebase
                .auth()
                .signInWithEmailAndPassword(userDetails.email, userDetails.password)
                .then(data => {
                    resolve(data.user);
                })
                .catch(error => reject(error));
        }).then(result => result).catch(err => err);
    }

    /**
     * Log out user
     */
    logOutUser(){
        return new Promise((resolve, reject) => {
            firebase
                .auth()
                .signOut()
                .then(() => resolve(true))
                .catch(error => reject(error));
        }).then(result => result).catch(err => err);
    }

    /**
     * Get user additional info
     *
     * @returns {Promise<*>}
     */
    getUserData(){
        return new Promise((resolve, reject) => {
            var userId = firebase.auth().currentUser.uid;
            return firebase.database().ref('/users/' + userId)
                .once('value')
                .then((snapshot) => {
                    let data = snapshot.val() ? snapshot.val() : {};
                    resolve(data);
                })
                .catch(error => reject(error));
        }).then(result => result).catch(err => err);
    }
}