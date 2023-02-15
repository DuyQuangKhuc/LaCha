import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db, provider } from "../config/firebase";
// import Header from '../partials/Header';
// import PageIllustration from '../partials/PageIllustration';

function Account() {

    const logout =()=>{
        localStorage.clear()
        window.location.reload()
    }

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">

            {/*  Page content */}
           

           

                <section className="relative">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                            {/* Page header */}
                            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                                <h1 className="h1">Welcome </h1>

                            </div>


                            {/* Form */}
                            <div className="max-w-sm mx-auto">
                                <div className="flex flex-wrap -mx-3 mt-6">
                                    <div className="w-full px-3">
                                        <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" onClick={logout}>Log out</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

           
        </div>
    );
}

export default Account;