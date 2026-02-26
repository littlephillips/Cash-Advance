import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    doc,
    query,
    where,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

// ─── LOANS ───────────────────────────────

export const createLoan = async (loanData) => {
    return await addDoc(collection(db, 'loans'), {
        ...loanData,
        createdAt: serverTimestamp(),
    });
};

export const getLoans = async () => {
    const snapshot = await getDocs(collection(db, 'loans'));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateLoan = async (loanId, updates) => {
    const loanRef = doc(db, 'loans', loanId);
    return await updateDoc(loanRef, updates);
};

// ─── CLIENTS ─────────────────────────────

export const createClient = async (clientData) => {
    return await addDoc(collection(db, 'clients'), {
        ...clientData,
        createdAt: serverTimestamp(),
    });
};

export const getClients = async () => {
    const snapshot = await getDocs(collection(db, 'clients'));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ─── PAYMENTS ────────────────────────────

export const createPayment = async (paymentData, loans) => {
    const matchedLoan = loans.find(
        (loan) =>
            loan.fullName.toLowerCase() === paymentData.fullName.toLowerCase()
    );

    return await addDoc(collection(db, 'payments'), {
        ...paymentData,
        unallocated: !matchedLoan,
        createdAt: serverTimestamp(),
    });
};

export const getPayments = async () => {
    const snapshot = await getDocs(collection(db, 'payments'));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getUnallocatedPayments = async () => {
    const q = query(
        collection(db, 'payments'),
        where('unallocated', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const allocatePayment = async (paymentId, fullName) => {
    const paymentRef = doc(db, 'payments', paymentId);
    return await updateDoc(paymentRef, {
        fullName,
        unallocated: false,
    });
};