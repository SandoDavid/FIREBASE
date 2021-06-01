// Your web app's Firebase configuration
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDR3FFTIoY9XkIvFPTThaInRaELhwEeyAs",
        authDomain: "m6uf4-ffa6e.firebaseapp.com",
        projectId: "m6uf4-ffa6e",
        storageBucket: "m6uf4-ffa6e.appspot.com",
        messagingSenderId: "101204945236",
        appId: "1:101204945236:web:e1e0adb53ba2d043b9c0c1"
      };// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.collection('recipes');



const list = document.querySelector('ul');
const form = document.querySelector('form');

const addRecipe = recipe => {
    let formattedTime = recipe.created_at.toDate();

    let diaData = formattedTime.getDate();
    diaData = (diaData < 10) ? "0" + diaData : diaData;

    let mesData = formattedTime.getDate() + 1;
    mesData = (mesData < 10) ? "0" + mesData : mesData;

    let anyData = formattedTime.getFullYear();

    let html = `
        <li>
            <b>${recipe.title}</b>
            <div>${diaData + "/"
        + mesData + "/"
        + anyData}</div>
        <button class="btn btn-danger btn-sm my-2">delete</button>
        </li>
    `;
    //console.log(html);
    list.innerHTML += html;
};

db.collection('recipes').get()
    .then(snapshot => {
        // console.log(snapshot.docs[0].data());
        snapshot.forEach(doc => {
            // console.log(doc.data());
            addRecipe(doc.data());
        });
    })
    .catch(err => console.log(err));

// add documents
form.addEventListener('submit', e => {
    e.preventDefault();
    let now = new Date();
    const recipe = {
        title: form.recipe.value,
        created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    db.collection('recipes').add(recipe)
        .then(() => console.log('recipe added!'))
        .catch(err => console.log(err))
    
});