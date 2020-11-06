import firebase from '../../fbConfig'

const db = firebase.firestore()

export const fetchUsers = () => {
  return(dispatch => {
    db.collection("users")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
  });
  })
}