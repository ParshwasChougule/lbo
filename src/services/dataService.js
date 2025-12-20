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

export const updateEvent = async (id, updatedData) => {
    const eventDoc = doc(db, "events", id);
    return await updateDoc(eventDoc, updatedData);
};

export const deleteEvent = async (id) => {
    const eventDoc = doc(db, "events", id);
    return await deleteDoc(eventDoc);
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

// Helper to compress image to Base64
const compressImage = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                // Optimizing for speed: 400px max, 0.6 quality = very small payload
                const MAX_WIDTH = 400;
                const MAX_HEIGHT = 400;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                // Compress to quality 0.6 JPEG for faster Firestore writes
                const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
                resolve(dataUrl);
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
};

const timeoutPromise = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error('Upload timeout')), ms));

export const uploadChapterImage = async (file) => {
    try {
        const storageRef = ref(storage, `chapters/${Date.now()}_${file.name}`);
        const metadata = { contentType: file.type };

        // RACE: If upload takes > 2.5 seconds (likely CORS retry loop), fail fast and use fallback 
        const snapshot = await Promise.race([
            uploadBytes(storageRef, file, metadata),
            timeoutPromise(2500)
        ]);

        return await getDownloadURL(snapshot.ref);
    } catch (error) {
        console.warn("Primary upload failed/timed out, switching to fast fallback...", error);
        try {
            // Fallback: Compress and use Base64
            // This is instant and bypasses network restrictions
            const compressedBase64 = await compressImage(file);
            return compressedBase64;
        } catch (fallbackError) {
            console.error("Fallback compression failed:", fallbackError);
            throw error;
        }
    }
};

export const uploadChapterImages = async (files) => {
    const uploadPromises = Array.from(files).map(file => uploadChapterImage(file));
    return await Promise.all(uploadPromises);
};

export const uploadMemberImage = async (file) => {
    try {
        const storageRef = ref(storage, `members/${Date.now()}_${file.name}`);
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
