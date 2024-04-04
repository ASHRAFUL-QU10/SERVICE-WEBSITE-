
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, getDoc, doc, updateDoc , getDocFromCache } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDJf3kqpdCxt3i-LEg7a85TocSiz6nu3Lo",
    authDomain: "hakhathon-10793.firebaseapp.com",
    projectId: "hakhathon-10793",
    storageBucket: "hakhathon-10793.appspot.com",
    messagingSenderId: "1035416349257",
    appId: "1:1035416349257:web:ad9246319a7b635a4bed98",
    measurementId: "G-C40FNREJVV"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
let id = localStorage.getItem("id")



// const washingtonRef = doc(db, "users", id);
let profileImg = document.getElementById("fileInput");
profileImg && profileImg.addEventListener("change", () => {
    console.log(profileImg.files.name = `${id}.png`)
    if (profileImg.files[0].type == "image/png" || profileImg.files[0].type == "image/jpeg") {

        let propicture = document.querySelector(".pro-img")
        const mountainImagesRef = ref(storage, profileImg.files.name = `${id}.png`);

        const uploadTask = uploadBytesResumable(mountainImagesRef, profileImg.files[0]);


        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {

            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                    console.log('File available at', downloadURL);
                    let update = document.querySelector(".btn-update");
                    update.addEventListener('click', async () => {
                        let localNameUpdateCollection = localStorage.getItem("name")
                        let localIdUpdateCollection = localStorage.getItem("id")
                        const washingtonRef = doc(db, "users", id)
                        await updateDoc(washingtonRef, {
                            images: downloadURL,
                        });
                        console.log("img up")
                    })
                    propicture.src = URL.createObjectURL(profileImg.files[0]);
                });
            
            })
        }
    })
let proInput = document.getElementById("pro-input");
let img = document.getElementById("pro-img")

let profileEmailInput = document.querySelector(".profile-email-input")
let data = async() =>{
const docRef = doc(db, "users", id);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
console.log(docSnap.data())

  img.src = `${docSnap.data().images}`
proInput.value = docSnap.data().name
profileEmailInput.value = docSnap.data().signEmail
} else {
}
}
data()
        
    
