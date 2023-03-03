import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsHeart } from 'react-icons/bs'
import { BsHeartFill } from 'react-icons/bs'
import { auth, db } from '../firebase';



type likeArticleType = {
    id: string;
    likes: string;
}
export function LikeArticle({ id, likes }: likeArticleType) {
    const [user] = useAuthState(auth);
    const likesRef = doc(db, 'Article', id);

    function handleLike() {
        if (user && likes?.includes(user.uid)) {
            updateDoc(likesRef, {
                likes: arrayRemove(user.uid)
            })
                .then(() => {
                    console.log('unliked');
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            updateDoc(likesRef, {
                likes: arrayUnion(user!.uid)
            })
                .then(() => {
                    console.log('liked');
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }


    return (
        <div>
            {
                user && likes?.includes(user.uid) ? (
                    <BsHeartFill cursor='pointer' color='red' onClick={handleLike} />
                )
                    :
                    (
                        <BsHeart cursor='pointer' onClick={handleLike} />
                    )
            }
        </div>
    )
}
