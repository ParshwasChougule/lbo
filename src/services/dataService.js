import { db, storage } from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// --- Collection References ---
const membersCollection = collection(db, "members");
const businessCollection = collection(db, "businesses");
const eventsCollection = collection(db, "events");

// --- MEMBERS SERVICE ---
export const addMember = async (memberData) => {
    return await addDoc(membersCollection, {
        ...memberData,
        createdAt: new Date(),
        status: "Active" // Default status Active as per new requirement implied (or set to pending default but use toggle later)
    });
};

export const getMembers = async () => {
    const data = await getDocs(membersCollection);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const updateMember = async (id, updatedData) => {
    const memberDoc = doc(db, "members", id);
    return await updateDoc(memberDoc, updatedData);
};

export const deleteMember = async (id) => {
    const memberDoc = doc(db, "members", id);
    return await deleteDoc(memberDoc);
};

// --- CHAPTERS SERVICE ---
export const addChapter = async (chapterData) => {
    return await addDoc(collection(db, "chapters"), {
        ...chapterData,
        createdAt: new Date()
    });
};

export const getChapters = async () => {
    const data = await getDocs(collection(db, "chapters"));
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getChapterById = async (id) => {
    const docRef = doc(db, "chapters", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id };
    } else {
        return null;
    }
};

export const updateChapter = async (id, updatedData) => {
    const chapterDoc = doc(db, "chapters", id);
    return await updateDoc(chapterDoc, updatedData);
};

export const deleteChapter = async (id) => {
    const chapterDoc = doc(db, "chapters", id);
    return await deleteDoc(chapterDoc);
};

// --- BUSINESS SERVICE ---
export const addBusiness = async (businessData) => {
    return await addDoc(businessCollection, {
        ...businessData,
        createdAt: new Date(),
        status: "Active"
    });
};

export const getBusinesses = async () => {
    const data = await getDocs(businessCollection);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// --- EVENTS SERVICE ---
export const addEvent = async (eventData) => {
    return await addDoc(eventsCollection, {
        ...eventData,
        createdAt: new Date()
    });
};

export const getEvents = async () => {
    const data = await getDocs(eventsCollection);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// --- SETTINGS SERVICE ---
// We will use a fixed document ID 'general' in a 'settings' collection

export const getSettings = async () => {
    const docRef = doc(db, "settings", "general");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return { marqueeText: "Welcome to Lingayat Business Organization!" }; // Default
    }
};

export const updateSettings = async (settingsData) => {
    const docRef = doc(db, "settings", "general");
    return await setDoc(docRef, settingsData, { merge: true });
};

// --- STORAGE SERVICE ---
export const uploadSponsorImage = async (file) => {
    try {
        const storageRef = ref(storage, `sponsors/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        return await getDownloadURL(snapshot.ref);
    } catch (error) {
        console.warn("Firebase Storage upload failed, falling back to Base64:", error);

        // Fallback: Convert to Base64 string
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
};
