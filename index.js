import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, doc, getDoc, updateDoc, addDoc, getDocs, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

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
const auth = getAuth(app);
let userName = document.querySelector(".navbar-text");
let postName = document.querySelector(".user-name");



const docRef = doc(db, "users", localStorage.getItem("id"));
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    userName.innerHTML = `<span id="user-name">${docSnap.data().name}</span>`
    postName.textContent = docSnap.data().name
} else {
    console.log("No such document!");
}




let signUpBtn = document.getElementById("log-btn");
console.log(signUpBtn)
onAuthStateChanged(auth, (user) => {
    if (user) {
        signUpBtn.innerHTML = '<span id="log-out">Log out</span>'
        console.log("user login")

        let logOutFun = document.getElementById("log-out");
        logOutFun.addEventListener('click', () => {
            signOut(auth).then(() => {
                console.log('signout')
            }).catch((error) => {
                console.log(error)
            });

        })
    } else {
        console.log('log out')
        document.querySelector(".navbar-text").innerHTML = 'UserName';
        document.querySelector(".main-commit").style.display = "none"
    }
});

let userNames = document.getElementById("user-name");
userNames && userNames.addEventListener('click', () => {
    window.location.assign("profile.html");

})

let title = document.querySelector(".input-title");
let blog = document.querySelector(".blog");
document.querySelector(".post-btn").addEventListener("click", async (e) => {
    e.preventDefault()
    let data = async () => {
        let id = localStorage.getItem("id")
        const docRefs = doc(db, "users", id);
        const docSnap = await getDoc(docRefs);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
        console.log(blog.value)

        const docRef = await addDoc(collection(db, "blogs"), {
            name: docSnap.data().name,
            img: docSnap.data().images,
            title: title.value,
            blog: blog.value
        });
        console.log("set succsesfull")
    }
    data()
})


const q = query(collection(db, "blogs"))
const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const cities = [];
    querySnapshot.forEach((doc) => {
        cities.push(doc.data().name);
        console.log(doc.data())
        let inputTitle = document.querySelector(".input-title");
        console.log(inputTitle.value)
        document.querySelector(".card-print").innerHTML += `
      <div class="main-card d-flex justify-content-center">
        <div class="card bg-light mb-3" style="max-width: 18rem;">
        <div class="container-user">
        <img class="card-img-print" src="${doc.data().img}"/>
            <div class="card-header">${doc.data().name}</div>
            </div>
            <div class="card-body">
                <h5 class="card-title">${doc.data().title}</h5>
                <p class="card-text">${doc.data().blog}.</p>
            </div>
        </div>
    </div>
      `


    });
    console.log("Current cities in CA: ", cities.join(", "));
});

