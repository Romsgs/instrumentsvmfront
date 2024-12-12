import React, { useEffect, useState } from "react";
import api from "../api/api";

interface IInstrument {
  id: string;
  tipo: string;
  tamanho: string;
  condicao: string;
  numero: number;
}

interface IEducando {
  id: string;
  nome: string;
  turno: string;
  horario: string;
  instruments: IInstrument[];
}

const EducandoList: React.FC = () => {
  const [educandos, setEducandos] = useState<IEducando[]>([]);

  useEffect(() => {
    const fetchEducandos = async () => {
      try {
        const response = await api.get("/educandos");
        setEducandos(response.data);
      } catch (error) {
        console.error("Erro ao buscar educandos:", error);
      }
    };

    fetchEducandos();
  }, []);

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">
      <h2 className="text-3xl font-bold text-center text-blue-600 py-4 bg-blue-100">
        Lista de Educandos
      </h2>
      <div className="flex-1 overflow-auto">
        {educandos.map((educando) => (
          <div
            key={educando.id}
            className="w-full bg-white shadow-md border-b border-gray-200 flex flex-col items-center text-center"
          >
            <h3 className="text-xl font-bold text-gray-800 py-2">
              {educando.nome}
            </h3>
            <p className="text-sm text-gray-600">
              Turno: <span className="font-medium">{educando.turno}</span>,
              Horário: <span className="font-medium">{educando.horario}</span>
            </p>
            {educando.instruments.length > 0 ? (
              <ul className="mt-3 space-y-2 w-full px-4 pb-4">
                {educando.instruments.map((instrument) => (
                  <li
                    key={instrument.id}
                    className="bg-gray-100 p-2 rounded-md shadow-sm text-gray-700"
                  >
                    <span className="font-medium">{instrument.tipo}</span> -{" "}
                    {instrument.tamanho} (Nº {instrument.numero})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 mt-3 pb-4">
                Sem instrumentos
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducandoList;
