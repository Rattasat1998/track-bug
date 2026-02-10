import { useState, useEffect } from 'react'
import './App.css'
import BugTable from './components/BugTable'
import AddBugModal from './components/AddBugModal'
import { db } from './firebase'
import { collection, onSnapshot, addDoc, updateDoc, doc, query, orderBy } from 'firebase/firestore'

function App() {
  const [bugs, setBugs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBug, setEditingBug] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'bugs'), orderBy('id', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bugsData = snapshot.docs.map(doc => ({ ...doc.data(), firebaseId: doc.id }));
      setBugs(bugsData);
    });
    return () => unsubscribe();
  }, []);

  const handleAddBug = async (newBug) => {
    if (editingBug) {
      // Logic for editing handled in handleUpdateBug/modal usually, 
      // but here we might need to handle full bug update from modal.
      const bugRef = doc(db, 'bugs', editingBug.firebaseId);
      const { firebaseId, ...bugData } = newBug; // Exclude firebaseId from update to be safe
      await updateDoc(bugRef, bugData);
    } else {
      await addDoc(collection(db, 'bugs'), newBug);
    }
    setEditingBug(null);
  };

  const handleEditBug = (bug) => {
    setEditingBug(bug);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBug(null);
  };

  const handleUpdateBug = async (id, field, value) => {
    // Find the bug to get its firebaseId
    const bugToUpdate = bugs.find(b => b.id === id);
    if (bugToUpdate) {
      const bugRef = doc(db, 'bugs', bugToUpdate.firebaseId);
      await updateDoc(bugRef, { [field]: value });
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>iShip App x Lalamove Bug Tracker</h1>
        <button className="primary-btn" onClick={() => setIsModalOpen(true)}>Report Bug</button>
      </header>
      <main>
        <BugTable bugs={bugs} onEdit={handleEditBug} onUpdate={handleUpdateBug} />
      </main>
      <AddBugModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={handleAddBug}
        initialData={editingBug}
      />
    </div>
  )
}

export default App
