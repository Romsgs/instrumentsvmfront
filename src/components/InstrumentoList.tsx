interface IInstrument {
  id: string;
  tipo: string; // ex.: "violino", "viola", etc.
  tamanho: string; // ex.: "4/4", "3/4", etc.
  condicao: string; // ex.: "novo", "usado", etc.
  numero: number;
  borrowed_by: Iborrowed;
}
interface Iborrowed {
  nome: string;
  id: string;
}
import React, { useEffect, useState } from "react";
import api from "../api/api";

const InstrumentoList: React.FC = () => {
  const [instrumentos, setInstrumentos] = useState([]);

  useEffect(() => {
    const fetchInstrumentos = async () => {
      try {
        const response = await api.get("/instrumentos");
        setInstrumentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar instrumentos:", error);
      }
    };

    fetchInstrumentos();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Lista de Instrumentos</h2>
      <ul className="bg-white rounded-lg shadow-md p-4">
        {instrumentos.map((instrumento: IInstrument) => (
          <li
            key={instrumento.id}
            className="py-2 border-b last:border-none flex justify-between"
          >
            <span>{instrumento.tipo}</span>
            <span className="text-sm text-gray-500">
              {`Número: ${instrumento.numero}, Vínculo: ${
                instrumento.borrowed_by
                  ? instrumento.borrowed_by
                  : "sem educando vinculado"
              }`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstrumentoList;
