import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
import { storage } from "../config/firebase";
// import Header from '../partials/Header';
// import PageIllustration from '../partials/PageIllustration';
import UseAuth from "../config/UseAuth"
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { v4 } from "uuid";

function Account() {
    const currentUser = UseAuth();

    console.log('currentUser: ', currentUser);
    
    const nav = useNavigate();

    const logout = () => {
        localStorage.clear()
        this.nav("/")
        window.location.reload()
        
    }

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const imagesListRef = ref(storage, "images/");
    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
            });
        });
    };

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []);

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">

            {/*  Page content */}




            <section className="relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                        {/* Page header */}
                        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                            <h1 className="h1">Welcome {currentUser ? currentUser?.email : ""} </h1>

                        </div>


                        {/* Form */}
                        <div className="max-w-sm mx-auto">
                            <div className="flex flex-wrap -mx-3 mt-6">
                                <div className="w-full px-3">
                                    <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" onClick={logout}>Log out</button>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-sm mx-auto">
                            <div className="flex flex-wrap -mx-3 mt-6">
                                <div className="w-full px-3">
                                    <input
                                        type="file"
                                        onChange={(event) => {
                                            setImageUpload(event.target.files[0]);
                                        }}
                                    />
                                    <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" onClick={uploadFile}>Upload File</button>
                                    {imageUrls.map((url) => {
                                        return <img src={url} />;
                                    })}
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