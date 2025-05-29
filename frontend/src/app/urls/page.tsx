"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

type UrlEntry = {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
};

export default function UrlShortenerPage() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [urls, setUrls] = useState<UrlEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUrls = async () => {
    try {
      const res = await axios.get<UrlEntry[]>("http://localhost:3001/urls");
      setUrls(res.data);
    } catch (err) {
      console.error("Erro ao buscar URLs:", err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:3001/urls", {
        originalUrl,
      });
      setUrls([res.data, ...urls]);
      setOriginalUrl("");
    } catch (err) {
      setError("Erro ao encurtar URL. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          🔗 Encurtador de URLs
        </h1>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://suaurl.com"
              required
              className="flex-grow p-3 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={loading}
              className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Encurtando..." : "Encurtar"}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        {/* Lista de URLs encurtadas */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Links Curtos
        </h2>
        {urls.length === 0 ? (
          <p className="text-gray-500 italic">Nenhum link salvo ainda.</p>
        ) : (
          <div className="space-y-4">
            {urls.map((url) => (
  <div
    key={url.shortCode}
    className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow"
  >
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <a
          href={url.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all"
        >
          {url.originalUrl}
        </a>
        <p className="text-sm text-gray-500">
          Criado em: {new Date(url.createdAt).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          Acessos: <span className="font-semibold">{url.accessCount}</span>
        </p>
      </div>
      <div className="ml-4">
        <Link
          href={`/redirect/${url.shortCode}`}
          className="inline-block bg-indigo-100 text-indigo-700 font-medium px-3 py-1 rounded-full text-sm hover:bg-indigo-200 transition-colors"
        >
          {url.shortCode}
        </Link>
      </div>
    </div>
  </div>
))}
          </div>
        )}
      </div>
    </div>
  );
}
