import firebase from "firebase/app";

const actions = {
    async login(_, {email, password}) {
        // Войти с помощью логина и пароля
        await firebase.auth().signInWithEmailAndPassword(email, password)
    },
    async logout() {
        //Выйти
        await firebase.auth().signOut()
    },
    async register(ctx, {email, password, name}) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await ctx.dispatch('getUId')
        await firebase.database().ref(`/user/${uid}/info`).set({
            bill: 10000,
            name
        })
    },
    getUId() {
        const user = firebase.auth().currentUser
        console.log('user', user);
        return user ? user.uid : null
    }
}

export default {
    actions
}