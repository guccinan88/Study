const firebaseConfig = {
    authDomain: "github-34e63.firebaseapp.com",
    projectId: "github-34e63",
    storageBucket: "github-34e63.appspot.com",
    messagingSenderId: "177431136390",
    appId: "1:177431136390:web:48c6cc96e0fa66c60a6907",
    measurementId: "G-VGLKD229GD"
};
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();
var collectioName='';

function Menu(btn){
    collectioName=$(btn).attr('value');
    var result = [];
    $('#content').remove();
    $('#row1').append('<div id="content" class="col-5 m-5 fs-5"></div>');
    var docRef = db.collection(collectioName).orderBy("date");
    docRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            result.push(`<a href="#" onclick="MenuList('${doc.id}')">${doc.id}</a><br>`);
            //console.log(result);
        });
        result.reverse();
        result.forEach(ary => {
            document.getElementById('content').innerHTML += ary;
        });
        $('#content').addClass('bg-secondary').prepend('<span class="fs-3 text-light">目錄</span><br>');
        $('#content').fadeIn(500);
    });
}
function MenuList(item){
    $('#content').remove();
    $('#row1').append('<div id="content" class="col-10 m-5 fs-5"></div>');
    db.collection(collectioName).where('name', '==', item).get().then(quertSnapshot => {
        quertSnapshot.forEach(doc => {
            $('#content').html(doc.data().content);
            $('#content').prepend(`<br><p class="text-muted fs-6 fst-italic">發布日期: ${doc.data().date}</p>`);
            $('#content').fadeIn(500);
        });
    });
}

