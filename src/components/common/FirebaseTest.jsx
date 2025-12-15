import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { db } from '../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const FirebaseTest = () => {
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    const testConnection = async () => {
        setStatus('testing');
        setMessage('Testing connection to Firestore...');

        try {
            // 1. Try to write a test document
            const docRef = await addDoc(collection(db, "test_connection"), {
                timestamp: new Date(),
                test: "Hello Firebase"
            });
            console.log("Write success:", docRef.id);

            // 2. Try to read it back
            const snapshot = await getDocs(collection(db, "test_connection"));
            console.log("Read success, docs:", snapshot.size);

            setStatus('success');
            setMessage(`Success! Connected to Firestore. Wrote doc ID: ${docRef.id}`);
        } catch (error) {
            console.error("Firebase Test Error:", error);
            setStatus('error');
            setMessage(`Failed: ${error.message} (Check console for details)`);
            if (error.code === 'unavailable') {
                setMessage(prev => prev + " -> Network is offline or Firebase is unreachable.");
            } else if (error.code === 'permission-denied') {
                setMessage(prev => prev + " -> Security Rules blocking access. set rules to 'allow read, write: if true;' for testing.");
            }
        }
    };

    return (
        <div className="mb-4">
            <Button onClick={testConnection} disabled={status === 'testing'} variant="primary" className="rounded-pill shadow-sm">
                {status === 'testing' ? (
                    <span><i className="fas fa-spinner fa-spin me-2"></i> Testing...</span>
                ) : (
                    <span><i className="fas fa-plug me-2"></i> Test Firebase Connection</span>
                )}
            </Button>
            {message && (
                <Alert variant={status === 'success' ? 'success' : 'danger'} className="mt-2">
                    {message}
                </Alert>
            )}
        </div>
    );
};

export default FirebaseTest;
