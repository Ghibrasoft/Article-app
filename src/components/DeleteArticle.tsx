import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { toast } from 'react-toastify';
import { db, storage } from '../firebase';
import { RiDeleteBin5Line } from 'react-icons/ri';


type deleteArticleType = {
  id: string;
  imageUrl: any;
}

export function DeleteArticle({ id, imageUrl }: deleteArticleType) {

  async function handleDelete() {
    if (window.confirm('Confirm deleting article'))
      try {
        await deleteDoc(doc(db, 'Article', id))
        toast('Article deleted', { type: 'success' });
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
      }
      catch (error) {
        toast('Error deleting article', { type: 'error' });
        console.log(error);
      }
  }

  return (
    <span style={{
      cursor: 'pointer',
      fontSize: '1.5rem',
      position: 'absolute',
      top: 0,
      right: 0,
    }}
      onClick={handleDelete}>
      <RiDeleteBin5Line className='text-muted' />
    </span>
  )
}
