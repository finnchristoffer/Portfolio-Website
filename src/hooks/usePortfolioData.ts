import { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { PortfolioData } from '@/types/portfolio';

export function usePortfolioData() {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch main info
                const mainInfoSnap = await getDoc(doc(db, 'main_info', 'details'));
                const mainInfo = mainInfoSnap.exists() ? mainInfoSnap.data() : {};

                // Fetch collections
                const collectionsToFetch = [
                    'achievements',
                    'projects',
                    'blogPosts',
                    'certifications',
                    'experience',
                    'skills',
                ] as const;

                const collectionsData: Record<string, unknown[]> = {};

                for (const coll of collectionsToFetch) {
                    const q = query(collection(db, coll), orderBy('order'));
                    const snapshot = await getDocs(q);
                    collectionsData[coll] = snapshot.docs.map((doc) => doc.data());
                }

                setData({
                    ...mainInfo,
                    ...collectionsData,
                } as PortfolioData);
            } catch (err) {
                console.error('Error fetching portfolio data:', err);
                setError(err instanceof Error ? err : new Error('Failed to fetch data'));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
}
