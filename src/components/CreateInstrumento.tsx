import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const CreateInstrumento: React.FC = () => {
  const [tipo, setTipo] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [numero, setNumero] = useState("");
  const [condicao, setCondicao] = useState("bom");
  const [observacao, setObservacao] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/instrumentos", {
        tipo,
        tamanho,
        numero: parseInt(numero),
        condicao,
        observacao,
      });
      alert("Instrumento criado com sucesso!");
      navigate("/instrumentos");
    } catch (error) {
      console.error("Erro ao criar instrumento:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-gray-100 min-h-screen flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Criar Instrumento</h2>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tipo:</label>
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Tamanho (opcional):
          </label>
          <input
            type="text"
            value={tamanho}
            onChange={(e) => setTamanho(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Número:</label>
          <input
            type="number"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Condição:</label>
          <select
            value={condicao}
            onChange={(e) => setCondicao(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="bom">Bom</option>
            <option value="ruim">Ruim</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Observação:</label>
          <textarea
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Criar
        </button>
      </div>
    </form>
  );
};

export default CreateInstrumento;
