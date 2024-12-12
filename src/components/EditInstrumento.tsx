import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

const EditInstrumento: React.FC = () => {
  const { id } = useParams();
  const [tipo, setTipo] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [numero, setNumero] = useState("");
  const [condicao, setCondicao] = useState("");
  const [observacao, setObservacao] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstrumento = async () => {
      try {
        const response = await api.get(`/instrumentos/${id}`);
        const { tipo, tamanho, numero, condicao, observacao } = response.data;
        setTipo(tipo);
        setTamanho(tamanho);
        setNumero(numero);
        setCondicao(condicao);
        setObservacao(observacao);
      } catch (error) {
        console.error("Erro ao buscar instrumento:", error);
      }
    };

    fetchInstrumento();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch(`/instrumentos/${id}`, {
        tipo,
        tamanho,
        numero: parseInt(numero),
        condicao,
        observacao,
      });
      alert("Instrumento atualizado com sucesso!");
      navigate("/instrumentos");
    } catch (error) {
      console.error("Erro ao atualizar instrumento:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-gray-100 min-h-screen flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Editar Instrumento</h2>
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
          <label className="block text-sm font-medium mb-1">Tamanho:</label>
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
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Atualizar
        </button>
      </div>
    </form>
  );
};

export default EditInstrumento;
