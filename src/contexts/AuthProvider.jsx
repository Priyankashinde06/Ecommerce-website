import React, { createContext, useEffect, useState } from 'react'
import app from "../firebase/firebase.config"
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const AuthContext = createContext();
const auth = getAuth();
const googleProvide = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signUpWithGmail = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvide)
    }

    //login
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    //logout
    const logOut = () => {
        return signOut(auth);
    }


    //user is 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Set user if logged in, otherwise null
            setLoading(false); // Set loading to false once auth state is determined
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);
    // Logout function
    const logout = async () => {
        try {
            await signOut(auth); // Sign out from Firebase
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    const authInfo = {
        user,
        loading,
        createUser,
        signUpWithGmail,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;