'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { use } from 'react';

type Params = Promise<{ code: string }>;

export default function RedirectPage({ params }: { params: Params }) {
  const { code } = use(params);
  const [loading, setLoading] = useState(true);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/urls/${code}`);
        const { originalUrl } = res.data;

        if (originalUrl) {
          setOriginalUrl(originalUrl);

          // Inicia contagem regressiva
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                window.location.href = originalUrl;
              }
              return prev - 1;
            });
          }, 1000);

        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAndRedirect();
  }, [code]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md w-full bg-white shadow-md rounded-lg p-8 border border-gray-200">
        {loading ? (
          <>
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h1 className="text-xl font-semibold text-gray-800">Carregando seu link...</h1>
            <p className="text-gray-600 mt-2">Estamos preparando sua URL. Um momento!</p>
          </>
        ) : error ? (
          <>
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h1 className="text-xl font-semibold text-gray-800">Link não encontrado</h1>
            <p className="text-gray-600 mt-2">O código "{code}" não existe ou foi removido.</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Pronto!</h1>
            <p className="text-gray-600 mt-2">Você será redirecionado em <strong>{countdown}</strong> segundos:</p>
            <p className="mt-2 text-blue-600 underline break-all">{originalUrl}</p>

            <a
              href={originalUrl ?? undefined}
              className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Ir agora
            </a>
          </>
        )}
      </div>
    </div>
  );
}