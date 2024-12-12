import React, { useEffect, useState } from "react";
import api from "../api/api";

interface IInstrument {
  id: string;
  tipo: string; // ex.: "violino", "viola", etc.
  tamanho: string; // ex.: "4/4", "3/4", etc.
  condicao: string; // ex.: "novo", "usado", etc.
  numero: number;
  borrowed_by: string;
}
interface Ieducando {
  id: string;
  nome: string;
  turno: string;
  horario: string;
  instruments: IInstrument[]; // opcional
}
const EmprestimoForm: React.FC = () => {
  const [educandos, setEducandos] = useState([]);
  const [instrumentos, setInstrumentos] = useState([]);
  const [educandoId, setEducandoId] = useState("");
  const [instrumentoId, setInstrumentoId] = useState("");

  // Carregar educandos e instrumentos disponíveis
  useEffect(() => {
    const fetchData = async () => {
      try {
        const educandoResponse = await api.get("/educandos");
        const instrumentoResponse = await api.get("/instrumentos");

        // Filtrar apenas os instrumentos disponíveis (não emprestados)
        const instrumentosDisponiveis = instrumentoResponse.data.filter(
          (instrumento: IInstrument) => instrumento.borrowed_by
        );

        setEducandos(educandoResponse.data);
        setInstrumentos(instrumentosDisponiveis);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  // Enviar o empréstimo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!educandoId || !instrumentoId) {
      alert("Por favor, selecione um educando e um instrumento.");
      return;
    }

    try {
      await api.post("/emprestimos/registrar", { educandoId, instrumentoId });
      alert("Empréstimo registrado com sucesso!");
      setEducandoId("");
      setInstrumentoId("");
    } catch (error) {
      console.error("Erro ao registrar empréstimo:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-gray-100 min-h-screen flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Registrar Empréstimo</h2>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        {/* Dropdown de Educandos */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Selecione um Educando:
          </label>
          <select
            value={educandoId}
            onChange={(e) => setEducandoId(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Selecione...</option>
            {educandos.map((educando: Ieducando) => (
              <option key={educando.id} value={educando.id}>
                {educando.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown de Instrumentos */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Selecione um Instrumento:
          </label>
          <select
            value={instrumentoId}
            onChange={(e) => setInstrumentoId(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Selecione...</option>
            {instrumentos.map((instrumento: IInstrument) => (
              <option key={instrumento.id} value={instrumento.id}>
                {instrumento.tipo} - Número {instrumento.numero}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Registrar Empréstimo
        </button>
      </div>
    </form>
  );
};

export default EmprestimoForm;
